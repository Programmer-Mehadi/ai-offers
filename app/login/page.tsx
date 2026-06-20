"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { LogIn } from "lucide-react"
import { Suspense, useState } from "react"
import { toast } from "sonner"

import { Footer } from "@/components/sections/footer"
import { Navbar } from "@/components/sections/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageShell />}>
      <LoginPageContent />
    </Suspense>
  )
}

function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, ready, isAuthenticated } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const redirect = searchParams.get("redirect") || "/account"

  return (
    <LoginPageShell
      ready={ready}
      isAuthenticated={isAuthenticated}
      email={email}
      password={password}
      submitting={submitting}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  )

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return

    setSubmitting(true)
    try {
      await login({ email, password })
      toast.success("Signed in successfully")
      router.push(redirect)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sign in")
    } finally {
      setSubmitting(false)
    }
  }
}

function LoginPageShell({
  ready = false,
  isAuthenticated = false,
  email = "",
  password = "",
  submitting = false,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: {
  ready?: boolean
  isAuthenticated?: boolean
  email?: string
  password?: string
  submitting?: boolean
  onEmailChange?: (value: string) => void
  onPasswordChange?: (value: string) => void
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="flex mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-5xl">
          <div className="gap-8 grid lg:grid-cols-[1.1fr_0.9fr] w-full">
            <div className="space-y-4">
              <p className="font-medium text-brand-600 dark:text-brand-400 text-sm uppercase tracking-[0.2em]">
                Your saved offers, synced
              </p>
              <h1 className="font-bold text-4xl sm:text-5xl tracking-tight">
                Sign in to keep your wishlist, account settings, and newsletter
                choices in one place.
              </h1>
              <p className="max-w-xl text-muted-foreground">
                This account works with the Nest backend you already have
                running.                 Your wishlist stays on the server once you log in.
              </p>
            </div>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <LogIn className="w-5 h-5" />
                  Sign In
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ready && isAuthenticated ? (
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      You are already signed in.
                    </p>
                    <Button asChild className="w-full">
                      <Link href="/account">Go to account</Link>
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="font-medium text-sm">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                          onEmailChange?.(event.target.value)
                        }
                        placeholder="student@school.edu"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center gap-3">
                        <label
                          htmlFor="password"
                          className="font-medium text-sm"
                        >
                          Password
                        </label>
                        <Link
                          href="/forgot-password"
                          className="font-medium text-brand-600 dark:text-brand-400 text-xs underline underline-offset-2"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                          onPasswordChange?.(event.target.value)
                        }
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={submitting}
                    >
                      {submitting ? "Signing in..." : "Sign in"}
                    </Button>
                    <p className="text-muted-foreground text-sm">
                      New here?{" "}
                      <Link
                        href="/register"
                        className="font-medium text-foreground underline underline-offset-2"
                      >
                        Create an account
                      </Link>
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
