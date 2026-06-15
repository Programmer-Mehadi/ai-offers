import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function SkeletonCard() {
  return (
    <Card className="border-border/50">
      <div className="h-1 w-full bg-muted" />
      <CardContent className="p-5">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />
          <div className="min-w-0 flex-1">
            <div className="h-4 w-28 animate-pulse rounded bg-muted" />
            <div className="mt-1.5 h-3 w-20 animate-pulse rounded bg-muted" />
          </div>
        </div>
        <div className="h-3 w-full animate-pulse rounded bg-muted" />
        <div className="mt-1.5 h-3 w-3/4 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-5 w-24 animate-pulse rounded-md bg-muted" />
      </CardContent>
      <CardFooter className="border-t border-border/50 px-5 py-3">
        <div className="h-3 w-16 animate-pulse rounded bg-muted" />
      </CardFooter>
    </Card>
  )
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
