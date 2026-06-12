import crypto from "node:crypto";

import { NextResponse } from "next/server";

import { processGuideOrderPayment } from "@/lib/payments/process-guide-order";
import { getRequiredEnv } from "@/lib/server/env";

function isValidPaystackSignature(rawBody: string, signature: string | null) {
  if (!signature) {
    return false;
  }

  const digest = crypto
    .createHmac("sha512", getRequiredEnv("PAYSTACK_SECRET_KEY"))
    .update(rawBody)
    .digest("hex");

  const digestBuffer = Buffer.from(digest, "hex");
  const signatureBuffer = Buffer.from(signature, "hex");

  if (digestBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(digestBuffer, signatureBuffer);
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    if (!isValidPaystackSignature(rawBody, signature)) {
      return NextResponse.json({ error: "Invalid Paystack signature." }, { status: 401 });
    }

    const event = JSON.parse(rawBody) as {
      data?: { reference?: string };
      event?: string;
    };

    if (event.event !== "charge.success" || !event.data?.reference) {
      return NextResponse.json({ received: true });
    }

    const result = await processGuideOrderPayment(event.data.reference);

    if (result.status === "failed") {
      console.error("Paystack webhook processing failed:", result.message);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Paystack webhook error:", error);

    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
