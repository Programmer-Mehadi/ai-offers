"use client"

import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"

export function Newsletter() {
  const { isAuthenticated, user, setNewsletterSubscribed } = useAuth()

  const [loading, setLoading] = useState(false)

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
      <div className="w-full rounded-xl border border-border/50 bg-linear-to-br from-brand-500/5 to-violet-500/5 p-6">
        <label className="text-sm font-medium">Get weekly deals</label>
        <p className="mt-1 mb-3 text-sm text-muted-foreground">
          Sign in to subscribe to our weekly newsletter and never miss a deal.
        </p>
        <Button size="sm" asChild>
          <Link href="/login">Sign in to subscribe</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full rounded-xl border border-border/50 bg-linear-to-br from-brand-500/5 to-violet-500/5 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Weekly deals for {user.email}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Newsletter is currently{" "}
            {user.newsletterSubscribed ? "enabled" : "paused"} for your account.
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
      <p className="mt-3 text-xs text-muted-foreground">
        Need more controls? Manage them in{" "}
        <Link href="/account" className="underline underline-offset-2">
          your account
        </Link>
        .
      </p>
    </div>
  )
}
