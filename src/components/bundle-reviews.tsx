"use client"

import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { Loader2, MessageSquareText, Star, Ticket } from "lucide-react"

type PublicReview = {
  id: string
  authorName: string
  rating: number
  comment: string
  supplier: string | null
  createdAt: string
  mine: boolean
}

// Never throws on non-JSON responses (e.g. an HTML error page / gateway error).
async function safeJson(res: Response): Promise<Record<string, unknown> | null> {
  try {
    const text = await res.text()
    return text ? (JSON.parse(text) as Record<string, unknown>) : {}
  } catch {
    return null
  }
}

function Stars({
  value,
  onChange,
  size = "sm",
}: {
  value: number
  onChange?: (n: number) => void
  size?: "sm" | "lg"
}) {
  const cls = size === "lg" ? "size-7" : "size-4"
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1
        const filled = n <= value
        const Icon = (
          <Star
            className={`${cls} ${
              filled
                ? "fill-accent text-accent"
                : "fill-transparent text-muted-foreground/40"
            }`}
          />
        )
        return onChange ? (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            data-testid={`review-star-${n}`}
            className="transition-transform duration-150 hover:scale-110"
          >
            {Icon}
          </button>
        ) : (
          <span key={n}>{Icon}</span>
        )
      })}
    </span>
  )
}

export function BundleReviews({
  bundleId,
  suppliers,
}: {
  bundleId: string
  suppliers: string[]
}) {
  const [reviews, setReviews] = useState<PublicReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [supplier, setSupplier] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [rewardCode, setRewardCode] = useState<string | null>(null)

  const alreadyReviewed = reviews.some((r) => r.mine)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `/api/reviews?bundleId=${encodeURIComponent(bundleId)}`,
        { cache: "no-store" },
      )
      const data = await safeJson(res)
      if (!res.ok || !data) {
        throw new Error(
          (data?.error as string) || "Could not load reviews right now.",
        )
      }
      setReviews((data.reviews as PublicReview[]) ?? [])
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load reviews.")
    } finally {
      setLoading(false)
    }
  }, [bundleId])

  useEffect(() => {
    void load()
  }, [load])

  async function submit() {
    if (rating < 1) {
      toast.error("Pick a star rating first.")
      return
    }
    if (comment.trim().length < 4) {
      toast.error("Write a few words about the batch/supplier.")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bundleId,
          rating,
          comment: comment.trim(),
          supplier: supplier || undefined,
        }),
      })
      const data = await safeJson(res)
      if (!res.ok || !data) {
        throw new Error(
          (data?.error as string) || "Could not submit review right now.",
        )
      }
      if (data.rewardCode) {
        setRewardCode(data.rewardCode as string)
        toast.success("Review posted — €2 off unlocked!")
      } else {
        toast.success("Review posted. Thanks!")
      }
      setComment("")
      setRating(0)
      setSupplier("")
      await load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not submit review.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="rounded-xl border border-border bg-background/40"
      data-testid="bundle-reviews"
    >
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <MessageSquareText className="size-4 text-accent" />
        <h4 className="font-heading text-sm font-bold tracking-tight text-foreground">
          Supplier & batch reviews
        </h4>
        <span className="ml-auto text-xs text-muted-foreground">
          {reviews.length} review{reviews.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="flex flex-col gap-5 p-5">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Chinese factories change batch quality month to month. Warn other
          owners about a bad drop, or flag a supplier that&apos;s shipping fast
          right now. Only people who own this bundle can read or post here.
        </p>

        {/* Reward banner after a successful submit */}
        {rewardCode ? (
          <div
            className="flex items-start gap-3 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3.5"
            data-testid="review-reward-banner"
          >
            <Ticket className="mt-0.5 size-5 shrink-0 text-accent" />
            <p className="text-xs leading-relaxed text-foreground">
              <span className="font-semibold">Thanks! Here&apos;s €2 off</span>{" "}
              your next bundle — we also emailed it to you. Use{" "}
              <span className="rounded bg-background/70 px-1.5 py-0.5 font-mono text-accent">
                {rewardCode}
              </span>{" "}
              at checkout (valid 90 days, one use).
            </p>
          </div>
        ) : null}

        {/* Write-a-review form */}
        {!alreadyReviewed ? (
          <div className="flex flex-col gap-3 rounded-xl border border-border/70 bg-card/40 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Your rating
                </span>
                <Stars value={rating} onChange={setRating} size="lg" />
              </div>
              <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent">
                Leave a review → get €2 off
              </span>
            </div>

            {suppliers.length > 0 ? (
              <select
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                data-testid="review-supplier-select"
                className="w-full rounded-lg border border-border bg-background/60 px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent/60"
              >
                <option value="">Overall bundle (no specific supplier)</option>
                {suppliers.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            ) : null}

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              maxLength={1000}
              placeholder="e.g. Supplier X's Y2K zips were flimsy this month — order took 9 days but landed clean."
              data-testid="review-comment-input"
              className="w-full resize-y rounded-lg border border-border bg-background/60 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-accent/60"
            />

            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              data-testid="review-submit-button"
              className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform duration-300 hover:scale-[1.03] disabled:opacity-70 disabled:hover:scale-100"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Posting…
                </>
              ) : (
                "Post review & claim €2 off"
              )}
            </button>
          </div>
        ) : (
          <p
            className="rounded-xl border border-border/70 bg-card/40 px-4 py-3 text-xs text-muted-foreground"
            data-testid="review-already-done"
          >
            You&apos;ve reviewed this bundle — thanks for keeping the board
            fresh. 🙌
          </p>
        )}

        {/* Reviews list */}
        {loading ? (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Loading reviews…
          </p>
        ) : error ? (
          <p className="text-sm text-muted-foreground">{error}</p>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No reviews yet — be the first to rate a supplier and earn €2 off.
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-border/60">
            {reviews.map((r) => (
              <li key={r.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {r.authorName}
                      {r.mine ? (
                        <span className="ml-2 text-[11px] text-accent">
                          (you)
                        </span>
                      ) : null}
                    </span>
                    <Stars value={r.rating} />
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {r.supplier ? (
                  <span className="mt-1.5 inline-block rounded-full border border-border bg-secondary/40 px-2.5 py-0.5 text-[11px] text-muted-foreground">
                    {r.supplier}
                  </span>
                ) : null}
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                  {r.comment}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
