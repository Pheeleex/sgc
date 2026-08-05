import { NextResponse } from "next/server";

import { getProductBySlug } from "@/lib/data/products";
import { getGuideOrder } from "@/lib/payments/orders";
import { getGuideFileStream } from "@/lib/storage/r2";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ fileIndex: string; reference: string }>;
}

function getDownloadFilename(name: string) {
  return name.replaceAll('"', "");
}

export async function GET(request: Request, context: RouteContext) {
  const { fileIndex, reference } = await context.params;
  const token = new URL(request.url).searchParams.get("token");
  const parsedFileIndex = Number.parseInt(fileIndex, 10);

  if (!token || Number.isNaN(parsedFileIndex) || parsedFileIndex < 0) {
    return NextResponse.json({ error: "Invalid download link." }, { status: 400 });
  }

  const order = await getGuideOrder(reference);

  if (!order || order.downloadToken !== token) {
    return NextResponse.json({ error: "Download link not found." }, { status: 404 });
  }

  if (order.status !== "paid" && order.deliveryStatus !== "sent") {
    return NextResponse.json(
      { error: "Payment has not been confirmed for this download." },
      { status: 402 }
    );
  }

  const guide = await getProductBySlug(order.guideSlug);
  const file = guide?.files?.[parsedFileIndex];

  if (!guide || !file) {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }

  const fileStream = await getGuideFileStream(file.path);

  if (!fileStream) {
    return NextResponse.json({ error: "File is not available right now." }, { status: 502 });
  }

  const headers = new Headers();
  headers.set("Cache-Control", "private, no-store");
  headers.set(
    "Content-Disposition",
    `attachment; filename="${getDownloadFilename(file.name)}"`
  );

  if (fileStream.contentType) {
    headers.set("Content-Type", fileStream.contentType);
  }

  if (fileStream.contentLength) {
    headers.set("Content-Length", String(fileStream.contentLength));
  }

  return new NextResponse(fileStream.body, { headers });
}
