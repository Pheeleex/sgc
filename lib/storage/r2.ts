import "server-only";

import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import { getRequiredEnv } from "@/lib/server/env";

let r2Client: S3Client | null = null;

function getR2Client() {
  if (r2Client) {
    return r2Client;
  }

  r2Client = new S3Client({
    credentials: {
      accessKeyId: getRequiredEnv("R2_ACCESS_KEY_ID"),
      secretAccessKey: getRequiredEnv("R2_SECRET_ACCESS_KEY"),
    },
    endpoint: `https://${getRequiredEnv("R2_ACCOUNT_ID")}.r2.cloudflarestorage.com`,
    forcePathStyle: true,
    region: "auto",
  });

  return r2Client;
}

function getR2BucketName() {
  return getRequiredEnv("R2_BUCKET");
}

function getGuideFilePrefix(docId: string) {
  return `SGC-DOCS/${docId}/`;
}

function sanitizeFileName(fileName: string) {
  return fileName
    .trim()
    .replaceAll("\\", "-")
    .replaceAll("/", "-")
    .replace(/[^\w.\- ()]/g, "-")
    .replace(/-+/g, "-");
}

function getFileNameFromKey(key: string) {
  return key.split("/").pop() ?? key;
}

export async function listGuideFiles(docId: string) {
  const prefix = getGuideFilePrefix(docId);
  const files: { name: string; path: string }[] = [];
  let continuationToken: string | undefined;

  do {
    const response = await getR2Client().send(
      new ListObjectsV2Command({
        Bucket: getR2BucketName(),
        ContinuationToken: continuationToken,
        Prefix: prefix,
      })
    );

    for (const object of response.Contents ?? []) {
      if (!object.Key || object.Key.endsWith("/")) {
        continue;
      }

      files.push({
        name: getFileNameFromKey(object.Key),
        path: object.Key,
      });
    }

    continuationToken = response.NextContinuationToken;
  } while (continuationToken);

  return files;
}

export async function getGuideFileStream(path: string) {
  try {
    const response = await getR2Client().send(
      new GetObjectCommand({
        Bucket: getR2BucketName(),
        Key: path,
      })
    );

    if (!response.Body) {
      return null;
    }

    return {
      body: response.Body.transformToWebStream(),
      contentLength: response.ContentLength,
      contentType: response.ContentType,
    };
  } catch (error) {
    if (
      error instanceof Error &&
      (error.name === "NoSuchKey" || error.name === "NotFound")
    ) {
      return null;
    }

    throw error;
  }
}

export async function uploadGuideFile(input: {
  body: Buffer;
  contentType?: string;
  docId: string;
  fileName: string;
}) {
  const safeFileName = sanitizeFileName(input.fileName);

  if (!safeFileName) {
    throw new Error("File name is required.");
  }

  const key = `${getGuideFilePrefix(input.docId)}${safeFileName}`;

  await getR2Client().send(
    new PutObjectCommand({
      Body: input.body,
      Bucket: getR2BucketName(),
      ContentType: input.contentType || "application/octet-stream",
      Key: key,
    })
  );

  return {
    name: safeFileName,
    path: key,
  };
}
