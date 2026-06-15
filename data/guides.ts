export interface Guide {
  id: string
  slug: string
  title: string
  description: string
  category: string
  author: string
  date: string
  readTime: string
  sections: { heading: string; content: string }[]
}

export const guides: Guide[] = [
  {
    id: "free-cloud-credits",
    slug: "free-cloud-credits",
    title: "Ultimate Guide to Free Cloud Credits for Students",
    description: "How to get $500+ in free cloud credits from AWS, Google Cloud, Azure, and more â€” no credit card required for most.",
    category: "Cloud & DevOps",
    author: "OfferPerks Team",
    date: "Jun 10, 2026",
    readTime: "12 min read",
    sections: [
      {
        heading: "Why Cloud Credits Matter",
        content: "Cloud platforms offer free credits to students to learn cloud computing, deploy projects, and experiment without worrying about costs. You can use them to host a portfolio, train ML models, or learn DevOps. Most programs auto-renew yearly while you're a student.",
      },
      {
        heading: "Microsoft Azure for Students ($100)",
        content: "Azure for Students gives you $100 in credit (no credit card required) plus free access to popular services like App Service, Functions, and Cosmos DB. Sign up with your school email. The $100 credit refreshes each year you're a student. You also get access to Azure DevOps, GitHub Copilot, and Microsoft Learn sandboxes for free.",
      },
      {
        heading: "AWS Educate & AWS Free Tier",
        content: "AWS Educate provides up to $200 in credits depending on your course. Plus the AWS Free Tier gives you 12 months of free access to core services (EC2 t2.micro, S3 5GB, Lambda 1M requests). AWS requires a credit card even for the free tier, but the Educate credits don't â€” use those first.",
      },
      {
        heading: "Google Cloud for Students ($300+)",
        content: "Google Cloud gives new users $300 in free credits (90-day window) plus 20+ always-free products. Google Cloud Skills Boost also offers 30 days of free access to their hands-on labs. Many universities have partnerships with Google that extend these benefits.",
      },
      {
        heading: "GitHub Student Developer Pack",
        content: "The GitHub Student Pack includes $200+ in credits: DigitalOcean ($200), Heroku ($13/mo), Namecheap (.me domain free), and more. Also includes free access to GitHub Copilot, JetBrains IDEs, and GitKraken. Apply with your school email or student ID through SheerID.",
      },
      {
        heading: "Oracle Cloud Free Tier",
        content: "Oracle Cloud offers a generous free tier that's always-free: 2 AMD VMs, 4 ARM cores (24GB RAM), 200GB storage. The free tier doesn't expire. Requires a credit card for signup. Best for ARM-based workloads like running a Minecraft server or self-hosting apps.",
      },
      {
        heading: "Tips to Maximize Your Credits",
        content: "Start with Azure for Students since it requires no credit card. Use GitHub Student Pack for DigitalOcean credits if you need simple VMs. Layer free tiers from multiple providers. Set budget alerts to avoid surprise charges. Use automation (Terraform/Pulumi) to shutdown resources when not in use.",
      },
    ],
  },
  {
    id: "github-student-pack",
    slug: "github-student-pack",
    title: "How to Get GitHub Student Developer Pack (2026)",
    description: "Complete walkthrough to claim the GitHub Student Developer Pack â€” what's inside, how to apply, and how to make the most of it.",
    category: "Developer Tools",
    author: "OfferPerks Team",
    date: "May 28, 2026",
    readTime: "8 min read",
    sections: [
      {
        heading: "What is the GitHub Student Pack?",
        content: "The GitHub Student Developer Pack is a collection of free tools and services curated by GitHub Education. It's valued at over $200 and includes everything from cloud hosting to IDEs to domain names. It's available to students 13+ who are currently enrolled in a degree or diploma program.",
      },
      {
        heading: "What's Included in 2026",
        content: "The pack includes: GitHub Copilot (free while a student), JetBrains IDEs (IntelliJ, PyCharm, WebStorm â€” all free), DigitalOcean $200 credit, Namecheap .me domain (1 year free), GitHub Pro account, Sentry $1,000/month credit, Heroku $13/month credit, Datadog, Better Code Hub, and 50+ more tools. Some are free forever as a student, others are time-limited credits.",
      },
      {
        heading: "How to Apply",
        content: "Go to education.github.com and click 'Get student benefits'. Sign in with your GitHub account. Upload proof of enrollment: school-issued ID, transcript, or enrollment letter. SheerID verifies your status within minutes in most cases. If you use a .edu email, the process is automatic.",
      },
      {
        heading: "Verification Tips",
        content: "Using your .edu email is the fastest method. If your school isn't in their system, submit a document instead â€” a tuition receipt or class schedule works. SheerID typically responds in under 2 minutes. International students from 150+ countries are supported. The pack expires after 2 years, but you can re-apply if still a student.",
      },
      {
        heading: "Best Tools to Claim First",
        content: "Prioritize: 1) GitHub Copilot (best AI coding assistant, free for students), 2) JetBrains IDEs (professional-grade, normally $249/yr each), 3) DigitalOcean $200 credit (simple cloud VMs), 4) Namecheap .me domain (build your portfolio site), 5) Canva Pro (design assets for projects and presentations).",
      },
    ],
  },
  {
    id: "student-discounts-2026",
    slug: "student-discounts-2026",
    title: "The Complete Student Discounts Guide for 2026",
    description: "Every major student discount available in 2026 â€” from software to subscriptions to hardware â€” and how to claim them.",
    category: "General",
    author: "OfferPerks Team",
    date: "May 15, 2026",
    readTime: "15 min read",
    sections: [
      {
        heading: "Why Student Discounts Matter More Than Ever",
        content: "With the rising cost of education, every dollar saved counts. Student discounts can reduce your annual software costs by 50-90%. The average student saves $800-1,200 per year by using student deals on tools they already need. This guide covers every major discount category.",
      },
      {
        heading: "Developer Tools & IDEs",
        content: "JetBrains: All IDEs free with student license. GitHub Copilot: Free for students. Visual Studio Enterprise: Free through Azure for Students. Replit: 50% off Hacker Plan. Sublime Text: Free evaluation. GitKraken: Free Pro with GitHub Student Pack. Tableau: 1 year free with Tableau for Students.",
      },
      {
        heading: "Design & Creative Software",
        content: "Figma: Free education license (all Pro features). Adobe Creative Cloud: 60%+ off ($19.99/mo vs $59.99). Canva Pro: Free with GitHub Student Pack. Sketch: 50% off ($4.50/mo). Spline: Free education plan. Blender: Always free! SketchUp: Free web-based version.",
      },
      {
        heading: "Music & Entertainment",
        content: "Spotify Premium: 50% off ($5.99/mo). Apple Music: Student plan ($5.99/mo) includes Apple TV+. YouTube Premium: $7.99/mo (includes YouTube Music). Hulu: $1.99/mo for students. Amazon Prime: 50% off ($6.49/mo) with 6-month free trial. Peacock: $1.99/mo.",
      },
      {
        heading: "Cloud & Hosting",
        content: "Azure for Students: $100 free (no credit card). AWS Educate: Up to $200 credits. Google Cloud: $300 new user credits. DigitalOcean: $200 via GitHub Student Pack. Vercel: Free Hobby plan (enough for most projects). Netlify: Free tier with generous limits. Railway: $5 credit monthly with GitHub Student Pack.",
      },
      {
        heading: "Productivity & Learning",
        content: "Notion: Free Plus plan with student email. Todoist: 50% off Pro. Evernote: 50% off Personal. Grammarly: 45% off Premium. Skillshare: 1 month free trial + 50% off. Coursera: Free audit most courses, financial aid available. DataCamp: 50% off. Brilliant: 20% off annual.",
      },
      {
        heading: "Hardware & Apple Education Pricing",
        content: "Apple Education Store: $100-200 off MacBooks, $50-100 off iPads, plus free AirPods during back-to-school. Microsoft Store: 10% off Surface devices. Samsung: Education discount program (varies). Best Buy: Student discounts on select items through Student Deals. Adobe: 60%+ off creative cloud.",
      },
    ],
  },
]

