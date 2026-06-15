"use client"

import { ArrowUp, Lightbulb, ThumbsUp, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { toast } from "sonner"

interface Wish {
  id: string
  title: string
  description: string
  votes: number
  createdAt: string
}

function getWishes(): Wish[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem("wishlist") || "[]")
  } catch { return [] }
}

function saveWishes(wishes: Wish[]) {
  localStorage.setItem("wishlist", JSON.stringify(wishes))
  window.dispatchEvent(new CustomEvent("wishlist-updated"))
}

export default function WishlistPage() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    function sync() { setWishes(getWishes()) }
    sync()
    window.addEventListener("wishlist-updated", sync)
    return () => window.removeEventListener("wishlist-updated", sync)
  }, [])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    const newWish: Wish = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      votes: 1,
      createdAt: new Date().toISOString().split("T")[0],
    }
    saveWishes([newWish, ...wishes])
    setTitle("")
    setDescription("")
    toast.success("Wish submitted! Others can upvote it.")
  }

  function vote(id: string) {
    saveWishes(wishes.map((w) => w.id === id ? { ...w, votes: w.votes + 1 } : w))
  }

  function remove(id: string) {
    saveWishes(wishes.filter((w) => w.id !== id))
  }

  const sorted = [...wishes].sort((a, b) => b.votes - a.votes)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Wishlist" }]} />

          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 shadow-md">
              <Lightbulb className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Feature Wishlist</h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Suggest a student offer you&apos;d like to see, or upvote existing suggestions.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div>
              <h2 className="mb-4 text-lg font-bold">
                Suggestions
                {wishes.length > 0 && <span className="ml-1.5 text-sm font-normal text-muted-foreground">({wishes.length})</span>}
              </h2>
              {sorted.length === 0 ? (
                <div className="rounded-xl border border-border/50 bg-muted/30 p-8 text-center">
                  <Lightbulb className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">No suggestions yet. Be the first!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sorted.map((w) => (
                    <Card key={w.id} className="border-border/50">
                      <CardContent className="flex items-start gap-4 p-4">
                        <button
                          onClick={() => vote(w.id)}
                          className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg border border-border/50 bg-muted/30 text-xs font-bold transition-colors hover:border-brand-500/50 hover:text-brand-600 dark:hover:text-brand-400"
                        >
                          <ArrowUp className="h-3 w-3" />
                          {w.votes}
                        </button>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold leading-tight">{w.title}</h3>
                          {w.description && <p className="mt-1 text-sm text-muted-foreground">{w.description}</p>}
                          <p className="mt-1 text-[10px] text-muted-foreground">{w.createdAt}</p>
                        </div>
                        <button
                          onClick={() => remove(w.id)}
                          className="shrink-0 text-muted-foreground/50 transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Card className="border-border/50 lg:sticky lg:top-28">
                <CardContent className="p-5">
                  <h3 className="font-bold">Suggest an offer</h3>
                  <p className="mb-4 text-xs text-muted-foreground">Have an offer or feature in mind? Let us know.</p>
                  <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">Offer / Feature name</label>
                      <Input
                        placeholder="e.g. Notion AI Student Discount"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">Details (optional)</label>
                      <Textarea
                        placeholder="Describe the offer, how you found it, any relevant links..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <ThumbsUp className="mr-1.5 h-4 w-4" /> Submit suggestion
                    </Button>
                  </form>
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
