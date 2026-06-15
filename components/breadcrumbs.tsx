import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { Fragment } from "react"

import { cn } from "@/lib/utils"

interface Crumb {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
          {item.href ? (
            <Link
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ) : (
            <span className={cn("text-foreground", i === items.length - 1 && "font-medium")}>
              {item.label}
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  )
}

