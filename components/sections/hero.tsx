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
  const [stats, setStats] = useState<HeroStats>({
    totalOffers: 0,
    categories: 0,
    verifiedDeals: "100%",
    studentsServed: "0",
  })

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
            o.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : []

  return (
    <section className="relative pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-28 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="-z-10 absolute inset-0">
        <div className="-top-32 -left-32 absolute bg-gradient-to-br from-brand-400/30 to-violet-500/20 blur-3xl rounded-full w-72 h-72 animate-pulse duration-[4000ms]" />
        <div className="top-1/3 -right-32 absolute bg-gradient-to-br from-sky-400/20 to-brand-500/20 blur-3xl rounded-full w-96 h-96 animate-pulse duration-[5000ms]" />
        <div className="bottom-0 left-1/3 absolute bg-gradient-to-br from-violet-400/20 to-pink-400/15 blur-3xl rounded-full w-64 h-64 animate-pulse duration-[6000ms]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-100/40 dark:from-brand-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-violet-100/30 dark:from-violet-900/10 via-transparent to-transparent" />
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-background/80 shadow-xs backdrop-blur-sm mb-6 px-4 py-1.5 border border-border rounded-full font-medium text-muted-foreground text-xs">
            <span className="flex bg-emerald-500 rounded-full w-2 h-2" />
            {stats.verifiedDeals} verified &mdash; updated daily
          </div>

          <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Premium discounts,{" "}
            <span className="bg-clip-text bg-gradient-to-r from-brand-500 to-violet-600 text-transparent">
              Don{"'"}t pay full price for great software.
            </span>
          </h1>

          <p className="mt-4 lg:mt-6 text-muted-foreground text-base sm:text-lg lg:text-xl">
            {stats.totalOffers}+ verified discounts and free tools across
            development, AI, design, and more. Every deal checked. Every savings
            real.
          </p>

          <div className="relative mx-auto mt-8 lg:mt-10 max-w-xl">
            <div className="flex items-center gap-2 bg-background shadow-brand-500/5 shadow-lg p-1.5 border border-border rounded-xl">
              <Search className="ml-3 w-5 h-5 text-muted-foreground shrink-0" />
              <Input
                placeholder="Search tools, categories, or keywords..."
                className="bg-transparent shadow-none border-0 focus-visible:ring-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
              />
              <Button size="sm" className="gap-1 shrink-0" asChild>
                <Link
                  href={
                    query.trim()
                      ? `/search?q=${encodeURIComponent(query.trim())}`
                      : "/tools"
                  }
                >
                  Search
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>

            {focused && suggestions.length > 0 && (
              <div className="top-full z-20 absolute inset-x-0 bg-background shadow-xl mt-1.5 border border-border rounded-xl overflow-hidden animate-scale-in">
                {suggestions.map((offer) => (
                  <Link
                    key={offer.id}
                    href={`/offer/${offer.id}`}
                    className="flex items-center gap-3 hover:bg-muted px-4 py-2.5 text-sm transition-colors"
                  >
                    <div
                      className={`h-7 w-7 shrink-0 rounded-md bg-gradient-to-br ${offer.color} flex items-center justify-center text-[8px] font-bold text-white`}
                    >
                      {offer.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <span className="font-medium">{offer.name}</span>
                      <span className="ml-2 text-muted-foreground text-xs">
                        {offer.category}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-xs shrink-0">
                      {offer.discount}
                    </span>
                  </Link>
                ))}
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  className="block hover:bg-muted px-4 py-2.5 border-border border-t font-medium text-muted-foreground text-xs text-center transition-colors"
                >
                  View all results for &quot;{query}&quot;
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 mt-6 text-muted-foreground text-sm">
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">
                {stats.totalOffers}+
              </span>{" "}
              Offers
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">
                {stats.categories}
              </span>{" "}
              Categories
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">
                {stats.verifiedDeals}
              </span>{" "}
              Verified
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">
                {stats.studentsServed}
              </span>{" "}
              Students
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
