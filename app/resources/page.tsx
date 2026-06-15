import { BookOpen, Briefcase, CreditCard, ExternalLink, FileText, Mail, Scale, Search, Shield } from "lucide-react"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { resources, type Resource } from "@/data/offers"

const iconMap: Record<string, typeof ExternalLink> = {
  github: ExternalLink,
  mail: Mail,
  shield: Shield,
  scale: Scale,
  "file-text": FileText,
  search: Search,
  briefcase: Briefcase,
  "credit-card": CreditCard,
}

const categories = Array.from(new Set(resources.map((r) => r.category)))

export default function ResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Resources" }]} />

          <div className="mb-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-sm">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Student Resources</h1>
                <p className="mt-1 text-muted-foreground">
                  Guides, tools, and tips to help you save more and navigate student life.
                </p>
              </div>
            </div>
          </div>

          {categories.map((cat) => {
            const catResources = resources.filter((r) => r.category === cat)
            return (
              <div key={cat} className="mb-10">
                <h2 className="mb-4 text-xl font-bold">{cat}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {catResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = iconMap[resource.icon] || FileText

  return (
    <Link href={resource.href}>
      <Card className="group h-full cursor-pointer border-border/50 transition-all duration-300 hover:border-transparent hover:shadow-md">
        <CardContent className="flex items-start gap-4 p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400">
              {resource.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{resource.description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

