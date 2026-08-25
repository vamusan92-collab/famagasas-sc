"use client";

import Link from "next/link";
import { use } from "react";

const businesses = {
  "sc-tech-store": {
    name: "SC Tech Store",
    category: "Electronics",
    location: "Lagos, Nigeria",
    description:
      "Consumer electronics, gadgets and accessories for everyday life.",
    icon: "💻",
    status: "Open",
    products: [
      {
        name: "Wireless Headphones",
        price: "₦25,000",
        icon: "🎧",
      },
    ],
  },

  "digital-hub": {
    name: "Digital Hub",
    category: "Technology",
    location: "Ibadan, Nigeria",
    description:
      "Digital products, smart devices and technology services.",
    icon: "📱",
    status: "Open",
    products: [
      {
        name: "Smart Watch",
        price: "₦38,500",
        icon: "⌚",
      },
    ],
  },

  "urban-store": {
    name: "Urban Store",
    category: "Fashion",
    location: "Abuja, Nigeria",
    description:
      "Fashion, sneakers and everyday lifestyle products.",
    icon: "👟",
    status: "Open",
    products: [
      {
        name: "Classic Sneakers",
        price: "₦32,000",
        icon: "👟",
      },
    ],
  },

  "sound-world": {
    name: "Sound World",
    category: "Audio",
    location: "Port Harcourt, Nigeria",
    description:
      "Speakers, headphones and audio equipment.",
    icon: "🔊",
    status: "Open",
    products: [
      {
        name: "Portable Speaker",
        price: "₦18,000",
        icon: "🔊",
      },
    ],
  },
};

export default function BusinessProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const business =
    businesses[id as keyof typeof businesses];

  if (!business) {
    return (
      <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="text-5xl">🏢</div>

          <h1 className="mt-4 text-2xl font-bold">
            Business not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            This business does not exist on SC yet.
          </p>

          <Link
            href="/businesses"
            className="mt-6 inline-block rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Back to Businesses
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-4 sm:px-6">
          <Link
            href="/businesses"
            className="rounded-full border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
          >
            ←
          </Link>

          <div>
            <p className="text-xs font-medium text-slate-400">
              FAMAGASA&apos;S SC
            </p>

            <h1 className="font-bold">
              Business Profile
            </h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {/* Business hero */}
        <section className="rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white text-5xl">
              {business.icon}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-3xl font-bold">
                  {business.name}
                </h2>

                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                  ● {business.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-300">
                {business.category}
              </p>

              <p className="mt-2 text-sm text-slate-300">
                📍 {business.location}
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-6 text-slate-300">
            {business.description}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/chat/${id}`}
              className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              💬 Chat with business
            </Link>

            <Link
              href="/shop"
              className="rounded-full border border-slate-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800"
            >
              🛒 View shop
            </Link>
          </div>
        </section>

        {/* Products */}
        <section className="mt-8">
          <div>
            <h2 className="text-xl font-bold">
              Products
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Products currently listed by this business.
            </p>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {business.products.map((product) => (
              <article
                key={product.name}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                    {product.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-lg font-bold">
                      {product.price}
                    </p>
                  </div>
                </div>

                <Link
                  href="/shop"
                  className="mt-5 block rounded-full bg-slate-900 py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-700"
                >
                  View in Shop
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            About this business
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {business.description}
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">
                Category
              </p>

              <p className="mt-1 font-semibold">
                {business.category}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">
                Location
              </p>

              <p className="mt-1 font-semibold">
                {business.location}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
