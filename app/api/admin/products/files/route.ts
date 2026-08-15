import { NextResponse } from "next/server";

import { deleteGuideFile } from "@/lib/storage/r2";

export const runtime = "nodejs";

export async function DELETE(request: Request) {
  try {
    const body = (await request.json()) as {
      docId?: string;
      path?: string;
    };

    const docId = body.docId?.trim();
    const path = body.path?.trim();

    if (!docId || !path) {
      return NextResponse.json(
        { error: "Product folder ID and file path are required." },
        { status: 400 }
      );
    }

    await deleteGuideFile({ docId, path });

    return NextResponse.json({
      message: "File deleted.",
      path,
    });
  } catch (error) {
    console.error("Product file delete error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "We could not delete that file.",
      },
      { status: 500 }
    );
  }
}
