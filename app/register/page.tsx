"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { UserPlus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { useAuth } from "@/components/auth-provider"
import { Footer } from "@/components/sections/footer"
import { Navbar } from "@/components/sections/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function RegisterPage() {
  const router = useRouter()
  const { register, ready, isAuthenticated } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setSubmitting(true)
    try {
      await register({ name, email, password })
      toast.success("Account created successfully")
      router.push("/account")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to create account"
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="flex mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-5xl">
          <div className="gap-8 grid lg:grid-cols-[1.05fr_0.95fr] w-full">
            <div className="space-y-4">
              <p className="font-medium text-brand-600 dark:text-brand-400 text-sm uppercase tracking-[0.2em]">
                Start saving properly
              </p>
              <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
                Create an account to save offers to your wishlist and manage your offer
                profile.
              </h1>
              <p className="max-w-xl text-muted-foreground">
                Your email stays fixed after registration. You can later update
                your display name, change your password, and switch newsletter
                delivery on or off.
              </p>
            </div>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <UserPlus className="w-5 h-5" />
                  Create Account
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
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="font-medium text-sm">
                        Name
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="font-medium text-sm">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="student@school.edu"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="password" className="font-medium text-sm">
                        Password
                      </label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="At least 6 characters"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="confirm-password"
                        className="font-medium text-sm"
                      >
                        Confirm password
                      </label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        placeholder="Repeat your password"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={submitting}
                    >
                      {submitting ? "Creating account..." : "Create account"}
                    </Button>
                    <p className="text-muted-foreground text-sm">
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="font-medium text-foreground underline underline-offset-2"
                      >
                        Sign in
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
