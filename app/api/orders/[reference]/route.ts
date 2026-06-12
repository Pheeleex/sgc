import { NextResponse } from "next/server";

import { getGuideOrder } from "@/lib/payments/orders";

interface RouteContext {
  params: Promise<{ reference: string }>;
}

export async function GET(_: Request, context: RouteContext) {
  const { reference } = await context.params;
  const order = await getGuideOrder(reference);

  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return NextResponse.json({ order });
}
