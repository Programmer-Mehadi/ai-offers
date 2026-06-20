import { Award, BadgeCheck, Heart, LineChart, Target } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/sections/navbar"
import { Footer } from "@/components/sections/footer"
import { getStats } from "@/data/offers"

const values = [
  {
    icon: BadgeCheck,
    title: "Verified Always",
    description: "Every offer is human-reviewed and AI cross-checked before listing. No exceptions.",
  },
  {
    icon: Heart,
    title: "Student First",
    description: "We exist to help students save money. No spam, no upsells, no data selling.",
  },
  {
    icon: Target,
    title: "Globally Accessible",
    description: "Deals from every region. We prioritize offers available worldwide and flag regional ones clearly.",
  },
  {
    icon: LineChart,
    title: "Always Fresh",
    description: "Offers are re-verified monthly. Expired deals are removed or flagged within days.",
  },
]

const team = [
  { name: "Alex Chen", role: "Founder & Editor", initials: "AC" },
  { name: "Sarah Mitchell", role: "Verification Lead", initials: "SM" },
  { name: "Raj Patel", role: "Community Manager", initials: "RP" },
]

export default async function AboutPage() {
  const stats = await getStats()
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              About us
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              We help students discover verified discounts and free tools — because being a student
              is expensive enough.
            </p>
          </div>

          <div className="mb-16 grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border/50 text-center">
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-brand-600 dark:text-brand-400">{stats.totalOffers}+</p>
                <p className="mt-1 text-sm text-muted-foreground">Verified Offers</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 text-center">
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-brand-600 dark:text-brand-400">{stats.categories}</p>
                <p className="mt-1 text-sm text-muted-foreground">Categories</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 text-center">
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-brand-600 dark:text-brand-400">{stats.studentsServed}</p>
                <p className="mt-1 text-sm text-muted-foreground">Students Served</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 text-center">
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-brand-600 dark:text-brand-400">{stats.verifiedDeals}</p>
                <p className="mt-1 text-sm text-muted-foreground">Verified & Accurate</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="mb-2 text-2xl font-bold tracking-tight">Our Mission</h2>
            <p className="text-muted-foreground">
              OfferPerks was built because finding real discounts as a student is harder than it should be.
               Most deal sites are cluttered, outdated, or full of expired offers. We&apos;re changing that
               with rigorous verification, clean design, and a laser focus on offers that actually deliver value.
            </p>
            <p className="mt-4 text-muted-foreground">
              Every offer on this site has been checked by a human, cross-referenced with official sources,
              and verified for student eligibility. If a deal expires, we know within days — and we take it down.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">What We Stand For</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {values.map((v) => {
                const Icon = v.icon
                return (
                  <Card key={v.title} className="border-border/50 transition-all hover:shadow-md">
                    <CardContent className="flex gap-4 p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{v.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{v.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">Our Team</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {team.map((member) => (
                <Card key={member.name} className="border-border/50 text-center transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-600 text-lg font-bold text-white shadow-sm">
                      {member.initials}
                    </div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border/50 bg-muted/30 p-5 text-center sm:p-8">
            <Award className="mx-auto mb-3 h-8 w-8 text-brand-600 dark:text-brand-400" />
            <h2 className="text-xl font-bold">Found a deal we missed?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Help the community — submit a verified offer and we&apos;ll review it.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/submit-offer">Submit an Offer</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

