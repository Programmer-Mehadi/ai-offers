import Link from "next/link"
import {
  Brain,
  Cloud,
  Code2,
  Film,
  GraduationCap,
  LucideIcon,
  Palette,
  Plane,
  Shield,
  ShoppingBag,
  Users,
  UtensilsCrossed,
  Zap,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import {
  getCategories,
  getCategoryGradientClass,
} from "@/data/offers"

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Brain,
  Zap,
  Palette,
  GraduationCap,
  Cloud,
  Film,
  ShoppingBag,
  Plane,
  Users,
  Shield,
  UtensilsCrossed,
}

export default async function CategoriesPage() {
  const categories = await getCategories()
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              All Categories
            </h1>
            <p className="mt-2 text-muted-foreground">
              Browse offers by category â€” {categories.length} categories with
              verified discounts and free tools.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon] || Code2
              const gradientClass = getCategoryGradientClass(cat.color)
              return (
                <Link key={cat.id} href={`/categories/${cat.slug}`}>
                  <Card className="group h-full cursor-pointer border-border/50 transition-all duration-300 hover:border-transparent hover:shadow-lg hover:shadow-brand-500/10">
                    <CardContent className="flex items-start gap-4 p-5">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${gradientClass} text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold">{cat.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {cat.count} verified offer{cat.count !== 1 ? "s" : ""}
                        </p>
                        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400">
                          Browse offers
                          <Zap className="h-3 w-3" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
