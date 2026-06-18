"use client"

import { ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getOffers, getStats } from "@/data/offers"
import type { Offer } from "@/data/offers"

type HeroStats = Awaited<ReturnType<typeof getStats>>

export function Hero() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [stats, setStats] = useState<HeroStats>({ totalOffers: 0, categories: 0, verifiedDeals: "100%", studentsServed: "0" })

  useEffect(() => {
    Promise.all([getOffers(), getStats()]).then(([o, s]) => {
      setOffers(o)
      setStats(s)
    })
  }, [])
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)

  const suggestions = query
    ? offers
        .filter(
          (o) =>
            o.name.toLowerCase().includes(query.toLowerCase()) ||
            o.category.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 5)
    : []

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-28 lg:pt-40">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-32 h-72 w-72 animate-pulse rounded-full bg-gradient-to-br from-brand-400/30 to-violet-500/20 blur-3xl duration-[4000ms]" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-sky-400/20 to-brand-500/20 blur-3xl duration-[5000ms]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-violet-400/20 to-pink-400/15 blur-3xl duration-[6000ms]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-100/40 via-transparent to-transparent dark:from-brand-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-violet-100/30 via-transparent to-transparent dark:from-violet-900/10" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-xs backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            {stats.verifiedDeals} verified &mdash; updated daily
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Student discounts,{" "}
            <span className="bg-gradient-to-r from-brand-500 to-violet-600 bg-clip-text text-transparent">
              verified for you
            </span>
          </h1>

          <p className="mt-4 text-base text-muted-foreground sm:text-lg lg:mt-6 lg:text-xl">
            {stats.totalOffers}+ verified discounts and free tools across development, AI, design, and more.
            Every deal checked. Every savings real.
          </p>

          <div className="relative mx-auto mt-8 max-w-xl lg:mt-10">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-1.5 shadow-lg shadow-brand-500/5">
              <Search className="ml-3 h-5 w-5 shrink-0 text-muted-foreground" />
              <Input
                placeholder="Search tools, categories, or keywords..."
                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
              />
              <Button size="sm" className="shrink-0 gap-1" asChild>
                <Link href={query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/tools"}>
                  Search
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            {focused && suggestions.length > 0 && (
              <div className="absolute inset-x-0 top-full z-20 mt-1.5 overflow-hidden rounded-xl border border-border bg-background shadow-xl animate-scale-in">
                {suggestions.map((offer) => (
                  <Link
                    key={offer.id}
                    href={`/offer/${offer.id}`}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-muted"
                  >
                    <div className={`h-7 w-7 shrink-0 rounded-md bg-gradient-to-br ${offer.color} text-[8px] font-bold text-white flex items-center justify-center`}>
                      {offer.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <span className="font-medium">{offer.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{offer.category}</span>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">{offer.discount}</span>
                  </Link>
                ))}
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  className="block border-t border-border px-4 py-2.5 text-center text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
                >
                  View all results for &quot;{query}&quot;
                </Link>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">{stats.totalOffers}+</span> Offers
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">{stats.categories}</span> Categories
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">{stats.verifiedDeals}</span> Verified
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">{stats.studentsServed}</span> Students
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
