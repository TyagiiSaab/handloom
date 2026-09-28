import type { Metadata } from "next";
import { Heritage } from "@/components/Heritage";
import { Facility } from "@/components/Facility";
import { SectionHeading } from "@/components/ui";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About & Manufacturing",
  description: "35+ years of weaving heritage and a 150,000 sq ft automated export facility.",
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow="Our story"
          title="Heritage craftsmanship, industrial discipline"
          body="From a two-loom weaving house to a 1.2M-unit export operation serving 40+ countries."
        />
      </div>
      <div className="mt-8">
        <Heritage locale={l} />
      </div>
    </>
  );
}
