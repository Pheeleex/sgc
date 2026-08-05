import { NextResponse } from "next/server";

import { getProductBySlug } from "@/lib/data/products";
import {
  checkRateLimit,
  getClientIp,
  rateLimitHeaders,
} from "@/lib/server/rate-limit";
import { getGuideFileStream } from "@/lib/storage/r2";

export const runtime = "nodejs";

const FREE_DOWNLOAD_RATE_LIMIT = {
  limit: 30,
  windowMs: 10 * 60 * 1000,
};

interface RouteContext {
  params: Promise<{ fileIndex: string; slug: string }>;
}

function getDownloadFilename(name: string) {
  return name.replaceAll('"', "");
}

export async function GET(request: Request, context: RouteContext) {
  const { fileIndex, slug } = await context.params;
  const parsedFileIndex = Number.parseInt(fileIndex, 10);

  if (Number.isNaN(parsedFileIndex) || parsedFileIndex < 0) {
    return NextResponse.json({ error: "Invalid download link." }, { status: 400 });
  }

  const clientIp = getClientIp(request);
  const rateLimit = await checkRateLimit({
    key: `free-download:${clientIp}:${slug}`,
    ...FREE_DOWNLOAD_RATE_LIMIT,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many download attempts. Please try again later." },
      { headers: rateLimitHeaders(rateLimit), status: 429 }
    );
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  if (product.accessType !== "free" && product.price !== 0) {
    return NextResponse.json(
      { error: "This product requires checkout before download." },
      { status: 402 }
    );
  }

  const file = product.files?.[parsedFileIndex];

  if (!file) {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }

  const fileStream = await getGuideFileStream(file.path);

  if (!fileStream) {
    return NextResponse.json({ error: "File is not available right now." }, { status: 502 });
  }

  const headers = new Headers(rateLimitHeaders(rateLimit));
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
