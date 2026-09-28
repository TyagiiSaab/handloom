import type { Metadata } from "next";
import { GlobalMap } from "@/components/GlobalMap";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Global Reach",
  description: "Exporting carpets, rugs and blankets to the USA, UK, Germany, France, UAE, Australia, Japan and 30+ more markets.",
};

export default async function GlobalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <GlobalMap locale={locale as Locale} />;
}
