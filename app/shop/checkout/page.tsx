"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

const products = [
  {
    id: "wireless-headphones",
    name: "Wireless Headphones",
    price: 25000,
    icon: "🎧",
  },
  {
    id: "smart-watch",
    name: "Smart Watch",
    price: 38500,
    icon: "⌚",
  },
  {
    id: "classic-sneakers",
    name: "Classic Sneakers",
    price: 32000,
    icon: "👟",
  },
  {
    id: "portable-speaker",
    name: "Portable Speaker",
    price: 18000,
    icon: "🔊",
  },
];

type CartItem = {
  id: string;
  quantity: number;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    payment: "SC Pay",
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("sc-cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }
  }, []);

  const cartProducts = cart
    .map((item) => {
      const product = products.find(
        (product) => product.id === item.id
      );

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
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  const delivery = cartProducts.length > 0 ? 1500 : 0;
  const total = subtotal + delivery;

  const formatPrice = (amount: number) =>
    `₦${amount.toLocaleString("en-NG")}`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.city.trim()
    ) {
      return;
    }

    setOrderPlaced(true);

    localStorage.removeItem("sc-cart");
  };

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4 py-10">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="text-6xl">🎉</div>

            <h1 className="mt-5 text-3xl font-bold">
              Order placed!
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Your SC order has been successfully created
              as a prototype order.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Order total
              </p>

              <p className="mt-1 text-2xl font-bold">
                {formatPrice(total)}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="flex-1 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Continue shopping
              </Link>

              <Link
                href="/"
                className="flex-1 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50"
              >
                Back to SC
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="text-5xl">🛒</div>

            <h1 className="mt-4 text-2xl font-bold">
              Your cart is empty
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Add something from SC Shop before checking out.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-block rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Go to Shop
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div>
            <p className="text-sm font-medium text-slate-500">
              FAMAGASA&apos;S SC
            </p>

            <h1 className="text-xl font-bold">
              Checkout
            </h1>
          </div>

          <Link
            href="/shop/cart"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            ← Cart
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 lg:grid-cols-[1fr_320px]"
        >
          {/* Delivery */}
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold">
                Delivery information
              </h2>

              <div className="mt-5 grid gap-4">
                <input
                  required
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      name: event.target.value,
                    })
                  }
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                />

                <input
                  required
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      phone: event.target.value,
                    })
                  }
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                />

                <textarea
                  required
                  placeholder="Delivery address"
                  rows={3}
                  value={form.address}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      address: event.target.value,
                    })
                  }
                  className="resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                />

                <input
                  required
                  type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      city: event.target.value,
                    })
                  }
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                />
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold">
                Payment method
              </h2>

              <div className="mt-5 space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4 hover:bg-slate-50">
                  <input
                    type="radio"
                    name="payment"
                    value="SC Pay"
                    checked={form.payment === "SC Pay"}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        payment: event.target.value,
                      })
                    }
                  />

                  <div>
                    <p className="font-semibold">
                      💳 SC Pay
                    </p>

                    <p className="text-xs text-slate-500">
                      Pay using the SC payment system.
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4 hover:bg-slate-50">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on delivery"
                    checked={
                      form.payment === "Cash on delivery"
                    }
                    onChange={(event) =>
                      setForm({
                        ...form,
                        payment: event.target.value,
                      })
                    }
                  />

                  <div>
                    <p className="font-semibold">
                      💵 Cash on delivery
                    </p>

                    <p className="text-xs text-slate-500">
                      Prototype option.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </section>

          {/* Summary */}
          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-lg font-bold">
              Order summary
            </h2>

            <div className="mt-5 space-y-4">
              {cartProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
                    {product.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {product.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      Qty: {product.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-semibold">
                    {formatPrice(
                      product.price * product.quantity
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-5 border-t border-slate-200" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Subtotal
                </span>

                <span>
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Delivery
                </span>

                <span>
                  {formatPrice(delivery)}
                </span>
              </div>
            </div>

            <div className="my-5 border-t border-slate-200" />

            <div className="flex items-center justify-between">
              <span className="font-bold">
                Total
              </span>

              <span className="text-xl font-bold">
                {formatPrice(total)}
              </span>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Place order
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-slate-400">
              No real payment is processed at this stage.
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
}
