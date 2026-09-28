import type { Metadata } from "next";
import { Certifications } from "@/components/Certifications";
import { Sustainability } from "@/components/Sustainability";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Certifications & Sustainability",
  description: "ISO 9001, OEKO-TEX, SEDEX, BSCI and GOTS certified manufacturing with verified ESG metrics.",
};

export default async function CertsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  return (
    <>
      <Certifications locale={l} />
      <Sustainability locale={l} />
    </>
  );
}
