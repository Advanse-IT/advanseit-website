/**
 * LLM helper — calls OpenAI-compatible API for blog content generation.
 * Set OPENAI_API_KEY (and optionally OPENAI_BASE_URL) in .env.
 * If not configured, blog auto-generation is disabled — the site works fine without it.
 */

export type Role = "system" | "user" | "assistant";

export type Message = {
  role: Role;
  content: string;
};

export type LLMResponse = {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
};

export async function invokeLLM(params: {
  messages: Message[];
  response_format?: {
    type: string;
    json_schema?: unknown;
  };
  model?: string;
}): Promise<LLMResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  const baseUrl = process.env.OPENAI_BASE_URL ?? "https://api.openai.com";

  if (!apiKey) {
    console.warn("[LLM] OPENAI_API_KEY not set — skipping LLM call");
    return { choices: [] };
  }

  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: params.model ?? "gpt-4o-mini",
      messages: params.messages,
      ...(params.response_format ? { response_format: params.response_format } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error(`LLM API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<LLMResponse>;
}
