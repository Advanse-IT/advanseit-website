/**
 * Portable S3 file storage helpers.
 *
 * Replaces the Manus storage proxy with direct AWS S3 SDK calls.
 * Works with any S3-compatible provider (AWS S3, Cloudflare R2, MinIO, etc.).
 *
 * Required environment variables:
 *   S3_BUCKET        — bucket name, e.g. "advanseit-assets"
 *   S3_REGION        — AWS region, e.g. "ap-southeast-2"  (use "auto" for R2)
 *   S3_ACCESS_KEY    — AWS access key ID
 *   S3_SECRET_KEY    — AWS secret access key
 *   S3_ENDPOINT      — (optional) custom endpoint for R2/MinIO
 *   S3_PUBLIC_URL    — (optional) public CDN base URL for generated URLs
 */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

function getS3Client(): S3Client {
  const region = process.env.S3_REGION ?? "ap-southeast-2";
  const endpoint = process.env.S3_ENDPOINT;

  return new S3Client({
    region,
    ...(endpoint ? { endpoint, forcePathStyle: true } : {}),
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY ?? "",
      secretAccessKey: process.env.S3_SECRET_KEY ?? "",
    },
  });
}

function getPublicUrl(key: string): string {
  const bucket = process.env.S3_BUCKET ?? "";
  const region = process.env.S3_REGION ?? "ap-southeast-2";
  const customBase = process.env.S3_PUBLIC_URL;

  if (customBase) {
    return `${customBase.replace(/\/+$/, "")}/${key}`;
  }

  const endpoint = process.env.S3_ENDPOINT;
  if (endpoint) {
    return `${endpoint.replace(/\/+$/, "")}/${bucket}/${key}`;
  }

  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream"
): Promise<{ key: string; url: string }> {
  const bucket = process.env.S3_BUCKET;
  if (!bucket) throw new Error("S3_BUCKET environment variable is not set");
  if (!process.env.S3_ACCESS_KEY || !process.env.S3_SECRET_KEY) {
    throw new Error("S3_ACCESS_KEY and S3_SECRET_KEY environment variables are required");
  }

  const key = relKey.replace(/^\/+/, "");
  const client = getS3Client();

  const body =
    typeof data === "string"
      ? Buffer.from(data)
      : Buffer.isBuffer(data)
      ? data
      : Buffer.from(data as Uint8Array);

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );

  return { key, url: getPublicUrl(key) };
}

export async function storageGet(relKey: string): Promise<{ key: string; url: string }> {
  const key = relKey.replace(/^\/+/, "");
  return { key, url: getPublicUrl(key) };
}
