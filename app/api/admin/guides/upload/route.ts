import { NextResponse } from "next/server";

import { uploadGuideFile } from "@/lib/storage/r2";

export const runtime = "nodejs";

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const docId = getFormValue(formData, "docId");
    const files = formData
      .getAll("files")
      .filter((value): value is File => value instanceof File && value.size > 0);

    if (!docId) {
      return NextResponse.json({ error: "Guide document ID is required." }, { status: 400 });
    }

    if (!files.length) {
      return NextResponse.json({ error: "Choose at least one file to upload." }, { status: 400 });
    }

    const oversizedFile = files.find((file) => file.size > MAX_FILE_SIZE_BYTES);

    if (oversizedFile) {
      return NextResponse.json(
        {
          error: `${oversizedFile.name} is too large. Keep uploads under 25MB for this admin uploader.`,
        },
        { status: 413 }
      );
    }

    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const body = Buffer.from(await file.arrayBuffer());

        return uploadGuideFile({
          body,
          contentType: file.type,
          docId,
          fileName: file.name,
        });
      })
    );

    return NextResponse.json({
      files: uploadedFiles,
      message: `${uploadedFiles.length} file${
        uploadedFiles.length === 1 ? "" : "s"
      } uploaded.`,
    });
  } catch (error) {
    console.error("Guide file upload error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "We could not upload those files.",
      },
      { status: 500 }
    );
  }
}
