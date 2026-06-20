"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowLeft, Star, MessageSquareText } from "lucide-react"

import { useAuth } from "@/components/auth-provider"
import { Footer } from "@/components/sections/footer"
import { Navbar } from "@/components/sections/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getMyTestimonials, type MyTestimonial } from "@/lib/user-api"

export default function MyTestimonialsPage() {
  const { ready, isAuthenticated } = useAuth()
  const [testimonials, setTestimonials] = useState<MyTestimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!ready) return
    if (!isAuthenticated) return

    const session = JSON.parse(localStorage.getItem("offerperks-user-session") || "null")
    if (!session?.token) return

    getMyTestimonials(session.token)
      .then(setTestimonials)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [ready, isAuthenticated])

  if (!ready) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pt-24" />
        <Footer />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pt-24">
          <div className="mx-auto max-w-2xl px-4 py-10 text-center">
            <p className="text-muted-foreground">Sign in to view your testimonials.</p>
            <Button asChild className="mt-4">
              <Link href="/login?redirect=/account/testimonials">Sign in</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-6 gap-2">
            <Link href="/account">
              <ArrowLeft className="h-4 w-4" />
              Back to account
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My Testimonials</h1>
            <p className="mt-2 text-muted-foreground">
              Testimonials you&apos;ve submitted about your experiences with student offers.
            </p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="mt-3 h-3 w-full animate-pulse rounded bg-muted" />
                    <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-muted" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="flex flex-col items-center py-12 text-center">
                <MessageSquareText className="mb-4 h-10 w-10 text-muted-foreground" />
                <h2 className="text-lg font-semibold">No testimonials yet</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Share your experience to help other students find great deals.
                </p>
                <Button asChild className="mt-6">
                  <Link href="/submit-testimonial">Submit a testimonial</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {testimonials.map((t) => (
                <Card key={t._id} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(t.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed">{t.content}</p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      {t.role && <span>Role: {t.role}</span>}
                      {t.school && <span>School: {t.school}</span>}
                      {t.saved && <span>Saved: {t.saved}</span>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
