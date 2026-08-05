import { NextResponse } from "next/server";

export function POST() {
  return NextResponse.json(
    {
      error:
        "Free product email delivery has been retired. Free products now download directly from the product page.",
    },
    { status: 410 }
  );
}
