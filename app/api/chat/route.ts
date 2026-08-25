import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body?.message;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: [
        {
          role: "system",
          content:
            "You are SC AI, the intelligent assistant inside FAMAGASA'S SC. Help users with reasoning, general questions, explanations, writing, and useful everyday assistance. Keep your role focused on SC and do not present yourself as FAMAGASA'S separate full AI platform.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return NextResponse.json({
      response: response.output_text,
    });
  } catch (error) {
    console.error("SC AI error:", error);

    return NextResponse.json(
      {
        error: "SC AI is currently unavailable.",
      },
      { status: 500 }
    );
  }
}
