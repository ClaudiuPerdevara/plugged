# Test Credentials

This project (PLUGGED — Next.js) currently has **no test account required** for the
features under test. All verified flows are public, client-side UI behaviors
(home hero slider, logo scroll, drops catalog, FAQ, Terms).

## Known preview-environment limitation
- The Emergent preview ingress routes `/api/*` to a legacy backend on port 8001,
  which is not used by this project. As a result, `/api/auth/*`, `/api/checkout`,
  and `/api/webhook` return 502 **in the preview only**. Authentication, Stripe
  checkout and the user dashboard therefore cannot be exercised in the preview.
  On the real (Vercel) deployment these API routes run on the same Next server
  and work normally. Auth/checkout/dashboard are OUT OF SCOPE for preview testing.
