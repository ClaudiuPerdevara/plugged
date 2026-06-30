"use server"

import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { getSession } from "@/lib/session"
import { db } from "@/lib/db"
import { sendEmail, siteUrl } from "@/lib/email"

/**
 * ============================================================================
 * PLUGGED. — Server Action layer
 * ----------------------------------------------------------------------------
 * Auth (sign-in / sign-up / sign-out / Google) is handled client-side via the
 * Better Auth React client (src/lib/auth-client.ts), which calls the auth
 * REST API directly. This avoids Server-Action origin-mismatch issues when
 * the app is served through a proxy (e.g. the preview panel) and lets Better
 * Auth set the session cookie directly in the HTTP response.
 *
 * The actions below cover the remaining interactive surfaces: support form,
 * single-bundle "Buy Now", and account/security toggles. They run on the
 * server and return the consistent `ActionState` the forms expect.
 * ============================================================================
 */

export type ActionState = {
  ok: boolean
  /** Human-readable message rendered inline by the form. */
  message: string
  /** Optional client-side redirect target on success. */
  redirectTo?: string
  /** Optional field-level errors keyed by input name. */
  fieldErrors?: Record<string, string>
} | null

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Escape user-supplied text before interpolating into outbound email HTML. */
function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c] as string,
  )
}

function str(formData: FormData, key: string) {
  return (formData.get(key) ?? "").toString().trim()
}

/* -------------------------------------------------------------------------- */
/* Support                                                                    */
/* -------------------------------------------------------------------------- */

export async function submitSupportAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = str(formData, "name")
  const email = str(formData, "email")
  const subject = str(formData, "subject")
  const message = str(formData, "message")

  const fieldErrors: Record<string, string> = {}
  if (name.length < 2) fieldErrors.name = "Enter your name."
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email."
  if (subject.length < 2) fieldErrors.subject = "Add a subject."
  if (message.length < 10)
    fieldErrors.message = "Tell us a little more (10+ characters)."
  if (Object.keys(fieldErrors).length > 0)
    return { ok: false, message: "Please fix the errors below.", fieldErrors }

  const session = await getSession()

  await db.supportTicket.create({
    data: {
      name,
      email,
      subject,
      message,
      userId: session?.user.id,
    },
  })

  const inbox = process.env.SUPPORT_INBOX
  if (inbox) {
    const sent = await sendEmail({
      to: inbox,
      subject: `[Support] ${subject}`,
      replyTo: email,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <hr />
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
      text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
    })
    if (!sent.ok) {
      return {
        ok: false,
        message: "We saved your message but couldn't notify the team. Try again shortly.",
      }
    }
  }

  return {
    ok: true,
    message: "Message sent. We'll reply to your email shortly.",
  }
}

/* -------------------------------------------------------------------------- */
/* Account & security                                                         */
/* -------------------------------------------------------------------------- */

export async function resetPasswordAction(): Promise<ActionState> {
  const session = await getSession()
  if (!session) {
    return { ok: false, message: "Sign in to reset your password." }
  }

  const credential = await db.account.findFirst({
    where: { userId: session.user.id, providerId: "credential" },
    select: { id: true },
  })
  if (!credential) {
    return {
      ok: false,
      message: "You signed in with Google — no password to reset.",
    }
  }

  try {
    await auth.api.requestPasswordReset({
      body: {
        email: session.user.email,
        redirectTo: `${siteUrl()}/reset-password`,
      },
      headers: await headers(),
    })
  } catch {
    return { ok: false, message: "Couldn't send reset link. Try again." }
  }

  return {
    ok: true,
    message: "Password reset link sent to your email.",
  }
}

export async function requestPasswordResetAction(
  email: string,
): Promise<ActionState> {
  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "Enter a valid email." }
  }

  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: `${siteUrl()}/reset-password`,
      },
      headers: await headers(),
    })
  } catch (err: unknown) {
    const code =
      err && typeof err === "object" && "body" in err
        ? (err as { body?: { code?: string } }).body?.code
        : undefined
    if (code === "RESET_PASSWORD_DISABLED") {
      return {
        ok: false,
        message: "Password reset isn't configured yet. Contact support.",
      }
    }
  }

  return {
    ok: true,
    message: "If this email exists, check your inbox for a reset link.",
  }
}
