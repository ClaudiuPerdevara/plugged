"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
} from "lucide-react"

export function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const error = searchParams.get("error")

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null,
  )
  const [pending, startTransition] = useTransition()

  const invalidToken = error === "INVALID_TOKEN" || !token

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!token) return

    if (password.length < 8) {
      setMessage({ ok: false, text: "Use at least 8 characters." })
      return
    }
    if (password !== confirm) {
      setMessage({ ok: false, text: "Passwords don't match." })
      return
    }

    setMessage(null)
    startTransition(async () => {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: password, token }),
      })

      if (!res.ok) {
        setMessage({
          ok: false,
          text: "This reset link is invalid or expired. Request a new one.",
        })
        return
      }

      setMessage({
        ok: true,
        text: "Password updated. You can sign in with your new password.",
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
          href="/"
          className="mb-8 inline-block font-heading text-xl font-bold tracking-tight text-foreground"
        >
          PLUGGED<span className="text-accent">.</span>
        </Link>

        <div className="rounded-3xl border border-border bg-card/40 p-7 backdrop-blur-2xl md:p-9">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Account
          </span>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground">
            Set new password
          </h1>

          {invalidToken ? (
            <div className="mt-5">
              <p className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="size-4 shrink-0" />
                This reset link is invalid or expired.
              </p>
              <Link
                href="/forgot-password"
                className="mt-4 inline-block text-sm font-semibold text-accent hover:text-foreground"
              >
                Request a new link →
              </Link>
            </div>
          ) : message?.ok ? (
            <div className="mt-5">
              <p className="rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-sm text-foreground">
                {message.text}
              </p>
              <Link
                href="/login"
                className="mt-4 inline-block text-sm font-semibold text-accent hover:text-foreground"
              >
                Go to sign in →
              </Link>
            </div>
          ) : (
            <>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose a strong password for your vault.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
                <PasswordField
                  id="password"
                  label="New password"
                  value={password}
                  onChange={setPassword}
                  show={showPassword}
                  onToggleShow={() => setShowPassword((v) => !v)}
                  autoComplete="new-password"
                />
                <PasswordField
                  id="confirm"
                  label="Confirm password"
                  value={confirm}
                  onChange={setConfirm}
                  show={showPassword}
                  onToggleShow={() => setShowPassword((v) => !v)}
                  autoComplete="new-password"
                />

                {message && !message.ok && (
                  <p className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                    <AlertCircle className="size-3.5 shrink-0" />
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
                      Updating…
                    </>
                  ) : (
                    "Update password"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </main>
  )
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  show,
  onToggleShow,
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  show: boolean
  onToggleShow: () => void
  autoComplete?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs uppercase tracking-[0.15em] text-muted-foreground"
      >
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Lock className="size-4" />
        </span>
        <input
          id={id}
          type={show ? "text" : "password"}
          required
          minLength={8}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className="w-full rounded-xl border border-border bg-background/60 py-3 pl-11 pr-11 text-sm text-foreground outline-none transition-colors focus:border-accent/60"
        />
        <button
          type="button"
          onClick={onToggleShow}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  )
}
