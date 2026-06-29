import { CATALOG_IMAGES, type CatalogImageKey } from "@/lib/catalog-images"
import { VINTAGE_WINDBREAKERS_SUPPLIERS } from "@/lib/bundle-data/vintage-windbreakers"
import { FOOTBALL_TSHIRTS_SUPPLIERS } from "@/lib/bundle-data/football-tshirts"
import { Y2K_SUPPLIERS } from "@/lib/bundle-data/y2k"
import { OPIUM_SUPPLIERS } from "@/lib/bundle-data/opium"
import { JEANS_SUPPLIERS } from "@/lib/bundle-data/jeans"
import { OLD_MONEY_SUPPLIERS } from "@/lib/bundle-data/old-money"

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
  bundleWithSuppliers(
    "opium",
    "Opium",
    "Opium Archive Bundle",
    "Chinese REPS only — not originals. Rick Owens, Balenciaga, Chrome Hearts & Vetements via Taobao/Weidian agents, plus a 2,400+ source archive.",
    "Pure opium-era darkness, sourced as Chinese reps (replicas) — NOT authentic originals. Curated Rick Owens, Balenciaga, Vetements & Chrome Hearts rep links via the Joyagoo agent, plus a downloadable 2,400+ source archive. Dead link? Just image-search the model's photo to find a live equivalent.",
    [
      "2,400+ sources archive (.xlsx)",
      "15 curated rep links",
      "Image-search fallback",
    ],
    [
      "Downloadable 2,400+ source & product archive",
      "15 curated rep product links (Joyagoo)",
      "5 specialist Taobao/Weidian sellers",
      "Image-search sourcing fallback",
      "Agent, QC & tax-free shipping guidance",
      "Lifetime updates",
    ],
    OPIUM_SUPPLIERS,
    {
      featured: true,
      gallery: [
        "/catalog/opium/cover.png",
        "/catalog/opium/look-1.png",
        "/catalog/opium/look-2.png",
      ],
    },
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
  bundleWithSuppliers(
    "old-money",
    "Old Money",
    "Old Money Premium Brands",
    "Ralph Lauren, Lacoste, Tommy & Burberry — hand-picked premium wholesale packages across boxes, polos, knitwear, shirts & trousers.",
    "Clean silhouettes and quiet-luxury staples from established premium brands (Ralph Lauren, Lacoste, Tommy Hilfiger, Burberry) — manually filtered wholesale links organised by category, with grades, EU/UK/US shipping notes and reseller tips.",
    ["22 plugs across 4 categories", "Premium brands only", "Reseller tips"],
    [
      "Brands: Ralph Lauren, Lacoste, Tommy Hilfiger & Burberry",
      "22 hand-picked premium-brand packages",
      "Organised by category (boxes, polos, shirts, trousers)",
      "Direct Shopify, Fleek & wholesale links",
      "Grade & shipping/customs notes per source",
      "Old-money reseller & care tips",
      "Lifetime updates",
    ],
    OLD_MONEY_SUPPLIERS,
    {
      featured: true,
      gallery: [
        "/catalog/old-money/cover.png",
        "/catalog/old-money/gallery-1.png",
        "/catalog/old-money/gallery-2.png",
      ],
    },
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
  bundleWithSuppliers(
    "jeans",
    "Jeans",
    "Vintage & Baggy Jeans",
    "12 wholesale denim packages from 10 suppliers — vintage Levi's/Lee/Wrangler and Y2K hip-hop baggy jeans (Southpole, Ecko, Karl Kani) with direct links and per-piece pricing.",
    "Vintage Levi's, Lee & Wrangler plus rare Y2K hip-hop baggy denim — real wholesale packages with grade breakdowns, per-piece costs, EU/UK/US shipping & customs notes and direct Shopify + Fleek links.",
    [
      "12 wholesale packages",
      "Direct product links",
      "Per-piece pricing & grades",
    ],
    [
      "12 vetted vintage & baggy denim packages",
      "Direct Shopify, Fleek & B2B product links",
      "Per-piece pricing & grade breakdowns",
      "EU vs UK vs US shipping & customs guidance",
      "By-the-kilo & Grade-C upcycling routes",
      "Lifetime updates",
    ],
    JEANS_SUPPLIERS,
    {
      gallery: [
        "/catalog/jeans/cover.png",
        "/catalog/jeans/look-1.png",
        "/catalog/jeans/look-2.png",
      ],
    },
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
