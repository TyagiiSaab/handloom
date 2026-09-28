import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { SectionHeading } from "@/components/ui";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Product Collections",
  description: "Mink blankets, hand-tufted rugs and premium carpets — MOQs, sizes, materials and export markets.",
};

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow="Export Collections"
          title="Products engineered for world markets"
          body="Every SKU ships with spec sheets, packaging options and compliance documentation."
        />
      </div>
      <Catalog locale={l} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: ["Mink Blankets", "Hand-Tufted Rugs", "Premium Carpets"].map((name, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: { "@type": "Product", name },
            })),
          }),
        }}
      />
    </>
  );
}
