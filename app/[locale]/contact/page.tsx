import type { Metadata } from "next";
import { CatalogDownload, ContactSection } from "@/components/LeadForms";
import { Testimonials } from "@/components/Testimonials";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Contact & Export Inquiry",
  description: "Request the export catalog or submit an RFQ — quotation in 48 hours, WhatsApp Business available.",
};

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  return (
    <>
      <ContactSection locale={l} />
      <CatalogDownload locale={l} />
      <Testimonials locale={l} />
    </>
  );
}
