/**
 * Image generation helper — uses OpenAI DALL-E for blog cover images.
 * Requires OPENAI_API_KEY in .env.
 * If not set, blog image generation is skipped gracefully.
 */

export async function generateImage(prompt: string): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn("[ImageGen] OPENAI_API_KEY not set — skipping image generation");
    return null;
  }

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1792x1024",
      quality: "standard",
    }),
  });

  if (!response.ok) {
    console.error("[ImageGen] API error:", response.status, await response.text());
    return null;
  }

  const data = await response.json() as { data?: Array<{ url?: string }> };
  return data?.data?.[0]?.url ?? null;
}
