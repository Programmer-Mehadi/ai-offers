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
import {
  getCategories,
  getCategoryGradientClass,
  getCategorySlug,
  type Category,
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

export async function CategoryGrid() {
  const categories = await getCategories()
  return (
    <section id="categories" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Browse by category
          </h2>
          <p className="mt-3 text-muted-foreground">
            Explore offers across {categories.length} categories â€” from
            development tools to food & dining
          </p>
        </div>

        <div className="animate-stagger grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryCard({ category }: { category: Category }) {
  const Icon = iconMap[category.icon] || Code2
  const gradientClass = getCategoryGradientClass(category.color)

  return (
    <Link href={`/${getCategorySlug(category.name)}`}>
      <Card className="group cursor-pointer border-border/50 transition-all duration-300 hover:border-transparent hover:shadow-lg hover:shadow-brand-500/10">
        <CardContent className="flex flex-col items-center gap-3 p-4 sm:p-6">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${gradientClass} text-white shadow-sm transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12`}
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-semibold sm:text-base">
              {category.name}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
              {category.count} offers
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
