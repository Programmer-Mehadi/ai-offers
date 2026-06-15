"use client"

import { ArrowRight, Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { stats } from "@/data/offers"

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-28 lg:pt-40">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-100/40 via-transparent to-transparent dark:from-brand-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-violet-100/30 via-transparent to-transparent dark:from-violet-900/10" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-xs backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            {stats.verifiedDeals} verified — updated daily
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Student discounts,{" "}
            <span className="bg-gradient-to-r from-brand-500 to-violet-600 bg-clip-text text-transparent">
              verified for you
            </span>
          </h1>

          <p className="mt-4 text-base text-muted-foreground sm:text-lg lg:mt-6 lg:text-xl">
            {stats.totalOffers}+ verified student offers across development, AI, design, and more.
            Every deal checked. Every savings real.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-xl border border-border bg-background p-1.5 shadow-lg shadow-brand-500/5 lg:mt-10">
            <Search className="ml-3 h-5 w-5 shrink-0 text-muted-foreground" />
            <Input
              placeholder="Search tools, categories, or keywords..."
              className="border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
            <Button size="sm" className="shrink-0 gap-1" asChild>
              <Link href="/tools">
                Search
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
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
