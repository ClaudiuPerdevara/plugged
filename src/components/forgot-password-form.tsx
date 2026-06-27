"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { AlertCircle, ArrowLeft, Loader2, Mail } from "lucide-react"
import { requestPasswordResetAction } from "@/lib/actions"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null,
  )
  const [pending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    startTransition(async () => {
      const res = await requestPasswordResetAction(email.trim())
      setMessage({
        ok: res?.ok ?? false,
        text: res?.message ?? "Something went wrong.",
      })
    })
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <Link
          href="/login"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </Link>

        <div className="rounded-3xl border border-border bg-card/40 p-7 backdrop-blur-2xl md:p-9">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Account
          </span>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground">
            Forgot password?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Enter your email and we&apos;ll send a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-xs uppercase tracking-[0.15em] text-muted-foreground"
              >
                Email
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Mail className="size-4" />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-border bg-background/60 py-3 pl-11 pr-4 text-sm text-foreground outline-none transition-colors focus:border-accent/60"
                />
              </div>
            </div>

            {message && (
              <p
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${
                  message.ok
                    ? "border-accent/40 bg-accent/10 text-foreground"
                    : "border-destructive/40 bg-destructive/10 text-destructive"
                }`}
              >
                {!message.ok && <AlertCircle className="size-3.5 shrink-0" />}
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-all hover:bg-accent hover:text-accent-foreground disabled:opacity-70"
            >
              {pending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending…
                </>
              ) : (
                "Send reset link"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  )
}
