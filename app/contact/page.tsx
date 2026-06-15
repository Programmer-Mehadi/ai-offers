"use client"

import { Mail, MapPin, MessageSquare, Send } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@OfferPerks.co",
    href: "mailto:hello@OfferPerks.co",
  },
  {
    icon: MessageSquare,
    label: "Suggest a Correction",
    value: "corrections@OfferPerks.co",
    href: "mailto:corrections@OfferPerks.co",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Remote â€” serving students worldwide",
    href: null,
  },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h1>
            <p className="mt-2 text-muted-foreground">
              Have a question, suggestion, or found an issue? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-1">
              {contactMethods.map((method) => {
                const Icon = method.icon
                return (
                  <Card key={method.label} className="border-border/50">
                    <CardContent className="flex items-start gap-3 p-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">{method.label}</p>
                        {method.href ? (
                          <a
                            href={method.href}
                            className="text-sm font-medium hover:underline"
                          >
                            {method.value}
                          </a>
                        ) : (
                          <p className="text-sm">{method.value}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="lg:col-span-2">
              <Card className="border-border/50">
                <CardContent className="p-6 sm:p-8">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                        <Send className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h2 className="text-xl font-bold">Message sent!</h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        We&apos;ll get back to you within 24-48 hours.
                      </p>
                      <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
                        Send another message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <Input id="name" placeholder="Your name" required />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input id="email" type="email" placeholder="you@school.edu" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input id="subject" placeholder="How can we help?" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="flex min-h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
                          placeholder="Tell us more..."
                          required
                        />
                      </div>
                      <Button type="submit" className="gap-1.5">
                        <Send className="h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

