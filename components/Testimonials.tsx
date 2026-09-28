"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { t, type Locale } from "@/lib/i18n";
import { SectionHeading } from "./ui";

const quotes = [
  {
    quote:
      "Hadloom took our private-label blanket program from 40,000 to 250,000 units without a single chargeback. Their AQL discipline is the best we have seen in South Asia.",
    name: "Sarah Mitchell",
    role: "Sourcing Director, North American Retail Chain",
    metric: "250K units / year",
  },
  {
    quote:
      "The tufting atelier executes designer artwork flawlessly — carved wool rugs that retail at 4x landed cost. Our concept stores reorder every quarter.",
    name: "Julien Moreau",
    role: "Buyer, European Home & Living Group",
    metric: "98% sell-through",
  },
  {
    quote:
      "For 600 hotel rooms we needed FR-rated blankets, custom runners and banquet carpet on one PO. One supplier, one QC pack, delivered six days early.",
    name: "Ayesha Al Farsi",
    role: "Procurement Head, Gulf Hospitality Group",
    metric: "600 rooms fitted",
  },
  {
    quote:
      "Their ESG documentation dropped straight into our scope-3 filing. OEKO-TEX, GOTS and SEDEX packs arrived with the first quotation.",
    name: "Hans Weber",
    role: "Category Manager, German DIY Chain",
    metric: "100% doc compliance",
  },
];

export function Testimonials({ locale }: { locale: Locale }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % quotes.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const q = quotes[idx];

  return (
    <section aria-label="Testimonials" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading eyebrow={t(locale, "testi.eyebrow")} title={t(locale, "testi.title")} />
      <div
        className="relative mx-auto mt-12 max-w-4xl border border-gold-400/30 bg-white p-8 sm:p-12 dark:bg-navy-900"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <span aria-hidden="true" className="font-display absolute -top-6 left-8 bg-ivory-50 px-2 text-7xl text-gold-400 dark:bg-navy-950">
          &ldquo;
        </span>
        <AnimatePresence mode="wait">
          <motion.figure
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            <blockquote className="font-display text-xl leading-relaxed sm:text-2xl">{q.quote}</blockquote>
            <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{q.name}</p>
                <p className="text-sm opacity-60">{q.role}</p>
              </div>
              <p className="border border-gold-400/50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-500">
                {q.metric}
              </p>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-2" role="tablist" aria-label="Testimonials">
            {quotes.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === idx}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-1.5 transition-all ${i === idx ? "w-10 bg-gold-400" : "w-4 bg-navy-900/20 hover:bg-gold-400/60 dark:bg-ivory-50/20"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => setIdx((idx - 1 + quotes.length) % quotes.length)}
              className="border border-navy-900/20 px-3 py-1.5 hover:border-gold-400 hover:text-gold-500 dark:border-ivory-50/20"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => setIdx((idx + 1) % quotes.length)}
              className="border border-navy-900/20 px-3 py-1.5 hover:border-gold-400 hover:text-gold-500 dark:border-ivory-50/20"
            >
              →
            </button>
          </div>
        </div>
      </div>
      <ul aria-label="Partner types" className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-widest2 opacity-50">
        {["Retail Chains", "Distributors", "Hospitality Groups", "Wholesalers", "Sourcing Offices"].map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </section>
  );
}
