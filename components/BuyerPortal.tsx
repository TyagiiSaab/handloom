"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { Reveal, SectionHeading } from "./ui";

const tiles = [
  { title: "Product Downloads", body: "Spec sheets, wash-care and packaging PDFs per SKU.", icon: "▤" },
  { title: "RFQ Management", body: "Raise, track and compare quotations in one thread.", icon: "◈" },
  { title: "Saved Products", body: "Bookmark SKUs into seasonal assortments.", icon: "♡" },
  { title: "Catalog Requests", body: "One-click seasonal catalog drops to your inbox.", icon: "✉" },
  { title: "Shipment Tracking", body: "Container milestones from ex-works to port arrival.", icon: "◉" },
  { title: "Inquiry History", body: "Every RFQ, sample and lab-dip on record.", icon: "☷" },
];

export function BuyerPortal({ locale }: { locale: Locale }) {
  void locale;
  const [tab, setTab] = useState<"login" | "register">("login");
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <section aria-label="Buyer portal" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        eyebrow="B2B Dashboard"
        title="Buyer Portal"
        body="A secure workspace for distributors, retail chains and hospitality procurement teams."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile, i) => (
          <Reveal key={tile.title} delay={(i % 3) * 0.06}>
            <article className="h-full border border-navy-900/10 p-6 transition-all hover:-translate-y-1 hover:border-gold-400 dark:border-ivory-50/10">
              <p aria-hidden="true" className="text-2xl text-gold-500">{tile.icon}</p>
              <h3 className="font-display mt-3 text-xl font-bold">{tile.title}</h3>
              <p className="mt-1.5 text-sm opacity-70">{tile.body}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mx-auto mt-12 max-w-xl border border-gold-400/40 p-6 sm:p-8">
        <div className="flex gap-2" role="tablist" aria-label="Authentication">
          {(["login", "register"] as const).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={tab === v}
              onClick={() => { setTab(v); setMsg(null); }}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider ${
                tab === v ? "bg-navy-900 text-ivory-50 dark:bg-gold-400 dark:text-navy-950" : "border border-navy-900/15 dark:border-ivory-50/15"
              }`}
            >
              {v === "login" ? "Login" : "Registration"}
            </button>
          ))}
        </div>
        {msg ? (
          <p role="status" className="mt-6 border border-gold-400/50 p-4 text-center text-sm">{msg}</p>
        ) : (
          <form
            className="mt-6 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setMsg(
                tab === "login"
                  ? "SSO redirect would start here (Google / Microsoft / Email OTP) in production."
                  : "Application received — trade verification completes within 2 business days.",
              );
            }}
          >
            {tab === "register" && (
              <div>
                <label htmlFor="bp-company" className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-70">Company *</label>
                <input id="bp-company" required autoComplete="organization" className="w-full border border-navy-900/15 bg-transparent px-4 py-3 text-sm focus:border-gold-400 focus:outline-none dark:border-ivory-50/15" />
              </div>
            )}
            <div>
              <label htmlFor="bp-email" className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-70">Work email *</label>
              <input id="bp-email" type="email" required autoComplete="email" className="w-full border border-navy-900/15 bg-transparent px-4 py-3 text-sm focus:border-gold-400 focus:outline-none dark:border-ivory-50/15" />
            </div>
            <div>
              <label htmlFor="bp-pass" className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-70">Password *</label>
              <input id="bp-pass" type="password" required autoComplete={tab === "login" ? "current-password" : "new-password"} minLength={8} className="w-full border border-navy-900/15 bg-transparent px-4 py-3 text-sm focus:border-gold-400 focus:outline-none dark:border-ivory-50/15" />
            </div>
            <button type="submit" className="bg-navy-900 py-3 text-sm font-bold uppercase tracking-wider text-ivory-50 hover:bg-gold-500 hover:text-navy-950 dark:bg-gold-400 dark:text-navy-950 dark:hover:bg-gold-300">
              {tab === "login" ? "Sign in" : "Apply for access"}
            </button>
            <div className="grid grid-cols-2 gap-3">
              {["Google Login", "Microsoft Login"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setMsg(`${s} via OAuth 2.0 + PKCE in production.`)}
                  className="border border-navy-900/15 py-2.5 text-xs font-semibold hover:border-gold-400 hover:text-gold-500 dark:border-ivory-50/15"
                >
                  {s}
                </button>
              ))}
            </div>
          </form>
        )}
      </Reveal>
    </section>
  );
}
