"use client";

import Link from "next/link";
import { FormEvent, KeyboardEvent, use, useState } from "react";

const conversations: Record<
  string,
  {
    name: string;
    icon: string;
    status: string;
    messages: {
      id: number;
      sender: "them" | "me";
      text: string;
      time: string;
    }[];
  }
> = {
  "sc-tech-store": {
    name: "SC Tech Store",
    icon: "💻",
    status: "Online",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Welcome to SC Tech Store! How can we help you today?",
        time: "10:42 AM",
      },
      {
        id: 2,
        sender: "them",
        text: "We offer electronics, gadgets and accessories.",
        time: "10:43 AM",
      },
    ],
  },

  "digital-hub": {
    name: "Digital Hub",
    icon: "📱",
    status: "Online",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Welcome to Digital Hub!",
        time: "10:20 AM",
      },
      {
        id: 2,
        sender: "them",
        text: "How can we help you with our technology products and services?",
        time: "10:21 AM",
      },
    ],
  },

  "urban-store": {
    name: "Urban Store",
    icon: "👟",
    status: "Online",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Welcome to Urban Store!",
        time: "9:45 AM",
      },
      {
        id: 2,
        sender: "them",
        text: "Feel free to ask about our fashion and sneakers.",
        time: "9:46 AM",
      },
    ],
  },

  "sound-world": {
    name: "Sound World",
    icon: "🔊",
    status: "Online",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Welcome to Sound World!",
        time: "9:30 AM",
      },
      {
        id: 2,
        sender: "them",
        text: "We provide speakers, headphones and audio equipment.",
        time: "9:31 AM",
      },
    ],
  },

  "sc-business": {
    name: "SC Business",
    icon: "🏢",
    status: "Online",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Welcome to FAMAGASA'S SC!",
        time: "10:42 AM",
      },
      {
        id: 2,
        sender: "me",
        text: "Hello! I'd like to know more about SC Business.",
        time: "10:43 AM",
      },
      {
        id: 3,
        sender: "them",
        text: "Sure! We're here to help you discover businesses and services on SC.",
        time: "10:44 AM",
      },
    ],
  },
};

type ChatMessage = {
  id: number;
  sender: "them" | "me";
  text: string;
  time: string;
};

export default function ChatConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const conversation = conversations[id];

  if (!conversation) {
    return (
      <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="text-4xl">💬</div>

          <h1 className="mt-3 text-2xl font-bold">
            Conversation not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            This conversation does not exist yet.
          </p>

          <Link
            href="/chat"
            className="mt-5 inline-block rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Back to Chat
          </Link>
        </div>
      </main>
    );
  }

  const getCurrentTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

  const handleSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    setError("");

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "me",
      text: trimmedMessage,
      time: getCurrentTime(),
    };

    setSentMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Unable to get a response from SC."
        );
      }

      const assistantReply =
        data?.response ||
        data?.message ||
        "SC received your message, but no reply was returned.";

      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "them",
        text: assistantReply,
        time: getCurrentTime(),
      };

      setSentMessages((currentMessages) => [
        ...currentMessages,
        aiMessage,
      ]);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong while contacting SC.";

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      const form = event.currentTarget.form;

      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-4xl items-center gap-3 px-4 sm:px-6">
          <Link
            href="/chat"
            className="rounded-full border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
          >
            ←
          </Link>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl">
            {conversation.icon}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate font-bold">
              {conversation.name}
            </h1>

            <p className="text-xs text-slate-500">
              🟢 {conversation.status}
            </p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-6 sm:px-6">
        <div className="flex-1 space-y-4">
          {/* Existing demo messages */}
          {conversation.messages.map((chatMessage) => (
            <div
              key={chatMessage.id}
              className={`flex ${
                chatMessage.sender === "me"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 sm:max-w-[65%] ${
                  chatMessage.sender === "me"
                    ? "rounded-br-md bg-slate-900 text-white"
                    : "rounded-bl-md border border-slate-200 bg-white"
                }`}
              >
                <p className="text-sm leading-6">
                  {chatMessage.text}
                </p>

                <p
                  className={`mt-1 text-[11px] ${
                    chatMessage.sender === "me"
                      ? "text-slate-300"
                      : "text-slate-400"
                  }`}
                >
                  {chatMessage.time}
                </p>
              </div>
            </div>
          ))}

          {/* New messages */}
          {sentMessages.map((chatMessage) => (
            <div
              key={chatMessage.id}
              className={`flex ${
                chatMessage.sender === "me"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 sm:max-w-[65%] ${
                  chatMessage.sender === "me"
                    ? "rounded-br-md bg-slate-900 text-white"
                    : "rounded-bl-md border border-slate-200 bg-white"
                }`}
              >
                <p className="text-sm leading-6">
                  {chatMessage.text}
                </p>

                <p
                  className={`mt-1 text-[11px] ${
                    chatMessage.sender === "me"
                      ? "text-slate-300"
                      : "text-slate-400"
                  }`}
                >
                  {chatMessage.time}
                </p>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3">
                <p className="text-sm text-slate-500">
                  SC is thinking...
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">
                {error}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Message composer */}
      <div className="sticky bottom-0 border-t border-slate-200 bg-white">
        <form
          onSubmit={handleSend}
          className="mx-auto flex w-full max-w-4xl items-end gap-2 px-4 py-3 sm:px-6"
        >
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-3 text-lg hover:bg-slate-50"
            aria-label="Add attachment"
          >
            +
          </button>

          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message..."
            rows={1}
            disabled={isLoading}
            className="max-h-32 min-h-12 flex-1 resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400 disabled:bg-slate-100"
          />

          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </main>
  );
}
