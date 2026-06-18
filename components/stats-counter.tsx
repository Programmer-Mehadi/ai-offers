"use client"

import { Gift, Globe, School, TrendingUp, type LucideIcon } from "lucide-react"

import { AnimatedCounter } from "@/components/animated-counter"

const iconMap: Record<string, LucideIcon> = {
  Gift,
  Globe,
  School,
  TrendingUp,
}

interface StatItem {
  icon: string
  value: number
  label: string
  suffix: string
}

interface StatsCounterProps {
  stats: StatItem[]
}

export function StatsCounter({ stats }: StatsCounterProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => {
            const Icon = iconMap[s.icon] || Gift
            return (
              <div key={s.label} className="group rounded-xl border border-border/50 bg-background p-6 text-center transition-all duration-300 hover:border-transparent hover:shadow-md">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/10 to-violet-500/10 transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                </div>
                <p className="text-2xl font-bold tracking-tight sm:text-3xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

