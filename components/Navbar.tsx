"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isRTL, localeNames, locales, t, type Locale } from "@/lib/i18n";
import { withBase } from "@/lib/site";

const links = [
  { key: "nav.home", href: "" },
  { key: "nav.about", href: "about" },
  { key: "nav.manufacturing", href: "manufacturing" },
  { key: "nav.products", href: "products" },
  { key: "nav.global", href: "global-reach" },
  { key: "nav.certifications", href: "certifications" },
  { key: "nav.buyer", href: "buyer-portal" },
  { key: "nav.contact", href: "contact" },
];

export function Logo({ locale }: { locale: Locale }) {
  return (
    <Link href={`/${locale}`} className="flex items-center gap-3" aria-label="Hadloom Home">
      <span className="grid h-10 w-10 place-items-center bg-navy-900 font-display text-xl font-bold text-gold-400 dark:bg-gold-400 dark:text-navy-950">
        H
      </span>
      <span className="leading-tight">
        <span className="block font-display text-xl font-bold tracking-wide">HADLOOM</span>
        <span className="block text-[10px] font-medium uppercase tracking-widest2 text-gold-500">
          Home Textiles · Export
        </span>
      </span>
    </Link>
  );
}

export function Navbar({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base = `/${locale}`;
  const switchLocale = (l: Locale) => {
    const rest = pathname?.split("/").slice(2).join("/") ?? "";
    return withBase(`/${l}${rest ? `/${rest}` : ""}`);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all ${
        scrolled
          ? "border-gold-400/30 bg-ivory-50/90 shadow-lg shadow-navy-900/5 backdrop-blur dark:bg-navy-950/90"
          : "border-transparent bg-ivory-50 dark:bg-navy-950"
      }`}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <nav aria-label="Primary" className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo locale={locale} />
        <ul className="hidden items-center gap-5 text-[13px] font-medium xl:flex">
          {links.map((l) => {
            const href = `${base}${l.href ? `/${l.href}` : ""}`;
            const active = pathname === href || (l.href === "" && pathname === base);
            return (
              <li key={l.key}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`link-gold py-2 transition-colors hover:text-gold-500 ${
                    active ? "text-gold-500" : ""
                  }`}
                >
                  {t(locale, l.key)}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="hidden items-center gap-2 xl:flex">
          <label htmlFor="lang" className="sr-only">
            Language
          </label>
          <select
            id="lang"
            aria-label="Language"
            className="rounded border border-navy-900/15 bg-transparent px-2 py-1.5 text-xs font-medium dark:border-ivory-50/20"
            defaultValue={locale}
            onChange={(e) => {
              window.location.href = switchLocale(e.target.value as Locale);
            }}
          >
            {locales.map((l) => (
              <option key={l} value={l}>
                {localeNames[l]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="rounded border border-navy-900/15 px-2.5 py-1.5 text-sm dark:border-ivory-50/20"
          >
            {mounted && theme === "dark" ? "☀" : "☾"}
          </button>
          <Link
            href={`${base}/contact#catalog`}
            className="rounded-lg bg-navy-900 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ivory-50 transition-colors hover:bg-gold-500 hover:text-navy-950 dark:bg-gold-400 dark:text-navy-950 dark:hover:bg-gold-300"
          >
            {t(locale, "nav.catalog")}
          </Link>
        </div>
        <button
          type="button"
          className="rounded border border-navy-900/15 p-2 xl:hidden dark:border-ivory-50/20"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="block w-6 space-y-1.5">
            <span className="block h-0.5 bg-current" />
            <span className="block h-0.5 bg-current" />
            <span className="block h-0.5 bg-current" />
          </span>
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-gold-400/20 xl:hidden"
          >
            <ul className={`grid gap-1 p-4 ${isRTL(locale) ? "text-right" : ""}`}>
              {links.map((l) => (
                <li key={l.key}>
                  <Link
                    href={`${base}${l.href ? `/${l.href}` : ""}`}
                    onClick={() => setOpen(false)}
                    className="block rounded px-3 py-2.5 text-sm font-medium hover:bg-gold-400/10"
                  >
                    {t(locale, l.key)}
                  </Link>
                </li>
              ))}
              <li className="flex items-center gap-2 px-3 py-2">
                <select
                  aria-label="Language"
                  defaultValue={locale}
                  onChange={(e) => {
                    window.location.href = switchLocale(e.target.value as Locale);
                  }}
                  className="rounded border border-navy-900/15 bg-transparent px-2 py-1.5 text-xs dark:border-ivory-50/20"
                >
                  {locales.map((l) => (
                    <option key={l} value={l}>
                      {localeNames[l]}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                  className="rounded border border-navy-900/15 px-2.5 py-1.5 text-sm dark:border-ivory-50/20"
                >
                  {mounted && theme === "dark" ? "☀ Light" : "☾ Dark"}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
