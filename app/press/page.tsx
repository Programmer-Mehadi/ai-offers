import { Download } from "lucide-react"

import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const brandAssets = [
  { name: "OfferPerks Logo (Horizontal)", format: "SVG", size: "24 KB" },
  { name: "OfferPerks Logo (Icon Only)", format: "SVG", size: "8 KB" },
  { name: "OfferPerks Logo (Horizontal Dark)", format: "SVG", size: "24 KB" },
  { name: "OfferPerks Wordmark", format: "SVG", size: "12 KB" },
]

const stats = [
  { label: "Active Offers", value: "34" },
  { label: "Categories", value: "12" },
  { label: "Monthly Visitors", value: "50K+" },
  { label: "Verified Discounts", value: "100%" },
]

export default function PressPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Press" }]} />

          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Press Kit</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Resources for journalists, bloggers, and partners covering OfferPerks.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-bold">About OfferPerks</h2>
            <p className="leading-relaxed text-muted-foreground">
              OfferPerks is a curated directory of verified discounts and free tools, focused on what students actually need.
              We help you save money on software, cloud services, entertainment, and more. Every offer is manually verified
              before being listed and re-checked monthly. Founded in 2026, we&apos;ve already helped thousands discover savings
              worth hundreds of dollars per year.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-bold">Key Facts & Stats</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <Card key={s.label} className="border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold tracking-tight text-brand-600 dark:text-brand-400">{s.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-bold">Brand Assets</h2>
            <div className="overflow-hidden rounded-xl border border-border/50">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/30">
                    <th className="px-4 py-3 text-left font-medium">Asset</th>
                    <th className="px-4 py-3 text-left font-medium">Format</th>
                    <th className="px-4 py-3 text-left font-medium">Size</th>
                    <th className="px-4 py-3 text-right font-medium">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {brandAssets.map((asset) => (
                    <tr key={asset.name} className="border-b border-border/30 last:border-0">
                      <td className="px-4 py-3 font-medium">{asset.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{asset.format}</td>
                      <td className="px-4 py-3 text-muted-foreground">{asset.size}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon-sm" asChild>
                          <a href="#" className="text-muted-foreground hover:text-foreground">
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Brand assets are available for editorial use. Please do not modify logos or claim them as your own.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl font-bold">Brand Guidelines</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" /> Use the provided logo assets without modification.</li>
              <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" /> Maintain clear space around the logo (minimum 1x the height of the OP mark).</li>
              <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" /> Primary color: indigo (#6366f1). Accent: vibrant amber (#f59e0b).</li>
              <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" /> Font: Plus Jakarta Sans for headlines, JetBrains Mono for code.</li>
              <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" /> Do not use the logo on busy backgrounds without sufficient contrast.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">Press Contact</h2>
            <Card className="border-border/50">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">
                  For press inquiries, partnership proposals, or interview requests:
                </p>
                <p className="mt-2 font-medium">
                  press@OfferPerks.co
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  We typically respond within 24 hours.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

