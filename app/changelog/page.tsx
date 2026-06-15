import { Clock, Gift, RefreshCw, Sparkles, Trash2, Wrench } from "lucide-react"
import Link from "next/link"

import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { changelog, type ChangelogEntry } from "@/data/changelog"
import { cn } from "@/lib/utils"

const typeConfig: Record<ChangelogEntry["type"], { icon: typeof Gift; label: string; color: string }> = {
  new: { icon: Gift, label: "New", color: "from-emerald-500 to-green-600" },
  update: { icon: RefreshCw, label: "Updated", color: "from-blue-500 to-cyan-600" },
  removed: { icon: Trash2, label: "Removed", color: "from-rose-500 to-red-600" },
  improvement: { icon: Wrench, label: "Improvement", color: "from-amber-500 to-orange-600" },
}

export default function ChangelogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Changelog" }]} />

          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 shadow-md">
              <Clock className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Changelog</h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
               Track every update, new offer, and site improvement.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-[19px] top-0 h-full w-px bg-border/60" />

            <div className="space-y-8">
              {changelog.map((entry, i) => {
                const config = typeConfig[entry.type]
                const Icon = config.icon
                return (
                  <div key={i} className="relative flex gap-5">
                    <div className={cn(
                      "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-sm",
                      `bg-gradient-to-br ${config.color}`,
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1 pt-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className={cn(
                          "inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold text-white",
                          `bg-gradient-to-r ${config.color}`,
                        )}>
                          {config.label}
                        </span>
                        <span className="text-xs text-muted-foreground">{entry.date}</span>
                      </div>
                      <h3 className="font-semibold leading-snug">{entry.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{entry.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-border/50 bg-muted/30 p-6 text-center">
            <Sparkles className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Something missing? <Link href="/wishlist" className="font-medium text-foreground underline underline-offset-2">Suggest an offer</Link></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

