import { NextResponse } from "next/server";

import { processGuideOrderPayment } from "@/lib/payments/process-guide-order";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { reference?: string };
    const reference = body.reference?.trim();

    if (!reference) {
      return NextResponse.json({ error: "Payment reference is required." }, { status: 400 });
    }

    const result = await processGuideOrderPayment(reference);
    const statusCode =
      result.status === "success" ? 200 : result.status === "pending" ? 202 : 409;

    return NextResponse.json(result, { status: statusCode });
  } catch (error) {
    console.error("Paystack confirm error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "We could not confirm the Paystack payment yet.",
      },
      { status: 500 }
    );
  }
}
