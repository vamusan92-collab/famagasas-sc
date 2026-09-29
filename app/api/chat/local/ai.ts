export type LocalAIResult = {
  handled: boolean;
  response?: string;
};

const LOCAL_AI_URL =
  process.env.LOCAL_AI_URL || "http://127.0.0.1:8080/v1";

const LOCAL_AI_MODEL =
  process.env.LOCAL_AI_MODEL || "local-model";

export async function runLocalAI(
  message: string
): Promise<LocalAIResult> {
  try {
    const response = await fetch(
      `${LOCAL_AI_URL}/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: LOCAL_AI_MODEL,
          messages: [
            {
              role: "system",
              content:
                "You are SC AI, the intelligent assistant inside FAMAGASA'S SC. Be conversational, helpful, clear, and concise. Help with general questions, explanations, learning, reasoning, writing, and useful everyday tasks.",
            },
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 512,
        }),
        signal: AbortSignal.timeout(8000),
      }
    );

    if (!response.ok) {
      return {
        handled: false,
      };
    }

    const data = await response.json();

    const content =
      data?.choices?.[0]?.message?.content;

    if (typeof content !== "string" || !content.trim()) {
      return {
        handled: false,
      };
    }

    return {
      handled: true,
      response: content.trim(),
    };
  } catch {
    // No local model/server available.
    // The caller can continue to the next fallback.
    return {
      handled: false,
    };
  }
}
