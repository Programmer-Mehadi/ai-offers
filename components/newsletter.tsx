"use client"

import { Mail } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const { isAuthenticated, user, setNewsletterSubscribed } = useAuth()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email)
    }
  }, [user?.email])

  async function handleAuthenticatedToggle() {
    if (!user || loading) return

    setLoading(true)
    try {
      const nextSubscribed = !user.newsletterSubscribed
      await setNewsletterSubscribed(nextSubscribed)
      toast.success(nextSubscribed ? "Newsletter enabled" : "Newsletter paused")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to update newsletter"
      )
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="bg-linear-to-br from-brand-500/5 to-violet-500/5 p-6 border border-border/50 rounded-xl">
        <label className="font-medium text-sm">Get weekly deals</label>
        <p className="mt-1 mb-3 text-muted-foreground text-sm">
          Sign in to subscribe to our weekly newsletter and never miss a deal.
        </p>
        <Button size="sm" asChild>
          <Link href="/login">Sign in to subscribe</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-linear-to-br from-brand-500/5 to-violet-500/5 p-6 border border-border/50 rounded-xl">
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="font-medium text-sm">Weekly deals for {user.email}</p>
          <p className="mt-1 text-muted-foreground text-sm">
            Newsletter is currently{" "}
            {user.newsletterSubscribed ? "enabled" : "paused"} for your
            account.
          </p>
        </div>
        <Button
          variant={user.newsletterSubscribed ? "outline" : "default"}
          size="sm"
          onClick={handleAuthenticatedToggle}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : user.newsletterSubscribed
              ? "Turn off"
              : "Turn on"}
        </Button>
      </div>
      <p className="mt-3 text-muted-foreground text-xs">
        Need more controls? Manage them in{" "}
        <Link href="/account" className="underline underline-offset-2">
          your account
        </Link>
        .
      </p>
    </div>
  )
}
