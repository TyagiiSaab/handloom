"use client";

import { t, type Locale } from "@/lib/i18n";
import { Counter, Reveal, SectionHeading } from "./ui";

const heritageMetrics = [
  { value: 35, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Skilled Artisans" },
  { value: 10000, suffix: "+", label: "Product Designs" },
];

const kpis = [
  { value: 1.2, decimals: 1, suffix: "M+", label: "Units Annual Production", note: "Across 3 product verticals" },
  { value: 150, suffix: "K+", label: "Sq Ft Facility", note: "Integrated dyeing → finishing" },
  { value: 24, suffix: "/7", label: "Automated Operations", note: "3 shifts, IoT-monitored looms" },
  { value: 40, suffix: "+", label: "Export Countries", note: "Sea + air freight programs" },
];

const timeline = [
  { year: "1991", text: "Founded as a two-loom weaving house serving domestic merchants." },
  { year: "2004", text: "First export consignment — mink blankets to the Middle East." },
  { year: "2013", text: "Hand-tufting atelier launched with 120 master artisans." },
  { year: "2020", text: "150,000 sq ft integrated facility commissioned; OEKO-TEX certified." },
  { year: "2026", text: "1.2M+ units shipped annually to 40+ countries." },
];

export function Heritage({ locale }: { locale: Locale }) {
  return (
    <section aria-label="Heritage and manufacturing" className="bg-navy-950 py-20 text-ivory-100 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        {/* Left: Heritage */}
        <div>
          <SectionHeading
            dark
            align="left"
            eyebrow={t(locale, "heritage.eyebrow")}
            title={t(locale, "heritage.title")}
            body={t(locale, "heritage.body")}
          />
          <ol className="mt-10 space-y-0 border-l border-gold-400/40">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.06}>
                <li className="relative pb-8 pl-8 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[7px] top-1 h-3 w-3 rotate-45 bg-gold-400"
                  />
                  <p className="font-display text-2xl font-bold text-gold-300">{item.year}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ivory-100/75">{item.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <dl className="mt-10 grid grid-cols-3 gap-4">
            {heritageMetrics.map((m) => (
              <div key={m.label} className="border border-gold-400/25 bg-white/[0.03] p-4">
                <dd className="font-display text-3xl font-bold text-gold-300">
                  <Counter to={m.value} suffix={m.suffix} />
                </dd>
                <dt className="mt-1 text-[11px] uppercase tracking-wider text-ivory-100/60">{m.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: Modern manufacturing KPIs */}
        <div className="lg:pl-6 lg:pt-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest2 text-gold-400">
              <span aria-hidden="true" className="mr-2 inline-block h-px w-8 translate-y-[-4px] bg-gold-400" />
              {t(locale, "mfg.eyebrow")}
            </p>
            <h2 className="font-display mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              {t(locale, "mfg.title")}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {kpis.map((k, i) => (
              <Reveal key={k.label} delay={i * 0.07}>
                <div className="group relative overflow-hidden border border-gold-400/25 bg-gradient-to-br from-white/[0.06] to-transparent p-6 transition-colors hover:border-gold-400">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold-400 transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <p className="font-display text-4xl font-bold text-ivory-50">
                    <Counter to={k.value} suffix={k.suffix} decimals={k.decimals ?? 0} />
                  </p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-gold-300">{k.label}</p>
                  <p className="mt-1 text-xs text-ivory-100/60">{k.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-4 border border-gold-400/25 bg-gold-400/10 p-6">
              <p className="text-sm leading-relaxed text-ivory-100/85">
                <strong className="text-gold-300">Quality assurance:</strong> 4-stage inspection —
                greige, dyeing, finishing and pre-shipment (AQL 2.5) — with an in-house testing lab for
                GSM, colorfastness, pilling and shrinkage.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
