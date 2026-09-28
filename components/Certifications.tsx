import { certifications } from "@/lib/data";
import { t, type Locale } from "@/lib/i18n";
import { Counter, Reveal, SectionHeading } from "./ui";

export function Certifications({ locale }: { locale: Locale }) {
  return (
    <section aria-label="Certifications" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        eyebrow={t(locale, "certs.eyebrow")}
        title={t(locale, "certs.title")}
        body="Independently audited quality, safety and ethics — documentation packs available with every quotation."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.id} delay={(i % 3) * 0.07}>
            <article className="group relative h-full border border-navy-900/10 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10 dark:border-ivory-50/10 dark:bg-navy-900">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/60 font-display text-lg font-bold text-gold-500">
                ✓
              </div>
              <h3 className="font-display mt-4 text-2xl font-bold">{c.name}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-70">{c.body}</p>
              <p className="mt-4 border-t border-dashed border-gold-400/40 pt-3 text-xs opacity-60">{c.verify}</p>
              <div className="mt-4 flex gap-3 text-xs font-semibold uppercase tracking-wider">
                <a href={`/${locale}/contact`} className="link-gold text-gold-500">
                  Verify
                </a>
                <a href={`/${locale}/contact`} className="link-gold opacity-70 hover:opacity-100">
                  Download certificate
                </a>
              </div>
            </article>
          </Reveal>
        ))}
        <Reveal delay={0.14}>
          <article className="flex h-full flex-col justify-center bg-navy-950 p-7 text-ivory-50">
            <p className="font-display text-4xl font-bold text-gold-300">
              <Counter to={100} suffix="%" />
            </p>
            <p className="mt-2 text-sm uppercase tracking-wider text-ivory-100/70">
              Audit pass rate across 5 schemes, 2021–2026
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ivory-100/70">
              Buyer-nominated auditors welcome. Sedex and BSCI reports shared under NDA before contracting.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
