"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { offers, type Offer } from "@/data/offers"

export default function ComparePage() {
  const [selected, setSelected] = useState<Offer[]>([])
  const [search, setSearch] = useState("")

  const searched = offers.filter(
    (o) =>
      !selected.find((s) => s.id === o.id) &&
      (o.name.toLowerCase().includes(search.toLowerCase()) ||
        o.category.toLowerCase().includes(search.toLowerCase())),
  )

  function add(offer: Offer) {
    if (selected.length < 3) {
      setSelected([...selected, offer])
      setSearch("")
    }
  }

  function remove(id: string) {
    setSelected(selected.filter((o) => o.id !== id))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={[
            { label: "Offers", href: "/tools" },
            { label: "Compare" },
          ]} />

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Compare Offers</h1>
            <p className="mt-2 text-muted-foreground">
              Select up to 3 offers to compare features side by side.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <h2 className="mb-3 text-sm font-semibold">
                    Add to comparison ({selected.length}/3)
                  </h2>
                  {selected.length < 3 && (
                    <div className="relative mb-3">
                      <Input
                        placeholder="Search offers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      {search && searched.length > 0 && (
                        <div className="absolute top-full mt-1 w-full rounded-lg border border-border bg-background shadow-lg">
                          {searched.slice(0, 6).map((o) => (
                            <button
                              key={o.id}
                              onClick={() => add(o)}
                              className="w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
                            >
                              <span className="font-medium">{o.name}</span>
                              <span className="ml-2 text-xs text-muted-foreground">
                                {o.category}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="space-y-2">
                    {selected.map((o) => (
                      <div
                        key={o.id}
                        className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`h-6 w-6 rounded-md bg-gradient-to-br ${o.color} text-[8px] font-bold text-white flex items-center justify-center`}>
                            {o.name.slice(0, 2)}
                          </div>
                          <span className="text-sm font-medium">{o.name}</span>
                        </div>
                        <button onClick={() => remove(o.id)} className="text-muted-foreground hover:text-foreground">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                    {selected.length === 0 && (
                      <p className="py-4 text-center text-xs text-muted-foreground">
                        Search and select offers to compare
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              {selected.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="mb-4 text-4xl">â‡„</div>
                  <h2 className="text-xl font-bold">Select offers to compare</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Search for offers on the left and add up to 3 at a time.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr>
                        <th className="w-40 border-b border-border/50 px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                          Feature
                        </th>
                        {selected.map((o) => (
                          <th
                            key={o.id}
                            className="border-b border-border/50 px-4 py-3 text-left"
                          >
                            <div className="flex items-center gap-2">
                              <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${o.color} text-xs font-bold text-white flex items-center justify-center`}>
                                {o.name.slice(0, 2)}
                              </div>
                              <Link href={`/offer/${o.id}`} className="font-semibold hover:underline">
                                {o.name}
                              </Link>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <CompareRow label="Category" values={selected.map((o) => o.category)} />
                      <CompareRow label="Discount" values={selected.map((o) => o.discount)} />
                      <CompareRow label="Description" values={selected.map((o) => o.description)} />
                      <CompareRow label="Tags" values={selected.map((o) => o.tags?.join(", ") || "â€”")} />
                      <CompareRow
                        label="Type"
                        values={selected.map((o) =>
                          [o.featured && "Featured", o.hidden_gem && "Hidden Gem", o.underrated && "Underrated"]
                            .filter(Boolean)
                            .join(", ") || "Standard",
                        )}
                      />
                      <tr>
                        <td className="border-b border-border/50 px-4 py-3 text-xs text-muted-foreground">
                          Action
                        </td>
                        {selected.map((o) => (
                          <td key={o.id} className="border-b border-border/50 px-4 py-3">
                            <Button size="sm" variant="outline" asChild>
                              <a href={o.claimUrl || "#"} target="_blank" rel="noopener noreferrer">
                                View Deal
                              </a>
                            </Button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function CompareRow({ label, values }: { label: string; values: string[] }) {
  return (
    <tr>
      <td className="border-b border-border/50 px-4 py-3 text-xs font-medium text-muted-foreground">
        {label}
      </td>
      {values.map((v, i) => (
        <td key={i} className="border-b border-border/50 px-4 py-3 text-sm">
          {v}
        </td>
      ))}
    </tr>
  )
}

