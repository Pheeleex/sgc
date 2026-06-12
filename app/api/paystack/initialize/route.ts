import { NextResponse } from "next/server";

import { getDocumentBySlug } from "@/lib/firebase/getProducts";
import { createGuideOrder } from "@/lib/payments/orders";
import {
  buildGuideCallbackUrl,
  generatePaystackReference,
  initializePaystackTransaction,
  toKobo,
} from "@/lib/payments/paystack";

const DEFAULT_GUIDE_PRICE = 3500;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      guideSlug?: string;
    };

    const email = body.email?.trim().toLowerCase();
    const guideSlug = body.guideSlug?.trim();

    if (!email || !guideSlug) {
      return NextResponse.json(
        { error: "Email and guide slug are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const guide = await getDocumentBySlug(guideSlug);

    if (!guide) {
      return NextResponse.json({ error: "Guide not found." }, { status: 404 });
    }

    if (!guide.files?.length) {
      return NextResponse.json(
        { error: "This guide is not ready for delivery yet." },
        { status: 400 }
      );
    }

    const reference = generatePaystackReference();
    const amountInKobo = toKobo(guide.price ?? DEFAULT_GUIDE_PRICE);

    await createGuideOrder({
      amount: amountInKobo,
      currency: "NGN",
      deliveryStatus: "pending",
      email,
      guideId: guide.id ?? guide.slug,
      guideSlug: guide.slug,
      guideTitle: guide.title,
      reference,
      status: "pending",
    });

    const initializedTransaction = await initializePaystackTransaction({
      amount: amountInKobo,
      callbackUrl: buildGuideCallbackUrl(guide.slug),
      email,
      metadata: {
        guideSlug: guide.slug,
        orderReference: reference,
        custom_fields: [
          {
            display_name: "Guide",
            value: guide.title,
            variable_name: "guide_title",
          },
          {
            display_name: "Guide Slug",
            value: guide.slug,
            variable_name: "guide_slug",
          },
        ],
      },
      reference,
    });

    return NextResponse.json({
      accessCode: initializedTransaction.access_code,
      reference: initializedTransaction.reference,
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
