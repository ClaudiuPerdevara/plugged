# Test Credentials — PLUGGED

## IMPORTANT: test against http://localhost:3000
The Emergent preview ingress routes `/api/*` to a dead legacy backend (502), so
the Next.js API routes are ONLY reachable on `http://localhost:3000` inside the
container. A **local Postgres** (installed for testing) backs the app; the real
production DB is Neon (Vercel).

Local Postgres: `postgresql://postgres:pass@localhost:5432/plugged`

## Test accounts (email / password)
- **UI review→€2 flow**: `other@test.com` / `Test1234!`
  - Owns bundle `opium` (seeded). Has NOT reviewed yet → can post a review and
    receive the €2 reward, then apply it in the cart on a different bundle.
- **Already-used reviewer**: `reviewer@test.com` / `Test1234!`
  - Owns `y2k`; already posted a review; its reward code `THANKS-6W2PM5` is a
    single-use, nominal voucher (only this account can redeem it).
