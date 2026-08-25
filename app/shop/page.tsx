"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const products = [
  {
    id: "wireless-headphones",
    name: "Wireless Headphones",
    price: "₦25,000",
    seller: "SC Tech Store",
    category: "Electronics",
    icon: "🎧",
  },
  {
    id: "smart-watch",
    name: "Smart Watch",
    price: "₦38,500",
    seller: "Digital Hub",
    category: "Accessories",
    icon: "⌚",
  },
  {
    id: "classic-sneakers",
    name: "Classic Sneakers",
    price: "₦32,000",
    seller: "Urban Store",
    category: "Fashion",
    icon: "👟",
  },
  {
    id: "portable-speaker",
    name: "Portable Speaker",
    price: "₦18,000",
    seller: "Sound World",
    category: "Electronics",
    icon: "🔊",
  },
];

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Accessories",
  "Beauty",
  "Home",
  "Food",
  "Services",
];

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  const showNotice = (message: string) => {
    setNotice(message);

    setTimeout(() => {
      setNotice("");
    }, 2000);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedSearch(search.trim());
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const searchTerm = submittedSearch.toLowerCase();

    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.seller.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: string, productName: string) => {
  const savedCart = localStorage.getItem("sc-cart");

  let currentCart: {
    id: string;
    quantity: number;
  }[] = [];

  if (savedCart) {
    try {
      currentCart = JSON.parse(savedCart);
    } catch {
      currentCart = [];
    }
  }

  const existingItem = currentCart.find(
    (item) => item.id === productId
  );

  const updatedCart = existingItem
    ? currentCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    : [...currentCart, { id: productId, quantity: 1 }];

  localStorage.setItem("sc-cart", JSON.stringify(updatedCart));

  setCart((currentCart) => [...currentCart, productId]);

  showNotice(`${productName} added to cart!`);
};

  const toggleFavorite = (productId: string) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(productId)
        ? currentFavorites.filter((id) => id !== productId)
        : [...currentFavorites, productId]
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {notice && (
        <div className="fixed left-1/2 top-20 z-[100] -translate-x-1/2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg">
          {notice}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div>
            <p className="text-sm font-medium text-slate-500">
              FAMAGASA&apos;S SC
            </p>

            <h1 className="text-xl font-bold">
              SC Shop
            </h1>
          </div>

          <Link
            href="/shop/cart"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            🛒 Cart
            {cart.length > 0 && (
              <span className="ml-2 rounded-full bg-slate-900 px-2 py-0.5 text-xs text-white">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Search */}
        <section className="rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
          <p className="text-sm text-slate-300">
            Discover products
          </p>

          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Shop on SC
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
            Discover products and businesses from across the SC ecosystem.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-5 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
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
          <h2 className="text-xl font-bold">
            Categories
          </h2>

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

        {/* Products */}
        <section className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Discover products
              </h2>

              {submittedSearch && (
                <p className="mt-1 text-sm text-slate-500">
                  Results for &quot;{submittedSearch}&quot;
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmittedSearch("");
                setSearch("");
                setSelectedCategory("All");
              }}
              className="text-sm font-medium text-slate-500 hover:text-slate-900"
            >
              Reset
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <div className="text-4xl">🔍</div>

              <h3 className="mt-3 font-bold">
                No products found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try another search or category.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => {
                const isFavorite = favorites.includes(product.id);

                return (
                  <article
                    key={product.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="relative flex h-48 items-center justify-center bg-slate-100 text-5xl">
                      {product.icon}

                      <button
                        type="button"
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm hover:bg-slate-50"
                        aria-label="Favorite product"
                      >
                        {isFavorite ? "❤️" : "♡"}
                      </button>
                    </div>

                    <div className="p-4">
                      <p className="text-xs font-medium text-slate-400">
                        {product.category}
                      </p>

                      <h3 className="mt-1 font-semibold">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-lg font-bold">
                        {product.price}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Sold by {product.seller}
                      </p>

                      <div className="mt-4 space-y-2">
                        <Link
                          href={`/shop/product/${product.id}`}
                          className="block w-full rounded-full border border-slate-200 py-2.5 text-center text-sm font-semibold hover:bg-slate-50"
                        >
                          View product
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            addToCart(product.id, product.name)
                          }
                          className="w-full rounded-full bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                        >
                          🛒 Add to cart
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
