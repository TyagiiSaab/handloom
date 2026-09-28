"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { exportMarkets } from "@/lib/data";
import { t, type Locale } from "@/lib/i18n";
import { Reveal, SectionHeading } from "./ui";

/** Stylised export-map: dotted world grid with animated routes from the hub. */
export function GlobalMap({ locale }: { locale: Locale }) {
  const [hover, setHover] = useState<string | null>(null);
  const active = exportMarkets.find((m) => m.country === hover);
  const hub = { x: 62, y: 44 }; // manufacturing hub (India) on the 100x62 grid

  return (
    <section aria-label="Global footprint" className="bg-navy-950 py-20 text-ivory-100 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow={t(locale, "global.eyebrow")}
          title={t(locale, "global.title")}
          body="Animated logistics routes from our manufacturing hub to distribution partners, retail chains and hospitality groups."
        />
        <Reveal className="relative mt-12 overflow-hidden border border-gold-400/25 bg-navy-900">
          <svg viewBox="0 0 100 62" className="h-auto w-full" role="img" aria-label="World export map">
            <defs>
              <radialGradient id="hub" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C9A86A" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#C9A86A" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* dotted graticule */}
            {Array.from({ length: 30 }).map((_, r) =>
              Array.from({ length: 48 }).map((_, c) => (
                <circle key={`${r}-${c}`} cx={2 + c * 2} cy={2 + r * 2} r={0.22} fill="#FAF8F3" opacity={0.14} />
              )),
            )}
            {/* routes */}
            {exportMarkets.map((m) => (
              <g key={m.country}>
                <line
                  x1={hub.x}
                  y1={hub.y}
                  x2={m.x}
                  y2={m.y}
                  stroke="#C9A86A"
                  strokeWidth={hover === m.country ? 0.5 : 0.25}
                  strokeDasharray="1.2 1"
                  opacity={0.8}
                >
                  <animate attributeName="stroke-dashoffset" from="0" to="-4.8" dur="1.6s" repeatCount="indefinite" />
                </line>
              </g>
            ))}
            <circle cx={hub.x} cy={hub.y} r={4} fill="url(#hub)" />
            <rect x={hub.x - 1} y={hub.y - 1} width={2} height={2} fill="#C9A86A" transform={`rotate(45 ${hub.x} ${hub.y})`} />
            {/* destinations */}
            {exportMarkets.map((m) => (
              <g
                key={m.country}
                onMouseEnter={() => setHover(m.country)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(m.country)}
                onBlur={() => setHover(null)}
                onClick={() => setHover(hover === m.country ? null : m.country)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setHover(hover === m.country ? null : m.country);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`${m.country}: ${m.volume} units per year`}
                className="cursor-pointer outline-none"
              >
                <circle cx={m.x} cy={m.y} r={hover === m.country ? 1.6 : 1} fill={hover === m.country ? "#C9A86A" : "#FAF8F3"} opacity={0.95} />
                {hover === m.country && (
                  <circle cx={m.x} cy={m.y} r={2.6} fill="none" stroke="#C9A86A" strokeWidth={0.3}>
                    <animate attributeName="r" values="1.6;3" dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            ))}
          </svg>

          {/* hover card */}
          {active && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 max-w-xs border border-gold-400/50 bg-navy-950/95 p-4 shadow-2xl backdrop-blur"
              role="status"
            >
              <p className="font-display text-lg font-bold text-gold-300">{active.country}</p>
              <p className="mt-2 text-[11px] uppercase tracking-widest2 text-ivory-100/60">Products exported</p>
              <p className="text-sm">{active.items.join(" · ")}</p>
              <p className="mt-2 text-[11px] uppercase tracking-widest2 text-ivory-100/60">Annual volume</p>
              <p className="font-display text-xl text-ivory-50">{active.volume} units</p>
            </motion.div>
          )}

          <div className="absolute right-4 top-4 flex items-center gap-2 bg-navy-950/85 px-3 py-2 text-[11px] uppercase tracking-widest2 text-gold-300">
            <span className="inline-block h-2 w-2 rotate-45 bg-gold-400" aria-hidden="true" />
            Manufacturing hub
          </div>
        </Reveal>

        <ul className="mt-8 flex flex-wrap justify-center gap-2.5" aria-label="Export countries">
          {exportMarkets.map((m) => (
            <li key={m.country}>
              <button
                type="button"
                onMouseEnter={() => setHover(m.country)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(m.country)}
                onBlur={() => setHover(null)}
                onClick={() => setHover(hover === m.country ? null : m.country)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                  hover === m.country
                    ? "border-gold-400 bg-gold-400 text-navy-950"
                    : "border-ivory-50/20 text-ivory-100/80 hover:border-gold-400 hover:text-gold-300"
                }`}
              >
                {m.country}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
