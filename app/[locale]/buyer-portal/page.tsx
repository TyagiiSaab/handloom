import type { Metadata } from "next";
import { BuyerPortal } from "@/components/BuyerPortal";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Buyer Portal",
  description: "Secure B2B dashboard — RFQs, catalog downloads, saved products and shipment tracking.",
  robots: { index: false, follow: true },
};

export default async function BuyerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <BuyerPortal locale={locale as Locale} />;
}
