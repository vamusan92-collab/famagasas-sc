"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const searchData = [
  {
    type: "Business",
    name: "SC Tech Store",
    description:
      "Consumer electronics, gadgets and accessories for everyday life.",
    location: "Lagos, Nigeria",
    icon: "💻",
    href: "/businesses",
  },
  {
    type: "Business",
    name: "Digital Hub",
    description:
      "Digital products, smart devices and technology services.",
    location: "Ibadan, Nigeria",
    icon: "📱",
    href: "/businesses",
  },
  {
    type: "Business",
    name: "Urban Store",
    description:
      "Fashion, sneakers and everyday lifestyle products.",
    location: "Abuja, Nigeria",
    icon: "👟",
    href: "/businesses",
  },
  {
    type: "Community",
    name: "African Entrepreneurs",
    description:
      "Connect with entrepreneurs, founders and business owners across Africa.",
    location: "12.4K members",
    icon: "🌍",
    href: "/communities",
  },
  {
    type: "Community",
    name: "Tech & Innovation",
    description:
      "Discuss technology, AI, startups and the future of digital business.",
    location: "8.7K members",
    icon: "🚀",
    href: "/communities",
  },
  {
    type: "Product",
    name: "Smart Watch",
    description:
      "Smart wearable device available through the SC marketplace.",
    location: "Digital Hub",
    icon: "⌚",
    href: "/shop/product",
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedQuery(query.trim());
  };

  const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/s\b/g, "")
    .replace(/[^a-z0-9\s]/g, "");
};

const filteredResults = searchData.filter((item) => {
  const searchTerm = normalizeText(submittedQuery);

  if (!searchTerm) {
    return false;
  }

  const searchableText = normalizeText(
    `${item.name} ${item.type} ${item.description} ${item.location}`
  );

  const searchWords = searchTerm.split(/\s+/);

  return searchWords.every((word) =>
    searchableText.includes(word)
  );
});
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div>
            <p className="text-sm font-medium text-slate-500">
              FAMAGASA&apos;S SC
            </p>

            <h1 className="text-xl font-bold">
              Search
            </h1>
          </div>

          <Link
            href="/"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            ← Home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <section className="rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
          <p className="text-sm font-medium text-slate-300">
            Discover on SC
          </p>

          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Search SC
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Find businesses, communities, products and more across
            the FAMAGASA&apos;S SC ecosystem.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-5 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search SC..."
              className="flex-1 rounded-full bg-white px-5 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />

            <button
              type="submit"
              disabled={!query.trim()}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Search
            </button>
          </form>
        </section>

        {!submittedQuery && (
          <section className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <div className="text-4xl">
              🔎
            </div>

            <h2 className="mt-3 text-lg font-bold">
              Search across SC
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search for businesses, communities or products.
            </p>
          </section>
        )}

        {submittedQuery && (
          <section className="mt-8">
            <div>
              <h2 className="text-xl font-bold">
                Search results
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Results for &quot;{submittedQuery}&quot;
              </p>
            </div>

            {filteredResults.length === 0 ? (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <div className="text-4xl">
                  🔍
                </div>

                <h3 className="mt-3 font-bold">
                  No results found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try searching for another business, community or
                  product.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                {filteredResults.map((result) => (
                  <Link
                    key={`${result.type}-${result.name}`}
                    href={result.href}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                      {result.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold">
                          {result.name}
                        </h3>

                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                          {result.type}
                        </span>
                      </div>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {result.description}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {result.location}
                      </p>
                    </div>

                    <span className="text-lg text-slate-400">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
