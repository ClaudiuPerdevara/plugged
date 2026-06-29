import type { Supplier } from "@/lib/products"

export type CarharttPackage = {
  id: number
  name: string
  supplier: string
  sellType: string
  grade: string
  shipping: string
  link: string
}

export type CarharttCategory = {
  title: string
  description: string
  packages: CarharttPackage[]
}

/** 14 hand-picked Carhartt & Dickies workwear packages, grouped by garment type. Updated 29 Jun 2026. */
export const CARHARTT_CATEGORIES: CarharttCategory[] = [
  {
    title: "Jackets",
    description:
      "Detroit jackets, chore coats and hooded actives — the workwear pieces with the highest resale margin.",
    packages: [
      {
        id: 1,
        name: "Carhartt Jackets (10 Pcs)",
        supplier: "Fox Vintage",
        sellType: "10x pack",
        grade: "Grade A/B",
        shipping: "Ships from UK · watch EU customs & VAT",
        link: "https://www.foxvintagewholesale.co.uk/product-page/carhartt-jackets-10pcs",
      },
    ],
  },
  {
    title: "Hoodies & Sweatshirts",
    description:
      "Heavy-weight hoodies and crewnecks — the staple resale piece for the streetwear & skater audience.",
    packages: [
      {
        id: 2,
        name: "Carhartt Hoodies & Sweats",
        supplier: "Fox Vintage",
        sellType: "50x bale",
        grade: "Grade A/B",
        shipping: "Ships from UK · watch EU customs & VAT",
        link: "https://www.foxvintagewholesale.co.uk/product-page/carhartt-hoodies-sweatshirts-full-bale-50-pcs",
      },
      {
        id: 3,
        name: "Carhartt Hoodies",
        supplier: "Fleek",
        sellType: "Pack",
        grade: "Mix",
        shipping: "Shipping included! · 20–27 days",
        link: "https://www.joinfleek.com/products/carhartt-hoodies-103",
      },
      {
        id: 4,
        name: "Carhartt & Dickies Sweats",
        supplier: "Vintage Wh. Supply",
        sellType: "Pack",
        grade: "Grade A/B",
        shipping: "Ships from UK · watch EU customs & VAT",
        link: "https://vintagewholesalesupplyltd.com/en-eu/products/carharttdickiessweatshirts?_pos=2&_sid=ee1a36c96&_ss=r",
      },
    ],
  },
  {
    title: "T-Shirts & Button-Ups",
    description:
      "Pocket tees, Dickies graphics and Carhartt button-up shirts — fast-moving volume pieces.",
    packages: [
      {
        id: 5,
        name: "Carhartt T-Shirts (100 Pcs)",
        supplier: "Fox Vintage",
        sellType: "100x bale",
        grade: "Grade A/B",
        shipping: "Ships from UK · watch EU customs & VAT",
        link: "https://www.foxvintagewholesale.co.uk/product-page/carhartt-t-shirt-full-bale-100-pcs",
      },
      {
        id: 6,
        name: "Carhartt Button Up Shirts",
        supplier: "Fleek",
        sellType: "Pack",
        grade: "Mix",
        shipping: "Shipping included! · 20–27 days",
        link: "https://www.joinfleek.com/products/carhatt-button-up-shirts",
      },
      {
        id: 7,
        name: "Carhartt & Dickies T-Shirts",
        supplier: "Vintage Supply EU",
        sellType: "Pack",
        grade: "Mix",
        shipping: "Ships from Netherlands (EU) · no RO customs",
        link: "https://vintagesupplyeurope.com/en/products/carhartt-dickies-t-shirts?_pos=15&_sid=7da0ace05&_ss=r",
      },
      {
        id: 8,
        name: "Carhartt T-Shirts & Shirts",
        supplier: "Vintage Supply EU",
        sellType: "Pack",
        grade: "Mix",
        shipping: "Ships from Netherlands (EU) · no RO customs",
        link: "https://vintagesupplyeurope.com/en/products/carhartt-t-shirts-shirts?_pos=17&_sid=7da0ace05&_ss=r",
      },
    ],
  },
  {
    title: "Pants & Jeans",
    description:
      "Double-knee work pants, carpenter jeans and the Grade-B distressed lots that resell at premium prices.",
    packages: [
      {
        id: 9,
        name: "Carhartt Trousers (50 Pcs)",
        supplier: "Fox Vintage",
        sellType: "50x bale",
        grade: "Grade A/B",
        shipping: "Ships from UK · watch EU customs & VAT",
        link: "https://www.foxvintagewholesale.co.uk/product-page/carhartt-trousers-full-bale-50-pcs",
      },
      {
        id: 10,
        name: "Carhartt Pants (100 Pcs)",
        supplier: "Fox Vintage",
        sellType: "100x bale",
        grade: "Grade B",
        shipping: "Ships from UK · watch EU customs & VAT",
        link: "https://www.foxvintagewholesale.co.uk/product-page/carhartt-pants-grade-b-full-bale-100-pcs",
      },
      {
        id: 11,
        name: "Carhartt & Dickies Jeans",
        supplier: "Fleek",
        sellType: "Pack",
        grade: "Mix",
        shipping: "Shipping included! · 20–27 days",
        link: "https://www.joinfleek.com/products/carharrt-dickies-jeans",
      },
    ],
  },
  {
    title: "Mixes & Bundles",
    description:
      "Pre-mixed Carhartt & Dickies lots — variety boxes and by-the-kilo options for resellers chasing volume.",
    packages: [
      {
        id: 12,
        name: "Carhartt Bundle (Polos / Pants)",
        supplier: "Fleek",
        sellType: "Mix pack",
        grade: "Mix",
        shipping: "Shipping included! · 20–27 days",
        link: "https://www.joinfleek.com/products/carhatt-bundle-polo-round-neck-pants",
      },
      {
        id: 13,
        name: "Carhartt Mix",
        supplier: "Thrift Vintage",
        sellType: "Pack",
        grade: "Mix",
        shipping: "Ships from USA · free over $200 · EU customs apply",
        link: "https://thriftvintagefashion.com/products/w1-carhartt-mix",
      },
      {
        id: 14,
        name: "Carhartt & Dickies Mix",
        supplier: "Vintagism",
        sellType: "Per Kg",
        grade: "Mix",
        shipping: "EU · shipping calculated after order",
        link: "https://vintagism.eu/product/carhartt-dickies-mix/",
      },
    ],
  },
]

export const CARHARTT_TIPS: string[] = [
  "Grade B = goldmine: the Fox Vintage 100-pc pants bale is sold clearly as Grade B (paint stains, distress, heavy wear). The distressed / paint-splatter look is currently in huge demand — stained Carhartt pants often resell higher than clean ones.",
  "Detroit jackets are the money-makers. If you pull short Detroit jackets with a corduroy collar from a mix, authentic ones resell for €100–150+ each.",
  "US-sourced Carhartt comes in oversized cuts (L/XL/XXL relaxed/baggy). Describe these as 'Oversized Fit' for the skater & streetwear audience.",
  "UK shipping = add ~20%. Fox Vintage and Vintage Wh. Supply ship from the UK. Romanian couriers will charge 19% VAT + customs on arrival — factor this into your landed cost.",
]

export type CarharttNote = {
  supplier: string
  region: string
  bestFor: string
  shipping: string
  contact: string
}

export const CARHARTT_NOTES: CarharttNote[] = [
  {
    supplier: "Fox Vintage",
    region: "UK",
    bestFor: "Carhartt jackets, hoodies, tees & pants by the bale",
    shipping: "Watch EU customs + UK VAT (~20%)",
    contact: "foxvintagewholesale.co.uk/contact-us",
  },
  {
    supplier: "Vintage Supply EU",
    region: "Netherlands (EU)",
    bestFor: "Carhartt & Dickies t-shirts and shirts",
    shipping: "No RO customs",
    contact: "vintagesupplyeurope.com/pages/contact",
  },
  {
    supplier: "Vintage Wh. Supply",
    region: "UK",
    bestFor: "Carhartt & Dickies sweats, Grade A/B",
    shipping: "Watch EU customs + UK VAT",
    contact: "IG @vwswholesale · TikTok @vintagewholesalesupply",
  },
  {
    supplier: "Thrift Vintage",
    region: "USA",
    bestFor: "Carhartt mix boxes",
    shipping: "Free shipping over $200 · EU customs apply",
    contact: "thriftvintagefashion.com/pages/contact-us",
  },
  {
    supplier: "Vintagism",
    region: "EU",
    bestFor: "Buying Carhartt & Dickies by the kilo",
    shipping: "Calculated after order",
    contact: "vintagism.eu/contact",
  },
  {
    supplier: "Fleek",
    region: "Global platform",
    bestFor: "Mixed Carhartt packs · shipping included",
    shipping: "Included in price (20–27 days)",
    contact: "Via Fleek platform chat",
  },
]

const ALL_PACKAGES = CARHARTT_CATEGORIES.flatMap((c) => c.packages)

/** Maps every package onto the generic Supplier shape for catalog use. */
export const CARHARTT_SUPPLIERS: Supplier[] = ALL_PACKAGES.map((pkg) => ({
  name: pkg.supplier,
  category: pkg.name,
  link: pkg.link,
  moq: pkg.sellType,
  quality: pkg.grade.includes("A") ? 5 : 4,
  platform: pkg.supplier.includes("Fleek") ? "Fleek" : "Direct",
  searchKeyword: pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  route: "vintage",
}))
