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
import { useAuth } from "@/components/auth-provider"
import { toast } from "sonner"
import {
  getSuggestions,
  createSuggestion,
  voteSuggestion,
  deleteSuggestion,
  type WishlistSuggestion,
} from "@/lib/user-api"

export default function SuggestPage() {
  const [suggestions, setSuggestions] = useState<WishlistSuggestion[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    getSuggestions()
      .then(setSuggestions)
      .catch(() => toast.error("Failed to load suggestions"))
      .finally(() => setLoading(false))
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || submitting) return
    setSubmitting(true)
    try {
      const created = await createSuggestion({
        title: title.trim(),
        description: description.trim() || undefined,
      })
      setSuggestions((prev) => [created, ...prev])
      setTitle("")
      setDescription("")
      toast.success("Suggestion submitted!")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit suggestion"
      )
    } finally {
      setSubmitting(false)
    }
  }

  async function vote(id: string) {
    try {
      const updated = await voteSuggestion(id)
      setSuggestions((prev) =>
        prev.map((s) => (s._id === id ? updated : s))
      )
    } catch {
      toast.error("Failed to vote")
    }
  }

  async function remove(id: string) {
    if (!user) return
    try {
      const session = JSON.parse(
        localStorage.getItem("offerperks-user-session") || "null"
      )
      await deleteSuggestion(session?.token || "", id)
      setSuggestions((prev) => prev.filter((s) => s._id !== id))
      toast.success("Suggestion removed")
    } catch {
      toast.error("Failed to remove suggestion")
    }
  }

  const sorted = [...suggestions].sort((a, b) => b.votes - a.votes)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Suggest an Offer" }]} />

          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 shadow-md">
              <Lightbulb className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Suggest an Offer</h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Suggest a student offer you&apos;d like to see, or upvote existing suggestions.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div>
              <h2 className="mb-4 text-lg font-bold">
                Suggestions
                {suggestions.length > 0 && <span className="ml-1.5 text-sm font-normal text-muted-foreground">({suggestions.length})</span>}
              </h2>
              {loading ? (
                <div className="rounded-xl border border-border/50 bg-muted/30 p-8 text-center">
                  <p className="text-sm text-muted-foreground">Loading suggestions...</p>
                </div>
              ) : sorted.length === 0 ? (
                <div className="rounded-xl border border-border/50 bg-muted/30 p-8 text-center">
                  <Lightbulb className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">No suggestions yet. Be the first!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sorted.map((s) => (
                    <Card key={s._id} className="border-border/50">
                      <CardContent className="flex items-start gap-4 p-4">
                        <button
                          onClick={() => vote(s._id)}
                          className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg border border-border/50 bg-muted/30 text-xs font-bold transition-colors hover:border-brand-500/50 hover:text-brand-600 dark:hover:text-brand-400"
                        >
                          <ArrowUp className="h-3 w-3" />
                          {s.votes}
                        </button>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold leading-tight">{s.title}</h3>
                          {s.description && <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>}
                          <p className="mt-1 text-[10px] text-muted-foreground">
                            {new Date(s.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        {isAuthenticated && (
                          <button
                            onClick={() => remove(s._id)}
                            className="shrink-0 text-muted-foreground/50 transition-colors hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
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
                    <Button type="submit" className="w-full" disabled={submitting}>
                      <ThumbsUp className="mr-1.5 h-4 w-4" /> {submitting ? "Submitting..." : "Submit suggestion"}
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
