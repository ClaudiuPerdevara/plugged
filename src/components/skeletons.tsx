import { Skeleton } from "@/components/ui/skeleton"

/** A single product card placeholder. */
export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/60">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>
      </div>
    </div>
  )
}

/** Responsive grid of product card placeholders. */
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

/** Vault bundle row placeholder for the dashboard. */
export function VaultBundleSkeleton() {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-border bg-card/60 p-5">
      <Skeleton className="size-20 shrink-0 rounded-xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-10 w-32 rounded-full" />
    </div>
  )
}
