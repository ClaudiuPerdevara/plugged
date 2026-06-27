import { Suspense } from "react"
import { AuthForm } from "@/components/auth-form"

export const metadata = {
  title: "Create Account — PLUGGED",
  description: "Create your PLUGGED account and unlock vetted supplier bundles.",
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AuthForm mode="register" />
    </Suspense>
  )
}
