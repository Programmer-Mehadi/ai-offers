"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { getOffers, getCategories, getCategorySlug } from "@/data/offers"
import type { Offer, Category } from "@/data/offers"
import { cn } from "@/lib/utils"

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [offers, setOffers] = useState<Offer[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    Promise.all([getOffers(), getCategories()]).then(([o, c]) => {
      setOffers(o)
      setCategories(c)
    })
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((v) => {
          if (!v) {
            setQuery("")
            setSelectedIndex(0)
          }
          return !v
        })
      }
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const results = query
    ? [
        ...offers
          .filter(
            (o) =>
              o.name.toLowerCase().includes(query.toLowerCase()) ||
              o.category.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5)
          .map((o) => ({
            type: "offer" as const,
            label: o.name,
            description: o.category,
            href: `/offer/${o.id}`,
            color: o.color,
          })),
        ...categories
          .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 3)
          .map((c) => ({
            type: "category" as const,
            label: c.name,
            description: `${c.count} offers`,
            href: `/categories/${getCategorySlug(c.name)}`,
            color: c.color,
          })),
      ]
    : []

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1))
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    }
    if (e.key === "Enter" && results[selectedIndex]) {
      window.location.href = results[selectedIndex].href
      setOpen(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => {
          setOpen(false)
        }}
      />
      <div className="animate-scale-in relative z-10 w-full max-w-lg rounded-xl border border-border bg-background shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={onKeyDown}
            placeholder="Search offers, categories..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          <kbd className="hidden rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline-block">
            ESC
          </kbd>
        </div>
        {results.length > 0 && (
          <div className="max-h-72 overflow-y-auto p-2">
            {results.map((r, i) => (
              <Link
                key={`${r.type}-${r.label}`}
                href={r.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  i === selectedIndex ? "bg-muted" : "hover:bg-muted"
                )}
              >
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-md text-[8px] font-bold text-white",
                    r.type === "category"
                      ? "bg-muted-foreground/30"
                      : `bg-gradient-to-br ${r.color}`
                  )}
                >
                  {r.label.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="leading-tight font-medium">{r.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.description}
                  </p>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {r.type}
                </span>
              </Link>
            ))}
          </div>
        )}
        {query && results.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            No results found
          </div>
        )}
        <div className="border-t border-border px-4 py-2 text-[10px] text-muted-foreground">
          <kbd className="rounded border border-border px-1 py-0.5">↑↓</kbd>{" "}
          navigate{" "}
          <kbd className="rounded border border-border px-1 py-0.5">↵</kbd>{" "}
          select{" "}
          <kbd className="rounded border border-border px-1 py-0.5">ESC</kbd>{" "}
          close
        </div>
      </div>
    </div>
  )
}
