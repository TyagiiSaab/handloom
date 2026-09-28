import type { Metadata } from "next";
import { Facility } from "@/components/Facility";
import { SectionHeading } from "@/components/ui";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Manufacturing Facility",
  description: "Inside our 150,000 sq ft integrated textile mill — dyeing, weaving, tufting, QC lab and bonded warehousing.",
};

export default async function ManufacturingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow="Capabilities"
          title="A mill built for export programs"
          body="IoT-monitored looms, low-liquor dyeing, 4-stage AQL inspection and bonded export warehousing."
        />
      </div>
      <div className="mt-8">
        <Facility locale={l} />
      </div>
    </>
  );
}
