import Link from "next/link";

const business = {
  name: "SC Tech Store",
  username: "@sctechstore",
  category: "Electronics & Technology",
  location: "Lagos, Nigeria",
  description:
    "Consumer electronics, gadgets and accessories for everyday life.",
  verified: true,
  followers: "2.4K",
  products: 24,
  rating: "4.8",
};

const products = [
  {
    id: "wireless-headphones",
    name: "Wireless Headphones",
    price: "₦25,000",
    icon: "🎧",
  },
  {
    id: "smart-watch",
    name: "Smart Watch",
    price: "₦38,500",
    icon: "⌚",
  },
  {
    id: "portable-speaker",
    name: "Portable Speaker",
    price: "₦18,000",
    icon: "🔊",
  },
];

export default function BusinessProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div>
            <p className="text-sm font-medium text-slate-500">
              FAMAGASA&apos;S SC
            </p>

            <h1 className="text-xl font-bold">
              Business Profile
            </h1>
          </div>

          <Link
            href="/businesses"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            ← Businesses
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {/* Business identity */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Cover */}
          <div className="h-40 bg-slate-900 sm:h-52" />

          <div className="px-5 pb-6 sm:px-8">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-slate-100 text-4xl shadow-sm sm:h-28 sm:w-28">
                  💻
                </div>

                <div className="pb-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold sm:text-3xl">
                      {business.name}
                    </h2>

                    {business.verified && (
                      <span
                        title="Verified business"
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs text-white"
                      >
                        ✓
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {business.username}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">
                  Follow
                </button>

                <Link
                  href="/chat/sc-tech-store"
                  className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold hover:bg-slate-50"
                >
                  Message
                </Link>
              </div>
            </div>

            {/* Business details */}
            <div className="mt-6">
              <p className="text-sm leading-6 text-slate-600">
                {business.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                <span>🏢 {business.category}</span>
                <span>📍 {business.location}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 divide-x rounded-2xl border border-slate-200 bg-slate-50 py-4 text-center">
              <div>
                <p className="font-bold">{business.products}</p>
                <p className="text-xs text-slate-500">Products</p>
              </div>

              <div>
                <p className="font-bold">{business.followers}</p>
                <p className="text-xs text-slate-500">Followers</p>
              </div>

              <div>
                <p className="font-bold">⭐ {business.rating}</p>
                <p className="text-xs text-slate-500">Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Profile navigation */}
        <nav className="mt-6 flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <button className="whitespace-nowrap rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
            Overview
          </button>

          <button className="whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100">
            Products
          </button>

          <button className="whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100">
            Services
          </button>

          <button className="whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-100">
            Reviews
          </button>
        </nav>

        {/* Main content */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Products */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Products
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Featured products from {business.name}.
                </p>
              </div>

              <Link
                href="/shop"
                className="text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                View shop →
              </Link>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-2xl border border-slate-200"
                >
                  <div className="flex h-36 items-center justify-center bg-slate-100 text-5xl">
                    {product.icon}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold">
                      {product.name}
                    </h3>

                    <p className="mt-2 font-bold">
                      {product.price}
                    </p>

                    <Link
                      href={`/shop/product/${product.id}`}
                      className="mt-4 block rounded-full bg-slate-900 py-2 text-center text-sm font-semibold text-white hover:bg-slate-700"
                    >
                      View product
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Business information */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold">
                About this business
              </h2>

              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Category
                  </p>

                  <p className="mt-1 font-medium">
                    {business.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Location
                  </p>

                  <p className="mt-1 font-medium">
                    {business.location}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Status
                  </p>

                  <p className="mt-1 font-medium">
                    🟢 Open
                  </p>
                </div>
              </div>
            </div>

            {/* Business owner action */}
            <div className="rounded-2xl bg-slate-900 p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Business owners
              </p>

              <h2 className="mt-2 font-bold">
                Want your business on SC?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Create a business profile and connect your business with
                customers across the SC ecosystem.
              </p>

              <Link
                href="/businesses/register"
                className="mt-4 block rounded-full bg-white py-2.5 text-center text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Register a business
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
