"use client"

import { useState, useTransition, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react"
import { AppleIcon, GoogleIcon } from "./brand-icons"
import { authClient } from "@/lib/auth-client"
import { CATALOG_IMAGES } from "@/lib/catalog-images"

type Mode = "login" | "register"

type FormState = {
  ok: boolean
  message: string
  fieldErrors?: Record<string, string>
} | null

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const COPY = {
  login: {
    eyebrow: "Welcome back",
    title: "Sign in to your vault",
    subtitle: "Access your bundles and supplier plugs.",
    submit: "Sign In",
    switchText: "New to PLUGGED?",
    switchCta: "Create an account",
    switchHref: "/register",
  },
  register: {
    eyebrow: "Get the plug",
    title: "Create your account",
    subtitle: "Unlock vetted supplier bundles in seconds.",
    submit: "Create Account",
    switchText: "Already have an account?",
    switchCta: "Sign in",
    switchHref: "/login",
  },
} as const

export function AuthForm({ mode }: { mode: Mode }) {
  const copy = COPY[mode]
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextUrl = searchParams.get("next")
  const [showPassword, setShowPassword] = useState(false)
  const [state, setState] = useState<FormState>(null)
  const [pending, startTransition] = useTransition()
  const [socialPending, startSocial] = useTransition()
  const [socialMsg, setSocialMsg] = useState<string | null>(null)
  const [origin, setOrigin] = useState("")

  useEffect(() => {
    // Deferred to a microtask to avoid the React lint rule about calling
    // setState synchronously inside an effect body.
    queueMicrotask(() => setOrigin(window.location.origin))
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = (form.get("email") ?? "").toString().trim()
    const password = (form.get("password") ?? "").toString().trim()
    const name = (form.get("name") ?? "").toString().trim()

    // Client-side validation (mirrors the server-side checks).
    const fieldErrors: Record<string, string> = {}
    if (mode === "register" && name.length < 2)
      fieldErrors.name = "Enter your name."
    if (!EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email."
    if (password.length < 8)
      fieldErrors.password = "Use at least 8 characters."
    if (Object.keys(fieldErrors).length > 0) {
      setState({ ok: false, message: "Please fix the errors below.", fieldErrors })
      return
    }

    setState(null)
    startTransition(async () => {
      if (mode === "login") {
        const { error } = await authClient.signIn.email({ email, password })
        if (error) {
          setState({
            ok: false,
            message:
              error.code === "INVALID_PASSWORD" ||
              error.code === "INVALID_EMAIL"
                ? "Email or password is incorrect."
                : error.message || "Sign in failed. Check your credentials.",
          })
          return
        }
        setState({ ok: true, message: "Signed in. Redirecting to your vault…" })
      } else {
        const { error } = await authClient.signUp.email({ name, email, password })
        if (error) {
          setState({
            ok: false,
            message:
              error.code === "USER_ALREADY_EXISTS"
                ? "An account with that email already exists."
                : error.message || "Could not create the account.",
          })
          return
        }
        setState({ ok: true, message: "Account created. Redirecting…" })
      }

      // Honor the `next` param set by the auth middleware, else go to vault.
      // Use a full-page navigation (window.location.href) instead of
      // router.push because:
      //   1. Client-side navigation (router.push) can fail through the preview
      //      proxy ("Failed to fetch RSC payload").
      //   2. A full page load bypasses any cached client-side redirects.
      // The `?r=1` cache-buster ensures the browser actually requests the URL
      // (bypassing any cached 301/308 redirects from before the trailing-slash
      // fix). The trailing slash avoids the ALB's /dashboard → /dashboard/ 301.
      const target = nextUrl && nextUrl.startsWith("/") ? nextUrl : "/dashboard/"
      const bustCache = target.includes("?") ? "&r=1" : "?r=1"
      window.location.href = target + bustCache
    })
  }

  function handleSocial(provider: "google" | "apple") {
    setSocialMsg(null)
    startSocial(async () => {
      if (provider === "google") {
        // Better Auth handles the full OAuth redirect: the browser is sent to
        // Google, then back to /api/auth/callback/google, which sets the
        // session cookie and redirects to /dashboard. Requires
        // GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET in .env (see setup note).
        const { error } = await authClient.signIn.social({
          provider: "google",
          callbackURL: nextUrl && nextUrl.startsWith("/") ? nextUrl : "/dashboard/",
        })
        if (error) {
          const notConfigured =
            error.code === "PROVIDER_NOT_FOUND" ||
            error.code === "PROVIDER_NOT_ENABLED" ||
            error.code === "PROVIDER_ID_NOT_FOUND"
          setSocialMsg(
            notConfigured
              ? "GOOGLE_NOT_CONFIGURED"
              : error.message || "Google sign-in failed.",
          )
        }
      } else {
        setSocialMsg("Apple sign-in isn't connected yet.")
      }
    })
  }

  const fieldErrors = state?.ok ? undefined : state?.fieldErrors

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-16">
      {/* Ambient backdrop image */}
      <img
        src={CATALOG_IMAGES.opium.hero}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
      />
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

        {/* Frosted glass container */}
        <div className="rounded-3xl border border-border bg-card/40 p-7 backdrop-blur-2xl md:p-9">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {copy.eyebrow}
          </span>
          <h1 className="mt-3 text-balance font-heading text-3xl font-bold tracking-tight text-foreground">
            {copy.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {copy.subtitle}
          </p>

          {/* Social auth */}
          <div className="mt-7 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleSocial("google")}
              disabled={socialPending}
              className="flex items-center justify-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-accent/50 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
            >
              {socialPending ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <GoogleIcon className="size-5" />
              )}
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => handleSocial("apple")}
              disabled={socialPending}
              className="flex items-center justify-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-accent/50 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
            >
              <AppleIcon className="size-5" />
              Continue with Apple
            </button>
          </div>

          {socialMsg && (
            socialMsg === "GOOGLE_NOT_CONFIGURED" ? (
              <div className="mt-3 rounded-lg border border-accent/30 bg-accent/5 p-3 text-xs text-muted-foreground">
                <p className="flex items-center gap-2 font-medium text-foreground">
                  <AlertCircle className="size-3.5 shrink-0 text-accent" />
                  Google sign-in needs setup
                </p>
                <p className="mt-1.5 leading-relaxed">
                  Get your credentials from{" "}
                  <a
                    href="https://console.cloud.google.com/apis/credentials"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent underline underline-offset-2 hover:text-foreground"
                  >
                    Google Cloud Console
                  </a>
                  , then add them to <code className="rounded bg-secondary px-1 py-0.5 text-foreground">.env</code>:
                </p>
                <pre className="mt-1.5 overflow-x-auto rounded bg-background/80 p-2 text-[11px] text-foreground"><code>{`GOOGLE_CLIENT_ID=your-id
GOOGLE_CLIENT_SECRET=your-secret`}</code></pre>
                <p className="mt-1.5 leading-relaxed">
                  Redirect URI: <code className="break-all text-foreground">{origin}/api/auth/callback/google</code>
                </p>
              </div>
            ) : (
              <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <AlertCircle className="size-3.5 shrink-0 text-accent" />
                {socialMsg}
              </p>
            )
          )}

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              or
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          {/* Email / password form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "register" && (
              <Field
                id="name"
                name="name"
                label="Full name"
                type="text"
                placeholder="Your name"
                icon={<User className="size-4" />}
                autoComplete="name"
                error={fieldErrors?.name}
              />
            )}
            <Field
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="size-4" />}
              autoComplete="email"
              error={fieldErrors?.email}
            />
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-xs uppercase tracking-[0.15em] text-muted-foreground"
              >
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock className="size-4" />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  className="w-full rounded-xl border border-border bg-background/60 py-3 pl-11 pr-11 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-300 focus:border-accent/60 focus-visible:ring-2 focus-visible:ring-ring/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {fieldErrors?.password && (
                <p className="text-xs text-destructive">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {mode === "login" && (
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-muted-foreground transition-colors hover:text-accent"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Top-level status message */}
            {state && !state.ok && !state.fieldErrors && (
              <p className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                <AlertCircle className="size-3.5 shrink-0" />
                {state.message}
              </p>
            )}
            {state?.ok && (
              <p className="rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-xs text-foreground">
                {state.message}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="group mt-2 flex items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-all duration-300 hover:scale-[1.02] hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-70 disabled:hover:scale-100"
            >
              {pending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Please wait…
                </>
              ) : (
                <>
                  {copy.submit}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {copy.switchText}{" "}
            <Link
              href={copy.switchHref}
              className="font-semibold text-foreground transition-colors hover:text-accent"
            >
              {copy.switchCta}
            </Link>
          </p>
        </div>

        {mode === "register" && (
          <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
            By creating an account you agree to our{" "}
            <Link href="/terms" className="text-foreground hover:text-accent">
              Terms &amp; Conditions
            </Link>
            .
          </p>
        )}
      </motion.div>
    </main>
  )
}

function Field({
  id,
  name,
  label,
  type,
  placeholder,
  icon,
  autoComplete,
  error,
}: {
  id: string
  name: string
  label: string
  type: string
  placeholder: string
  icon: React.ReactNode
  autoComplete?: string
  error?: string
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
          {icon}
        </span>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full rounded-xl border border-border bg-background/60 py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-300 focus:border-accent/60 focus-visible:ring-2 focus-visible:ring-ring/40"
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
