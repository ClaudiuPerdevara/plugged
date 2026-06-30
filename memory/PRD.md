# PLUGGED — PRD / Working Notes

## Product
PLUGGED is a Next.js 16 (App Router, React 19, Tailwind v4, Prisma/Postgres,
Better Auth, Stripe) e-commerce site selling curated fashion *supplier bundles*
(Opium, Y2K, Racing, Carhartt, etc.) to young resellers. Deployed on Vercel.

## Environment notes (Emergent preview)
- The app lives at `/app` (NOT /app/frontend or /app/backend).
- Served as a **production build** via supervisor `frontend` program:
  `/app/frontend/package.json` `start` → `cd /app && next start -H 0.0.0.0 -p 3000`.
  Dev mode (`next dev`) does NOT hydrate through the Emergent proxy (HMR websocket
  502), so we run a production build. **After code changes, run `yarn build` then
  `sudo supervisorctl restart frontend`.**
- Preview ingress routes `/api/*` → legacy backend on :8001 (unused, dead) → 502.
  So auth/checkout/dashboard can't be exercised in preview; they work on Vercel.
- `.env.local` holds dummy DB/auth values so the build/SSR boots.

## Session 2026-06-30 — Final polish (DONE, tested 9/9 pass)
1. **Hero slider timer (task 1):** auto-advance every **5s**, timer resets to 0 on
   any manual nav (arrow/dot/swipe). `src/components/hero-slider.tsx` — setTimeout
   effect keyed on `[index]`.
2. **Logo → top (task 2):** navbar logo smooth-scrolls to top when already on `/`
   (no reload). `src/components/site-header.tsx` (usePathname + window.scrollTo).
3. **Performance (tasks 3,4,8 — top priority):** converted all catalog PNGs to
   resized WebP via `scripts/optimize-images.mjs` (sharp). `public/` **144 MB → 5.4 MB**;
   hero images **1.7–3 MB → ~80–140 KB**. Updated refs in `catalog-images.ts` &
   `products.ts` to `.webp`; deleted original catalog PNGs + unused root images;
   favicon points to icon.svg/icon-192.png/apple-icon.png. Hero preloads only the
   first image (LCP) + neighbours; entrance animations made non-JS-gated where it
   mattered (ProductCard direct initial/animate).
6. **Short hero copy (task 6):** `HERO_TAGLINES` one-liners per slide.
7. **Edge arrows (task 7):** hero prev/next always visible, pinned to left/right
   edges (desktop + mobile), infinite cycle (modulo). testids hero-prev/hero-next/hero-dot-N.
5. **FAQ + Terms (task 5):** added FAQ entries (dead/broken link handling, link
   safety); Terms now covers EU 14-day digital-content withdrawal waiver (CRD
   2011/83/EU) + "Third-Party Suppliers & Link Availability" (retry / new tab /
   image-search fallback / Support). Added an in-vault "Link not working?" callout
   (`vault-bundle.tsx`). Supplier links already open in new tab with
   `rel="noopener noreferrer"` (security standard already met).

## Backlog / next
- P1: Resolve preview `/api` 502 if full auth/checkout flow needs preview testing
  (platform ingress config — currently works only on Vercel).
- P2: Add data-testids to remaining interactive elements for future QA.

## Session 2026-06-30 (b) — Carousel arrows + deploy-clean
- **Products carousel arrows (main page "everyone's flipping" section,
  `products-section.tsx`):** now ALWAYS visible (removed opacity-0/disabled at the
  ends) and **cycle** — past the right end loops to start, before the left end loops
  to end. (Hero edge arrows from session (a) kept as-is.)
- **Deploy hygiene (for git → Vercel auto-deploy):** `.gitignore` now excludes the
  preview-only `/frontend/` supervisor runner and the stray `/yarn.lock` (repo keeps
  its original npm/pnpm lockfiles so Vercel's package-manager detection is unchanged).
  Verified: `next build` passes; WebP images committed; original PNGs removed from git;
  no secrets committed; Stripe route uses `process.env.STRIPE_SECRET_KEY` (works via
  Vercel env). To ship: use the **"Save to Github"** button → Vercel auto-redeploys.

