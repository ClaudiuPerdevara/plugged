import { NextResponse, type NextRequest } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

/**
 * ============================================================================
 * Route protection — Better Auth (Next.js 16 "proxy")
 * ============================================================================
 * Gates /dashboard by checking for the presence of the signed Better Auth
 * session cookie. This is a fast, optimistic check — the full validation
 * against the DB happens in server components / route handlers via
 * `getSession()` (see lib/session.ts).
 *
 * On Vercel the platform sets `x-forwarded-host` / `x-forwarded-proto`
 * correctly, so Better Auth's dynamic baseURL resolves the right public URL
 * for OAuth callbacks without any header rewriting.
 *
 * All responses include Cache-Control: no-store to prevent browsers from
 * caching redirects.
 * ============================================================================
 */

const PROTECTED_PREFIXES = ["/dashboard"]

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
}

function withNoCache(res: NextResponse) {
  for (const [k, v] of Object.entries(NO_CACHE_HEADERS)) {
    res.headers.set(k, v)
  }
  return res
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  )

  if (!isProtected) {
    return withNoCache(NextResponse.next())
  }

  const sessionCookie = getSessionCookie(req)
  if (!sessionCookie) {
    const loginUrl = new URL("/login", req.url)
    const cleanPath = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
    loginUrl.searchParams.set("next", cleanPath)
    return withNoCache(NextResponse.redirect(loginUrl))
  }

  return withNoCache(NextResponse.next())
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
