"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, products, type Product, type ProductCategory } from "@/lib/data";
import { t, type Locale } from "@/lib/i18n";
import { ProductImage } from "./ProductImage";
import { Reveal, SectionHeading } from "./ui";

function ProductCard({
  p,
  locale,
  onView,
}: {
  p: Product;
  locale: Locale;
  onView: (p: Product) => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative border border-navy-900/10 bg-white transition-shadow hover:shadow-xl hover:shadow-navy-900/10 dark:border-ivory-50/10 dark:bg-navy-900"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 border-2 border-gold-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative overflow-hidden">
        <ProductImage src={p.image} alt={p.name} ratio="aspect-[4/3]" />
        <span className="absolute left-3 top-3 bg-navy-950/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest2 text-gold-300">
          {p.subcategory}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold">{p.name}</h3>
        <dl className="mt-3 space-y-1.5 text-[13px]">
          <div className="flex justify-between gap-2">
            <dt className="text-navy-900/55 dark:text-ivory-100/55">{t(locale, "products.moq")}</dt>
            <dd className="font-semibold">{p.moq}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-navy-900/55 dark:text-ivory-100/55">{t(locale, "products.material")}</dt>
            <dd className="text-right font-medium">{p.material}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-navy-900/55 dark:text-ivory-100/55">{t(locale, "products.markets")}</dt>
            <dd className="text-right font-medium">{p.markets.slice(0, 3).join(" · ")}</dd>
          </div>
        </dl>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onView(p)}
            className="flex-1 border border-navy-900/20 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-gold-400 hover:text-gold-500 dark:border-ivory-50/20"
          >
            {t(locale, "products.quickview")}
          </button>
          <Link
            href={`/${locale}/contact?product=${p.id}`}
            className="flex-1 rounded-lg bg-navy-900 px-3 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-ivory-50 transition-colors hover:bg-gold-500 hover:text-navy-950 dark:bg-gold-400 dark:text-navy-950 dark:hover:bg-gold-300"
          >
            {t(locale, "products.pricing")}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function Catalog({ locale, limit }: { locale: Locale; limit?: number }) {
  const [cat, setCat] = useState<ProductCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (!q) return true;
      return [p.name, p.subcategory, p.material, ...p.markets, ...p.sizes]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [cat, query]);

  const shown = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section aria-label="Product catalog" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        eyebrow={t(locale, "products.eyebrow")}
        title={t(locale, "products.title")}
        body="Filter by vertical, search materials or markets, and open any product for full export specifications."
      />

      <Reveal className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Categories" className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={cat === c.id}
              onClick={() => setCat(c.id)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                cat === c.id
                  ? "bg-navy-900 text-ivory-50 dark:bg-gold-400 dark:text-navy-950"
                  : "border border-navy-900/15 hover:border-gold-400 hover:text-gold-500 dark:border-ivory-50/15"
              }`}
            >
              {c.id === "all" ? t(locale, "products.all") : c.label}
            </button>
          ))}
        </div>
        <div className="relative lg:w-80">
          <label htmlFor="product-search" className="sr-only">
            {t(locale, "products.search")}
          </label>
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(locale, "products.search")}
            className="w-full border border-navy-900/15 bg-transparent px-4 py-2.5 text-sm placeholder:text-navy-900/40 focus:border-gold-400 focus:outline-none dark:border-ivory-50/15 dark:placeholder:text-ivory-100/40"
          />
        </div>
      </Reveal>

      {shown.length === 0 ? (
        <p role="status" className="mt-12 border border-dashed border-gold-400/50 p-10 text-center text-sm">
          No products match your filters. Clear the search or choose another category — or send an RFQ
          and we will weave to spec.
        </p>
      ) : (
        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <ProductCard key={p.id} p={p} locale={locale} onView={setActive} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Quick-view modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center bg-navy-950/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.name}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-ivory-50 text-navy-900 dark:bg-navy-900 dark:text-ivory-50"
            >
              <ProductImage src={active.image} alt={active.name} ratio="aspect-[16/8]" sizes="(max-width: 768px) 100vw, 672px" />
              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest2 text-gold-500">{active.subcategory}</p>
                <h3 className="font-display mt-2 text-3xl font-bold">{active.name}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-75">{active.description}</p>
                <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                  <div className="border border-navy-900/10 p-3 dark:border-ivory-50/10">
                    <dt className="text-xs uppercase tracking-wider opacity-60">{t(locale, "products.moq")}</dt>
                    <dd className="mt-1 font-semibold">{active.moq}</dd>
                  </div>
                  <div className="border border-navy-900/10 p-3 dark:border-ivory-50/10">
                    <dt className="text-xs uppercase tracking-wider opacity-60">{t(locale, "products.material")}</dt>
                    <dd className="mt-1 font-semibold">{active.material}</dd>
                  </div>
                  <div className="border border-navy-900/10 p-3 dark:border-ivory-50/10">
                    <dt className="text-xs uppercase tracking-wider opacity-60">{t(locale, "products.sizes")}</dt>
                    <dd className="mt-1 font-semibold">{active.sizes.join(" · ")}</dd>
                  </div>
                  <div className="border border-navy-900/10 p-3 dark:border-ivory-50/10">
                    <dt className="text-xs uppercase tracking-wider opacity-60">{t(locale, "products.markets")}</dt>
                    <dd className="mt-1 font-semibold">{active.markets.join(" · ")}</dd>
                  </div>
                </dl>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/${locale}/contact?product=${active.id}`}
                    className="rounded-lg bg-navy-900 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-ivory-50 hover:bg-gold-500 hover:text-navy-950 dark:bg-gold-400 dark:text-navy-950"
                  >
                    {t(locale, "products.pricing")}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="border border-navy-900/20 px-6 py-3 text-xs font-semibold uppercase tracking-wider dark:border-ivory-50/20"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
