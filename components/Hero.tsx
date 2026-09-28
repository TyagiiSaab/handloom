"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import { withBase } from "@/lib/site";
import { Counter } from "./ui";

export function Hero({ locale }: { locale: Locale }) {
  const reduce = useReducedMotion();
  const base = `/${locale}`;

  return (
    <section aria-label="Introduction" className="relative overflow-hidden">
      {/* floating gold accents + fabric motion */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-gold-400/15 blur-3xl"
          animate={reduce ? undefined : { y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-navy-800/20 blur-3xl dark:bg-gold-400/10"
          animate={reduce ? undefined : { y: [0, -24, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="weave-bg absolute inset-0 opacity-60" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-20">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-widest2 text-gold-500">
            <span aria-hidden="true" className="h-px w-10 bg-gold-400" />
            {t(locale, "hero.eyebrow")}
          </p>
          <h1 className="font-display mt-5 max-w-2xl text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
            Premium Home Textile Manufacturing{" "}
            <em className="text-gold-500">at Global Scale</em>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-900/70 sm:text-lg dark:text-ivory-100/70">
            {t(locale, "hero.sub")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`${base}/contact#catalog`}
              className="rounded-lg bg-navy-900 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-ivory-50 transition-all hover:-translate-y-0.5 hover:bg-gold-500 hover:text-navy-950 dark:bg-gold-400 dark:text-navy-950 dark:hover:bg-gold-300"
            >
              {t(locale, "hero.cta1")}
            </Link>
            <Link
              href={`${base}/products`}
              className="rounded-lg border border-navy-900/25 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:border-gold-400 hover:text-gold-500 dark:border-ivory-50/25"
            >
              {t(locale, "hero.cta2")}
            </Link>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-gold-400/30 pt-8">
            {[
              { v: t(locale, "hero.stat1v"), l: t(locale, "hero.stat1l") },
              { v: t(locale, "hero.stat2v"), l: t(locale, "hero.stat2l") },
              { v: t(locale, "hero.stat3v"), l: t(locale, "hero.stat3l") },
            ].map((s) => (
              <div key={s.l}>
                <dt className="sr-only">{s.l}</dt>
                <dd className="font-display text-3xl font-bold text-navy-900 sm:text-4xl dark:text-ivory-50">
                  {s.v}
                </dd>
                <dd className="mt-1 text-xs uppercase tracking-wider text-navy-900/60 dark:text-ivory-100/60">
                  {s.l}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          className="relative lg:col-span-5"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-xl border border-gold-400/40 shadow-2xl shadow-navy-900/20">
            {/* Video showcase: drop real footage at /videos/mill.mp4 (public/) */}
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster={withBase("/images/hero-main.jpg")}
              aria-label="Manufacturing showcase video"
            >
              <source src={withBase("/videos/mill.mp4")} type="video/mp4" />
            </video>
            <div className="relative aspect-[6/7] w-full">
              <Image
                src="/images/hero-main.jpg"
                alt="Textile mill floor with weaving lines"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                priority
                className="object-cover"
              />
            </div>
            {/* floating texture card */}
            <div className="absolute -left-3 top-6 hidden w-36 rotate-[-4deg] overflow-hidden rounded-lg border border-gold-400/60 shadow-xl sm:block">
              <div className="relative aspect-square w-full">
                <Image
                  src="/images/mink-royal.jpg"
                  alt="Embossed mink blanket texture close-up"
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>
              <p className="bg-navy-950/90 px-2 py-1.5 text-center text-[10px] font-semibold uppercase tracking-widest2 text-gold-300">
                Mink · 420 GSM
              </p>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-navy-950/80 px-4 py-3 text-ivory-50 backdrop-blur">
              <div>
                <p className="text-[11px] uppercase tracking-widest2 text-gold-300">Now weaving</p>
                <p className="font-display text-lg">Autumn Export Collection</p>
              </div>
              <p className="font-display text-2xl text-gold-400">
                <Counter to={98} suffix="%" />
              </p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute -right-4 -top-4 -z-10 h-full w-full rounded-sm bg-gold-400/20" />
        </motion.div>
      </div>
    </section>
  );
}
