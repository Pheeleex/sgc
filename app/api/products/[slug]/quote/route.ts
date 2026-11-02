import { NextResponse } from "next/server";

import { getProductBySlug } from "@/lib/data/products";
import { getPaymentQuote } from "@/lib/payments/quote";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const product = await getProductBySlug(slug);
    if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });
    if (product.accessType === "free" || product.price === 0) {
      return NextResponse.json({ error: "This product is free." }, { status: 400 });
    }
    const quote = await getPaymentQuote(product);
    return NextResponse.json({ quote }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Product quote error:", error);
    return NextResponse.json(
      { error: "We could not calculate the Paystack charge. Please try again shortly." },
      { status: 503 }
    );
  }
}
