import { Suspense } from "react"
import { ResetPasswordForm } from "@/components/reset-password-form"

export const metadata = {
  title: "Reset Password — PLUGGED",
  description: "Set a new password for your PLUGGED account.",
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  )
}
