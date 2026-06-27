import { createAuthClient } from "better-auth/react"

/**
 * Better Auth client for use in React components.
 *
 * Calls the auth REST API directly (POST /api/auth/sign-in/email, etc.). The
 * session cookie is set by Better Auth's route handler in the HTTP response —
 * no Server Action / cookie-propagation involved, so auth works through any
 * proxy (including the preview panel) without origin-mismatch issues.
 *
 * BASEURL: intentionally omitted. Better Auth resolves it as:
 *   • In the browser → `window.location.origin` (so requests target the same
 *     origin the page is served from, correct through the preview proxy).
 *   • During SSR → the server-side `BETTER_AUTH_URL` env (harmless —
 *     `useSession()` only fetches on the client, never during SSR).
 */
export const authClient = createAuthClient()

export type AuthClient = typeof authClient
