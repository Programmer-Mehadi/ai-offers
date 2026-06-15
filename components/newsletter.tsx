"use client"

import { Mail } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    toast.success("You're subscribed!", {
      description: "We'll send you the best student deals weekly.",
    })
  }

  if (subscribed) {
    return (
      <div className="rounded-xl border border-border/50 bg-gradient-to-br from-brand-500/5 to-violet-500/5 p-6 text-center">
        <Mail className="mx-auto mb-2 h-5 w-5 text-brand-600 dark:text-brand-400" />
        <p className="text-sm font-medium">You&apos;re in! Check your inbox for the best deals.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="text-sm font-medium">Get weekly deals</label>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="student@school.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-9 text-sm"
        />
        <Button type="submit" size="sm" className="shrink-0">
          Subscribe
        </Button>
      </div>
    </form>
  )
}
