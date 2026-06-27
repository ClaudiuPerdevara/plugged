"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"

/**
 * Client auth hook backed by Better Auth's React client.
 *
 * `useSession()` is reactive — it polls the signed, httpOnly session cookie
 * via /api/auth/get-session and re-renders when auth state changes (sign-in,
 * sign-out, refresh). `signOut` calls the Better Auth sign-out endpoint which
 * invalidates the server session row and clears the cookie.
 */
export function useAuth() {
  const router = useRouter()
  const session = authClient.useSession()

  const isAuthenticated = Boolean(session.data)
  const user = session.data?.user
    ? {
        id: session.data.user.id,
        name: session.data.user.name,
        email: session.data.user.email,
        image: session.data.user.image,
      }
    : null

  const signOut = useCallback(async () => {
    await authClient.signOut()
    toast.success("Signed out")
    router.push("/")
    router.refresh()
  }, [router])

  return {
    isAuthenticated,
    user,
    ready: !session.isPending,
    signOut,
  }
}
