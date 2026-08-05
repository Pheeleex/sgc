import { NextResponse } from "next/server";
import crypto from "node:crypto";

import { getProductBySlug } from "@/lib/data/products";
import {
  buildGuidePurchaseKey,
  reserveGuideOrderPurchase,
  toPublicGuideOrder,
  updateGuideOrder,
} from "@/lib/payments/orders";
import {
  buildGuideCallbackUrl,
  generatePaystackReference,
  initializePaystackTransaction,
  toKobo,
} from "@/lib/payments/paystack";
import { processGuideOrderPayment } from "@/lib/payments/process-guide-order";
import {
  checkRateLimit,
  getClientIp,
  rateLimitHeaders,
} from "@/lib/server/rate-limit";

export const runtime = "nodejs";

const DEFAULT_GUIDE_PRICE = 3500;
const CHECKOUT_RATE_LIMIT = {
  limit: 10,
  windowMs: 10 * 60 * 1000,
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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

    const reference = generatePaystackReference();
    const amountInKobo = toKobo(guide.price ?? DEFAULT_GUIDE_PRICE);
    const purchaseKey = buildGuidePurchaseKey(email, guide.slug);

    const reservation = await reserveGuideOrderPurchase({
      amount: amountInKobo,
      currency: "NGN",
      deliveryStatus: "pending",
      downloadToken: crypto.randomBytes(24).toString("hex"),
      email,
      guideId: guide.id ?? guide.slug,
      guideSlug: guide.slug,
      guideTitle: guide.title,
      purchaseKey,
      reference,
      status: "pending",
    });

    if (!reservation.created) {
      if (reservation.order.status === "paid" || reservation.order.deliveryStatus === "sent") {
        const result = await processGuideOrderPayment(reservation.order.reference);
        const statusCode =
          result.status === "success" ? 200 : result.status === "pending" ? 202 : 409;

        return NextResponse.json(
          {
            message:
              result.message ??
              "You already purchased this product. We’re sending your access again.",
            order: result.order ? toPublicGuideOrder(result.order) : null,
            reference: reservation.order.reference,
            status: result.status === "success" ? "already_purchased" : result.status,
          },
          { status: statusCode }
        );
      }

      if (reservation.order.paystackAccessCode) {
        return NextResponse.json({
          accessCode: reservation.order.paystackAccessCode,
          message: "We found your recent checkout and reopened it instead of creating a new one.",
          reference: reservation.order.reference,
          reusedCheckout: true,
          status: "checkout",
        });
      }

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
        amount: amountInKobo,
        callbackUrl: buildGuideCallbackUrl(guide.slug),
        email,
        metadata: {
          guideSlug: guide.slug,
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
