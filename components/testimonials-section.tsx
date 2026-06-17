"use client"

import { Quote } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { getTestimonials } from "@/data/testimonials"
import type { Testimonial } from "@/data/testimonials"

export async function TestimonialsSection() {
  const testimonials = await getTestimonials()
  return (
    <section className="border-y border-border/40 bg-muted/20 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold sm:text-2xl">What students are saying</h2>
          <p className="mt-1 text-sm text-muted-foreground">Real savings from real students</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <Card key={t.id} className="group border-border/50 transition-all duration-300 hover:border-transparent hover:shadow-md">
              <CardContent className="p-5">
                <Quote className="mb-3 h-5 w-5 text-brand-500/40 dark:text-brand-400/40" />
                <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{t.content}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3 border-t border-border/40 pt-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-600 text-[10px] font-bold text-white">
                    {t.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-tight">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role} &middot; {t.school}</p>
                  </div>
                  <div className="shrink-0 rounded-md bg-gradient-to-r from-emerald-500/10 to-green-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Saved {t.saved}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

