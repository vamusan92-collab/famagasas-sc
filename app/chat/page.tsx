import Link from "next/link";
export default function ChatPage() {
  const conversations = [
    {
      name: "SC Business",
      message: "Welcome to FAMAGASA'S SC!",
      time: "2m",
      icon: "🏢",
    },
    {
      name: "Digital Hub",
      message: "Your Smart Watch is available.",
      time: "15m",
      icon: "⌚",
    },
    {
      name: "Urban Store",
      message: "Thanks for your interest.",
      time: "1h",
      icon: "👟",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div>
            <p className="text-sm font-medium text-slate-500">
              FAMAGASA&apos;S SC
            </p>

            <h1 className="text-xl font-bold">
              SC Chat
            </h1>
          </div>

          <Link
  href="/chat/new"
  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
>
  ✏️ New chat
</Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-lg font-bold">
              Messages
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Connect and communicate across the SC ecosystem.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {conversations.map((conversation) => (
              <button
                key={conversation.name}
                className="flex w-full items-center gap-4 p-5 text-left hover:bg-slate-50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl">
                  {conversation.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold">
                      {conversation.name}
                    </h3>

                    <span className="text-xs text-slate-400">
                      {conversation.time}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-sm text-slate-500">
                    {conversation.message}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
