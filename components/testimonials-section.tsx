"use client"

import { Quote } from "lucide-react"
import { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { getTestimonials } from "@/data/testimonials"
import type { Testimonial } from "@/data/testimonials"

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    getTestimonials().then(setTestimonials)
  }, [])

  return (
    <section className="bg-muted/20 py-12 sm:py-16 border-border/40 border-y">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="font-bold text-xl sm:text-2xl">
            What our community is saying
          </h2>
          <p className="mt-1 text-muted-foreground text-sm">
            Real savings from real members.
          </p>
        </div>

        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, index) => (
            <Card
              key={t.id || `${t.name}-${index}`}
              className="group hover:shadow-md border-border/50 hover:border-transparent transition-all duration-300"
            >
              <CardContent className="p-5">
                <Quote className="mb-3 w-5 h-5 text-brand-500/40 dark:text-brand-400/40" />
                <p className="text-muted-foreground text-sm leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-border/40 border-t">
                  <div className="flex justify-center items-center bg-gradient-to-br from-brand-500 to-violet-600 rounded-full w-8 h-8 font-bold text-[10px] text-white shrink-0">
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight">
                      {t.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {t.role} &middot; {t.school}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 px-2 py-1 rounded-md font-semibold text-[10px] text-emerald-600 dark:text-emerald-400 shrink-0">
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
