"use client"

import { useEffect, useState } from "react"

/**
 * Shared client cache of the bundle ids the current user owns. Fetched once
 * (module-level) and shared across every card so a page full of ProductCards
 * makes a single /api/me/owned request.
 */
let cache: string[] | null = null
let inflight: Promise<string[]> | null = null

async function fetchOwned(): Promise<string[]> {
  if (cache) return cache
  if (!inflight) {
    inflight = fetch("/api/me/owned", {
      credentials: "same-origin",
      cache: "no-store",
    })
      .then((r) => (r.ok ? r.json() : { owned: [] }))
      .then((d: { owned?: string[] }) => {
        cache = d.owned ?? []
        return cache
      })
      .catch(() => {
        cache = []
        return cache
      })
  }
  return inflight
}

export function useOwnedBundles(): string[] {
  const [owned, setOwned] = useState<string[]>(cache ?? [])
  useEffect(() => {
    let active = true
    void fetchOwned().then((v) => {
      if (active) setOwned(v)
    })
    return () => {
      active = false
    }
  }, [])
  return owned
}
