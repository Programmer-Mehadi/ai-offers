"use client"

import { Calculator, Check, RotateCcw } from "lucide-react"
import { useState } from "react"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { offers } from "@/data/offers"
import { cn } from "@/lib/utils"

export default function SavingsCalculatorPage() {
  const [selections, setSelections] = useState<Record<string, boolean>>({})
  const [showAll, setShowAll] = useState(false)

  const displayed = showAll ? offers : offers.slice(0, 16)

  function toggle(id: string) {
    setSelections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function reset() {
    setSelections({})
  }

  const selected = offers.filter((o) => selections[o.id])
  const totalSaved = selected.reduce((sum, o) => {
    const match = o.discount.match(/\$?(\d+)/)
    const amount = match ? parseInt(match[1]) : 50
    return sum + amount
  }, 0)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Savings Calculator" }]} />

          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-md">
              <Calculator className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Savings Calculator</h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Select the offers you&apos;d use and see how much you could save as a student.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {Object.keys(selections).filter((k) => selections[k]).length} selected
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowAll(!showAll)}>
                    {showAll ? "Show less" : "Show all 34"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={reset}>
                    <RotateCcw className="mr-1 h-3 w-3" /> Reset
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {displayed.map((offer) => {
                  const selected = !!selections[offer.id]
                  return (
                    <button
                      key={offer.id}
                      onClick={() => toggle(offer.id)}
                      className={cn(
                        "group flex items-start gap-3 rounded-xl border p-3 text-left transition-all",
                        selected
                          ? "border-brand-500/40 bg-brand-500/5 shadow-sm"
                          : "border-border/50 hover:border-border hover:bg-muted/30",
                      )}
                    >
                      <div className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white transition-all",
                        `bg-gradient-to-br ${offer.color}`,
                        selected && "ring-2 ring-offset-1 ring-brand-500/40",
                      )}>
                        {selected ? <Check className="h-4 w-4" /> : offer.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-tight">{offer.name}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{offer.category}</p>
                        <span className={cn(
                          "mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold",
                          `bg-gradient-to-r ${offer.color}`,
                          "text-white",
                        )}>
                          {offer.discount}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="lg:sticky lg:top-28">
              <Card className="border-border/50">
                <CardContent className="p-5">
                  <h3 className="font-bold">Your total savings</h3>
                  <p className="mt-1 text-3xl font-bold tracking-tight text-brand-600 dark:text-brand-400">
                    ${totalSaved.toLocaleString()}+
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">per year using selected offers</p>
                  <div className="mt-4 space-y-2">
                    {selected.length === 0 && (
                      <p className="text-xs text-muted-foreground">Select offers above to calculate your savings.</p>
                    )}
                    {selected.slice(0, 6).map((o) => (
                      <div key={o.id} className="flex items-center justify-between text-xs">
                        <span className="truncate">{o.name}</span>
                        <span className="shrink-0 text-muted-foreground">{o.discount}</span>
                      </div>
                    ))}
                    {selected.length > 6 && (
                      <p className="text-xs text-muted-foreground">+{selected.length - 6} more offers</p>
                    )}
                  </div>
                  <Button className="mt-4 w-full" asChild>
                    <Link href="/tools">Browse all offers</Link>
                  </Button>
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
