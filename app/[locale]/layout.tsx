import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { isRTL, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}`]));
  return {
    alternates: { canonical: `/${locale}`, languages },
  };
}

const manufacturerSchema = {
  "@context": "https://schema.org",
  "@type": "Manufacturer",
  name: "Hadloom Home Textiles",
  slogan: "Premium Home Textile Manufacturing at Global Scale",
  foundingDate: "1991",
  numberOfEmployees: 900,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Panipat",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;

  return (
    <div lang={l} dir={isRTL(l) ? "rtl" : "ltr"} className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(manufacturerSchema) }}
      />
      <Navbar locale={l} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer locale={l} />
    </div>
  );
}
