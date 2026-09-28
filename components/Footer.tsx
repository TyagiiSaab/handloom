"use client";

import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const base = `/${locale}`;
  const cols: { title: string; items: { label: string; href: string }[] }[] = [
    {
      title: "Company",
      items: [
        { label: t(locale, "nav.about"), href: `${base}/about` },
        { label: t(locale, "nav.manufacturing"), href: `${base}/manufacturing` },
        { label: t(locale, "nav.global"), href: `${base}/global-reach` },
        { label: t(locale, "nav.certifications"), href: `${base}/certifications` },
      ],
    },
    {
      title: "Products",
      items: [
        { label: "Mink Blankets", href: `${base}/products#mink` },
        { label: "Hand-Tufted Rugs", href: `${base}/products#rugs` },
        { label: "Premium Carpets", href: `${base}/products#carpets` },
        { label: t(locale, "nav.catalog"), href: `${base}/contact#catalog` },
      ],
    },
    {
      title: "Export Markets",
      items: [
        { label: "USA & Canada", href: `${base}/global-reach` },
        { label: "UK & Europe", href: `${base}/global-reach` },
        { label: "UAE & Middle East", href: `${base}/global-reach` },
        { label: "Australia & Japan", href: `${base}/global-reach` },
      ],
    },
    {
      title: "Legal",
      items: [
        { label: "Privacy Policy", href: `${base}/contact` },
        { label: "Terms & Conditions", href: `${base}/contact` },
        { label: "Sitemap", href: `${base}` },
      ],
    },
  ];

  return (
    <footer className="bg-navy-950 text-ivory-100" aria-label="Footer">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-6 lg:px-8">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl font-bold text-ivory-50">
            HADLOOM <span className="text-gold-400">·</span>
          </p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-widest2 text-gold-400">
            Home Textiles · Export
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory-100/70">
            {t(locale, "footer.tag")}
          </p>
          <address className="mt-4 text-sm not-italic leading-relaxed text-ivory-100/70">
            Export House, Industrial Estate
            <br />
            Panipat, Haryana, India
            <br />
            <a href="mailto:export@hadloom.example" className="text-gold-300 hover:underline">
              export@hadloom.example
            </a>
            <br />
            <a href="tel:+911234567890" className="hover:underline">
              +91 123 456 7890
            </a>
          </address>
          <div className="mt-4 flex gap-3" aria-label="Social links">
            {["LinkedIn", "X", "Instagram"].map((s) => (
              <a
                key={s}
                href={`${base}/contact`}
                aria-label={s}
                className="rounded-full border border-ivory-50/20 px-3 py-1.5 text-xs hover:border-gold-400 hover:text-gold-300"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h3 className="text-xs font-semibold uppercase tracking-widest2 text-gold-400">{c.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.items.map((i) => (
                <li key={i.label}>
                  <Link href={i.href} className="text-ivory-100/75 hover:text-gold-300">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-ivory-50/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-ivory-100/60 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} Hadloom Home Textiles. {t(locale, "footer.rights")}
          </p>
          <form
            className="flex w-full max-w-sm gap-2"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter signup"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email for newsletter
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Work email for trade updates"
              className="w-full rounded border border-ivory-50/20 bg-transparent px-3 py-2 text-sm placeholder:text-ivory-100/40"
            />
            <button
              type="submit"
              className="rounded bg-gold-400 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-gold-300"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
