"use client"

import { Mail } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
} from "@/lib/user-api"

export function Newsletter() {
  const { isAuthenticated, user, setNewsletterSubscribed } = useAuth()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email)
    }
  }, [user?.email])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || loading) return

    setLoading(true)
    try {
      await subscribeToNewsletter(email)
      setSubscribed(true)
      toast.success("You're subscribed!", {
        description: "We'll send you the best student deals weekly.",
      })
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to subscribe"
      )
    } finally {
      setLoading(false)
    }
  }

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

  async function handleGuestUnsubscribe() {
    if (!email || loading) return

    setLoading(true)
    try {
      await unsubscribeFromNewsletter(email)
      setSubscribed(false)
      toast.success("You have been unsubscribed")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to unsubscribe"
      )
    } finally {
      setLoading(false)
    }
  }

  if (isAuthenticated && user) {
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

  if (subscribed) {
    return (
      <div className="bg-linear-to-br from-brand-500/5 to-violet-500/5 p-6 border border-border/50 rounded-xl text-center">
        <Mail className="mx-auto mb-2 w-5 h-5 text-brand-600 dark:text-brand-400" />
        <p className="font-medium text-sm">
          You&apos;re in! Check your inbox for the best deals.
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-3"
          onClick={handleGuestUnsubscribe}
          disabled={loading}
        >
          {loading ? "Updating..." : "Turn off emails"}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="font-medium text-sm">Get weekly deals</label>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="student@school.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-9 text-sm"
        />
        <Button type="submit" size="sm" className="shrink-0" disabled={loading}>
          {loading ? "Saving..." : "Subscribe"}
        </Button>
      </div>
    </form>
  )
}
