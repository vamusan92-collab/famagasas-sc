"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const businesses = [
  {
    id: "sc-tech-store",
    name: "SC Tech Store",
    category: "Electronics",
    location: "Lagos, Nigeria",
    description:
      "Consumer electronics, gadgets and accessories for everyday life.",
    icon: "💻",
  },
  {
    id: "digital-hub",
    name: "Digital Hub",
    category: "Technology",
    location: "Ibadan, Nigeria",
    description:
      "Digital products, smart devices and technology services.",
    icon: "📱",
  },
  {
    id: "urban-store",
    name: "Urban Store",
    category: "Fashion",
    location: "Abuja, Nigeria",
    description:
      "Fashion, sneakers and everyday lifestyle products.",
    icon: "👟",
  },
  {
    id: "sound-world",
    name: "Sound World",
    category: "Audio",
    location: "Port Harcourt, Nigeria",
    description:
      "Speakers, headphones and audio equipment.",
    icon: "🔊",
  },
];

const categories = [
  "All",
  "Electronics",
  "Technology",
  "Fashion",
  "Audio",
];

export default function BusinessesPage() {
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedSearch(search.trim());
  };

  const filteredBusinesses = businesses.filter((business) => {
    const categoryMatches =
      selectedCategory === "All" ||
      business.category === selectedCategory;

    const searchTerm = submittedSearch.toLowerCase();

    const searchMatches =
      !searchTerm ||
      business.name.toLowerCase().includes(searchTerm) ||
      business.category.toLowerCase().includes(searchTerm) ||
      business.location.toLowerCase().includes(searchTerm) ||
      business.description.toLowerCase().includes(searchTerm);

    return categoryMatches && searchMatches;
  });

  const resetFilters = () => {
    setSearch("");
    setSubmittedSearch("");
    setSelectedCategory("All");
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div>
            <p className="text-sm font-medium text-slate-500">
              FAMAGASA&apos;S SC
            </p>

            <h1 className="text-xl font-bold">
              SC Businesses
            </h1>
          </div>

          <Link
            href="/business-profile"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            🏢 Register business
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {/* Hero */}
        <section className="rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
          <p className="text-sm font-medium text-slate-300">
            Discover businesses
          </p>

          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Find businesses on SC
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Discover businesses, services and local brands across
            the SC ecosystem.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-5 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search businesses..."
              className="flex-1 rounded-full bg-white px-5 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />

            <button
              type="submit"
              disabled={!search.trim()}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Search
            </button>
          </form>
        </section>

        {/* Categories */}
        <section className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Categories
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Browse businesses by category.
              </p>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-medium text-slate-500 hover:text-slate-900"
            >
              Reset
            </button>
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium ${
                  selectedCategory === category
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white hover:bg-slate-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Results */}
        <section className="mt-8">
          <div>
            <h2 className="text-xl font-bold">
              Discover businesses
            </h2>

            {submittedSearch && (
              <p className="mt-1 text-sm text-slate-500">
                Results for &quot;{submittedSearch}&quot;
              </p>
            )}
          </div>

          {filteredBusinesses.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <div className="text-4xl">
                🔍
              </div>

              <h3 className="mt-3 font-bold">
                No businesses found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try another search or category.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Reset search
              </button>
            </div>
          ) : (
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {filteredBusinesses.map((business) => (
                <article
                  key={business.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                      {business.icon}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-bold">
                        {business.name}
                      </h3>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {business.category}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    {business.description}
                  </p>

                  <p className="mt-3 text-sm text-slate-500">
                    📍 {business.location}
                  </p>

                  <Link
                    href={`/businesses/${business.id}`}
                    className="mt-5 block w-full rounded-full bg-slate-900 py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-700"
                  >
                    View business
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
