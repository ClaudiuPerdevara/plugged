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
## Session 2026-06-30 (c) — Quality, profile, FAQ fix
- **Image quality bump:** re-exported WebP at q88–92 (heroes ~200–325KB, was ~80–140KB
  at q74). Recovered original PNGs from commit c35c547, reconverted via
  `scripts/optimize-images.mjs`, re-deleted PNGs (kept unstaged). `public/` ~15MB.
- **FAQ last-item border (bug):** shared `AccordionItem` adds `last:border-b-0` which
  stripped the bottom border of the last card; overridden with `last:border-b` in
  `faq-accordion.tsx`.
- **Editable profile (account-settings.tsx):** Display name is now editable via
  `authClient.updateUser({ name })` (Better Auth — no extra server config needed),
  with Save button + toast + router.refresh(). Email kept read-only (changing it needs
  a verification-email flow / Resend, deferred). NOTE: cannot be tested in the preview
  because `/api/*` returns 502 here; works on Vercel.
## Session 2026-06-30 (d) — Favicon + mobile hero arrows
- **Favicon was missing in the browser tab** (I'd removed `/icon.png` and relied on a
  metadata `icons` ref that wasn't reliable). Fixed using Next App Router file
  convention: added `src/app/icon.svg` (the legible "P" glyph mark) + `src/app/apple-icon.png`
  (the PLUGGED wordmark, 180×180, from the user's logo) and removed the manual `icons`
  metadata block in `layout.tsx`. `<link rel="icon" href="/icon.svg">` now emitted.
- **Mobile hero arrows overlapped the title:** edge arrows are now `hidden md:grid`
  (desktop only); on mobile, prev/next arrows (`md:hidden`, testids hero-prev-mobile /
  hero-next-mobile) sit in the bottom control bar flanking the pagination dots, so they
  never overlap text on any phone width. Desktop UX unchanged.




## Update — 2026-07-02 (UX / conversion pass)
Stack: Next.js 16 (App Router) + Prisma (Postgres) + Better Auth + Stripe, deployed on Vercel via git push. Runs locally with `next build && next start` on :3000 (dev mode blocks cross-origin hydration — use prod build to test). Dummy DB creds in `.env.local` (gitignored) for local preview only.

Done:
- Featured bundles carousel (`products-section.tsx`) now auto-advances every 5s, resets countdown on manual swipe/arrow, pauses on hover/touch. Mobile cards sized 76vw so the next bundle always peeks (no lonely-bundle-in-void feel); reduced top padding.
- Favicon: replaced v0 monogram with user's PLUGGED logo (`src/app/icon.png` 512, `apple-icon.png` 180). Deleted `src/app/icon.svg`. Removed `generator: v0.app`. Navbar kept as plain "PLUGGED." text (no logo mark, per user).
- Images: all 80 `public/catalog/**` webp upscaled ~2x (LANCZOS, q90) so retina downscales → crisp.
- Homepage (`page.tsx`) after bundles: rewrote `how-it-works.tsx` to premium 3-step (Pick → Secure checkout → Instant access); added `faq-preview.tsx` (top 5 FAQs + link to /faq).
- Added `allowedDevOrigins` to `next.config.mjs` (dev-only).

Backlog / not done (user declined for now): trust badges, testimonials, social-proof counter, purchase-notification popups, announcement bar, guarantee badge; Meta/TikTok pixel. Promotion = advice only (TikTok/Reels, Discord, referral, retargeting, SEO).

## Update — 2026-07-02 (conversion features)
- **Guest checkout (#1)**: `/api/checkout` now accepts optional `email`. No session → find user by email (graceful 503 if DB down) or create via `auth.api.signUpEmail` (Better Auth), auto-login new accounts (forward Set-Cookie), and send a set-password link via `requestPasswordReset`. Purchase attaches to that userId; webhook unchanged. UI: guest email field on `bundle-details.tsx` + `cart-view.tsx` (shown when `useAuth` not authenticated); `use-checkout.ts` passes email and only redirects to /login when no email.
- **Apple/Google Pay (#5)**: NO code change needed — hosted Stripe Checkout doesn't restrict `payment_method_types`, so wallets appear automatically. User enabled them in Stripe Dashboard + registered getplugged.store in Payment Method Domains.
- **Vault preview (#2)**: new `vault-preview.tsx` on bundle page — stylized supplier table (names blurred, real platforms/quality/count) with lock overlay + "Unlock — €{price}" CTA that scrolls to buy panel.
- NOTE: guest checkout + wallets CANNOT be fully e2e-tested in this sandbox (no Postgres/Stripe locally) — verified build, UI render, validation & graceful DB-failure (503). Must be validated on Vercel (Neon + live Stripe).

Backlog: lead magnet + email funnel (#3), "All Access" bundle discount (#4), real social proof (#6).
