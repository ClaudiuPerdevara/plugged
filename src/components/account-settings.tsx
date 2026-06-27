"use client"

import { useTransition } from "react"
import { toast } from "sonner"
import { Lock, ShieldCheck, KeyRound, Loader2 } from "lucide-react"
import { resetPasswordAction } from "@/lib/actions"
import type { AccountInfo } from "@/lib/data"

export function AccountSettings({ account }: { account: AccountInfo }) {
  const [resetting, startReset] = useTransition()

  function handleResetPassword() {
    startReset(async () => {
      const res = await resetPasswordAction()
      if (res?.ok) toast.success(res.message)
      else toast.error(res?.message ?? "Couldn't send reset link.")
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* User details */}
      <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm">
        <h3 className="font-heading text-lg font-bold tracking-tight text-foreground">
          Account Details
        </h3>
        <div className="mt-5 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Name
            </label>
            <input
              type="text"
              readOnly
              value={account.name}
              className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Email
            </label>
            <input
              type="email"
              readOnly
              value={account.email}
              className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none"
            />
          </div>
          {account.hasPassword ? (
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Password
              </label>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="password"
                  readOnly
                  value="••••••••••••"
                  className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none"
                />
                <button
                  type="button"
                  onClick={handleResetPassword}
                  disabled={resetting}
                  className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70"
                >
                  {resetting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <KeyRound className="size-4" />
                  )}
                  Reset Password
                </button>
              </div>
            </div>
          ) : (
            <p className="rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-muted-foreground">
              You signed in with Google. Password management isn&apos;t needed
              for this account.
            </p>
          )}
        </div>
      </section>

      {/* Security & privacy */}
      <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-accent" />
          <h3 className="font-heading text-lg font-bold tracking-tight text-foreground">
            Security &amp; Privacy
          </h3>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <span className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-foreground">
            <Lock className="size-4 text-accent" />
            End-to-end encrypted
          </span>
          <span className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-medium text-foreground">
            <ShieldCheck className="size-4 text-accent" />
            Secured &amp; private
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Your supplier links and account data are end-to-end encrypted and
          secured. We never share or sell your vault — your plugs stay yours.
        </p>

        <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-background/40 p-4 opacity-70">
          <div className="pr-4">
            <p className="font-medium text-foreground">
              Two-Factor Authentication (2FA)
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Coming soon — extra login protection for your vault.
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
            Soon
          </span>
        </div>
      </section>
    </div>
  )
}
