import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hadloom.example"),
  title: {
    default: "Hadloom — Premium Home Textile Manufacturer & Global Exporter",
    template: "%s | Hadloom",
  },
  description:
    "Export-grade mink blankets, hand-tufted rugs and premium carpets. 1.2M+ units a year from a 150,000 sq ft facility to 40+ countries. ISO 9001 · OEKO-TEX · SEDEX · BSCI · GOTS.",
  keywords: [
    "Home Textile Manufacturer",
    "Global Textile Exporter",
    "Mink Blanket Manufacturer",
    "Hand-Tufted Rug Exporter",
    "Premium Carpet Manufacturer",
    "Textile Export Company India",
  ],
  openGraph: {
    type: "website",
    siteName: "Hadloom",
    title: "Hadloom — Premium Home Textile Manufacturing at Global Scale",
    description:
      "Mink blankets, hand-tufted rugs and premium carpets engineered for export to 40+ countries.",
  },
  twitter: { card: "summary_large_image", title: "Hadloom — Global Home Textile Exporter" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Hadloom Home Textiles",
              description: "Premium home textile manufacturer and global exporter.",
              areaServed: "Worldwide",
              numberOfEmployees: 900,
              foundingDate: "1991",
            }),
          }}
        />
      </body>
    </html>
  );
}
