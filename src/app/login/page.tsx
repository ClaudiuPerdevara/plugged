import { Suspense } from "react"
import { AuthForm } from "@/components/auth-form"

export const metadata = {
  title: "Sign In — PLUGGED",
  description: "Sign in to access your supplier bundles and plugs.",
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AuthForm mode="login" />
    </Suspense>
  )
}
