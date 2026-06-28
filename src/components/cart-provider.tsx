"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { toast } from "sonner"
import { PRODUCTS } from "@/lib/products"
import type { Product } from "@/lib/products"

/**
 * ============================================================================
 * PLUGGED. — Cart store (client state)
 * ============================================================================
 * Global cart state via React Context. Persisted to localStorage so a basket
 * survives refreshes — cart contents are ephemeral client state, not user
 * records, so localStorage is the right tool here. On checkout this hands the
 * line items off to /api/checkout (Stripe) on the backend.
 * ============================================================================
 */

export type CartItem = {
  id: string
  name: string
  tag: string
  price: number
  image: string
}

type CartContextValue = {
  items: CartItem[]
  count: number
  total: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  clear: () => void
  has: (id: string) => boolean
}

const STORAGE_KEY = "plugged.cart.v1"

const CartContext = createContext<CartContextValue | null>(null)

function syncWithCatalog(items: CartItem[]): CartItem[] {
  return items.map((item) => {
    const product = PRODUCTS.find((p) => p.id === item.id)
    if (!product) return item
    return {
      ...item,
      name: product.name,
      tag: product.tag,
      price: product.price,
      image: product.image,
    }
  })
}


export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage on mount. Deferred to a microtask so we don't
  // call setState synchronously inside the effect body (which the React lint
  // rule discourages) while still completing before the next paint — so there
  // is no visible flicker and no SSR hydration mismatch (the first client
  // render mirrors the server's empty cart).
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) setItems(syncWithCatalog(JSON.parse(raw) as CartItem[]))
      } catch {
        // ignore malformed storage
      }
      setHydrated(true)
    })
  }, [])

  // Persist whenever items change (after hydration).
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore quota errors
    }
  }, [items, hydrated])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback((product: Product) => {
    const exists = items.some((i) => i.id === product.id)
    if (exists) {
      toast.info("Already in your basket", {
        id: `cart-dup-${product.id}`,
        description: `${product.name} is a one-time bundle.`,
      })
      return
    }

    setItems((prev) => [
      ...prev,
      {
        id: product.id,
        name: product.name,
        tag: product.tag,
        price: product.price,
        image: product.image,
      },
    ])

    toast.success("Added to cart", {
      id: `cart-add-${product.id}`,
      description: product.name,
    })
  }, [items])

  const removeItem = useCallback((id: string) => {
    const found = items.find((i) => i.id === id)
    setItems((prev) => prev.filter((i) => i.id !== id))
    if (found) {
      toast("Removed from cart", {
        id: `cart-remove-${id}`,
        description: found.name,
      })
    }
  }, [items])

  const clear = useCallback(() => setItems([]), [])

  const value = useMemo<CartContextValue>(() => {
    const total = items.reduce((sum, i) => sum + i.price, 0)
    return {
      items,
      count: items.length,
      total,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      clear,
      has: (id: string) => items.some((i) => i.id === id),
    }
  }, [items, isOpen, openCart, closeCart, addItem, removeItem, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}
