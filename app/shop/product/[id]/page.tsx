type Product = {
  name: string;
  price: string;
  seller: string;
  category: string;
  icon: string;
  description: string;
};

const products: Record<string, Product> = {
  "wireless-headphones": {
    name: "Wireless Headphones",
    price: "₦25,000",
    seller: "SC Tech Store",
    category: "Electronics",
    icon: "🎧",
    description:
      "High-quality wireless headphones designed for music, communication and everyday use.",
  },

  "smart-watch": {
    name: "Smart Watch",
    price: "₦38,500",
    seller: "Digital Hub",
    category: "Accessories",
    icon: "⌚",
    description:
      "A smart and stylish watch designed to keep you connected throughout your day.",
  },

  "classic-sneakers": {
    name: "Classic Sneakers",
    price: "₦32,000",
    seller: "Urban Store",
    category: "Fashion",
    icon: "👟",
    description:
      "Classic everyday sneakers combining comfort and a clean modern style.",
  },

  "portable-speaker": {
    name: "Portable Speaker",
    price: "₦18,000",
    seller: "Sound World",
    category: "Electronics",
    icon: "🔊",
    description:
      "A compact portable speaker for enjoying your music wherever you go.",
  },
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products[id];

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-2 text-sm text-slate-500">
            The product you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

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
            {product.icon}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium text-slate-400">
              {product.category}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {product.name}
            </h2>

            <p className="mt-4 text-3xl font-bold">
              {product.price}
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              {product.description}
            </p>

            <p className="mt-5 text-sm text-slate-500">
              Sold by{" "}
              <span className="font-semibold text-slate-900">
                {product.seller}
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