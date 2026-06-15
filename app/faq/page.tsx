"use client"

import { ChevronDown, HelpCircle } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { cn } from "@/lib/utils"

const faqs = [
  {
    q: "How do I verify my student status?",
    a: "Most services use one of: school email (.edu), SheerID verification, GitHub Education, UNiDAYS, or Student Beans. Each offer page shows which method is required.",
  },
  {
    q: "Are all offers really free?",
    a: "Many offers are completely free (like JetBrains IDEs, GitHub Copilot, Figma education license). Others offer significant discounts (50-90% off). Each offer clearly shows whether it's free or discounted.",
  },
  {
    q: "How often are offers updated?",
    a: "We re-verify every offer monthly. Expired or changed offers are flagged or removed within days. Our community also helps by reporting outdated deals.",
  },
  {
    q: "Do I need a credit card for free offers?",
    a: "It depends on the offer. Azure for Students ($100 credit) requires NO credit card. Other platforms like GCP and AWS require a card even for their free tiers. We note this on each offer page.",
  },
  {
    q: "Can international students use these offers?",
    a: "Most offers are available globally. Some are region-specific (we label these clearly). Azure for Students works in most countries and is the best option for international students as it requires no credit card.",
  },
  {
    q: "How do I save offers for later?",
    a: "Click the bookmark icon on any offer to save it to your favorites. Your saved offers are stored in your browser and accessible from the Favorites page.",
  },
  {
    q: "Can I submit an offer I found?",
    a: "Absolutely! Use our Submit an Offer page. Our team reviews every submission and publishes it within 24-48 hours if it passes verification.",
  },
  {
    q: "How do I report an expired or incorrect offer?",
    a: "Each offer detail page has a 'Report expired or incorrect' button. You can also email corrections@studentperks.co.",
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "FAQ" }]} />

          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 shadow-md">
              <HelpCircle className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Everything you need to know about StudentPerks and student discounts.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Card
                key={i}
                className={cn(
                  "cursor-pointer border-border/50 transition-all",
                  openIndex === i && "border-brand-500/30 shadow-sm",
                )}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold leading-snug">{faq.q}</h3>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                        openIndex === i && "rotate-180",
                      )}
                    />
                  </div>
                  <div
                    className={cn(
                      "grid transition-all duration-200",
                      openIndex === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-border/50 bg-muted/30 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Still have questions?{" "}
              <Link href="/contact" className="font-medium text-foreground underline underline-offset-2">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
