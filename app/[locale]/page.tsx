import type { Metadata } from "next";
import Link from "next/link";
import { BuyerPortal } from "@/components/BuyerPortal";
import { Catalog } from "@/components/Catalog";
import { Certifications } from "@/components/Certifications";
import { Facility } from "@/components/Facility";
import { GlobalMap } from "@/components/GlobalMap";
import { Heritage } from "@/components/Heritage";
import { Hero } from "@/components/Hero";
import { CatalogDownload, ContactSection } from "@/components/LeadForms";
import { Sustainability } from "@/components/Sustainability";
import { Testimonials } from "@/components/Testimonials";
import { Reveal } from "@/components/ui";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Hadloom — Premium Home Textile Manufacturer & Global Exporter",
  description:
    "Export-grade mink blankets, hand-tufted rugs and premium carpets from a 150,000 sq ft facility to 40+ countries.",
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const base = `/${l}`;

  return (
    <>
      <Hero locale={l} />
      <Heritage locale={l} />
      <Catalog locale={l} limit={6} />
      <Reveal className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border border-gold-400/40 bg-navy-950 p-6 text-ivory-50">
          <p className="font-display text-xl sm:text-2xl">
            Need the full 120-page export catalog with tiered pricing?
          </p>
          <Link
            href={`${base}/contact#catalog`}
            className="rounded-lg bg-gold-400 px-6 py-3 text-xs font-bold uppercase tracking-wider text-navy-950 hover:bg-gold-300"
          >
            Request pricing
          </Link>
        </div>
      </Reveal>
      <Facility locale={l} />
      <GlobalMap locale={l} />
      <Certifications locale={l} />
      <Sustainability locale={l} />
      <Testimonials locale={l} />
      <CatalogDownload locale={l} />
      <BuyerPortal locale={l} />
      <ContactSection locale={l} />
    </>
  );
}
