"use client"

import { CheckCircle2, ExternalLink, Send } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"

export default function SubmitOfferPage() {
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md">
              <Send className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Submit an Offer</h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Found a student discount or free tool that we&apos;re missing? Let us know and we&apos;ll
              verify it for the whole community.
            </p>
          </div>

          {submitted ? (
            <Card className="border-border/50">
              <CardContent className="flex flex-col items-center py-16 text-center">
                <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-500" />
                <h2 className="text-xl font-bold">Offer submitted!</h2>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Thanks for contributing. Our team will review the offer and publish it within
                  24-48 hours if it passes verification.
                </p>
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Submit another
                  </Button>
                  <Button asChild>
                    <Link href="/tools">Browse offers</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/50">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <label htmlFor="offer-name" className="text-sm font-medium">
                        Offer / Tool Name *
                      </label>
                      <Input id="offer-name" placeholder="e.g. Notion" required />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label htmlFor="offer-url" className="text-sm font-medium">
                        Offer URL *
                      </label>
                      <Input id="offer-url" type="url" placeholder="https://example.com/student" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="discount" className="text-sm font-medium">
                        Discount / Deal *
                      </label>
                      <Input id="discount" placeholder="e.g. Free Plus plan" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium">
                        Category *
                      </label>
                      <select
                        id="category"
                        className="flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="Development Tools">Development Tools</option>
                        <option value="AI & Machine Learning">AI & Machine Learning</option>
                        <option value="Productivity">Productivity</option>
                        <option value="Design & Creative">Design & Creative</option>
                        <option value="Learning & Education">Learning & Education</option>
                        <option value="Cloud & Hosting">Cloud & Hosting</option>
                        <option value="Media & Entertainment">Media & Entertainment</option>
                        <option value="Shopping & Lifestyle">Shopping & Lifestyle</option>
                        <option value="Travel & Finance">Travel & Finance</option>
                        <option value="Student Memberships">Student Memberships</option>
                        <option value="Security & Privacy">Security & Privacy</option>
                        <option value="Food & Dining">Food & Dining</option>
                      </select>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        Description *
                      </label>
                      <textarea
                        id="description"
                        rows={3}
                        className="flex min-h-[40px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
                        placeholder="Tell us about this offer — what students get, how to claim it..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="your-email" className="text-sm font-medium">
                        Your Email
                      </label>
                      <Input id="your-email" type="email" placeholder="you@school.edu" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="source" className="text-sm font-medium">
                        Source URL
                      </label>
                      <Input id="source" type="url" placeholder="https://company.com/students" />
                    </div>
                  </div>

                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
                    <p className="flex items-start gap-2">
                      <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>
                        Our team will review every submission before publishing. We prioritize
                        offers with official student verification (school email, SheerID, UNiDAYS,
                        GitHub Education, etc.).
                      </span>
                    </p>
                  </div>

                  <Button type="submit" className="gap-1.5">
                    <Send className="h-4 w-4" />
                    Submit Offer
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
