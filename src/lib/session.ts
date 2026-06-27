import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import type { Session } from "@/lib/auth"

/**
 * Resolve the authenticated user for the current request, or null.
 *
 * Uses Better Auth's `getSession`, which validates the signed session cookie
 * against the `Session` table (so a forged/expired cookie is rejected). Safe
 * to call from any server component, route handler, or server action.
 */
export async function getSession(): Promise<Session | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    return session ?? null
  } catch {
    return null
  }
}

/** Require an authenticated session or return null (caller decides redirect). */
export async function requireUser() {
  const session = await getSession()
  return session?.user ?? null
}
