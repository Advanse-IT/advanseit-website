/**
 * Portable image generation helper.
 *
 * When BUILT_IN_FORGE_API_URL + BUILT_IN_FORGE_API_KEY are set (Manus hosting),
 * uses the Manus ImageService (Forge API).
 *
 * When running outside Manus, falls back to OpenAI DALL-E 3 via OPENAI_API_KEY.
 *
 * Generated images are uploaded to S3 via storagePut() and the public URL is returned.
 */

import { storagePut } from "../storage";
import { ENV } from "./env";

export type GenerateImageOptions = {
  prompt: string;
  originalImages?: Array<{
    url?: string;
    b64Json?: string;
    mimeType?: string;
  }>;
};

export type GenerateImageResponse = {
  url?: string;
};

async function generateViaManus(options: GenerateImageOptions): Promise<Buffer> {
  const baseUrl = ENV.forgeApiUrl.endsWith("/")
    ? ENV.forgeApiUrl
    : `${ENV.forgeApiUrl}/`;
  const fullUrl = new URL("images.v1.ImageService/GenerateImage", baseUrl).toString();

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "connect-protocol-version": "1",
      authorization: `Bearer ${ENV.forgeApiKey}`,
    },
    body: JSON.stringify({
      prompt: options.prompt,
      original_images: options.originalImages || [],
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Manus image generation failed (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
    );
  }

  const result = (await response.json()) as { image: { b64Json: string; mimeType: string } };
  return Buffer.from(result.image.b64Json, "base64");
}

async function generateViaOpenAI(options: GenerateImageOptions): Promise<Buffer> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Image generation not configured. Set BUILT_IN_FORGE_API_KEY (Manus) or OPENAI_API_KEY (OpenAI)."
    );
  }

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: options.prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `OpenAI image generation failed (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
    );
  }

  const result = (await response.json()) as { data: Array<{ b64_json: string }> };
  return Buffer.from(result.data[0].b64_json, "base64");
}

export async function generateImage(
  options: GenerateImageOptions
): Promise<GenerateImageResponse> {
  let imageBuffer: Buffer;

  if (ENV.forgeApiUrl && ENV.forgeApiKey) {
    // Running on Manus — use the built-in image service
    imageBuffer = await generateViaManus(options);
  } else {
    // Running outside Manus — use OpenAI DALL-E
    imageBuffer = await generateViaOpenAI(options);
  }

  const { url } = await storagePut(
    `generated/${Date.now()}.png`,
    imageBuffer,
    "image/png"
  );

  return { url };
}
