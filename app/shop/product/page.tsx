export default function ProductPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div>
            <p className="text-sm font-medium text-slate-500">
              FAMAGASA&apos;S SC
            </p>

            <h1 className="text-xl font-bold">
              Product
            </h1>
          </div>

          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
            🛒 Cart
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <div className="flex min-h-80 items-center justify-center rounded-2xl bg-slate-100 text-7xl">
            🎧
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium text-slate-400">
              Electronics
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Wireless Headphones
            </h2>

            <p className="mt-4 text-3xl font-bold">
              ₦25,000
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              High-quality wireless headphones designed for music,
              communication and everyday use.
            </p>

            <p className="mt-5 text-sm text-slate-500">
              Sold by{" "}
              <span className="font-semibold text-slate-900">
                SC Tech Store
              </span>
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700">
                Add to cart
              </button>

              <button className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold hover:bg-slate-50">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
