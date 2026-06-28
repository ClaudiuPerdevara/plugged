# PLUGGED. — PRD / Change Log

## Product
Next.js (App Router) storefront selling curated underground-fashion **supplier bundles** ($20 lifetime each). Static catalog in `src/lib/products.ts`, Prisma/Postgres for users & purchases, better-auth, Stripe checkout. Deployed on **Vercel**.

## Architecture (key files)
- `src/lib/products.ts` — static bundle catalog (PRODUCTS, FEATURED_PRODUCTS, CATEGORIES).
- `src/lib/catalog-images.ts` — per-bundle image asset map (`public/catalog/{id}/`).
- `src/lib/bundle-data/*.ts` — rich per-bundle supplier datasets (vintage-windbreakers, football-tshirts).
- `src/components/hero-slider.tsx` — homepage hero carousel (featured bundles).
- `src/components/bundle-details.tsx` — public bundle page.
- `src/components/vault-bundle.tsx` — owner vault; routes to dedicated vault components for windbreakers & football-tshirts.

## Changes — 28 Jun 2026 (session 1)
1. **Deleted bundles** completely (catalog + images + routes): `archive-fashion`, `jewelry-hardware`, `bloke-core`. Old `/bundle/{id}` now 404.
2. **New bundle**: `Vintage & Football T-Shirts` (id `football-tshirts`) replacing bloke-core. Keeps the original footballer cover; gallery adds the 3-tee (Nike/Adidas/Carhartt) photo. Data from supplier brief → `src/lib/bundle-data/football-tshirts.ts` (10 packages / 7 suppliers, per-piece pricing, grade, shipping). Vault table via `football-tshirts-vault.tsx`.
3. **Hero images**: portrait 9:16 photos now `object-contain` (fit fully, no crop) over a blurred backdrop of the same image + edge fade-to-black vignette.
4. **Opium photo** replaced with the new leather-jacket model shot (`public/catalog/opium/cover.png` + `hero.png`).
5. **Favicon** set to the PLUGGED logo (`public/icon.png`) via `layout.tsx` metadata. (Tab/browser icon only, per user — not in header. Done in code, no Vercel step needed.)

## Verified
- Local `next dev`: homepage hero renders new Opium photo with fit+fade; H1/CTA visible. `/drops` lists new bundle, deleted ones gone. `/bundle/football-tshirts` 200 with correct gallery + 10 plugs. Deleted bundle routes 404. `/icon.png` 200.
- TS errors present are pre-existing (chart/calendar/auth/cart-provider) and ignored by `next.config.mjs` (`ignoreBuildErrors: true`).

## Backlog / Next
- User said more fixes/errors are coming — await next list.
- (Pre-existing, not addressed) strict TS errors in `cart-provider.tsx` (STORAGE_KEY) and UI components.
