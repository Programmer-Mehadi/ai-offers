import type { Metadata } from "next"
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CookieConsent } from "@/components/cookie-consent"
import { CommandPalette } from "@/components/command-palette"
import { cn } from "@/lib/utils"

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "StudentPerks — Verified Student Discounts & Offers",
  description:
    "Discover verified student discounts, free tools, and exclusive offers across development, AI, design, and more. Save money as a student.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        fontSans.variable,
      )}
    >
      <body>
        <ThemeProvider>
          {children}
          <Toaster />
          <ScrollToTop />
          <CookieConsent />
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  )
}
