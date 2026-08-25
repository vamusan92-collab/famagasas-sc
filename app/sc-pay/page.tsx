const actions = [
  {
    title: "Send Money",
    description: "Send money to another SC user.",
    icon: "↗️",
  },
  {
    title: "Request Money",
    description: "Request a payment from someone.",
    icon: "💸",
  },
  {
    title: "Pay Business",
    description: "Pay a business through SC.",
    icon: "🏢",
  },
  {
    title: "Transactions",
    description: "View your recent payment activity.",
    icon: "📋",
  },
];

export default function SCPayPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div>
            <p className="text-sm font-medium text-slate-500">
              FAMAGASA&apos;S SC
            </p>

            <h1 className="text-xl font-bold">
              SC Pay
            </h1>
          </div>

          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
            ⚙️ Settings
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <section className="rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
          <p className="text-sm font-medium text-slate-300">
            SC Payments
          </p>

          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Your money, your way.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Send, receive and manage payments across the SC ecosystem.
          </p>

          <div className="mt-6 rounded-2xl bg-white/10 p-5">
            <p className="text-sm text-slate-300">
              Available balance
            </p>

            <p className="mt-2 text-3xl font-bold">
              ₦0.00
            </p>

            <p className="mt-2 text-xs text-slate-400">
              SC Pay prototype balance
            </p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold">
            Quick actions
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {actions.map((action) => (
              <button
                key={action.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-2xl">
                  {action.icon}
                </span>

                <h3 className="mt-3 font-bold">
                  {action.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {action.description}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold">
            Recent activity
          </h2>

          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-center">
            <p className="text-sm text-slate-500">
              No transactions yet.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Your SC Pay activity will appear here.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
