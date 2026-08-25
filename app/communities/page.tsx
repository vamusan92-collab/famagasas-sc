const communities = [
  {
    name: "African Entrepreneurs",
    members: "12.4K members",
    description: "Connect with entrepreneurs, founders and business owners across Africa.",
    icon: "🌍",
  },
  {
    name: "Tech & Innovation",
    members: "8.7K members",
    description: "Discuss technology, AI, startups and the future of digital business.",
    icon: "💻",
  },
  {
    name: "SC Marketplace",
    members: "6.2K members",
    description: "Discover products, share recommendations and connect with sellers.",
    icon: "🛍️",
  },
  {
    name: "Creators Hub",
    members: "4.9K members",
    description: "A community for writers, designers, artists and digital creators.",
    icon: "🎨",
  },
];

export default function CommunitiesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div>
            <p className="text-sm font-medium text-slate-500">
              FAMAGASA&apos;S SC
            </p>

            <h1 className="text-xl font-bold">
              SC Communities
            </h1>
          </div>

          <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            + Create community
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <section className="rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
          <p className="text-sm font-medium text-slate-300">
            Find your people
          </p>

          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Communities
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Join conversations, discover shared interests and build
            meaningful connections across the SC ecosystem.
          </p>

          <div className="mt-5">
            <input
              type="text"
              placeholder="Search communities..."
              className="w-full rounded-full bg-white px-5 py-3 text-sm text-slate-900 outline-none"
            />
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Discover communities
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Find communities that match your interests.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {communities.map((community) => (
              <article
                key={community.name}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                    {community.icon}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold">
                      {community.name}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-slate-400">
                      {community.members}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  {community.description}
                </p>

                <button className="mt-5 w-full rounded-full bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">
                  Join community
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
