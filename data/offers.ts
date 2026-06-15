export interface Offer {
  id: string
  name: string
  description: string
  discount: string
  category: string
  featured?: boolean
  hidden_gem?: boolean
  underrated?: boolean
  audience?: "students" | "everyone"
  url: string
  color: string
  logo?: string
  tags?: string[]
  notes?: string[]
  howToClaim?: string[]
  claimUrl?: string
  isReferral?: boolean
  dateAdded?: string
  popularity?: number
  studentTypes?: string[]
  regions?: string[]
  isExpiring?: boolean
}

export interface Resource {
  id: string
  title: string
  description: string
  icon: string
  href: string
  category: string
}

export interface Category {
  id: string
  name: string
  count: number
  icon: string
  color: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  date: string
  tags: string[]
  readTime: string
}

export const categories: Category[] = [
  { id: "development", name: "Development Tools", count: 79, icon: "Code2", color: "from-blue-500 to-cyan-500" },
  { id: "ai-and-machine-learning", name: "AI & Machine Learning", count: 65, icon: "Brain", color: "from-violet-500 to-purple-500" },
  { id: "productivity", name: "Productivity", count: 55, icon: "Zap", color: "from-amber-500 to-orange-500" },
  { id: "design", name: "Design & Creative", count: 49, icon: "Palette", color: "from-pink-500 to-rose-500" },
  { id: "learning", name: "Learning & Education", count: 43, icon: "GraduationCap", color: "from-emerald-500 to-teal-500" },
  { id: "cloud-and-hosting", name: "Cloud & Hosting", count: 37, icon: "Cloud", color: "from-sky-500 to-indigo-500" },
  { id: "media", name: "Media & Entertainment", count: 24, icon: "Film", color: "from-red-500 to-pink-500" },
  { id: "shopping", name: "Shopping & Lifestyle", count: 18, icon: "ShoppingBag", color: "from-orange-500 to-red-500" },
  { id: "travel-and-finance", name: "Travel & Finance", count: 15, icon: "Plane", color: "from-teal-500 to-emerald-500" },
  { id: "memberships", name: "Student Memberships", count: 13, icon: "Users", color: "from-indigo-500 to-blue-500" },
  { id: "security", name: "Security & Privacy", count: 11, icon: "Shield", color: "from-slate-500 to-gray-500" },
  { id: "food", name: "Food & Dining", count: 6, icon: "UtensilsCrossed", color: "from-lime-500 to-green-500" },
]

export const categoryLookup: Record<string, string> = {
  "ai-and-machine-learning": "AI & Machine Learning",
  "cloud-and-hosting": "Cloud & Hosting",
  development: "Development Tools",
  design: "Design & Creative",
  productivity: "Productivity",
  learning: "Learning & Education",
  media: "Media & Entertainment",
  shopping: "Shopping & Lifestyle",
  "travel-and-finance": "Travel & Finance",
  memberships: "Student Memberships",
  security: "Security & Privacy",
  food: "Food & Dining",
}

export function getCategorySlug(name: string): string {
  const entry = Object.entries(categoryLookup).find(([, v]) => v === name)
  return entry ? entry[0] : name.toLowerCase().replace(/\s+/g, "-")
}

export const offers: Offer[] = [
  {
    id: "aerolink",
    name: "Aerolink",
    description: "Free $350+ credits â€” All Claude models via API",
    discount: "Free $350+ credits",
    category: "AI & Machine Learning",
    audience: "everyone",
    featured: true,
    url: "/offer/aerolink",
    color: "from-violet-500 to-purple-600",
    tags: ["API", "Credit", "Developer"],
    notes: [
      "Sign up and verify your account to receive $350+ in free credits.",
      "Access all Claude models through their API gateway.",
      "No credit card required for the free tier.",
    ],
    claimUrl: "#",
    isReferral: true,
  },
  {
    id: "freemodel",
    name: "FreeModel",
    description: "Free up to $300 credits â€” Claude & GPT API access",
    discount: "Free up to $300 credits",
    category: "AI & Machine Learning",
    audience: "everyone",
    featured: true,
    url: "/offer/freemodel",
    color: "from-blue-500 to-indigo-600",
    tags: ["API", "Credit", "Developer"],
    notes: [
      "Verify your account (phone or Telegram) to unlock 1 month of Pro free (~$300 value).",
      "Rate limits: $10 per 5 hours Â· $67 per week. No credit card needed.",
      "This free Pro access is only valid for your first month. After that, access expires.",
    ],
    howToClaim: [
      "Click Claim and visit the FreeModel website.",
      "Sign up and verify your account via phone or Telegram.",
      "Receive 1 month of Pro access with $300 in credits.",
    ],
    claimUrl: "#",
    isReferral: true,
  },
  {
    id: "freellmapi",
    name: "FreeLLMAPI",
    audience: "everyone",
    description: "1B+ free LLM tokens/month across 60 models",
    discount: "1B+ free tokens/month",
    category: "AI & Machine Learning",
    url: "/offer/freellmapi",
    color: "from-cyan-500 to-teal-600",
    tags: ["API", "Free", "Developer"],
    notes: [
      "Clone repo, add free API keys from providers like Gemini, Groq, Mistral, Cerebras.",
      "No credit card needed anywhere. Point any OpenAI-compatible SDK at localhost.",
      "Free for everyone â€” not student-specific.",
    ],
    claimUrl: "#",
  },
  {
    id: "bluesminds",
    name: "BluesMinds",
    description: "Free $100 credits â€” Gemini, GPT, DeepSeek & more API access",
    discount: "Free $100 credits",
    category: "AI & Machine Learning",
    audience: "everyone",
    featured: true,
    url: "/offer/bluesminds",
    color: "from-cyan-500 to-teal-600",
    tags: ["API", "Credit", "AI"],
    notes: [
      "Free $100 credits for API access to multiple LLM providers.",
      "Supports Gemini, GPT, DeepSeek and more models.",
    ],
    claimUrl: "#",
  },
  {
    id: "agentrouter",
    name: "AgentRouter",
    description: "Up to $200 free credits â€” Claude, GLM & more API access",
    discount: "Up to $200 free credits",
    category: "AI & Machine Learning",
    audience: "everyone",
    featured: true,
    url: "/offer/agentrouter",
    color: "from-emerald-500 to-green-600",
    tags: ["API", "Credit", "AI"],
    notes: ["Up to $200 in free credits for API access.", "Supports Claude, GLM and more models."],
    claimUrl: "#",
  },
  {
    id: "mnml-ai",
    name: "mnml.ai",
    description: "30% off any plan â€” AI architecture rendering tool",
    discount: "30% off any plan",
    category: "AI & Machine Learning",
    url: "/offer/mnml-ai",
    color: "from-rose-500 to-pink-600",
    tags: ["AI", "Discount", "Web"],
    notes: ["30% off any plan for students.", "AI architecture rendering tool for sketches, interiors, exteriors, and 3D models."],
    howToClaim: [
      "Click Claim Discount and visit the mnml.ai website.",
      "Sign up or log in with your student email (.edu or equivalent).",
      "Verify your student status through their verification partner.",
      "30% off any plan â€” applies immediately once verified.",
    ],
    claimUrl: "#",
  },
  {
    id: "kimchi",
    name: "Kimchi",
    audience: "everyone",
    description: "$50/mo free credits",
    discount: "$50/mo free credits",
    category: "Development Tools",
    featured: true,
    url: "/offer/kimchi",
    color: "from-orange-500 to-amber-600",
    tags: ["Credit", "Developer"],
    notes: ["$50 per month in free credits.", "Great for developers exploring new tools."],
    claimUrl: "#",
  },
  {
    id: "command-code",
    name: "Command Code",
    description: "Go plan for $1/month with $10 in credits included",
    discount: "Go plan for $1/month",
    category: "Development Tools",
    audience: "everyone",
    featured: true,
    url: "/offer/command-code",
    color: "from-rose-500 to-pink-600",
    tags: ["Discount", "Developer"],
    notes: ["Go plan available for just $1/month.", "Includes $10 in credits."],
    claimUrl: "#",
  },
  {
    id: "zed",
    name: "Zed",
    description: "Free Zed Pro for 1 year",
    discount: "Free Pro for 1 year",
    category: "Development Tools",
    featured: true,
    audience: "everyone",
    url: "/offer/zed",
    color: "from-amber-500 to-yellow-600",
    tags: ["Free", "Developer"],
    notes: ["Free Zed Pro subscription for 1 year.", "Premium code editor with AI features."],
    claimUrl: "#",
  },
  {
    id: "exa-ai",
    name: "Exa AI",
    description: "Free $10 search API credits",
    discount: "Free $10 credits",
    category: "AI & Machine Learning",
    audience: "everyone",
    hidden_gem: true,
    url: "/offer/exa-ai",
    color: "from-purple-500 to-fuchsia-600",
    tags: ["API", "Credit"],
    notes: ["Free $10 in search API credits.", "Powerful search API for AI applications."],
    claimUrl: "#",
  },
  {
    id: "humata",
    name: "Humata",
    description: "$1.99/month student plan",
    discount: "$1.99/month",
    category: "Productivity",
    hidden_gem: true,
    url: "/offer/humata",
    color: "from-indigo-500 to-violet-600",
    tags: ["Discount", "AI"],
    notes: ["Student plan for just $1.99/month.", "AI-powered document analysis tool."],
    claimUrl: "#",
  },
  {
    id: "scira",
    name: "Scira",
    description: "Scira Pro at $5/month",
    discount: "Scira Pro at $5/month",
    category: "Productivity",
    hidden_gem: true,
    url: "/offer/scira",
    color: "from-teal-500 to-cyan-600",
    tags: ["Discount", "AI"],
    notes: ["Scira Pro available at $5/month for students.", "AI research assistant."],
    claimUrl: "#",
  },
  {
    id: "scispace",
    name: "SciSpace",
    description: "Up to 40% off plans and add-on credits via Discount Codes",
    discount: "Up to 40% off",
    category: "Learning & Education",
    hidden_gem: true,
    url: "/offer/scispace",
    color: "from-green-500 to-emerald-600",
    tags: ["Discount", "Education"],
    notes: ["Up to 40% off on plans and add-on credits.", "Use discount codes at checkout."],
    claimUrl: "#",
  },
  {
    id: "surfshark-vpn",
    name: "Surfshark VPN",
    description: "87% off + 3 months extra from $1.99/mo",
    discount: "87% off + 3 months free",
    category: "Security & Privacy",
    audience: "everyone",
    hidden_gem: true,
    url: "/offer/surfshark-vpn",
    color: "from-lime-500 to-green-600",
    tags: ["Discount", "Security"],
    notes: ["87% off regular pricing.", "Get 3 extra months free.", "From just $1.99/month."],
    claimUrl: "#",
  },
  {
    id: "firecrawl",
    name: "Firecrawl",
    description: "10,000 free credits for students",
    discount: "10,000 free credits",
    category: "Development Tools",
    hidden_gem: true,
    url: "/offer/firecrawl",
    color: "from-red-500 to-rose-600",
    tags: ["Free", "Developer"],
    notes: ["10,000 free credits for students.", "Web scraping and crawling API."],
    claimUrl: "#",
  },
  {
    id: "amazon-prime",
    name: "Amazon Prime",
    description: "Free 3-6 month Prime trial, then 50% off",
    discount: "Free trial, then 50% off",
    category: "Media & Entertainment",
    underrated: true,
    url: "/offer/amazon-prime",
    color: "from-blue-500 to-blue-600",
    tags: ["Free", "Discount", "Shopping"],
    notes: ["Free 3-6 month Prime trial for students.", "Then 50% off regular Prime membership.", "Includes Prime Video, Music, and more."],
    claimUrl: "#",
  },
  {
    id: "figma",
    name: "Figma",
    description: "Free education license",
    discount: "Free education license",
    category: "Design & Creative",
    underrated: true,
    url: "/offer/figma",
    color: "from-purple-500 to-pink-600",
    tags: ["Free", "Design"],
    notes: ["Free Figma education license.", "Access to professional design tools.", "Includes FigJam for collaboration."],
    claimUrl: "#",
  },
  {
    id: "framer",
    name: "Framer",
    description: "Free Basic plan ($120 value) with toolkit, AI, and hosting",
    discount: "Free Basic plan ($120 value)",
    category: "Design & Creative",
    audience: "everyone",
    underrated: true,
    url: "/offer/framer",
    color: "from-cyan-500 to-blue-600",
    tags: ["Free", "Design", "Web"],
    notes: ["Free Basic plan valued at $120.", "Includes design toolkit, AI features, and hosting."],
    claimUrl: "#",
  },
  {
    id: "jetbrains",
    name: "JetBrains",
    description: "Free annual IDE subscription and more",
    discount: "Free annual IDE subscription",
    category: "Development Tools",
    underrated: true,
    url: "/offer/jetbrains",
    color: "from-orange-500 to-pink-600",
    tags: ["Free", "Developer"],
    notes: ["Free annual subscription to JetBrains IDEs.", "Includes IntelliJ IDEA, PyCharm, WebStorm and more."],
    claimUrl: "#",
  },
  {
    id: "kiro",
    name: "Kiro",
    description: "Free Pro plan on first upgrade + 50 free credits/month",
    discount: "Free Pro plan + 50 credits/mo",
    category: "Productivity",
    audience: "everyone",
    underrated: true,
    url: "/offer/kiro",
    color: "from-violet-500 to-indigo-600",
    tags: ["Free", "Credit", "AI"],
    notes: ["Free Pro plan on your first upgrade.", "Plus 50 free credits every month."],
    claimUrl: "#",
  },
  {
    id: "lovable",
    name: "Lovable",
    description: "50% off Pro ($12.50/mo)",
    discount: "50% off Pro ($12.50/mo)",
    category: "Development Tools",
    underrated: true,
    url: "/offer/lovable",
    color: "from-rose-500 to-red-600",
    tags: ["Discount", "Developer"],
    notes: ["50% off Pro plan.", "Just $12.50/month for students."],
    claimUrl: "#",
  },
  {
    id: "otter-ai",
    name: "Otter.ai",
    description: "20% off on Otter Pro Monthly and Annual plans",
    discount: "20% off Pro plans",
    category: "Productivity",
    underrated: true,
    url: "/offer/otter-ai",
    color: "from-emerald-500 to-teal-600",
    tags: ["Discount", "AI"],
    notes: ["20% off Otter Pro Monthly and Annual plans.", "AI-powered meeting transcription."],
    claimUrl: "#",
  },
  {
    id: "replit",
    name: "Replit",
    description: "50% off Replit Core ($10/month)",
    discount: "50% off Replit Core",
    category: "Development Tools",
    underrated: true,
    url: "/offer/replit",
    color: "from-amber-500 to-orange-600",
    tags: ["Discount", "Developer"],
    notes: ["50% off Replit Core.", "Just $10/month for students.", "Online IDE with AI features."],
    claimUrl: "#",
  },
  {
    id: "tech",
    name: ".TECH",
    description: "Free .TECH domain for 1 year",
    audience: "everyone",
    discount: "Free .TECH domain for 1 year",
    category: "Development Tools",
    url: "/offer/tech",
    color: "from-blue-500 to-indigo-600",
    tags: ["Free", "Domain"],
    claimUrl: "#",
  },
  {
    id: "1password",
    name: "1Password",
    description: "Free for 1 year, then 50% off",
    discount: "Free for 1 year, then 50% off",
    category: "Security & Privacy",
    url: "/offer/1password",
    color: "from-red-500 to-rose-600",
    tags: ["Free", "Discount", "Security"],
    claimUrl: "#",
  },
  {
    id: "adobe-creative-cloud",
    name: "Adobe Creative Cloud",
    description: "71% off Creative Cloud Pro for students and teachers",
    discount: "71% off Creative Cloud Pro",
    category: "Design & Creative",
    url: "/offer/adobe-creative-cloud",
    color: "from-orange-500 to-red-600",
    tags: ["Discount", "Design"],
    claimUrl: "#",
  },
  {
    id: "apple-music",
    name: "Apple Music",
    description: "1 month free, then ~50% off for up to 48 months",
    discount: "1 month free, then ~50% off",
    category: "Media & Entertainment",
    url: "/offer/apple-music",
    color: "from-pink-500 to-rose-600",
    tags: ["Free", "Discount", "Music"],
    claimUrl: "#",
  },
  {
    id: "airtable",
    name: "Airtable",
    description: "120-day free Team trial + 6-24 months free on approval",
    discount: "120-day free Team trial",
    category: "Productivity",
    url: "/offer/airtable",
    color: "from-emerald-500 to-teal-600",
    tags: ["Free", "Productivity"],
    claimUrl: "#",
  },
  {
    id: "github-education",
    name: "GitHub Education",
    description: "Free Student Developer Pack with $200+ in tools",
    discount: "Free Student Developer Pack",
    category: "Development Tools",
    url: "/offer/github-education",
    color: "from-gray-500 to-slate-600",
    tags: ["Free", "Developer"],
    claimUrl: "#",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Free Plus plan with unlimited blocks for students",
    discount: "Free Plus plan",
    category: "Productivity",
    url: "/offer/notion",
    color: "from-gray-500 to-zinc-600",
    tags: ["Free", "Productivity"],
    claimUrl: "#",
  },
  {
    id: "canva",
    name: "Canva",
    description: "Free Canva Pro for 1 year for students",
    discount: "Free Canva Pro for 1 year",
    category: "Design & Creative",
    url: "/offer/canva",
    color: "from-blue-500 to-cyan-600",
    tags: ["Free", "Design"],
    claimUrl: "#",
  },
  {
    id: "spotify",
    name: "Spotify",
    description: "50% off Spotify Premium for students",
    discount: "50% off Spotify Premium",
    category: "Media & Entertainment",
    url: "/offer/spotify",
    color: "from-green-500 to-emerald-600",
    tags: ["Discount", "Music"],
    claimUrl: "#",
  },
  {
    id: "microsoft-365",
    name: "Microsoft 365",
    description: "Free Microsoft 365 with 1TB OneDrive storage",
    discount: "Free Microsoft 365",
    category: "Productivity",
    url: "/offer/microsoft-365",
    color: "from-blue-500 to-indigo-600",
    tags: ["Free", "Productivity"],
    claimUrl: "#",
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    description: "Free GitHub Copilot for verified students",
    discount: "Free GitHub Copilot",
    category: "Development Tools",
    url: "/offer/github-copilot",
    color: "from-purple-500 to-violet-600",
    tags: ["Free", "AI", "Developer"],
    claimUrl: "#",
  },
  {
    id: "google-workspace",
    name: "Google Workspace",
    description: "Free Google Workspace for Education with unlimited storage",
    discount: "Free Google Workspace",
    category: "Productivity",
    url: "/offer/google-workspace",
    color: "from-blue-500 to-cyan-600",
    tags: ["Free", "Productivity"],
    claimUrl: "#",
  },
]

export const stats = {
  totalOffers: 423,
  categories: 12,
  verifiedDeals: "100%",
  studentsServed: "50K+",
}

export const blogPosts: BlogPost[] = [
  {
    id: "aws-vs-azure-vs-gcp-for-students",
    title: "Best Free Cloud for Students 2026 â€” AWS vs Azure vs GCP vs DigitalOcean",
    slug: "aws-vs-azure-vs-gcp-for-students",
    excerpt:
      "Compare the best free cloud platforms for students in 2026. Azure, GCP, AWS, and DigitalOcean â€” no credit card options, always-free tiers, and which leads to cloud jobs.",
    content: `
## Quick Answer

**Best overall for students: Azure for Students** â€” $100 credit, no credit card required, annual renewal, free CI/CD via Azure DevOps.
**Best for AI/ML and free hosting: Google Cloud** â€” $300 credit, always-free e2-micro VM, free BigQuery and Gemini API tier.
**Best for job market: AWS** â€” no student program, but most enterprise adoption (~31% market share) and highest cert value.
**Best via GitHub Education: DigitalOcean** â€” $200 credit, simplest platform, ideal for indie projects and beginners.

## The Comparison Table

| Platform | Credit Amount | Credit Card Needed? | Annual Renewal? | Student-Specific? |
|---|---|---|---|---|
| Azure for Students | $100 | No | Yes | Yes |
| GCP Free Trial | $300 | Yes | No | No |
| AWS Free Tier | Usage-based (no signup credit) | Yes | No | No |
| DigitalOcean (via GitHub) | $200 | Via GitHub | Annual | Yes |

## Deep Dive: Azure for Students

**Azure for Students is the best entry point for most students worldwide** â€” $100 in credits with no credit card required, annual renewal as long as you're enrolled, and the most generous always-free CI/CD via Azure DevOps.

What you get:
- $100 in credits for any Azure service
- Azure DevOps â€” 5 users, unlimited private repos, 1,800 CI/CD build minutes/month
- Always-free forever: Azure SQL, Cosmos DB, Azure Functions, App Service
- Azure Dev Tools for Teaching â€” free Visual Studio, SQL Server, Windows Server

## Deep Dive: Google Cloud

**Google Cloud is the best platform for students who want free AI/ML tools** â€” $300 in trial credits, the only always-free VM (e2-micro) that survives after credits expire, and the most generous free AI API tiers.

What you get:
- $300 in credits for 90 days
- Use for any GCP service: Compute Engine, Cloud Storage, BigQuery, Vertex AI, Gemini API
- Always-free services: Compute Engine (e2-micro), Cloud Run, BigQuery, Firestore

## Deep Dive: AWS

**AWS has no student-specific credit program**, but it has the highest enterprise job market share (~31%) and the most recognized certifications.

What you get:
- Free Tier: EC2 t2.micro (750 hours/month), S3 (5GB), Lambda (1M requests/month)
- AWS Educate: free self-paced courses, no credit card required
- Best for enterprise job preparation

## Deep Dive: DigitalOcean

**DigitalOcean is the simplest cloud platform for students**, available only via GitHub Education's Student Developer Pack.

What you get:
- $200 in credits for 1 year
- Droplets, App Platform, Spaces, Managed Databases
- Best for indie projects and beginners

## The Verdict

Start with Azure for Students â€” no card needed, $100 credits, annual renewal.
Stack GCP for AI/ML and free hosting â€” best free AI APIs.
Use AWS when you need a job â€” most recognized in enterprise.
Grab DigitalOcean via GitHub if you're already on GitHub Education.
    `.trim(),
    author: "Student Offers Team",
    date: "2026-04-12",
    tags: ["AWS", "Azure", "Google Cloud", "DigitalOcean", "Cloud Computing", "Students", "2026"],
    readTime: "12 min read",
  },
  {
    id: "best-free-ai-tools-for-students",
    title: "10 Best Free AI Tools Every Student Should Use in 2026",
    slug: "best-free-ai-tools-for-students",
    excerpt:
      "Discover the top free AI tools for students in 2026 â€” from coding assistants to research helpers, all available with student verification.",
    content: `
## Why Students Need AI Tools

AI tools are transforming how students learn, code, and create. Here are the best free options available with student verification.

## 1. GitHub Copilot (Free for Students)

GitHub Copilot is an AI pair programmer that suggests code as you type. Verified students get it completely free.

## 2. ChatGPT (Free Tier)

OpenAI's ChatGPT remains one of the most versatile AI tools for research, writing, and problem-solving.

## 3. Claude (Free Tier)

Anthropic's Claude excels at long-form analysis and document understanding.

## 4. Gemini (Free Tier)

Google's Gemini offers free access through Google AI Studio with generous rate limits.

## 5. Perplexity AI (Free Tier)

AI-powered search engine with citations â€” perfect for research papers.

## 6. Grammarly (Free for Students)

AI writing assistant that helps with essays, emails, and assignments.

## 7. Otter.ai (Student Discount)

AI meeting transcription with 20% off Pro plans for students.

## 8. Notion AI (Free Plan)

All-in-one workspace with AI features included in the free Plus plan for students.

## 9. Canva (Free Pro for Students)

Design platform with AI-powered features. Free Pro for 1 year with student verification.

## 10. Replit (Student Discount)

Online IDE with AI code completion. 50% off Replit Core for students.
    `.trim(),
    author: "Student Offers Team",
    date: "2026-03-28",
    tags: ["AI", "Free Tools", "Students", "Productivity", "2026"],
    readTime: "8 min read",
  },
  {
    id: "student-discounts-guide-2026",
    title: "The Ultimate Student Discounts Guide 2026 â€” Save $1000+",
    slug: "student-discounts-guide-2026",
    excerpt:
      "A comprehensive guide to student discounts in 2026. Learn how to save over $1000 per year on software, services, and everyday essentials.",
    content: `
## How Much Can You Really Save?

Students can save over $1000 per year by taking advantage of verified student discounts. Here's everything you need to know.

## Software & Development Tools

The biggest savings come from development tools and creative software:
- JetBrains IDEs: Free annual subscription ($249 value)
- GitHub Copilot: Free ($120/year value)
- Figma: Free education license ($144/year value)
- Adobe Creative Cloud: 71% off ($300+ savings)

## AI & ML Tools

AI tools are increasingly offering student discounts:
- FreeModel: $300 free credits
- BluesMinds: $100 free credits
- AgentRouter: $200 free credits

## Cloud & Hosting

Cloud platforms offer substantial credits:
- Azure for Students: $100 free credits (no card needed)
- GCP Free Trial: $300 credits
- DigitalOcean: $200 via GitHub Education

## Media & Entertainment

- Spotify Premium: 50% off ($60/year savings)
- Apple Music: 50% off ($60/year savings)
- Amazon Prime: 50% off ($70/year savings)

## How to Verify Your Student Status

Most services use one of these verification methods:
1. School email (.edu or equivalent)
2. SheerID verification
3. GitHub Education verification
4. ISIC card
5. UNiDAYS or Student Beans
    `.trim(),
    author: "Student Offers Team",
    date: "2026-03-15",
    tags: ["Student Discounts", "Guide", "Savings", "2026"],
    readTime: "10 min read",
  },
  {
    id: "how-to-get-free-domains-for-students",
    title: "How to Get Free Domains and Hosting as a Student",
    slug: "how-to-get-free-domains-for-students",
    excerpt:
      "Learn how students can get free domains, hosting, and cloud credits to build their online presence without spending a dime.",
    content: `
## Free Domains for Students

### .TECH Domain
Free .TECH domain for 1 year through the .TECH Student Program. Perfect for developers and tech enthusiasts.

### GitHub Student Developer Pack
Includes free domain names from various providers. Also includes hosting credits and development tools.

## Free Hosting Options

### Vercel (Free)
Ideal for Next.js and frontend projects. Free tier includes 100GB bandwidth, 100 hours build time.

### Netlify (Free)
Great for static sites. Free tier includes 100GB bandwidth, 300 build minutes.

### Cloudflare Pages (Free)
Unlimited bandwidth, unlimited sites, 500 builds per month.

### GitHub Pages (Free)
Free static site hosting directly from your GitHub repository.

## Cloud Credits for Hosting

- Azure for Students: $100 credits (no card needed)
- GCP Free Trial: $300 credits (card required)
- DigitalOcean: $200 via GitHub Education

## Pro Tips

1. Stack multiple offers for maximum value
2. Use .edu email for education pricing
3. Join GitHub Education for bundled tools
4. Check student verification requirements before signing up
    `.trim(),
    author: "Student Offers Team",
    date: "2026-02-20",
    tags: ["Domains", "Hosting", "Free", "Students", "Guide"],
    readTime: "7 min read",
  },
  {
    id: "best-vpn-for-students-2026",
    title: "Best VPN for Students 2026 â€” Discounts and Free Options",
    slug: "best-vpn-for-students-2026",
    excerpt:
      "Compare the best VPN services for students with exclusive discounts. Surfshark, NordVPN, and more at student-friendly prices.",
    content: `
## Why Students Need a VPN

A VPN is essential for online privacy, accessing region-restricted content, and secure browsing on campus Wi-Fi.

## Best Student VPN Deals

### Surfshark VPN
87% off + 3 months extra from $1.99/mo. Unlimited devices, no-logs policy, and fast speeds.

### NordVPN
Student discount available through partner programs. 68% off 2-year plan.

### ProtonVPN (Free Tier)
Completely free with no data limits. Perfect for basic privacy needs.

## What to Look for in a Student VPN

- **Price**: Look for student-specific discounts
- **Speed**: Enough for streaming and browsing
- **Security**: Strong encryption and no-logs policy
- **Devices**: Support for multiple simultaneous connections

## Free VPN Alternatives

For students on a tight budget:
- ProtonVPN Free: Unlimited data, no logs, but limited servers
- Cloudflare WARP: Free, fast, but doesn't hide your IP from websites
- Windscribe Free: 10GB/month, 10 locations

## Security Tips

1. Always use a VPN on public Wi-Fi
2. Enable kill switch feature
3. Choose providers with no-logs policies
4. Avoid free VPNs that sell your data
    `.trim(),
    author: "Student Offers Team",
    date: "2026-02-05",
    tags: ["VPN", "Security", "Privacy", "Students", "Discounts"],
    readTime: "6 min read",
  },
]

export function getOfferBySlug(slug: string): Offer | undefined {
  return offers.find((o) => o.id === slug)
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getOffersByCategory(categoryName: string): Offer[] {
  return offers.filter((o) => o.category === categoryName)
}

export function getCategoryByName(name: string): Category | undefined {
  return categories.find((c) => c.name === name)
}

export const studentTypes = [
  { id: "high-school", label: "High School", icon: "School" },
  { id: "undergrad", label: "Undergraduate", icon: "GraduationCap" },
  { id: "graduate", label: "Graduate", icon: "BookOpen" },
  { id: "international", label: "International", icon: "Globe" },
]

export const regions = [
  { id: "global", label: "Global", flag: "ðŸŒ" },
  { id: "us", label: "United States", flag: "ðŸ‡ºðŸ‡¸" },
  { id: "eu", label: "Europe", flag: "ðŸ‡ªðŸ‡º" },
  { id: "india", label: "India", flag: "ðŸ‡®ðŸ‡³" },
  { id: "uk", label: "United Kingdom", flag: "ðŸ‡¬ðŸ‡§" },
]

export const resources: Resource[] = [
  {
    id: "github-education-guide",
    title: "How to Get GitHub Education Pack",
    description: "Step-by-step guide to claim the Student Developer Pack with $200+ in free tools.",
    icon: "github",
    href: "#",
    category: "Getting Started",
  },
  {
    id: "edu-email-guide",
    title: "Best .edu Email Services for Students",
    description: "Compare free and affordable .edu email providers for student verification.",
    icon: "mail",
    href: "#",
    category: "Getting Started",
  },
  {
    id: "sheerid-guide",
    title: "What is SheerID & How to Verify",
    description: "Everything you need to know about SheerID student verification.",
    icon: "shield",
    href: "#",
    category: "Getting Started",
  },
  {
    id: "unidays-vs-student-beans",
    title: "UNiDAYS vs Student Beans â€” Which is Better?",
    description: "Compare the two biggest student discount platforms side by side.",
    icon: "scale",
    href: "#",
    category: "Comparisons",
  },
  {
    id: "student-budget-template",
    title: "Free Student Budget Template",
    description: "Download a free spreadsheet to track your student finances.",
    icon: "file-text",
    href: "#",
    category: "Tools",
  },
  {
    id: "scholarship-databases",
    title: "Top Scholarship Databases for 2026",
    description: "Find scholarships that match your profile with these free search tools.",
    icon: "search",
    href: "#",
    category: "Tools",
  },
  {
    id: "freelance-for-students",
    title: "Best Freelance Platforms for Students",
    description: "Start earning with these student-friendly freelance marketplaces.",
    icon: "briefcase",
    href: "#",
    category: "Earning",
  },
  {
    id: "student-credit-cards",
    title: "Best Student Credit Cards 2026",
    description: "Compare credit cards designed for students with no annual fee.",
    icon: "credit-card",
    href: "#",
    category: "Finance",
  },
]

export function getRecentOffers(count = 8): Offer[] {
  return offers.slice().reverse().slice(0, count)
}

export function getExpiringOffers(count = 8): Offer[] {
  return offers.filter((o) => o.isExpiring).slice(0, count)
}

export function getPopularOffers(count = 8): Offer[] {
  return [...offers].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, count)
}

export function getTrendingOffers(count = 6): Offer[] {
  return offers.filter((o) => o.featured).slice(0, count)
}

export function getSimilarOffers(offer: Offer, count = 4): Offer[] {
  const sameCategory = offers.filter((o) => o.id !== offer.id && o.category === offer.category)
  if (sameCategory.length >= count) return sameCategory.slice(0, count)
  const fromTags = offers.filter(
    (o) =>
      o.id !== offer.id &&
      o.category !== offer.category &&
      o.tags?.some((t) => offer.tags?.includes(t)),
  )
  return [...sameCategory, ...fromTags].slice(0, count)
}

export function getAllOfferTags(): string[] {
  const tagSet = new Set<string>()
  for (const o of offers) {
    o.tags?.forEach((t) => tagSet.add(t))
  }
  return [...tagSet].sort()
}

export function getOffersByTag(tag: string): Offer[] {
  return offers.filter((o) => o.tags?.includes(tag))
}

export function getRandomOffers(count = 4): Offer[] {
  const shuffled = [...offers].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

