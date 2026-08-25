"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const products = [
  {
    id: "wireless-headphones",
    name: "Wireless Headphones",
    price: 25000,
    seller: "SC Tech Store",
    icon: "🎧",
  },
  {
    id: "smart-watch",
    name: "Smart Watch",
    price: 38500,
    seller: "Digital Hub",
    icon: "⌚",
  },
  {
    id: "classic-sneakers",
    name: "Classic Sneakers",
    price: 32000,
    seller: "Urban Store",
    icon: "👟",
  },
  {
    id: "portable-speaker",
    name: "Portable Speaker",
    price: 18000,
    seller: "Sound World",
    icon: "🔊",
  },
];

type CartItem = {
  id: string;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("sc-cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        localStorage.removeItem("sc-cart");
      }
    }
  }, []);

  const saveCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem("sc-cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id: string) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    saveCart(updatedCart);
  };

  const decreaseQuantity = (id: string) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  const removeItem = (id: string) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  const cartProducts = cart
    .map((item) => {
      const product = products.find((product) => product.id === item.id);

      if (!product) return null;

      return {
        ...product,
        quantity: item.quantity,
      };
    })
    .filter(Boolean) as (typeof products[number] & {
    quantity: number;
  })[];

  const subtotal = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const delivery = cartProducts.length > 0 ? 1500 : 0;
  const total = subtotal + delivery;

  const formatPrice = (amount: number) =>
    `₦${amount.toLocaleString("en-NG")}`;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div>
            <p className="text-sm font-medium text-slate-500">
              FAMAGASA&apos;S SC
            </p>

            <h1 className="text-xl font-bold">
              Shopping Cart
            </h1>
          </div>

          <Link
            href="/shop"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            ← Continue shopping
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {cartProducts.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">🛒</div>

            <h2 className="mt-4 text-2xl font-bold">
              Your cart is empty
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Add products from SC Shop and they will appear here.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-block rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Explore SC Shop
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Cart items */}
            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-5">
                <h2 className="text-lg font-bold">
                  Your items
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {cartProducts.length} product
                  {cartProducts.length !== 1 ? "s" : ""} in your cart
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                {cartProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-5"
                  >
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                      {product.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Sold by {product.seller}
                      </p>

                      <p className="mt-2 font-bold">
                        {formatPrice(product.price)}
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(product.id)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50"
                        >
                          −
                        </button>

                        <span className="min-w-8 text-center text-sm font-semibold">
                          {product.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(product.id)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50"
                        >
                          +
                        </button>

                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          className="ml-3 text-xs font-medium text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">
                        {formatPrice(
                          product.price * product.quantity
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Summary */}
            <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-lg font-bold">
                Order summary
              </h2>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Subtotal
                  </span>

                  <span className="font-medium">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Delivery
                  </span>

                  <span className="font-medium">
                    {formatPrice(delivery)}
                  </span>
                </div>
              </div>

              <div className="my-5 border-t border-slate-200" />

              <div className="flex justify-between">
                <span className="font-bold">
                  Total
                </span>

                <span className="text-xl font-bold">
                  {formatPrice(total)}
                </span>
              </div>

              <Link
                href="/shop/checkout"
                className="mt-6 block w-full rounded-full bg-slate-900 py-3 text-center text-sm font-semibold text-white hover:bg-slate-700"
              >
                Proceed to checkout
              </Link>

              <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                This is currently a prototype checkout.
                Real payments will be connected later.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
