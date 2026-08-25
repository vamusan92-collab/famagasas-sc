"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function RegisterBusinessPage() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    businessType: "",
    location: "",
    description: "",
    phone: "",
    email: "",
  });

  const handleChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex h-16 max-w-3xl items-center px-4 sm:px-6">
            <div>
              <p className="text-sm font-medium text-slate-500">
                FAMAGASA&apos;S SC
              </p>

              <h1 className="text-xl font-bold">
                Register Business
              </h1>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-4xl">
              ✅
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              Registration submitted
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Your business registration has been received by SC.
              In the full SC system, your information will be reviewed
              before your business becomes publicly available.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/businesses"
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Browse Businesses
              </Link>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold hover:bg-slate-50"
              >
                Register another
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center gap-3 px-4 sm:px-6">
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
              Register Business
            </h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {/* Intro */}
        <section className="rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
          <p className="text-sm font-medium text-slate-300">
            Join the SC ecosystem
          </p>

          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Register your business
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
            Create a business presence on SC and connect with
            customers, communities and the wider SC ecosystem.
          </p>
        </section>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          {/* Business information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">
              Business information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Tell us about your business.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="businessName"
                  className="text-sm font-semibold"
                >
                  Business name
                </label>

                <input
                  id="businessName"
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(event) =>
                    handleChange(
                      "businessName",
                      event.target.value
                    )
                  }
                  placeholder="e.g. FAMAGASA Tech"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="category"
                    className="text-sm font-semibold"
                  >
                    Category
                  </label>

                  <select
                    id="category"
                    required
                    value={formData.category}
                    onChange={(event) =>
                      handleChange(
                        "category",
                        event.target.value
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                  >
                    <option value="">
                      Select category
                    </option>
                    <option value="Technology">
                      Technology
                    </option>
                    <option value="Electronics">
                      Electronics
                    </option>
                    <option value="Fashion">
                      Fashion
                    </option>
                    <option value="Food">
                      Food
                    </option>
                    <option value="Beauty">
                      Beauty
                    </option>
                    <option value="Home">
                      Home
                    </option>
                    <option value="Audio">
                      Audio
                    </option>
                    <option value="Services">
                      Services
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="businessType"
                    className="text-sm font-semibold"
                  >
                    Business type
                  </label>

                  <select
                    id="businessType"
                    required
                    value={formData.businessType}
                    onChange={(event) =>
                      handleChange(
                        "businessType",
                        event.target.value
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                  >
                    <option value="">
                      Select type
                    </option>
                    <option value="Retail">
                      Retail
                    </option>
                    <option value="Service">
                      Service
                    </option>
                    <option value="Online">
                      Online
                    </option>
                    <option value="Wholesale">
                      Wholesale
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="text-sm font-semibold"
                >
                  Location
                </label>

                <input
                  id="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={(event) =>
                    handleChange(
                      "location",
                      event.target.value
                    )
                  }
                  placeholder="e.g. Ibadan, Nigeria"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="text-sm font-semibold"
                >
                  Business description
                </label>

                <textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(event) =>
                    handleChange(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Tell customers what your business does..."
                  rows={5}
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                />
              </div>
            </div>
          </section>

          {/* Contact information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">
              Contact information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              How customers can reach your business.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold"
                >
                  Phone number
                </label>

                <input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(event) =>
                    handleChange(
                      "phone",
                      event.target.value
                    )
                  }
                  placeholder="+234..."
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(event) =>
                    handleChange(
                      "email",
                      event.target.value
                    )
                  }
                  placeholder="business@example.com"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                />
              </div>
            </div>
          </section>

          {/* Submit */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-semibold">
                Before you submit
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Make sure your business information and contact
                details are accurate.
              </p>
            </div>

            <button
              type="submit"
              className="mt-5 w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              🏢 Submit business registration
            </button>
          </section>
        </form>
      </div>
    </main>
  );
}
