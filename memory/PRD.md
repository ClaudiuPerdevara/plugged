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

## Changes — 28 Jun 2026 (session 5)
- **Opium → rich rep bundle** (`products.ts` → `bundleWithSuppliers`). Data file `src/lib/bundle-data/opium.ts` + vault `opium-vault.tsx` (wired into `vault-bundle.tsx`).
- Vault sections: **REPS-only disclaimer** (Chinese replicas, NOT originals, via Joyagoo agent), **2,400+ sources archive download** (`/public/downloads/Opium_Vendor_List.xlsx`, ~43 MB) with note that dead links → image-search the model photo, 15 curated rep links, 5 specialist sellers, image-search platforms, agent/QC/shipping notes (from `date_produse_opium.md`).
- Gallery = `[cover.png, look-1.png, look-2.png]` (added the 2 Opium outfit flatlays).
- Public included list keeps platform names hidden ("Image-search sourcing fallback").
- Verified: pages 200, gallery 3 imgs, reps + 2,400 text on public page, archive .xlsx downloads (200/43MB), no compile errors.
- ⚠️ The 43 MB .xlsx lives in the repo/public — if Vercel deploy size becomes an issue, move it to object storage and link externally.

## Changes — 30 Jun 2026 (session 11) — Sportswear bundle
- **Replaced `gymwear` ("Gymwear & Lifting Aesthetics")** with new bundle **`sportswear` — "Vintage Sportswear — Trackpants, Sweaters & T-Shirts"** (Nike & Adidas, 18 plugs across 3 categories). All `gymwear` refs removed (products, catalog-images, layout keywords, drops page/catalog, how-it-works).
- **Images**: user-uploaded photos saved to `public/catalog/sportswear/` — `cover.png` (Nike trackpants flatlay, confirmed via analysis), gallery = cover + gallery-1 (sweaters/hoodies) + gallery-2 (tees) + gallery-3 (trackpants pile). 4-image gallery override in `products.ts`.
- **Data**: `src/lib/bundle-data/sportswear.ts` — 3 categories (Trackpants & Joggers ×5, Sport T-Shirts ×6, Sweaters & Hoodies ×7) with supplier/type/grade/shipping/link; `SPORTSWEAR_IMAGE_SEARCH` (Joyagoo/KakoBuy/Superbuy China photo-search) + `SPORTSWEAR_CONTACTS` + `SPORTSWEAR_SUPPLIERS`.
- **Vault**: `src/components/sportswear-vault.tsx` — categorized COMPACT tables (px-3 padding, min-w-[560px], no `#` col, wrapping) so it isn't too wide; includes the 3 China image-search pages + supplier contacts. Wired into `vault-bundle.tsx`.
- ⚠️ COULD NOT RUN E2E (Vercel+Neon, no node_modules in sandbox). Built to match existing bundle patterns; applies on next Vercel deploy.

## Changes — 30 Jun 2026 (session 12) — Sportswear cover + hero
- **Corrected cover**: user wanted the navy/olive/grey Nike trackpants pile (high-res `jjuzewk9`) as the bundle cover → replaced `public/catalog/sportswear/cover.png` (confirmed via analysis). Gallery now [cover, gallery-1 sweaters, gallery-2 tees] (dropped the duplicate gallery-3, which was the same pile image).
- **Hero image**: generated a 16:9 `hero.png` (1264×848) from the cover (Gemini centered the photo on the dark textured surface with dark margins — blends with the slider's dark gradient overlays).
- **Homepage hero slider**: removed `vintage` (Vintage & Second-hand Bales) from `HERO_BUNDLE_IDS` and added `sportswear` in its place (`hero-slider.tsx`). Vintage bales bundle still exists in /drops, just not on the homepage hero.
- ⚠️ COULD NOT RUN E2E (Vercel+Neon, no node_modules). Hero is a centered-on-dark composition, not a seamless outpaint — acceptable on the dark theme; can be regenerated if user wants edge-to-edge.

## Changes — 30 Jun 2026 (session 16) — hero slide effect + mini badge
- **Restored hero slide animation** (`hero-slider.tsx`): image + copy now slide together via `AnimatePresence` (default/sync mode, no `mode="wait"`) with x-spring `slideVariants`, keyed per slide so the title never sticks; added an image-preload effect so a slide-in is never a black frame (keeps both earlier bugs fixed).
- **Removed** the green "⏳ Limited Mini Bundle" tag from the hero (looked bad).
- **Mini bundle styling**: removed the green accent border/ring/glow from product cards; now just a **red corner "Mini" badge** (both default + tile variants).

## Changes — 30 Jun 2026 (session 15) — hero bugs, prices/EUR, UI polish
1. **Hero slider bugs FIXED** (`hero-slider.tsx`): replaced dual `AnimatePresence` (mode="wait"/popLayout) with a crossfade stack — all slides stay mounted (no black "still-loading" first image) and the title/subtitle are a single keyed `motion.div` derived straight from `index` (never sticks on a previous slide, e.g. the "Y2K stuck on all" bug). Swipe kept via transparent drag layer. Added a "⏳ Limited Mini Bundle" tag on limited slides.
2. **Football-tee broken links FIXED** (`football-tshirts.ts`): real Fleek handles 404 without the emoji — Nike → `%F0%9F%92%A5-rv3483-nike-sports-jerseys` (URL-encoded 💥), Adidas → `rv3306-adidas-trikots-tshirts`. Verified both render the product (titles fetched).
3. **Support/Resend**: code is correct (saves ticket, emails via Resend when `SUPPORT_INBOX` set). "saved but couldn't notify" = Resend API returned an error → almost always the onboarding@resend.dev sender can only deliver to the Resend account-owner's email, OR an unverified `RESEND_FROM_EMAIL` domain. Explained both fixes to user (no code change).
4. **Prices + EUR**: per-bundle prices via new `price` opt — opium €10, y2k €12, old-money €15, football €10, carhartt €12, jeans €12, windbreakers €12, sportswear €15, racing €7. Stripe currency `usd→eur`; all `$` price displays → `€` (product-card, cart-drawer, bundle-details, cart-view); FAQ + layout copy updated.
5. **Crisper fonts** (`globals.css`): softened `.text-glow` (removed the 24px white bloom that haloed big headings) + added `-webkit-font-smoothing/optimizeLegibility` on body.
6. **Carousel arrows** (`products-section.tsx`): moved from top-right to left/right edges overlaying the cards, vertically centered, glassy, auto fade-in/out on scroll bounds.
7. **Mini bundles stand out**: hero limited tag + accent ring/glow on limited/mini product cards.
8. **Drops**: coming-soon bundles now sorted to the end (`drops-catalog.tsx`).

⚠️ COULD NOT RUN E2E (Vercel+Neon, no node_modules/DB). Verified statically + link HTTP checks. Applies on next Vercel deploy.

## Changes — 30 Jun 2026 (session 14) — Racing mini-bundle, sitemap, coming-soon, deletions
1. **Jeans gallery**: added new flatlay → `public/catalog/jeans/flatlay.png`, gallery now [cover, flatlay, look-1, look-2].
2. **sitemap.xml**: `src/app/sitemap.ts` (Next native /sitemap.xml; static + live bundle pages, excludes coming-soon). robots.txt references `Sitemap: https://plugged.market/sitemap.xml`. Base = `NEXT_PUBLIC_SITE_URL` env or `https://plugged.market`.
3. **Deleted** `minimalist` & `uk-drip` bundles entirely. **Coming Soon**: `sneakers-footwear` + `designer` now `comingSoon: true` (badge on cards, panel on bundle page, blocked in /api/checkout).
4. **New `racing`** = "Racing & Motorsports - Mini Bundle" (`miniBundle`+`limited`+`featured`): `bundle-data/racing.ts` (8 NASCAR/Ferrari/F1 packages, tips, contacts), `racing-vault.tsx`, images in `public/catalog/racing/` (cover=NASCAR pit-lane landscape confirmed; gallery=Ferrari jackets + tee box; hero=cover). Added to hero slider (replaced sneakers). Product type +`miniBundle`/`limited`/`comingSoon`; product-card shows badges/states.

⚠️ COULD NOT RUN E2E (Vercel+Neon, no node_modules/DB). Verified statically. Applies on next Vercel deploy.

## Changes — 30 Jun 2026 (session 13) — security hardening + UX fixes
**Security findings remediated (3,4,5,6):**
- **F3 (43MB bulk download)**: moved `Opium_Vendor_List.xlsx` out of `/public` → `/private`; new auth+ownership-gated route `src/app/api/vault/opium-archive/route.ts` (only opium owners can stream it). `next.config.mjs` `outputFileTracingIncludes` bundles it on Vercel. `opium.ts` archive link → `/api/vault/opium-archive`.
- **F4 (dead `dangerouslySetInnerHTML`)**: deleted unused `src/components/ui/chart.tsx` (no importers, recharts only used there).
- **F5 (email HTML injection)**: added `escapeHtml()` in `actions.ts`, escape name/email/subject/message in support email.
- **F6 (missing headers)**: `next.config.mjs` now sets CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy (CSP allows Stripe frames + self; intentionally permissive on script-src to not break Next hydration).

**UX/logic fixes:**
- **View Plugs glitch (dashboard)**: `vault-bundle.tsx` expand animation changed from `height: 0→auto` (which mis-measured tall tables → empty space + late/glitchy sibling bundles) to a simple opacity fade in normal flow. Bundles now always stay in place.
- **No double-buy**: `/api/checkout` now filters out bundles the user already owns (`getOwnedBundleIds` added to `purchases.ts`); if all owned → 400 "already own". Bundle page (`bundle/[id]/page.tsx`) fetches ownership and `bundle-details.tsx` shows an "In your vault → View in Vault" panel instead of Add/Buy for owned bundles.
- **Removed "Vintage & Second-hand Bales"** bundle entirely (products.ts entry, catalog-images key, VINTAGE_ROUTE_BUNDLES set). Was already off the hero.

⚠️ COULD NOT RUN E2E (Vercel+Neon, no node_modules/DB in sandbox). Verified statically: no broken refs to vintage/chart/downloads. Applies on next Vercel deploy.
NOTE: Primary AV/EDR block (Finding 1 — replica/counterfeit content) is unchanged per user; still a business decision.

## Backlog / Next
- Await next fixes from user.

## Changes — 30 Jun 2026 (session 10) — checkout fix + audit
- **BUG FIX (cart checkout)**: `cart-drawer.tsx` had `onClick={checkout}`, passing the React MouseEvent into `checkout(override)` → `override.map` threw synchronously (outside try/catch) so the right-side cart drawer's "Secure Checkout" silently did nothing. Fixed to `onClick={() => checkout()}` + made `use-checkout.ts` defensive (`Array.isArray(override) ? override : items`). Cart page (`cart-view.tsx`) already called correctly; Buy Now on bundle page was fine.
- **Apple login**: confirmed fully removed from UI (only Google remains); deleted the leftover no-op `AppleIcon` stub from `brand-icons.tsx`.
- **DEMO_CHECKOUT**: confirmed not referenced anywhere in `src/`. Cleaned stale "DEMO mode" wording in `success/page.tsx` → "VOUCHER mode" (that query path is the 100%-voucher Stripe-bypass redirect).
- **Audit notes (no code change needed)**:
  - Stripe promo codes already enabled via `allow_promotion_codes: true` in `api/checkout/route.ts` (the "Add promotion code" button shows on Stripe's hosted page). User creates coupons + promotion codes in Stripe Dashboard.
  - NOTE: app has TWO separate voucher systems — internal DB voucher (cart "Voucher code" field, `scripts/create-voucher.mjs`, 100% bypasses Stripe) vs Stripe-native promotion codes (entered on Stripe page). A Stripe code typed into the app's cart field will be rejected. Consider removing the in-cart voucher field if going Stripe-only (offered to user).
  - Support email: code path is correct (saves SupportTicket + emails via Resend) but needs Vercel env: `RESEND_API_KEY`, `SUPPORT_INBOX`, `RESEND_FROM_EMAIL` (verified domain). Without a verified Resend domain, only `onboarding@resend.dev` works and can only send to the Resend account owner's address.
  - DB encryption: Neon Postgres = AES-256 at rest + TLS in transit by default; passwords scrypt-hashed by better-auth; Session table is auth source of truth. OK.
  - FAQ / Terms / Privacy reviewed — consistent ($20 lifetime, support email plugged.support@gmail.com, non-refundable, Google-only sign-in). OK.
- **Could NOT run e2e here**: this is a Vercel+Neon Next.js app; sandbox lacks node_modules/Neon DB/env. Checkout fix verified by static analysis. Deploys via Vercel/GitHub.

## Open / awaiting user
- "View Plugs" table "too long" — need to know WHICH bundle's table to fix precisely.
- Confirm whether to remove the in-cart voucher field (Stripe-only codes).

## Changes — 29 Jun 2026 (session 9)
- **Jeans bundle photo = hero image**: copied the outpainted 16:9 hero to `jeans/cover.png` so the card + gallery main image is now the nice wide shot (gallery = hero + look-1 + look-2).
- **Descriptions refined** (jeans→13 pkgs, football, old-money) to state precisely what's offered + that supplier contacts / shipping & customs notes are included.
- **View Plugs supplier data**: added `contact` to football & jeans supplier notes (rendered in cards); added a full **Supplier & Shipping Notes** section to the Old Money vault (region · best-for · shipping · contact, from the .md).
- **Old Money lone Trousers fixed**: merged the single trousers item into "Shirts" → renamed **"Shirts & Trousers"** (now 3 balanced categories, no ugly 1-item category).
- Jeans `.md` 13th link already added earlier.
- Verified: routes 200, jeans 13 plugs + cover=hero (2MB), old-money 3 categories, no compile errors.

## Backlog / Next
- Await next fixes/errors from user.

## Changes — 29 Jun 2026 (session 8)
- **Old Money fully built** from `date_produse_old_money.md`: converted to `bundleWithSuppliers` (22 plugs). New data file `src/lib/bundle-data/old-money.ts` (4 categories: Reseller Boxes, Polos/Knitwear, Shirts, Trousers) + categorized vault `old-money-vault.tsx` (each category = its own section/table + selling tips). Wired into `vault-bundle.tsx`.
- **What's Included now names the brands** explicitly: "Brands: Ralph Lauren, Lacoste, Tommy Hilfiger & Burberry" (per user) + category breakdown. Public bundle page verified (DOM): brands line present, "22 vetted plugs", gallery = Amalfi cover + RL polos + Lacoste box.
- **Jeans .md updated**: added 13th link "Y2K Jeans Mix" (Thrift Vintage Fashion) to `jeans.ts`.
- Verified: routes 200, brands line in DOM, old-money 22 plugs, jeans 13, no compile errors.

## Backlog / Next
- Await next fixes/errors from user.

## Changes — 29 Jun 2026 (session 7)
- **Jeans hero corrected**: re-outpainted the user's actual reference (5 baggy jeans on concrete, `i9bu6kwj`) to 16:9 → `/catalog/jeans/hero.png` (margins filled, same jeans).
- **Old Money renamed** "Old Money & Quiet Luxury" → **"Old Money Premium Brands"**. Hero + cover = Amalfi-coast lifestyle image. Gallery = `[cover (Amalfi), gallery-1 (RL polos), gallery-2 (Lacoste/RL box)]`.
- Added `gallery?` override support to the generic `bundle()` helper.
- ⏳ PENDING: categorized "View Plugs" vault for Old Money from its `.md` — the Old Money `.md` did NOT arrive in the uploaded artifacts; asked user to re-upload.

## Backlog / Next
- Build categorized Old Money vault once the `.md` is re-shared.

## Changes — 29 Jun 2026 (session 6)
- **Mobile responsive fix**: added `width=device-width, initial-scale=1` to the `viewport` export in `layout.tsx` (was missing → mobile rendered zoomed). Also fixed a flex `min-width:auto` overflow on `/drops` by adding `w-full min-w-0` to the catalog `<section>` (body was 1280px on a 390px screen → now 390, no horizontal scroll). DOM-verified.
- **Opium reps warning moved to PUBLIC bundle page** (`bundle-details.tsx`, opium only) and removed the duplicate banner from the post-purchase vault.
- **Deleted `workwear-skate`**; created new **`jeans`** bundle ("Vintage & Baggy Jeans") via `bundleWithSuppliers`: data file `src/lib/bundle-data/jeans.ts` (12 packages / 10 suppliers from `date_produse_jeans.md`) + vault `jeans-vault.tsx`. Gallery = `[cover, look-1, look-2]`. Generated 16:9 hero `/catalog/jeans/hero.png`.
- **Hero slideshow reordered**: opium, y2k, **windbreakers (3rd)**, **jeans (4th)**, vintage, sneakers. Verified.
- Verified: routes 200, workwear-skate 404, jeans gallery 3 imgs, opium warning on public page, viewport meta correct, mobile no overflow, hero order correct, no compile errors.
- Vaults (opium/y2k/football/windbreakers) are post-purchase (need auth/DB to view live; verified structurally + compile here).

## Changes — 28 Jun 2026 (session 4)
- **Y2K photo**: outpainted the user's dusk-street digicam reference to 16:9 (`y2k/hero.png` + `cover.png`) — kept the grainy Y2K aesthetic.
- **Y2K full bundle** (`products.ts` → `bundleWithSuppliers`): 12 packages / 7 suppliers from `date_produse_y2k.md`. New post-purchase vault `y2k-vault.tsx` (packages table + image-search platforms + supplier contacts) identical to Windbreakers; data file `src/lib/bundle-data/y2k.ts`. Gallery = `[cover, tshirts.png, jeans.png]` (the two reference photos beside the cover). Wired into `vault-bundle.tsx`.
- **Windbreakers**: gallery reduced to `[cover.png, gallery-1.png, gallery-2.png]` (cover + photos 1 & 2 only).
- **Hid free info**: removed the parenthetical "(KakoBuy, Joyagoo, Superbuy)" from the public `included` lists (windbreakers + y2k) so the agent platform names aren't given away before purchase; they remain inside the paid vault.
- Verified: pages 200, y2k & windbreakers galleries = 3 imgs each, parenthetical count = 0, Y2K hero slide shows new image, no compile errors.

## Changes — 28 Jun 2026 (session 3)
**Bug fixes**
- Cart "empty → added" double-toast bug: `useCheckout()` now accepts `checkout(override?: {id}[])`; `bundle-details.tsx` Buy Now passes the product directly so it no longer reads a stale empty closure → single correct notification (verified).
- Cart persistence: added `STORAGE_KEY = "plugged.cart.v1"` in `cart-provider.tsx` (was referenced but undeclared; silent ReferenceError swallowed by try/catch). Cart now survives reload/navigation (verified: badge persists).

**Dashboard / vault UI — airier & wider**
- `dashboard.tsx`: container `max-w-7xl`→`max-w-[1600px]`, `md:px-10`, grid gap `lg:gap-10 xl:gap-14`, sidebar `240px`→`220px`.
- `vault-bundle.tsx`: card padding `p-5`→`p-6 md:p-7`; generic supplier table rows `py-5`, `px-5`, `min-w-[820px]`.
- `vintage-windbreakers-vault.tsx` & `football-tshirts-vault.tsx`: `min-w-[980px]`, rows `py-5` / header `py-4`, `px-5`; package name + MOQ/sizes/price `whitespace-nowrap`; Brands/Shipping `min-w`/`max-w` so text doesn't crush.
- (Pre-existing, not addressed) strict TS errors in `cart-provider.tsx` (STORAGE_KEY) and UI components.

## Changes — 28 Jun 2026 (session 2)
- **Hero slider** is now driven by an explicit `HERO_BUNDLE_IDS` list: `opium, y2k, vintage, sneakers-footwear, vintage-windbreakers`. Old Money removed from hero (bundle still in catalog); Windbreakers (jackets) added.
- Reverted hero image rendering to clean full-bleed `object-cover` (removed blur backdrop + edge vignette).
- **Outpainted** the two portrait hero images to 16:9 landscape (1264×848) via Gemini image edit, keeping subject/style and naturally extending the margins: `opium/hero.png` (corridor) and `vintage-windbreakers/hero.png` (concrete + jackets). The other hero images were already 1536×1024 landscape.
- Added 4-jersey photo (`football-tshirts/jerseys.png`) to the Vintage & Football T-Shirts gallery (now 3 images: footballer cover, 3-tee, 4-jersey).
- Verified locally: slide 1 H1 "Opium Archive" visible; last slide = "Vintage Windbreakers"; football gallery has 3 images.
