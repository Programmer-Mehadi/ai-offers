"use client"

import { Calculator, Check, RotateCcw } from "lucide-react"
import { useEffect, useState } from "react"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { getOffers } from "@/data/offers"
import { cn } from "@/lib/utils"

export default function SavingsCalculatorPage() {
  const [selections, setSelections] = useState<Record<string, boolean>>({})
  const [showAll, setShowAll] = useState(false)
  const [offers, setOffers] = useState<Awaited<ReturnType<typeof getOffers>>>(
    []
  )

  useEffect(() => {
    getOffers().then(setOffers)
  }, [])

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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          <Breadcrumbs items={[{ label: "Savings Calculator" }]} />

          <div className="mb-10 text-center">
            <div className="flex justify-center items-center bg-linear-to-br from-emerald-500 to-green-600 shadow-md mx-auto mb-4 rounded-2xl w-14 h-14">
              <Calculator className="w-7 h-7 text-white" />
            </div>
            <h1 className="font-bold text-3xl sm:text-4xl tracking-tight">
              Savings Calculator
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Select the offers you&apos;d use and see how much you could save
              as a student.
            </p>
          </div>

          <div className="gap-8 grid lg:grid-cols-[1fr_320px]">
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-muted-foreground text-sm">
                  {Object.keys(selections).filter((k) => selections[k]).length}{" "}
                  selected
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? "Show less" : "Show all 34"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={reset}>
                    <RotateCcw className="mr-1 w-3 h-3" /> Reset
                  </Button>
                </div>
              </div>
              <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                {displayed.map((offer) => {
                  const selected = !!selections[offer.id]
                  return (
                    <button
                      key={offer.id}
                      onClick={() => toggle(offer.id)}
                      className={cn(
                        "group flex items-start gap-3 p-3 border rounded-xl text-left transition-all",
                        selected
                          ? "border-brand-500/40 bg-brand-500/5 shadow-sm"
                          : "border-border/50 hover:border-border hover:bg-muted/30"
                      )}
                    >
                      <div
                        className={cn(
                          "flex justify-center items-center rounded-lg w-9 h-9 font-bold text-white text-sm transition-all shrink-0",
                          `bg-linear-to-br ${offer.color}`,
                          selected && "ring-2 ring-brand-500/40 ring-offset-1"
                        )}
                      >
                        {selected ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          offer.name.slice(0, 2).toUpperCase()
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm leading-tight">
                          {offer.name}
                        </p>
                        <p className="mt-0.5 text-muted-foreground text-xs">
                          {offer.category}
                        </p>
                        <span
                          className={cn(
                            "inline-block mt-1 px-1.5 py-0.5 rounded font-semibold text-[10px]",
                            `bg-linear-to-r ${offer.color}`,
                            "text-white"
                          )}
                        >
                          {offer.discount}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="lg:top-28 lg:sticky">
              <Card className="border-border/50">
                <CardContent className="p-5">
                  <h3 className="font-bold">Your total savings</h3>
                  <p className="mt-1 font-bold text-brand-600 dark:text-brand-400 text-3xl tracking-tight">
                    ${totalSaved.toLocaleString()}+
                  </p>
                  <p className="mt-1 text-muted-foreground text-xs">
                    per year using selected offers
                  </p>
                  <div className="space-y-2 mt-4">
                    {selected.length === 0 && (
                      <p className="text-muted-foreground text-xs">
                        Select offers above to calculate your savings.
                      </p>
                    )}
                    {selected.slice(0, 6).map((o) => (
                      <div
                        key={o.id}
                        className="flex justify-between items-center text-xs"
                      >
                        <span className="truncate">{o.name}</span>
                        <span className="text-muted-foreground shrink-0">
                          {o.discount}
                        </span>
                      </div>
                    ))}
                    {selected.length > 6 && (
                      <p className="text-muted-foreground text-xs">
                        +{selected.length - 6} more offers
                      </p>
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
