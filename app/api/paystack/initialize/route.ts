import { NextResponse } from "next/server";
import crypto from "node:crypto";

import { getProductBySlug } from "@/lib/data/products";
import {
  buildGuidePurchaseKey,
  getGuideOrderByPurchaseKey,
  reserveGuideOrderPurchase,
  toPublicGuideOrder,
  updateGuideOrder,
} from "@/lib/payments/orders";
import {
  buildGuideCallbackUrl,
  generatePaystackReference,
  initializePaystackTransaction,
} from "@/lib/payments/paystack";
import {
  getPaymentQuote,
} from "@/lib/payments/quote";
import { processGuideOrderPayment } from "@/lib/payments/process-guide-order";
import type { GuideOrderRecord } from "@/lib/payments/types";
import {
  checkRateLimit,
  getClientIp,
  rateLimitHeaders,
} from "@/lib/server/rate-limit";

export const runtime = "nodejs";

const CHECKOUT_RATE_LIMIT = {
  limit: 10,
  windowMs: 10 * 60 * 1000,
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function existingCheckoutResponse(
  order: GuideOrderRecord,
  expectedListAmountMinor: number | undefined,
  expectedChargeAmountKobo: number | undefined
) {
  if (order.status === "paid" || order.deliveryStatus === "sent") {
    const result = await processGuideOrderPayment(order.reference);
    const statusCode = result.status === "success" ? 200 : result.status === "pending" ? 202 : 409;
    return NextResponse.json(
      {
        message: result.message,
        order: result.order ? toPublicGuideOrder(result.order) : null,
        reference: order.reference,
        status: result.status === "success" ? "already_purchased" : result.status,
      },
      { status: statusCode }
    );
  }

  if (order.status !== "pending" || !order.paystackAccessCode) return null;

  if (order.currency !== "NGN" || !order.quote) {
    return NextResponse.json(
      { error: "An earlier checkout is still open. Please contact support to restart it." },
      { status: 409 }
    );
  }

  if (
    expectedListAmountMinor !== order.quote.listAmountMinor ||
    expectedChargeAmountKobo !== order.quote.chargeAmountKobo
  ) {
    return NextResponse.json(
      {
        error: "Your earlier checkout has a different NGN amount. Review it before proceeding.",
        quote: order.quote,
        status: "quote_changed",
      },
      { status: 409 }
    );
  }

  return NextResponse.json({
    accessCode: order.paystackAccessCode,
    reference: order.reference,
    reusedCheckout: true,
    status: "checkout",
  });
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const rateLimit = await checkRateLimit({
      key: `paystack-init:${clientIp}`,
      ...CHECKOUT_RATE_LIMIT,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many checkout attempts. Please try again later." },
        { headers: rateLimitHeaders(rateLimit), status: 429 }
      );
    }

    const body = (await request.json()) as {
      email?: string;
      guideSlug?: string;
      productSlug?: string;
      expectedListAmountMinor?: number;
      expectedChargeAmountKobo?: number;
    };

    const email = body.email?.trim().toLowerCase();
    const productSlug = body.productSlug?.trim() || body.guideSlug?.trim();

    if (!email || !productSlug) {
      return NextResponse.json(
        { error: "Email and product slug are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const guide = await getProductBySlug(productSlug);

    if (!guide) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    if (!guide.files?.length) {
      return NextResponse.json(
        { error: "This product is not ready for delivery yet." },
        { status: 400 }
      );
    }

    if (guide.accessType === "free" || guide.price === 0) {
      return NextResponse.json(
        { error: "This product is free and does not require checkout." },
        { status: 400 }
      );
    }

    const purchaseKey = buildGuidePurchaseKey(email, guide.slug);
    const existingOrder = await getGuideOrderByPurchaseKey(purchaseKey);
    if (existingOrder && existingOrder.guideSlug === guide.slug && existingOrder.email === email) {
      const response = await existingCheckoutResponse(
        existingOrder,
        body.expectedListAmountMinor,
        body.expectedChargeAmountKobo
      );
      if (response) return response;
    }

    const quote = await getPaymentQuote(guide);
    if (
      body.expectedListAmountMinor !== quote.listAmountMinor ||
      body.expectedChargeAmountKobo !== quote.chargeAmountKobo
    ) {
      return NextResponse.json(
        {
          error: "The checkout amount changed. Please review the updated amount and proceed again.",
          quote,
          status: "quote_changed",
        },
        { status: 409 }
      );
    }

    const reference = generatePaystackReference();
    const currency = "NGN";
    const amountInSubunit = quote.chargeAmountKobo;

    const reservation = await reserveGuideOrderPurchase({
      amount: amountInSubunit,
      currency,
      deliveryStatus: "pending",
      downloadToken: crypto.randomBytes(24).toString("hex"),
      email,
      guideId: guide.id ?? guide.slug,
      guideSlug: guide.slug,
      guideTitle: guide.title,
      quote,
      purchaseKey,
      reference,
      status: "pending",
    });

    if (!reservation.created) {
      const response = await existingCheckoutResponse(
        reservation.order,
        body.expectedListAmountMinor,
        body.expectedChargeAmountKobo
      );
      if (response) return response;

      return NextResponse.json(
        {
          message:
            "Your checkout is already being prepared. Please try again in a moment.",
          reference: reservation.order.reference,
          status: "pending",
        },
        { status: 202 }
      );
    }

    let initializedTransaction: Awaited<ReturnType<typeof initializePaystackTransaction>>;

    try {
      initializedTransaction = await initializePaystackTransaction({
        amount: amountInSubunit,
        callbackUrl: buildGuideCallbackUrl(guide.slug),
        currency,
        email,
        metadata: {
          guideSlug: guide.slug,
          currency,
          listPriceCurrency: quote.kind === "usd" ? "USD" : "NGN",
          listPriceMinor: quote.listAmountMinor,
          productSlug: guide.slug,
          orderReference: reference,
          custom_fields: [
            {
              display_name: "Product",
              value: guide.title,
              variable_name: "product_title",
            },
            {
              display_name: "Product Slug",
              value: guide.slug,
              variable_name: "product_slug",
            },
          ],
        },
        reference,
      });
    } catch (error) {
      await updateGuideOrder(reference, {
        lastError:
          error instanceof Error ? error.message : "Paystack checkout initialization failed.",
        status: "failed",
      });

      throw error;
    }

    await updateGuideOrder(reference, {
      paystackAccessCode: initializedTransaction.access_code,
      paystackAuthorizationUrl: initializedTransaction.authorization_url,
    });

    return NextResponse.json({
      accessCode: initializedTransaction.access_code,
      reference: initializedTransaction.reference,
      status: "checkout",
    });
  } catch (error) {
    console.error("Paystack initialize error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "We could not start the Paystack checkout.",
      },
      { status: 500 }
    );
  }
}
