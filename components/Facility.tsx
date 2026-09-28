"use client";

import { useRef } from "react";
import { t, type Locale } from "@/lib/i18n";
import { ProductImage } from "./ProductImage";
import { Counter, Reveal, SectionHeading } from "./ui";

const stops = [
  { title: "Dyeing & Finishing Lines", metric: "40K", unit: "meters / day", image: "/images/mill-dyeing.jpg" },
  { title: "Raschel Weaving Hall", metric: "320", unit: "looms online", image: "/images/mill-looms.jpg" },
  { title: "Hand-Tufting Atelier", metric: "500", unit: "master artisans", image: "/images/mill-tufting.jpg" },
  { title: "QC & Testing Lab", metric: "AQL", unit: "2.5 pre-shipment", image: "/images/hero-small.jpg" },
  { title: "Export Warehousing", metric: "60K", unit: "sq ft bonded storage", image: "/images/mill-warehouse.jpg" },
];

export function Facility({ locale }: { locale: Locale }) {
  const track = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) =>
    track.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  return (
    <section aria-label="Facility showcase" className="overflow-hidden bg-ivory-100 py-20 dark:bg-navy-900 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow={t(locale, "facility.eyebrow")}
            title={t(locale, "facility.title")}
            body="A drone-to-floor journey through dyeing, weaving, tufting, testing and bonded export warehousing."
          />
          <div className="flex gap-2" aria-label="Gallery controls">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll gallery back"
              className="border border-navy-900/20 px-4 py-2 text-lg hover:border-gold-400 hover:text-gold-500 dark:border-ivory-50/20"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll gallery forward"
              className="border border-navy-900/20 px-4 py-2 text-lg hover:border-gold-400 hover:text-gold-500 dark:border-ivory-50/20"
            >
              →
            </button>
          </div>
        </div>
      </div>
      <Reveal className="mt-12">
        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-[max(1rem,calc((100vw-80rem)/2+2rem))]"
        >
          {stops.map((s) => (
            <article
              key={s.title}
              className="group relative w-[300px] shrink-0 snap-start overflow-hidden border border-gold-400/30 bg-navy-950 sm:w-[340px]"
            >
              <ProductImage src={s.image} alt={s.title} ratio="aspect-[4/5]" sizes="(max-width: 640px) 300px, 340px" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-transparent p-5 pt-14 text-ivory-50">
                <p className="font-display text-3xl font-bold text-gold-300">
                  {s.metric} <span className="text-sm font-sans font-medium text-ivory-100/70">{s.unit}</span>
                </p>
                <h3 className="mt-1 font-display text-xl">{s.title}</h3>
                <span className="mt-3 inline-block h-0.5 w-10 bg-gold-400 transition-all duration-500 group-hover:w-full" aria-hidden="true" />
              </div>
              <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-gold-400 text-sm font-bold text-navy-950 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                +
              </span>
            </article>
          ))}
        </div>
      </Reveal>
      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {[
          { v: 1.2, d: 1, s: "M+", l: "Units / year" },
          { v: 150, d: 0, s: "K+", l: "Sq ft facility" },
          { v: 900, d: 0, s: "+", l: "Workforce" },
          { v: 98, d: 0, s: "%", l: "On-time shipment" },
        ].map((m) => (
          <div key={m.l} className="border border-navy-900/10 p-5 text-center dark:border-ivory-50/10">
            <p className="font-display text-3xl font-bold text-gold-500">
              <Counter to={m.v} suffix={m.s} decimals={m.d} />
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider opacity-60">{m.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
