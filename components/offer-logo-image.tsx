"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

interface OfferLogoImageProps {
  src?: string | null
  name: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  color?: string
  rounded?: "md" | "lg" | "xl" | "2xl" | "full"
}

const sizeMap = {
  sm: "h-7 w-7 text-[8px]",
  md: "h-9 w-9 text-xs",
  lg: "h-10 w-10 text-sm",
  xl: "h-12 w-12 text-base sm:h-16 sm:w-16 sm:text-xl",
}

const roundedMap = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
}

export function OfferLogoImage({
  src,
  name,
  size = "md",
  className,
  color = "bg-primary",
  rounded = "lg",
}: OfferLogoImageProps) {
  const [failed, setFailed] = useState(false)
  const initials = name.slice(0, 2).toUpperCase()

  if (src && !failed) {
    return (
      <div
        className={cn(
          "shrink-0 overflow-hidden",
          sizeMap[size],
          roundedMap[rounded],
          className,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${name} logo`}
          className="h-full w-full object-contain"
          onError={() => setFailed(true)}
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center font-bold text-white shadow-sm",
        sizeMap[size],
        roundedMap[rounded],
        color,
        className,
      )}
    >
      {initials}
    </div>
  )
}
