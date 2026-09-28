import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

export const dynamic = "force-static";

const base = "https://www.hadloom.example";
const pages = ["", "/about", "/manufacturing", "/products", "/global-reach", "/certifications", "/buyer-portal", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((l) =>
    pages.map((p) => ({
      url: `${base}/${l}${p}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
  );
}
