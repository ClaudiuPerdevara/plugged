/**
 * Local AI-generated catalog assets — dark flash editorial style.
 * Files live under public/catalog/{id}/.
 */
function asset(id: string, file: string) {
  return `/catalog/${id}/${file}`
}

function bundleAssets(id: string) {
  const cover = asset(id, "cover.webp")
  return {
    cover,
    hero: asset(id, "hero.webp"),
    gallery: [
      asset(id, "gallery-1.webp"),
      asset(id, "gallery-2.webp"),
      asset(id, "gallery-3.webp"),
    ],
  }
}

export const CATALOG_IMAGES = {
  opium: bundleAssets("opium"),
  y2k: bundleAssets("y2k"),
  "old-money": bundleAssets("old-money"),
  "football-tshirts": bundleAssets("football-tshirts"),
  carhartt: bundleAssets("carhartt"),
  jeans: bundleAssets("jeans"),
  minimalist: bundleAssets("minimalist"),
  "sneakers-footwear": bundleAssets("sneakers-footwear"),
  designer: bundleAssets("designer"),
  "uk-drip": bundleAssets("uk-drip"),
  sportswear: bundleAssets("sportswear"),
  racing: bundleAssets("racing"),
  "vintage-windbreakers": bundleAssets("vintage-windbreakers"),
  "ralph-lauren": bundleAssets("ralph-lauren"),
} as const

export type CatalogImageKey = keyof typeof CATALOG_IMAGES
