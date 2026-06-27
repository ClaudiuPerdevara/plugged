"use client"

import { useActionState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  Send,
} from "lucide-react"
import { submitSupportAction, type ActionState } from "@/lib/actions"

const SUPPORT_EMAIL = "plugged.support@gmail.com"

export function SupportForm({
  defaultName = "",
  defaultEmail = "",
}: {
  defaultName?: string
  defaultEmail?: string
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    submitSupportAction,
    null,
  )
  const sent = state?.ok === true
  const fieldErrors = sent ? undefined : state?.fieldErrors

  return (
    <section className="mx-auto max-w-3xl px-5 pb-28 pt-28 md:px-8 md:pt-36">
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Support
        </span>
        <h1 className="mt-4 text-balance font-heading text-4xl font-bold leading-[1] tracking-tight text-foreground md:text-5xl">
          Get in touch
        </h1>
        <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
          Questions about a bundle, access or your account? Drop us a message and
          the team will get back within 24 hours. Browse the{" "}
          <Link href="/faq" className="text-foreground hover:text-accent">
            FAQ
          </Link>{" "}
          for instant answers.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Contact form */}
        <div className="rounded-3xl border border-border bg-card/50 p-7 backdrop-blur-sm md:p-8">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-4 py-10 text-center"
            >
              <span className="grid size-14 place-items-center rounded-full bg-accent/15 text-accent">
                <CheckCircle2 className="size-7" />
              </span>
              <h2 className="font-heading text-xl font-bold text-foreground">
                Message sent
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                {state?.message ??
                  "Thanks for reaching out. We'll reply to your email shortly."}
              </p>
              <Link
                href="/support"
                className="mt-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/60 hover:text-accent"
              >
                Send another
              </Link>
            </motion.div>
          ) : (
            <form action={formAction} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="s-name"
                    className="text-xs uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    Name
                  </label>
                  <input
                    id="s-name"
                    name="name"
                    type="text"
                    required
                    defaultValue={defaultName}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-300 focus:border-accent/60 focus-visible:ring-2 focus-visible:ring-ring/40"
                  />
                  {fieldErrors?.name && (
                    <p className="text-xs text-destructive">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="s-email"
                    className="text-xs uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="s-email"
                    name="email"
                    type="email"
                    required
                    defaultValue={defaultEmail}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-300 focus:border-accent/60 focus-visible:ring-2 focus-visible:ring-ring/40"
                  />
                  {fieldErrors?.email && (
                    <p className="text-xs text-destructive">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="s-subject"
                  className="text-xs uppercase tracking-[0.15em] text-muted-foreground"
                >
                  Subject
                </label>
                <input
                  id="s-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="What's this about?"
                  className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-300 focus:border-accent/60 focus-visible:ring-2 focus-visible:ring-ring/40"
                />
                {fieldErrors?.subject && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.subject}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="s-message"
                  className="text-xs uppercase tracking-[0.15em] text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="s-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-300 focus:border-accent/60 focus-visible:ring-2 focus-visible:ring-ring/40"
                />
                {fieldErrors?.message && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              {state && !state.ok && !state.fieldErrors && (
                <p className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  <AlertCircle className="size-3.5 shrink-0" />
                  {state.message}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="group flex items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-all duration-300 hover:scale-[1.02] hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-70 disabled:hover:scale-100"
              >
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Side info */}
        <aside className="flex flex-col gap-5">
          <div className="rounded-2xl border border-border bg-card/50 p-6">
            <span className="grid size-10 place-items-center rounded-lg border border-border bg-background text-accent">
              <Mail className="size-5" />
            </span>
            <p className="mt-4 font-medium text-foreground">Email us</p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              {SUPPORT_EMAIL}
            </a>
          </div>
        </aside>
      </div>
    </section>
  )
}
