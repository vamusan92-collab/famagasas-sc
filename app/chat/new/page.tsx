"use client";
import Link from "next/link";

const suggestedChats = [
  {
    name: "SC Business",
    description: "Chat with SC Business",
    icon: "🏢",
  },
  {
    name: "Digital Hub",
    description: "Chat with Digital Hub",
    icon: "⌚",
  },
  {
    name: "Urban Store",
    description: "Chat with Urban Store",
    icon: "👟",
  },
];

export default function NewChatPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <div>
            <p className="text-sm font-medium text-slate-500">
              FAMAGASA&apos;S SC
            </p>

            <h1 className="text-xl font-bold">
              New Chat
            </h1>
          </div>

          <button
  type="button"
  onClick={() => window.history.back()}
  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
>
  ← Back
</button>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <section className="rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
          <p className="text-sm font-medium text-slate-300">
            SC Chat
          </p>

          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Start a conversation
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
            Search for a person or business and start communicating across
            the SC ecosystem.
          </p>

          <div className="mt-5">
            <input
              type="text"
              placeholder="Search people or businesses..."
              className="w-full rounded-full bg-white px-5 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </section>

        {/* Suggested conversations */}
        <section className="mt-8">
          <div>
            <h2 className="text-xl font-bold">
              Suggested conversations
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Start chatting with people and businesses on SC.
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {suggestedChats.map((chat) => (
              <Link
                key={chat.name}
                href={`/chat/${encodeURIComponent(
                  chat.name.toLowerCase().replaceAll(" ", "-")
                )}`}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl">
                  {chat.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">
                    {chat.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {chat.description}
                  </p>
                </div>

                <span className="text-slate-400">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Coming later */}
        <section className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-6">
          <p className="text-sm font-semibold text-slate-700">
            More ways to connect
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            As SC develops, you&apos;ll be able to search for users,
            businesses and communities and start conversations directly.
          </p>
        </section>
      </div>
    </main>
  );
}
