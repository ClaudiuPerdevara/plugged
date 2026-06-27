import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { db } from "@/lib/db"
import { sendEmail } from "@/lib/email"

/**
 * ============================================================================
 * PLUGGED. — Better Auth instance (Vercel + Neon Postgres)
 * ----------------------------------------------------------------------------
 * Email + password auth and Google OAuth, backed by the Prisma adapter
 * against Neon Postgres.
 *
 * SECURITY:
 *   • Passwords are hashed with scrypt (salted) — never stored in plaintext.
 *   • Session cookies are signed with `BETTER_AUTH_SECRET` (HMAC), httpOnly,
 *     so they can't be read by client JS or tampered with.
 *   • The `Session` table is the source of truth: `getSession()` validates the
 *     cookie's signed token against the DB row, so forged/revoked sessions are
 *     rejected.
 *
 * BASE URL / TRUSTED ORIGINS:
 *   Better Auth derives the request origin dynamically so Google OAuth
 *   redirect URIs match the public host the app is served from (preview URL or
 *   production domain). The Vercel preview/production hosts are trusted via the
 *   wildcard patterns below; localhost is included for local dev.
 *
 *   Google OAuth requires the redirect URI to be registered in the Google
 *   Cloud console:  https://<your-host>/api/auth/callback/google
 * ============================================================================
 */

const trustedOrigins = [
  "http://localhost:3000",
  "https://*.vercel.app",
  "https://*.vusercontent.net",
]

if (process.env.NEXT_PUBLIC_SITE_URL) {
  trustedOrigins.push(process.env.NEXT_PUBLIC_SITE_URL)
}

const isProduction = process.env.NODE_ENV === "production"

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  // Dynamic baseURL: Better Auth derives the correct origin from each request's
  // forwarded host headers, validated against allowedHosts. This is CRITICAL
  // for Google OAuth so the redirect_uri matches the public URL (preview or
  // production), not an internal host.
  baseURL: {
    allowedHosts: ["localhost:3000", "*.vercel.app", "*.vusercontent.net"],
    protocol: "auto",
    fallback: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  },
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: true,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your PLUGGED password",
        html: `
          <p>Hi ${user.name || "there"},</p>
          <p>Click the link below to set a new password. It expires in 1 hour.</p>
          <p><a href="${url}">Reset password</a></p>
          <p>If you didn't request this, you can ignore this email.</p>
        `,
        text: `Reset your PLUGGED password: ${url}`,
      })
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  // Google OAuth. Only registered when BOTH env vars are set, so the provider
  // is cleanly absent (not half-configured) until credentials are added.
  // Redirect URI to register in Google Cloud Console:
  //   https://<your-public-host>/api/auth/callback/google
  socialProviders:
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : undefined,
  advanced: {
    // Production / Vercel preview: HTTPS + optional iframe embedding needs
    // Secure + SameSite=None. Local dev uses lax cookies on http://localhost.
    useSecureCookies: isProduction,
    defaultCookieAttributes: {
      sameSite: isProduction ? "none" : "lax",
    },
  },
})

export type Session = typeof auth.$Inference.Session
