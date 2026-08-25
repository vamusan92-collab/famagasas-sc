"use client";

import { FormEvent, useState } from "react";

export default function AIPage() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "SC AI request failed.");
      }

      setResponse(data.response);
      setMessage("");
    } catch (error) {
      console.error("SC AI error:", error);

      setResponse(
        "SC AI could not respond right now. Please check the API connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl bg-slate-900 p-8 text-white">
          <p className="text-sm text-slate-300">
            FAMAGASA&apos;S SC
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            SC AI
          </h1>

          <p className="mt-3 text-slate-300">
            Your intelligent assistant across the SC ecosystem.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-2xl border border-slate-200 bg-white p-5"
        >
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Ask SC AI anything..."
            disabled={loading}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400 disabled:bg-slate-50"
          />

          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="mt-3 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </form>

        {response && (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold">
              SC AI
            </h2>

            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
              {response}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
