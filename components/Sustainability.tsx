"use client";

import { motion } from "framer-motion";
import { t, type Locale } from "@/lib/i18n";
import { Counter, Reveal, SectionHeading } from "./ui";

const metrics = [
  { label: "Recycled & regenerative fibers", pct: 62 },
  { label: "Process water recycled (ETP + RO)", pct: 84 },
  { label: "Solar share of electricity", pct: 47 },
  { label: "Zero-waste-to-landfill lines", pct: 91 },
];

const highlights = [
  { title: "Responsible sourcing", body: "GOTS organic cotton and recycled-poly programs with full bale-to-bale traceability." },
  { title: "Waste reduction", body: "Selvedge and yarn waste re-spun into backing yarns; 91% of lines are zero-waste-to-landfill." },
  { title: "Energy efficiency", body: "47% solar power, heat-recovery stenters and servo-driven looms cut kWh per unit 28% since 2021." },
  { title: "Water conservation", body: "Low-liquor dyeing plus ETP + RO recycling returns 84% of process water to production." },
  { title: "Ethical labor", body: "SEDEX + BSCI audited, above-minimum wages, on-site healthcare and childcare for 900+ staff." },
];

export function Sustainability({ locale }: { locale: Locale }) {
  return (
    <section aria-label="Sustainability" className="border-y border-gold-400/25 bg-ivory-100 py-20 dark:bg-navy-900 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t(locale, "sust.eyebrow")}
          title={t(locale, "sust.title")}
          body="ESG data buyers can put straight into scope-3 reporting — verified annually and shared in every RFQ pack."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-7">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.06}>
                <div>
                  <div className="flex items-baseline justify-between text-sm">
                    <p className="font-semibold">{m.label}</p>
                    <p className="font-display text-2xl font-bold text-gold-500">
                      <Counter to={m.pct} suffix="%" />
                    </p>
                  </div>
                  <div
                    className="mt-2 h-2.5 bg-navy-900/10 dark:bg-ivory-50/10"
                    role="progressbar"
                    aria-valuenow={m.pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={m.label}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${m.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.05}>
                <li className="h-full border border-navy-900/10 bg-white/60 p-5 dark:border-ivory-50/10 dark:bg-white/[0.03]">
                  <p className="text-[11px] font-bold uppercase tracking-widest2 text-gold-500">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-1 text-lg font-bold">{h.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed opacity-70">{h.body}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
