"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Star, Send, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { useAuth } from "@/components/auth-provider"
import { submitTestimonial } from "@/lib/user-api"

export default function SubmitTestimonialPage() {
  const { isAuthenticated, user, ready } = useAuth()
  const router = useRouter()

  const [role, setRole] = useState("")
  const [school, setSchool] = useState("")
  const [saved, setSaved] = useState("")
  const [content, setContent] = useState("")
  const [rating, setRating] = useState(5)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [sending, setSending] = useState(false)

  if (!ready) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pt-24" />
        <Footer />
      </div>
    )
  }

  if (ready && !isAuthenticated) {
    router.replace("/login?redirect=/submit-testimonial")
    return null
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (sending) return
    setError("")
    setSending(true)
    try {
      const session = JSON.parse(localStorage.getItem("offerperks-user-session") || "null")
      if (!session?.token) throw new Error("You need to sign in first")

      await submitTestimonial(session.token, {
        content,
        role: role || undefined,
        school: school || undefined,
        saved: saved || undefined,
        rating,
      })
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Share Your Experience</h1>
            <p className="mt-2 text-muted-foreground">
              Tell us how you saved money with student offers — your story helps other students find great deals.
            </p>
          </div>

          <Card className="border-border/50">
            <CardContent className="p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <Send className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h2 className="text-xl font-bold">Thank you!</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your testimonial has been submitted and will appear on the site after review.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => {
                      setSubmitted(false)
                      setRole(""); setSchool(""); setSaved(""); setContent(""); setRating(5)
                    }}
                  >
                    Submit another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
                    <p className="text-sm text-muted-foreground">
                      Submitting as <span className="font-medium text-foreground">{user?.name || user?.email}</span>
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="role" className="text-sm font-medium">Role</label>
                      <Input id="role" placeholder="e.g. Computer Science Student" value={role} onChange={(e) => setRole(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="school" className="text-sm font-medium">School</label>
                      <Input id="school" placeholder="e.g. MIT" value={school} onChange={(e) => setSchool(e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="saved" className="text-sm font-medium">Amount Saved</label>
                    <Input id="saved" placeholder="e.g. $500/year" value={saved} onChange={(e) => setSaved(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium">Your Story *</label>
                    <Textarea
                      id="content"
                      rows={4}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Share your experience — what offer helped you save money?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rating</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setRating(star)} className="p-0.5">
                          <Star className={`h-6 w-6 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">{rating} / 5</span>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  <Button type="submit" className="gap-1.5" disabled={sending}>
                    <Send className="h-4 w-4" />
                    {sending ? "Submitting..." : "Submit Testimonial"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
