export interface ChangelogEntry {
  date: string
  title: string
  description: string
  type: "new" | "update" | "removed" | "improvement"
}

export const changelog: ChangelogEntry[] = [
  {
    date: "Jun 15, 2026",
    title: "GitHub Copilot Offer Verified",
    description: "GitHub Copilot for Students has been re-verified. Still free with the GitHub Student Developer Pack. Updated claim instructions.",
    type: "update",
  },
  {
    date: "Jun 12, 2026",
    title: "Figma Education License Updated",
    description: "Figma has extended their free education license for another year. All Pro features remain free for students.",
    type: "update",
  },
  {
    date: "Jun 10, 2026",
    title: "Command Palette Launched",
    description: "Press ⌘K (or Ctrl+K) to search offers and categories from anywhere on the site. Quick navigation at your fingertips.",
    type: "improvement",
  },
  {
    date: "Jun 8, 2026",
    title: "New Guide: Free Cloud Credits",
    description: "Published 'Ultimate Guide to Free Cloud Credits for Students' — covers Azure, AWS, GCP, and Oracle offers.",
    type: "new",
  },
  {
    date: "Jun 5, 2026",
    title: "Azure for Students $100 Credit Confirmed",
    description: "Verified that Azure for Students still offers $100 in free credits with no credit card required. Updated the offer page.",
    type: "update",
  },
  {
    date: "Jun 3, 2026",
    title: "Expired: Adobe Creative Cloud 70% Off Promo",
    description: "The limited-time 70% off Adobe Creative Cloud promotion has ended. Standard student discount (60%+) remains available.",
    type: "removed",
  },
  {
    date: "Jun 1, 2026",
    title: "Canva Pro Added to Offers",
    description: "Canva Pro is now available free through the GitHub Student Developer Pack. Includes premium templates, branding kits, and more.",
    type: "new",
  },
  {
    date: "May 28, 2026",
    title: "New Guide: GitHub Student Pack Walkthrough",
    description: "Complete step-by-step guide to applying and claiming all benefits from the GitHub Student Developer Pack.",
    type: "new",
  },
  {
    date: "May 25, 2026",
    title: "Student Discounts Guide for 2026 Published",
    description: "Our comprehensive guide covering every major student discount category from software to hardware.",
    type: "new",
  },
  {
    date: "May 22, 2026",
    title: "FAQs Page Added",
    description: "New FAQ page answering common questions about student verification, offers, and site usage.",
    type: "improvement",
  },
  {
    date: "May 20, 2026",
    title: "Dark Mode Improvements",
    description: "Improved contrast and readability in dark mode across all pages. Fixed card borders and badge colors.",
    type: "improvement",
  },
  {
    date: "May 18, 2026",
    title: "JetBrains Student License Re-Verified",
    description: "Confirmed JetBrains IDEs remain free with student email. All IDEs (IntelliJ, PyCharm, WebStorm) covered.",
    type: "update",
  },
  {
    date: "May 15, 2026",
    title: "StudentPerks Launched",
    description: "Initial launch with 34 verified student offers across 12 categories. Features: search, compare, favorites, and dark mode.",
    type: "new",
  },
]
