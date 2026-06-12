import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "This endpoint has been retired. Guide delivery now happens only after verified Paystack payment confirmation.",
    },
    { status: 410 }
  );
}
