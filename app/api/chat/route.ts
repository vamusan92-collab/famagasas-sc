import { NextResponse } from "next/server";
import { handleLocalRequest } from "./local/engine";

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

    // Local capability layer runs first.
    const localResult = await handleLocalRequest(message);

    if (localResult.handled) {
      return NextResponse.json({
        response: localResult.response,
      });
    }

    // OpenAI fallback will be connected here later.
    // It remains disabled until the API is funded.
    return NextResponse.json({
      response:
        "I'm still learning how to handle that. Try asking me something else, and I'll do my best to help.",
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
