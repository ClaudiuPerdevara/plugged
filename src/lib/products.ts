import { CATALOG_IMAGES, type CatalogImageKey } from "@/lib/catalog-images"
import { VINTAGE_WINDBREAKERS_SUPPLIERS } from "@/lib/bundle-data/vintage-windbreakers"
import { FOOTBALL_TSHIRTS_SUPPLIERS } from "@/lib/bundle-data/football-tshirts"
import { Y2K_SUPPLIERS } from "@/lib/bundle-data/y2k"

export type SourcingRoute = "agent" | "vintage"

export type Supplier = {
  name: string
  category: string
  link: string
  moq: string
  quality: number
  platform: string
  searchKeyword: string
  route: SourcingRoute
}

export type Product = {
  id: string
  name: string
  tag: string
  description: string
  aesthetic: string
  price: number
  image: string
  gallery: string[]
  perks: string[]
  included: string[]
  suppliers: Supplier[]
  /** Homepage / hero spotlight */
  featured?: boolean
}

const AGENT_PLATFORMS = ["Weidian", "Taobao", "Sugargoo", "Joyabuy"] as const
const VINTAGE_PLATFORMS = ["Fleek", "Syed Vintage", "B2B Wholesale", "Direct"] as const

const VINTAGE_ROUTE_BUNDLES = new Set<CatalogImageKey>([
  "vintage",
  "vintage-windbreakers",
])

function inferRoute(
  slug: CatalogImageKey,
  category: string,
  name: string,
): SourcingRoute {
  if (VINTAGE_ROUTE_BUNDLES.has(slug)) return "vintage"
  const hay = `${category} ${name}`.toLowerCase()
  if (
    /bale|vintage|wholesale|deadstock|archive|thrift|second/.test(hay)
  ) {
    return "vintage"
  }
  return "agent"
}

function pickPlatform(route: SourcingRoute, index: number): string {
  const pool = route === "vintage" ? VINTAGE_PLATFORMS : AGENT_PLATFORMS
  return pool[index % pool.length]
}

function suppliers(
  slug: CatalogImageKey,
  entries: [string, string, string, number][],
): Supplier[] {
  return entries.map(([name, category, moq, quality], index) => {
    const route = inferRoute(slug, category, name)
    const keywordBase = category.toLowerCase().replace(/\s+/g, "-")
    return {
      name,
      category,
      link: `https://plugged.market/s/${slug}-${name.toLowerCase().replace(/\s+/g, "-").slice(0, 24)}`,
      moq,
      quality,
      platform: pickPlatform(route, index),
      searchKeyword: `${keywordBase}-${slug}`,
      route,
    }
  })
}

function bundle(
  id: CatalogImageKey,
  tag: string,
  name: string,
  description: string,
  aesthetic: string,
  perks: string[],
  included: string[],
  supplierEntries: [string, string, string, number][],
  opts?: { featured?: boolean },
): Product {
  const imgs = CATALOG_IMAGES[id]
  return {
    id,
    tag,
    name,
    description,
    aesthetic,
    price: 20,
    image: imgs.cover,
    gallery: [...imgs.gallery],
    perks,
    included,
    suppliers: suppliers(id, supplierEntries),
    featured: opts?.featured,
  }
}

function bundleWithSuppliers(
  id: CatalogImageKey,
  tag: string,
  name: string,
  description: string,
  aesthetic: string,
  perks: string[],
  included: string[],
  customSuppliers: Supplier[],
  opts?: { featured?: boolean; gallery?: string[] },
): Product {
  const imgs = CATALOG_IMAGES[id]
  return {
    id,
    tag,
    name,
    description,
    aesthetic,
    price: 20,
    image: imgs.cover,
    gallery: opts?.gallery ?? [...imgs.gallery],
    perks,
    included,
    suppliers: customSuppliers,
    featured: opts?.featured,
  }
}

export const PRODUCTS: Product[] = [
  bundle(
    "opium",
    "Opium",
    "Opium Archive Bundle",
    "All-black avant-garde. Distressed leather, layered fits and the ateliers behind the feed.",
    "Pure opium-era darkness — draped silhouettes, washed black layers and underground factories that actually ship. The rolodex behind the most copied aesthetic right now.",
    ["35+ vetted suppliers", "Quality tier ratings", "Lifetime updates"],
    [
      "35+ opium-style suppliers",
      "Distressing & finishing guides",
      "MOQ & lead-time sheets",
      "Quality tier ratings",
      "Lifetime updates",
    ],
    [
      ["Noir Atelier", "Leather", "15 units", 5],
      ["Distressed Lab", "Denim", "40 units", 4],
      ["Layered Studio", "Outerwear", "20 units", 5],
    ],
    { featured: true },
  ),
  bundleWithSuppliers(
    "y2k",
    "Y2K",
    "Y2K Supplier Bundle",
    "12 wholesale Y2K packages from 7 vetted suppliers — Harley tees, low-rise denim, baby tees and mix boxes with direct links and grade breakdowns.",
    "The full Y2K rolodex — low-rise denim, Harley graphics, baby tees and mix boxes from real wholesale suppliers with MOQs, grade breakdowns, EU/UK duty-free shipping notes and direct Shopify + Fleek links.",
    ["12 wholesale packages", "Direct product links", "Grade & MOQ breakdowns"],
    [
      "12 vetted Y2K packages",
      "Direct Shopify & Fleek product links",
      "Grade & MOQ breakdowns per lot",
      "Alternative image-search platforms",
      "Supplier contact directory",
      "Lifetime updates",
    ],
    Y2K_SUPPLIERS,
    {
      featured: true,
      gallery: [
        "/catalog/y2k/cover.png",
        "/catalog/y2k/tshirts.png",
        "/catalog/y2k/jeans.png",
      ],
    },
  ),
  bundle(
    "vintage",
    "Vintage / Bales",
    "Vintage & Second-hand Bales",
    "Thrift bales, archive dealers and bulk vintage sources with real stock and grading sheets.",
    "European and US bale wholesalers plus hand-picked archive dealers — authenticity checks, condition grades and flip-ready margins built in.",
    ["50+ vetted sources", "Bale grading guides", "Lifetime updates"],
    [
      "50+ vintage & bale suppliers",
      "Condition grading sheets",
      "Bulk-buy negotiation scripts",
      "Authenticity verification guides",
      "Lifetime updates",
    ],
    [
      ["Archive Vault EU", "Band Tees", "10 units", 5],
      ["Bale Brokers UK", "Wholesale Bales", "1 bale MOQ", 4],
      ["Faded Goods Co.", "Tops", "60 units", 4],
    ],
    { featured: true },
  ),
  bundle(
    "old-money",
    "Old Money",
    "Old Money & Quiet Luxury",
    "Loro Piana energy without the markup. Knitwear, polos, loafers and quiet-lux factories.",
    "Clean silhouettes, neutral palettes and premium-grade sources for the old-money aesthetic — built for resellers who sell taste, not hype.",
    ["25+ quiet-lux suppliers", "Fabric tier guides", "Lifetime updates"],
    [
      "25+ old-money suppliers",
      "Fabric & stitch quality guides",
      "MOQ breakdowns by category",
      "Margin calculator templates",
      "Lifetime updates",
    ],
    [
      ["Quiet Loom Co.", "Knitwear", "30 units", 5],
      ["Heritage Polo Mfg.", "Tops", "50 units", 4],
      ["Classic Sole House", "Footwear", "12 units", 5],
    ],
    { featured: true },
  ),
  bundleWithSuppliers(
    "football-tshirts",
    "Football Tees",
    "Vintage & Football T-Shirts",
    "10 wholesale football & sports tee packages from 7 vetted suppliers — Nike, Adidas, Carhartt and branded jersey lots with direct links and per-piece pricing.",
    "Vintage football shirts, branded sport tees and jersey lots — real wholesale packages with grade breakdowns, per-piece costs, EU/UK shipping notes and direct Shopify + Fleek links.",
    [
      "10 wholesale packages",
      "Direct product links",
      "Per-piece pricing & grades",
    ],
    [
      "10 vetted football & sport tee packages",
      "Direct Shopify & Fleek product links",
      "Per-piece pricing & grade breakdowns",
      "EU vs UK shipping & customs guidance",
      "By-the-kilo & buyer-protection routes",
      "Lifetime updates",
    ],
    FOOTBALL_TSHIRTS_SUPPLIERS,
    {
      gallery: [
        "/catalog/football-tshirts/cover.png",
        "/catalog/football-tshirts/tshirts.png",
        "/catalog/football-tshirts/jerseys.png",
      ],
    },
  ),
  bundle(
    "gorpcore",
    "Gorpcore",
    "Gorpcore & Outdoor Tech",
    "Shell jackets, Salomon-era trail shoes and tech fleece from outdoor-grade factories.",
    "Functional fashion — Arc'teryx-adjacent shells, trail runners and gorpcore layers from factories that pass waterproof and stitch QC.",
    ["30+ outdoor suppliers", "Tech spec sheets", "Lifetime updates"],
    [
      "30+ gorpcore suppliers",
      "Fabric & waterproof spec sheets",
      "Trail & shell sizing guides",
      "Seasonal drop calendar",
      "Lifetime updates",
    ],
    [
      ["Summit Shell Works", "Outerwear", "20 units", 5],
      ["Trail Sole Factory", "Footwear", "15 units", 4],
      ["Fleece Peak Mfg.", "Midlayers", "40 units", 4],
    ],
  ),
  bundle(
    "workwear-skate",
    "Workwear & Skate",
    "Workwear & Skate Brands",
    "Carhartt-adjacent work jackets, dickies and skate staples from factory-direct sources.",
    "Double knees, canvas cuts and skate-brand adjacent blanks — the workwear/skate crossover every reseller needs in stock.",
    ["35+ workwear sources", "Blank vs branded guides", "Lifetime updates"],
    [
      "35+ workwear & skate suppliers",
      "Blank vs branded sourcing guide",
      "Canvas & duck fabric tiers",
      "Skate shop margin playbooks",
      "Lifetime updates",
    ],
    [
      ["Duck Canvas Co.", "Work Jackets", "30 units", 5],
      ["Skate Blank Supply", "Hoodies & Tees", "50 units", 4],
      ["Hardware Denim Works", "Pants", "25 units", 4],
    ],
  ),
  bundle(
    "minimalist",
    "Minimalist",
    "Minimalist & Essentials",
    "Clean blanks, neutral palettes and everyday staples that move volume on any platform.",
    "Less noise, more margin — premium blank tees, hoodies and essentials from factories built for DTC brands and resellers alike.",
    ["30+ essentials suppliers", "Blank quality tiers", "Lifetime updates"],
    [
      "30+ minimalist suppliers",
      "Blank quality tier breakdown",
      "Colorway & GSM guides",
      "Volume pricing sheets",
      "Lifetime updates",
    ],
    [
      ["Neutral Blank Co.", "Tees & Hoodies", "100 units", 5],
      ["Essential Cut Mfg.", "Basics", "75 units", 4],
      ["Clean Line Studio", "Loungewear", "40 units", 4],
    ],
  ),
  bundle(
    "sneakers-footwear",
    "Sneakers",
    "Sneakers & Footwear",
    "Heat, runners and everyday soles from tier-rated factories resellers trust.",
    "From hyped silhouettes to daily movers — footwear sources with size runs, batch QC standards and shipping playbooks included.",
    ["30+ footwear suppliers", "Batch QC standards", "Lifetime updates"],
    [
      "30+ sneaker & footwear suppliers",
      "Batch QC photo standards",
      "Size-run availability sheets",
      "International shipping playbook",
      "Lifetime updates",
    ],
    [
      ["Premier Sole House", "Sneakers", "8 units", 5],
      ["Runner Batch Co.", "Runners", "12 units", 4],
      ["Daily Tread Mfg.", "Casual", "20 units", 4],
    ],
    { featured: true },
  ),
  bundle(
    "designer",
    "Designer",
    "Bags, Belts & Tech Accessories",
    "Monogram bags, leather belts, phone cases and statement accessories at wholesale tier.",
    "High-tier accessories — bags, belts and tech cases from premium-grade sources with customs guidance and tier ratings.",
    ["30+ accessory suppliers", "Customs guidance", "Lifetime updates"],
    [
      "30+ designer-accessory suppliers",
      "International shipping playbook",
      "Customs & import guidance",
      "Quality-tier ratings",
      "Lifetime updates",
    ],
    [
      ["Monogram Supply", "Bags", "10 units", 5],
      ["Heritage Belt Works", "Belts", "15 units", 4],
      ["Tech Case Factory", "Phone & Tech", "30 units", 4],
    ],
    { featured: true },
  ),
  bundle(
    "uk-drip",
    "UK Drip",
    "UK Drip & Drill Core",
    "Roadman fits, drill-era layers and UK street suppliers that know the culture.",
    "Tracksuits, puffers and road-ready layers — the UK drip rolodex built for resellers serving London, Manchester and the diaspora.",
    ["35+ UK street sources", "Drill fit references", "Lifetime updates"],
    [
      "35+ UK drip suppliers",
      "Drill & roadman fit lookbook",
      "UK sizing & brand comp guide",
      "Bulk tracksuit sourcing",
      "Lifetime updates",
    ],
    [
      ["Road Supply UK", "Tracksuits", "20 units", 5],
      ["North Puffer Co.", "Outerwear", "15 units", 4],
      ["Ends Streetwear Hub", "Layers", "25 units", 4],
    ],
    { featured: true },
  ),
  bundleWithSuppliers(
    "vintage-windbreakers",
    "Windbreakers",
    "Vintage Windbreakers",
    "11 wholesale windbreaker & track jacket packages from 8 vetted suppliers — Nike, Adidas and branded lots with direct links.",
    "90s color-block windbreakers, branded track jackets and vintage outerwear lots — real wholesale packages with grade breakdowns, MOQs and direct Shopify + Fleek links.",
    [
      "11 wholesale packages",
      "Direct product links",
      "Image search platforms",
    ],
    [
      "11 vetted windbreaker packages",
      "Direct Shopify & Fleek product links",
      "Grade A–C quality breakdowns per lot",
      "Alternative image-search platforms",
      "Supplier contact directory",
      "Lifetime updates",
    ],
    VINTAGE_WINDBREAKERS_SUPPLIERS,
    {
      featured: true,
      gallery: [
        "/catalog/vintage-windbreakers/cover.png",
        "/catalog/vintage-windbreakers/gallery-1.png",
        "/catalog/vintage-windbreakers/gallery-2.png",
      ],
    },
  ),
  bundle(
    "gymwear",
    "Gymwear",
    "Gymwear & Lifting Aesthetics",
    "Stringers, compression and gym-core fits from performance fabric factories.",
    "Gymshark-adjacent cuts, stringers and compression from factories that understand stretch, squat-proof QC and colorfast dyes.",
    ["30+ gymwear suppliers", "Fabric stretch specs", "Lifetime updates"],
    [
      "30+ gymwear suppliers",
      "Stretch & squat-proof QC guide",
      "Compression fabric spec sheets",
      "Influencer collab MOQ tiers",
      "Lifetime updates",
    ],
    [
      ["Flex Fabric Mfg.", "Compression", "40 units", 5],
      ["Iron Stringer Co.", "Stringers & Tanks", "50 units", 4],
      ["Lift Seam Works", "Shorts & Leggings", "35 units", 4],
    ],
  ),
]

export const CATEGORIES = [
  "All",
  ...PRODUCTS.map((p) => p.tag),
] as const

export type Category = (typeof CATEGORIES)[number]

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.featured)

export const OWNED_PRODUCT_IDS = ["y2k", "opium"]

export function getOwnedProducts() {
  return PRODUCTS.filter((p) => OWNED_PRODUCT_IDS.includes(p.id))
}

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id)
}

export type Faq = {
  q: string
  a: string
}

export const FAQS: Faq[] = [
  {
    q: "What exactly do I get when I buy a bundle?",
    a: "Instant, lifetime access to a curated list of vetted suppliers for that aesthetic — direct links, MOQs, pricing sheets and quality ratings. Everything unlocks in your dashboard the second payment clears.",
  },
  {
    q: "Are the suppliers actually vetted?",
    a: "Yes. Every supplier is hand-checked for stock, communication and product quality before it makes the list. We rate each one so you know exactly what you're working with.",
  },
  {
    q: "Is this a one-time payment or a subscription?",
    a: "One time. $20 per bundle gets you lifetime access plus every future update — no recurring fees.",
  },
  {
    q: "Can I resell the items from these suppliers?",
    a: "That's the whole point. These are wholesale and factory-direct sources built for resellers, with MOQ sheets and margin playbooks included.",
  },
  {
    q: "Do you offer refunds?",
    a: "Bundles are digital with immediate access to private supplier data, so all sales are final. If something isn't working, reach out via Support.",
  },
  {
    q: "How do I get help?",
    a: "Use the Support page to send us a message, or email plugged.support@gmail.com. We typically reply within 24 hours.",
  },
]

export { CATALOG_IMAGES }
