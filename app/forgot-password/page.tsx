"use client"

import Link from "next/link"
import { KeyRound, MailSearch } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { useAuth } from "@/components/auth-provider"
import { Footer } from "@/components/sections/footer"
import { Navbar } from "@/components/sections/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function ForgotPasswordPage() {
  const { forgotPassword, resetPassword } = useAuth()
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loadingResetToken, setLoadingResetToken] = useState(false)
  const [submittingReset, setSubmittingReset] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleResetRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loadingResetToken) return

    setLoadingResetToken(true)
    try {
      const result = await forgotPassword(email)
      setMessage(result.message)
      if (result.resetToken) {
        setToken(result.resetToken)
        toast.success("Reset token generated")
      } else {
        toast.success(result.message)
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to request reset"
      )
    } finally {
      setLoadingResetToken(false)
    }
  }

  async function handlePasswordReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submittingReset) return

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setSubmittingReset(true)
    try {
      await resetPassword({ token, newPassword })
      toast.success("Password reset successfully")
      setToken("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to reset password"
      )
    } finally {
      setSubmittingReset(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-5xl">
          <div className="space-y-3 mb-8 max-w-3xl">
            <p className="font-medium text-brand-600 dark:text-brand-400 text-sm uppercase tracking-[0.2em]">
              Recover access
            </p>
            <h1 className="font-bold text-4xl sm:text-5xl tracking-tight">
              Reset your password without touching your saved offers.
            </h1>
            <p className="text-muted-foreground">
              In this build, the backend generates a reset token directly so you
              can complete the flow before connecting a mail provider.
            </p>
          </div>

          <div className="gap-6 grid lg:grid-cols-2">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MailSearch className="w-5 h-5" />
                  Request reset token
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleResetRequest} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="reset-email"
                      className="font-medium text-sm"
                    >
                      Account email
                    </label>
                    <Input
                      id="reset-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="student@school.edu"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loadingResetToken}
                    className="w-full"
                  >
                    {loadingResetToken
                      ? "Generating token..."
                      : "Generate reset token"}
                  </Button>
                </form>

                {message ? (
                  <div className="bg-muted/40 mt-4 p-3 border border-border/50 rounded-xl text-muted-foreground text-sm">
                    <p>{message}</p>
                    {token ? (
                      <p className="mt-2 font-medium text-foreground break-all">
                        Development token: {token}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <KeyRound className="w-5 h-5" />
                  Set new password
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordReset} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="token" className="font-medium text-sm">
                      Reset token
                    </label>
                    <Input
                      id="token"
                      value={token}
                      onChange={(event) => setToken(event.target.value)}
                      placeholder="Paste the reset token"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="new-password"
                      className="font-medium text-sm"
                    >
                      New password
                    </label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      placeholder="At least 6 characters"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="confirm-reset-password"
                      className="font-medium text-sm"
                    >
                      Confirm new password
                    </label>
                    <Input
                      id="confirm-reset-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      placeholder="Repeat the new password"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submittingReset}
                    className="w-full"
                  >
                    {submittingReset
                      ? "Resetting password..."
                      : "Reset password"}
                  </Button>
                </form>

                <p className="mt-4 text-muted-foreground text-sm">
                  Remembered it?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-foreground underline underline-offset-2"
                  >
                    Back to sign in
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
