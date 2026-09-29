export type GroqResult = {
  handled: boolean;
  response?: string;
};

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const GROQ_MODEL = "qwen/qwen3.6-27b";

export async function runGroqAI(
  message: string
): Promise<GroqResult> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return {
      handled: false,
    };
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
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
    });

    if (!response.ok) {
      console.error("Groq API error:", response.status);
      return {
        handled: false,
      };
    }

    let content = data?.choices?.[0]?.message?.content;

if (typeof content !== "string" || !content.trim()) {
  return {
    handled: false,
  };
}

// Remove reasoning/thinking sections before sending the answer to the user.
content = content.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

if (!content) {
  return {
    handled: false,
  };
}

return {
  handled: true,
  response: content,
};
  } catch (error) {
    console.error("Groq connection error:", error);

    return {
      handled: false,
    };
  }
}
