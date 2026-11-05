import { CATALOG_IMAGES, type CatalogImageKey } from "@/lib/catalog-images"
import { VINTAGE_WINDBREAKERS_SUPPLIERS } from "@/lib/bundle-data/vintage-windbreakers"
import { FOOTBALL_TSHIRTS_SUPPLIERS } from "@/lib/bundle-data/football-tshirts"
import { Y2K_SUPPLIERS } from "@/lib/bundle-data/y2k"
import { OPIUM_SUPPLIERS } from "@/lib/bundle-data/opium"
import { JEANS_SUPPLIERS } from "@/lib/bundle-data/jeans"
import { OLD_MONEY_SUPPLIERS } from "@/lib/bundle-data/old-money"
import { CARHARTT_SUPPLIERS } from "@/lib/bundle-data/carhartt"
import { SPORTSWEAR_SUPPLIERS } from "@/lib/bundle-data/sportswear"
import { RACING_SUPPLIERS } from "@/lib/bundle-data/racing"

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
  /** Small, limited-time drop */
  miniBundle?: boolean
  /** Show a limited-time tag */
  limited?: boolean
  /** Not yet purchasable — shows "Coming Soon" and blocks checkout */
  comingSoon?: boolean
  /** ISO date string of last supplier list update — shows "Updated" badge */
  updatedAt?: string
}

const AGENT_PLATFORMS = ["Weidian", "Taobao", "Sugargoo", "Joyabuy"] as const
const VINTAGE_PLATFORMS = ["Fleek", "Syed Vintage", "B2B Wholesale", "Direct"] as const

const VINTAGE_ROUTE_BUNDLES = new Set<CatalogImageKey>([
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
      link: `https://getplugged.store/s/${slug}-${name.toLowerCase().replace(/\s+/g, "-").slice(0, 24)}`,
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
  opts?: {
    featured?: boolean
    gallery?: string[]
    miniBundle?: boolean
    limited?: boolean
    comingSoon?: boolean
    price?: number
  },
): Product {
  const imgs = CATALOG_IMAGES[id]
  return {
    id,
    tag,
    name,
    description,
    aesthetic,
    price: opts?.price ?? 20,
    image: imgs.cover,
    gallery: opts?.gallery ?? [...imgs.gallery],
    perks,
    included,
    suppliers: suppliers(id, supplierEntries),
    featured: opts?.featured,
    miniBundle: opts?.miniBundle,
    limited: opts?.limited,
    comingSoon: opts?.comingSoon,
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
  opts?: {
    featured?: boolean
    gallery?: string[]
    miniBundle?: boolean
    limited?: boolean
    comingSoon?: boolean
    price?: number
    updatedAt?: string
  },
): Product {
  const imgs = CATALOG_IMAGES[id]
  return {
    id,
    tag,
    name,
    description,
    aesthetic,
    price: opts?.price ?? 20,
    image: imgs.cover,
    gallery: opts?.gallery ?? [...imgs.gallery],
    perks,
    included,
    suppliers: customSuppliers,
    featured: opts?.featured,
    miniBundle: opts?.miniBundle,
    limited: opts?.limited,
    comingSoon: opts?.comingSoon,
    updatedAt: opts?.updatedAt,
  }
}

export const PRODUCTS: Product[] = [
  bundleWithSuppliers(
    "opium",
    "Opium",
    "Opium Archive Bundle",
    "2,400+ dark-core sources — Rick Owens, Balenciaga, Chrome Hearts & Vetements via agent. The plug others keep private.",
    "Pure opium-era darkness, sourced from 1:1 Chinese suppliers — NOT authentic originals. Curated Rick Owens, Balenciaga, Vetements & Chrome Hearts 1:1 supplier links via the Joyagoo agent, plus a downloadable 2,400+ source archive. Dead link? Just image-search the model's photo to find a live equivalent.",
    [
      "2,400+ verified sources — one download",
      "No Telegram DMs. No waiting. Instant.",
      "Dead link? Replaced within 24h, guaranteed",
    ],
    [
      "Downloadable 2,400+ source & product archive",
      "15 curated 1:1 supplier product links (Joyagoo)",
      "5 specialist Taobao/Weidian sellers",
      "Image-search sourcing fallback",
      "Agent, QC & tax-free shipping guidance",
      "Lifetime updates",
    ],
    OPIUM_SUPPLIERS,
    {
      featured: true,
      price: 10,
      updatedAt: "2026-11-02",
      gallery: [
        "/catalog/opium/cover.webp",
        "/catalog/opium/look-1.webp",
        "/catalog/opium/look-2.webp",
      ],
    },
  ),
  bundleWithSuppliers(
    "y2k",
    "Y2K",
    "Y2K Supplier Bundle",
    "The wholesale rolodex every Y2K reseller needs — Harley tees, low-rise denim & baby tees. 12 packages, direct links, no gatekeeping.",
    "The full Y2K rolodex — low-rise denim, Harley graphics, baby tees and mix boxes from real wholesale suppliers with MOQs, grade breakdowns, EU/UK duty-free shipping notes and direct Shopify + Fleek links.",
    [
      "12 real wholesale packages — ready to order",
      "EU duty-free shipping on most sources",
      "Grade & MOQ breakdowns, zero guesswork",
    ],
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
      price: 12,
      updatedAt: "2026-11-01",
      gallery: [
        "/catalog/y2k/cover.webp",
        "/catalog/y2k/tshirts.webp",
        "/catalog/y2k/jeans.webp",
      ],
    },
  ),
  bundleWithSuppliers(
    "old-money",
    "Old Money",
    "Old Money Premium Brands",
    "Ralph Lauren, Lacoste, Tommy & Burberry wholesale — 22 hand-picked packages. Quiet luxury, loud margins.",
    "Clean silhouettes and quiet-luxury staples from established premium brands (Ralph Lauren, Lacoste, Tommy Hilfiger, Burberry) — 22 manually filtered wholesale links organised by category, with grades, EU/UK/US shipping & customs notes, supplier contacts and reseller tips.",
    [
      "22 premium-brand packages, 4 categories",
      "Ralph Lauren · Lacoste · Tommy · Burberry",
      "Shipping & customs notes — EU, UK & US",
    ],
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
      price: 15,
      updatedAt: "2026-11-01",
      gallery: [
        "/catalog/old-money/cover.webp",
        "/catalog/old-money/gallery-1.webp",
        "/catalog/old-money/gallery-2.webp",
      ],
    },
  ),
  bundleWithSuppliers(
    "football-tshirts",
    "Football Tees",
    "Vintage & Football T-Shirts",
    "10 wholesale packages of vintage football shirts & branded tees — Nike, Adidas, jerseys. Per-piece pricing, no bulk guessing.",
    "Vintage football shirts, branded sport tees and jersey lots — 10 real wholesale packages with grade breakdowns, per-piece costs, EU/UK shipping & customs notes, supplier contacts and direct Shopify + Fleek links.",
    [
      "10 vetted packages — football, Nike, Adidas",
      "Per-piece pricing so you know your margins",
      "By-the-kilo & buyer-protection routes",
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
      price: 10,
      updatedAt: "2026-11-01",
      gallery: [
        "/catalog/football-tshirts/cover.webp",
        "/catalog/football-tshirts/tshirts.webp",
        "/catalog/football-tshirts/jerseys.webp",
      ],
    },
  ),
  bundleWithSuppliers(
    "carhartt",
    "Carhartt",
    "Carhartt & Dickies Workwear Bundle",
    "14 Carhartt & Dickies wholesale packages — Detroit jackets, double-knee pants, heavy hoodies. The workwear plug streetwear resellers need.",
    "The workwear rolodex built for the streetwear & skater audience — Carhartt Detroit jackets, double-knee pants, Carhartt & Dickies hoodies and graphic tees. 14 vetted wholesale packages across the UK, EU and US with grade breakdowns, MOQs, EU/UK/US customs notes and direct Shopify + Fleek links.",
    [
      "14 packages — Detroit jackets to Dickies tees",
      "Grade A/B + distressed Grade-B flip tips",
      "EU · UK · US sources, customs notes included",
    ],
    [
      "14 vetted Carhartt & Dickies packages",
      "Direct Shopify, Fleek & B2B product links",
      "Grade A/B & distressed Grade-B breakdowns",
      "EU vs UK vs US shipping & customs guidance",
      "Detroit jacket & double-knee resale tips",
      "Supplier contact directory",
      "Lifetime updates",
    ],
    CARHARTT_SUPPLIERS,
    {
      featured: true,
      price: 12,
      updatedAt: "2026-11-02",
      gallery: [
        "/catalog/carhartt/cover.webp",
        "/catalog/carhartt/gallery-2.webp",
        "/catalog/carhartt/gallery-3.webp",
      ],
    },
  ),
  bundleWithSuppliers(
    "jeans",
    "Jeans",
    "Vintage & Baggy Jeans",
    "Vintage Levi's, Karl Kani & Y2K baggy denim wholesale — 13 packages, 10 suppliers. The denim plug from EU to US.",
    "Vintage Levi's, Lee & Wrangler plus rare Y2K hip-hop baggy denim — 13 real wholesale packages with grade breakdowns, per-piece costs, EU/UK/US shipping & customs notes, supplier contacts and direct Shopify + Fleek links.",
    [
      "13 packages — Levi's, Karl Kani, Ecko & more",
      "Per-piece pricing + Grade-C upcycling routes",
      "EU, UK & US sources with customs guidance",
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
      price: 12,
      updatedAt: "2026-11-03",
      gallery: [
        "/catalog/jeans/flatlay.webp",
        "/catalog/jeans/look-1.webp",
        "/catalog/jeans/look-2.webp",
      ],
    },
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
    { comingSoon: true },
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
    { comingSoon: true },
  ),
  bundleWithSuppliers(
    "vintage-windbreakers",
    "Windbreakers",
    "Vintage Windbreakers",
    "11 wholesale windbreaker packages — 90s colour-block, Nike & Adidas track jackets. Grade A/B lots, direct EU shipping.",
    "90s color-block windbreakers, branded track jackets and vintage outerwear lots — real wholesale packages with grade breakdowns, MOQs and direct Shopify + Fleek links.",
    [
      "11 packages — 90s colour-block to branded Nike",
      "Grade A–C with image-search fallback",
      "Direct EU links — no customs hassle",
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
      price: 12,
      updatedAt: "2026-11-04",
      gallery: [
        "/catalog/vintage-windbreakers/cover.webp",
        "/catalog/vintage-windbreakers/gallery-1.webp",
        "/catalog/vintage-windbreakers/gallery-2.webp",
      ],
    },
  ),
  bundleWithSuppliers(
    "sportswear",
    "Sportswear",
    "Vintage Sportswear — Trackpants, Sweaters & T-Shirts",
    "The easiest Vinted flips on the market — 18 Nike & Adidas vintage packages across 3 categories. Source today, sell this week.",
    "One of the easiest, most profitable niches to flip on Vinted & Depop — baggy retro Nike trackpants, classic center-swoosh sport tees and heavy-weight vintage hoodies & sweaters (Nike & Adidas). 18 real wholesale packages across 3 categories with grade breakdowns, EU/UK/US shipping & customs notes, supplier contacts, direct Shopify + Fleek links and a photo-search China sourcing fallback.",
    [
      "18 packages — trackpants, tees & sweaters",
      "Nike & Adidas only — fastest Vinted sellers",
      "China photo-search fallback for rare finds",
    ],
    [
      "18 vetted Nike & Adidas sportswear packages",
      "3 categories: trackpants, sport tees, sweaters & hoodies",
      "Direct Shopify, Fleek & wholesale links",
      "Grade & EU/UK/US shipping/customs notes per source",
      "Alternative photo-search platforms (China sourcing)",
      "Supplier contact directory",
      "Lifetime updates",
    ],
    SPORTSWEAR_SUPPLIERS,
    {
      price: 15,
      updatedAt: "2026-11-03",
      gallery: [
        "/catalog/sportswear/cover.webp",
        "/catalog/sportswear/gallery-1.webp",
        "/catalog/sportswear/gallery-2.webp",
      ],
    },
  ),
  bundleWithSuppliers(
    "racing",
    "Racing",
    "Racing & Motorsports - Mini Bundle",
    "8 sources for the rarest pieces in vintage — NASCAR, Ferrari & F1 jackets that flip for €100–€300. Limited drop.",
    "One of the most hype, exclusive niches in vintage right now — NASCAR, Ferrari & F1 racing jackets plus graphic auto/moto tees and sweats. A curated MINI BUNDLE of 8 premium packages (Fleek, SP Vintage rework, Best Vintage & Thrift Vintage) with grades, EU/UK/US shipping notes, supplier contacts and resale tips. These pieces are rare and extremely sought-after — a single jacket flips for €100–€300 on Depop/Vinted.",
    [
      "8 sources — NASCAR, Ferrari & F1 jackets",
      "€100–€300 per-jacket flip on Depop/Vinted",
      "Rarest niche in vintage right now",
    ],
    [
      "8 vetted racing jacket, tee & sweat packages",
      "NASCAR, Ferrari & F1 + Harley graphic pieces",
      "Premium “rework” patched-jacket lots (SP Vintage)",
      "Grade & EU/UK/US shipping/customs notes per source",
      "Racing-core selling tips & supplier contacts",
      "Direct Shopify & Fleek links",
      "Lifetime updates",
    ],
    RACING_SUPPLIERS,
    {
      featured: true,
      miniBundle: true,
      limited: true,
      price: 7,
      updatedAt: "2026-11-04",
      gallery: [
        "/catalog/racing/box.webp",
        "/catalog/racing/cover.webp",
        "/catalog/racing/gallery-1.webp",
      ],
    },
  ),
  bundle(
    "ralph-lauren",
    "Ralph Lauren",
    "Ralph Lauren Bundle",
    "Coming soon — a mini bundle of vetted Polo Ralph Lauren wholesale sources: cable-knit jumpers, polos & shirts for easy old-money flips.",
    "A focused mini drop dedicated to Polo Ralph Lauren — cable-knit jumpers, classic polos and oxford shirts from vetted wholesale sources, with grades, shipping notes and reseller tips. Dropping soon.",
    ["Mini bundle · Polo Ralph Lauren", "Cable-knit, polos & shirts", "Old-money flips"],
    [
      "Vetted Polo Ralph Lauren wholesale sources",
      "Cable-knit jumpers, polos & oxford shirts",
      "Grades & EU/UK shipping notes",
      "Old-money reseller tips",
      "Lifetime updates",
    ],
    [
      ["Polo Wholesale EU", "Knitwear", "10 units", 5],
      ["Heritage Polo Supply", "Polos", "12 units", 4],
    ],
    { miniBundle: true, comingSoon: true, price: 12 },
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
    a: "One time. A single low price per bundle (starting at €7) gets you lifetime access plus every future update — no recurring fees.",
  },
  {
    q: "Can I resell the items from these suppliers?",
    a: "That's the whole point. These are wholesale and factory-direct sources built for resellers, with MOQ sheets and margin playbooks included.",
  },
  {
    q: "What if a supplier link is dead or won't open?",
    a: "It happens — suppliers rotate stock and listings expire. Every link opens in a new tab, so first just refresh and retry it once. If it's still down, use the image-search fallback included with each bundle: drop the product photo into the listed platform's search to find a live equivalent in seconds. Stuck on a specific link? Message us via Support with the bundle name and we'll send a working replacement, usually within 24 hours.",
  },
  {
    q: "Are the supplier links safe to click?",
    a: "Yes. Every link opens in a separate, isolated browser tab with strict security attributes (no access back to your session), and points only to the vetted third-party platforms we list — Taobao, Weidian, Shopify, Fleek and similar. We never ask you to install anything.",
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
