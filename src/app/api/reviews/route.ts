import { NextResponse } from "next/server"
import { z } from "zod"
import { getSession } from "@/lib/session"
import { db } from "@/lib/db"
import { getProduct } from "@/lib/products"
import { ownsBundle, getBundleReviews, isAdmin } from "@/lib/reviews"
import { createReviewRewardVoucher } from "@/lib/vouchers"
import { sendEmail, siteUrl } from "@/lib/email"

/**
 * ============================================================================
 * /api/reviews — internal, ownership-gated bundle/supplier reviews
 * ----------------------------------------------------------------------------
 * GET  ?bundleId=xxx  → reviews for that bundle (only if the caller owns it).
 * POST { bundleId, rating, comment, supplier? }
 *                     → create the caller's review (one per bundle) and grant a
 *                       one-time €2-off reward voucher.
 *
 * Every path returns JSON (even on failure) so the client never hits a
 * "Unexpected token < in JSON" parse error.
 * ============================================================================
 */
export const runtime = "nodejs"

const REWARD_CENTS = 200

export async function GET(req: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 })
    }

    const bundleId = (new URL(req.url).searchParams.get("bundleId") ?? "").trim()
    if (!bundleId) {
      return NextResponse.json({ error: "Missing bundleId." }, { status: 400 })
    }

    if (!(await ownsBundle(session.user.id, bundleId))) {
      return NextResponse.json(
        { error: "Purchase this bundle to see its reviews." },
        { status: 403 },
      )
    }

    const reviews = await getBundleReviews(
      bundleId,
      session.user.id,
      isAdmin(session.user.email),
    )
    return NextResponse.json({ ok: true, reviews })
  } catch (err) {
    console.error("[reviews] GET failed:", err)
    return NextResponse.json(
      { error: "Reviews are temporarily unavailable. Please try again shortly." },
      { status: 500 },
    )
  }
}

const PostSchema = z.object({
  bundleId: z.string().trim().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(4).max(1000),
  supplier: z.string().trim().max(120).optional(),
})

export async function POST(req: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 })
    }

    let json: unknown
    try {
      json = await req.json()
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }
    const parsed = PostSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid review" },
        { status: 400 },
      )
    }
    const { bundleId, rating, comment, supplier } = parsed.data

    if (!(await ownsBundle(session.user.id, bundleId))) {
      return NextResponse.json(
        { error: "You can only review a bundle you own." },
        { status: 403 },
      )
    }

    // One review per user per bundle.
    const existing = await db.review.findUnique({
      where: { userId_bundleId: { userId: session.user.id, bundleId } },
      select: { id: true },
    })
    if (existing) {
      return NextResponse.json(
        { error: "You've already reviewed this bundle." },
        { status: 409 },
      )
    }

    // Grant the €2-off reward voucher for leaving a review.
    let rewardCode: string | null = null
    try {
      rewardCode = await createReviewRewardVoucher({
        userId: session.user.id,
        amountCents: REWARD_CENTS,
      })
    } catch (err) {
      console.error("[reviews] reward voucher creation failed:", err)
    }

    const review = await db.review.create({
      data: {
        userId: session.user.id,
        bundleId,
        rating,
        comment,
        supplier: supplier || null,
        authorName: session.user.name || session.user.email.split("@")[0],
        rewardCode,
      },
      select: {
        id: true,
        authorName: true,
        rating: true,
        comment: true,
        supplier: true,
        createdAt: true,
      },
    })

    // Email the reward code (best-effort — never blocks the response).
    if (rewardCode) {
      const bundleName = getProduct(bundleId)?.name ?? bundleId
      void sendEmail({
        to: session.user.email,
        subject: "Thanks for your review — here's €2 off 🎁",
        html: `
          <p>Hey ${session.user.name || "there"},</p>
          <p>Thanks for reviewing <strong>${bundleName}</strong>! As a thank-you,
          here's <strong>€2 off</strong> your next bundle:</p>
          <p style="font-size:20px;font-weight:bold;letter-spacing:2px;">${rewardCode}</p>
          <p>Apply it at checkout. Valid for 90 days, one use.</p>
          <p><a href="${siteUrl()}/drops">Browse bundles →</a></p>
        `,
        text: `Thanks for reviewing ${bundleName}! Your €2-off code: ${rewardCode} (valid 90 days, one use). ${siteUrl()}/drops`,
      })
    }

    return NextResponse.json({ ok: true, review, rewardCode })
  } catch (err) {
    console.error("[reviews] POST failed:", err)
    return NextResponse.json(
      { error: "Couldn't save your review right now. Please try again shortly." },
      { status: 500 },
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 })
    }

    const id = (new URL(req.url).searchParams.get("id") ?? "").trim()
    if (!id) {
      return NextResponse.json({ error: "Missing review id." }, { status: 400 })
    }

    const review = await db.review.findUnique({
      where: { id },
      select: { userId: true },
    })
    if (!review) {
      return NextResponse.json({ error: "Review not found." }, { status: 404 })
    }

    const allowed =
      review.userId === session.user.id || isAdmin(session.user.email)
    if (!allowed) {
      return NextResponse.json(
        { error: "You can't delete this review." },
        { status: 403 },
      )
    }

    await db.review.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[reviews] DELETE failed:", err)
    return NextResponse.json(
      { error: "Couldn't delete the review right now." },
      { status: 500 },
    )
  }
}
