export type ProductCategory = "mink" | "rugs" | "carpets";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  moq: string;
  sizes: string[];
  markets: string[];
  material: string;
  /** local photography in public/images */
  image: string;
  /** hue used to render the generative textile swatch */
  hue: number;
  pattern: "weave" | "emboss" | "print" | "tuft" | "pile";
  description: string;
}

export const categories: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "mink", label: "Mink Blankets" },
  { id: "rugs", label: "Hand-Tufted Rugs" },
  { id: "carpets", label: "Premium Carpets" },
];

export const products: Product[] = [
  {
    id: "mink-royal-emboss",
    image: "/images/mink-royal.jpg",
    name: "Royal Embossed Mink Blanket",
    category: "mink",
    subcategory: "Embossed Blankets",
    moq: "1,000 pcs",
    sizes: ["150×200 cm", "200×230 cm", "220×240 cm"],
    markets: ["USA", "UK", "Germany", "UAE"],
    material: "100% Polyester micro-mink, 420 GSM",
    hue: 36,
    pattern: "emboss",
    description:
      "Deep-embossed luxury mink with a silk-touch finish. Hotel and retail flagship SKU with custom colorways per season.",
  },
  {
    id: "mink-cloud-print",
    image: "/images/mink-cloud.jpg",
    name: "CloudSoft Printed Mink Blanket",
    category: "mink",
    subcategory: "Printed Blankets",
    moq: "1,000 pcs",
    sizes: ["150×200 cm", "200×230 cm"],
    markets: ["USA", "Canada", "Australia", "France"],
    material: "Raschel mink print, 380 GSM",
    hue: 210,
    pattern: "print",
    description:
      "High-definition reactive prints on cloud-soft raschel. 10,000+ design library with buyer-exclusive artwork options.",
  },
  {
    id: "mink-imperial",
    image: "/images/mink-imperial.jpg",
    name: "Imperial Luxury Mink Blanket",
    category: "mink",
    subcategory: "Luxury Mink Blankets",
    moq: "500 pcs",
    sizes: ["200×230 cm", "220×240 cm"],
    markets: ["UK", "Germany", "Japan", "UAE"],
    material: "Double-layer mink, 520 GSM",
    hue: 350,
    pattern: "weave",
    description:
      "Our heaviest double-layer construction with whipped-stitch edge. Positioned for premium retail and gifting programs.",
  },
  {
    id: "mink-hotel",
    image: "/images/mink-hotel.jpg",
    name: "Hotel Signature Blanket",
    category: "mink",
    subcategory: "Hotel Collections",
    moq: "2,000 pcs",
    sizes: ["170×210 cm", "200×230 cm"],
    markets: ["UAE", "USA", "France", "Middle East"],
    material: "Flame-retardant mink, 400 GSM",
    hue: 220,
    pattern: "weave",
    description:
      "Hospitality-spec blanket meeting commercial laundering and FR requirements. White-label programs available.",
  },
  {
    id: "rug-atlas",
    image: "/images/rug-atlas.jpg",
    name: "Atlas Contemporary Rug",
    category: "rugs",
    subcategory: "Contemporary Rugs",
    moq: "200 pcs",
    sizes: ["170×240 cm", "200×300 cm", "250×350 cm"],
    markets: ["USA", "UK", "Germany", "Australia"],
    material: "100% New Zealand wool, hand-tufted",
    hue: 160,
    pattern: "tuft",
    description:
      "Hand-tufted wool rug with carved detailing. GoodWeave-aligned production with full chain-of-custody documentation.",
  },
  {
    id: "rug-maison",
    image: "/images/rug-maison.jpg",
    name: "Maison Designer Rug",
    category: "rugs",
    subcategory: "Designer Collections",
    moq: "100 pcs",
    sizes: ["200×300 cm", "300×400 cm"],
    markets: ["France", "UK", "Japan", "UAE"],
    material: "Wool–viscose blend, hand-tufted",
    hue: 280,
    pattern: "tuft",
    description:
      "Designer collaboration pieces with silk-sheen viscose accents. Low-volume, high-value program for concept stores.",
  },
  {
    id: "rug-lobby",
    image: "/images/rug-lobby.jpg",
    name: "Lobby Hospitality Rug",
    category: "rugs",
    subcategory: "Hospitality Rugs",
    moq: "300 pcs",
    sizes: ["Custom runners & area sizes"],
    markets: ["UAE", "USA", "Middle East", "Europe"],
    material: "Solution-dyed nylon, hand-tufted",
    hue: 200,
    pattern: "pile",
    description:
      "Contract-grade stain-resistant rugs for lobbies and corridors. Custom sizes with fire-rating certification.",
  },
  {
    id: "carpet-regal",
    image: "/images/carpet-regal.jpg",
    name: "Regal Residential Carpet",
    category: "carpets",
    subcategory: "Residential Carpets",
    moq: "500 rolls",
    sizes: ["4 m broadloom", "Custom cuts"],
    markets: ["USA", "Canada", "UK", "Australia"],
    material: "PP heat-set twist, Jute backing",
    hue: 30,
    pattern: "pile",
    description:
      "Soft-touch broadloom for residential roll-out programs. 40+ in-stock colorways with sample-folder support.",
  },
  {
    id: "carpet-contract",
    image: "/images/carpet-contract.jpg",
    name: "Contract Commercial Carpet",
    category: "carpets",
    subcategory: "Commercial Carpets",
    moq: "1,000 sqm",
    sizes: ["Tiles 50×50 cm", "Broadloom"],
    markets: ["Germany", "France", "UAE", "Europe"],
    material: "Solution-dyed nylon 6, bitumen backing",
    hue: 215,
    pattern: "weave",
    description:
      "Heavy-traffic carpet tiles for offices and retail. 10-year wear warranty with installation guidelines.",
  },
  {
    id: "carpet-suite",
    image: "/images/carpet-suite.jpg",
    name: "Suite Hospitality Carpet",
    category: "carpets",
    subcategory: "Hospitality Carpets",
    moq: "1,000 sqm",
    sizes: ["Custom broadloom"],
    markets: ["UAE", "USA", "Japan", "Middle East"],
    material: "Wool-nylon axminster-style weave",
    hue: 45,
    pattern: "weave",
    description:
      "Bespoke guestroom and banquet carpeting with acoustic underlay options. Design studio support included.",
  },
];

export const exportMarkets = [
  { country: "USA", volume: "320,000", items: ["Carpets", "Rugs", "Blankets"], x: 22, y: 38 },
  { country: "Canada", volume: "95,000", items: ["Blankets", "Carpets"], x: 20, y: 26 },
  { country: "United Kingdom", volume: "140,000", items: ["Rugs", "Blankets", "Carpets"], x: 47, y: 28 },
  { country: "Germany", volume: "125,000", items: ["Carpets", "Rugs"], x: 51, y: 30 },
  { country: "France", volume: "98,000", items: ["Rugs", "Blankets"], x: 48, y: 33 },
  { country: "UAE", volume: "180,000", items: ["Blankets", "Hospitality Rugs", "Carpets"], x: 60, y: 46 },
  { country: "Australia", volume: "76,000", items: ["Blankets", "Carpets"], x: 82, y: 68 },
  { country: "Japan", volume: "64,000", items: ["Rugs", "Blankets"], x: 85, y: 38 },
  { country: "Middle East", volume: "150,000", items: ["Hospitality Carpets", "Blankets"], x: 58, y: 50 },
  { country: "Europe", volume: "210,000", items: ["Carpets", "Rugs", "Blankets"], x: 52, y: 26 },
];

export const certifications = [
  {
    id: "iso9001",
    name: "ISO 9001:2015",
    body: "Quality management systems — audited annually across all production lines.",
    verify: "Certificate No. QMS-2019-88410 · Valid through 2027",
  },
  {
    id: "oekotex",
    name: "OEKO-TEX® Standard 100",
    body: "Every component tested free from harmful substances. Product Class I–IV coverage.",
    verify: "Certificate No. OEK-22-IND-4410 · Hohenstein listed",
  },
  {
    id: "sedex",
    name: "SEDEX SMETA",
    body: "4-pillar ethical audit covering labor, health & safety, environment and business ethics.",
    verify: "Site ID ZS-1048821 · Audited 2025",
  },
  {
    id: "bsci",
    name: "amfori BSCI",
    body: "Social compliance across the full supply chain with continuous improvement tracking.",
    verify: "DBID 396210 · Rating B",
  },
  {
    id: "gots",
    name: "GOTS Organic",
    body: "Global Organic Textile Standard certification for the organic cotton program.",
    verify: "Scope Certificate GOTS-ORG-2291",
  },
];
