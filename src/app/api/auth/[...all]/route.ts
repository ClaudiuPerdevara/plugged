import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"

/**
 * Better Auth catch-all route handler.
 *
 * HEADER FIX (helps Google OAuth resolve the correct public origin):
 * When the app is embedded in a cross-site iframe (e.g. the v0 preview panel)
 * or served behind a proxy, `x-forwarded-host` may not reflect the public host
 * the browser actually used. Better Auth's dynamic baseURL would then resolve
 * the wrong origin, breaking the Google `redirect_uri`.
 *
 * We derive the public origin from the `Origin` or `Referer` header (which the
 * browser always sends with the full URL) and rewrite x-forwarded-host /
 * x-forwarded-proto BEFORE Better Auth processes the request. On a plain
 * Vercel deployment these headers already match, so this is a safe no-op.
 */

const handlers = toNextJsHandler(auth)

/** Extract the public origin (https://host) from request headers. */
function getPublicOrigin(req: Request): string | null {
  const origin = req.headers.get("origin")
  if (origin) return origin

  const referer = req.headers.get("referer")
  if (referer) {
    try {
      return new URL(referer).origin
    } catch {
      // malformed — fall through
    }
  }

  return null
}

/** Clone a Request with fixed forwarded headers so Better Auth sees the
 *  correct public origin. */
function withFixedHeaders(req: Request): Request {
  const origin = getPublicOrigin(req)
  if (!origin) return req

  let url: URL
  try {
    url = new URL(origin)
  } catch {
    return req
  }

  const headers = new Headers(req.headers)
  headers.set("x-forwarded-host", url.host)
  headers.set("x-forwarded-proto", url.protocol.replace(":", ""))

  return new Request(req.url, {
    method: req.method,
    headers,
    body: req.body,
    duplex: "half",
  } as RequestInit)
}

export async function GET(req: Request) {
  return handlers.GET(withFixedHeaders(req))
}

export async function POST(req: Request) {
  return handlers.POST(withFixedHeaders(req))
}

export const dynamic = "force-dynamic"
