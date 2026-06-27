/**
 * Transactional email via Resend (https://resend.com).
 * When RESEND_API_KEY is unset, emails are logged to the server console so
 * local dev works without a mail provider.
 */

type SendEmailOptions = {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
}: SendEmailOptions): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  const from =
    process.env.RESEND_FROM_EMAIL ?? "PLUGGED <onboarding@resend.dev>"

  if (!apiKey) {
    console.info("[email:dev]", { to, subject, text: text ?? html.slice(0, 200) })
    return { ok: true }
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      reply_to: replyTo,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    console.error("[email] Resend error:", res.status, body)
    return { ok: false, error: "Could not send email." }
  }

  return { ok: true }
}

export function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    process.env.BETTER_AUTH_URL?.replace(/\/$/, "") ??
    "http://localhost:3000"
  )
}
