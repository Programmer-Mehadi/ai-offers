# AI Offers

[One-sentence description: what AI Offers is and who it is for. Example: "A web app that lists current free tiers, trials, and discounts for AI tools so developers can find them in one place."]

**Live site:** [ai-offers.vercel.app](https://ai-offers.vercel.app)

## Why this project exists

[2-3 sentences: the problem you are solving. Example: "AI tool pricing and free offers change constantly and are scattered across many websites. AI Offers collects them in one searchable place."]

## Features

- [Feature 1, e.g. Browse offers by tool or category]
- [Feature 2, e.g. Search and filter]
- [Feature 3, e.g. Offer details with links to the official source]

> Replace this list with the features that actually exist in the app today.

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) with TypeScript
- [shadcn/ui](https://ui.shadcn.com/) components
- [Tailwind CSS](https://tailwindcss.com/) via PostCSS
- ESLint and Prettier for code quality
- pnpm for package management
- Deployed on [Vercel](https://vercel.com/)

## Project structure

```
app/          Next.js routes and pages
components/   Reusable UI components (including shadcn/ui)
data/         [Describe the data files, e.g. the list of offers]
hooks/        Custom React hooks
lib/          Shared utilities and helpers
public/       Static assets
apis-list.md  [Describe this file, e.g. APIs used or planned]
AGENTS.md     Instructions for AI coding agents working in this repo
```

## Getting started

### Prerequisites

- Node.js 20 or later
- [pnpm](https://pnpm.io/)

### Run locally

```bash
git clone https://github.com/Programmer-Mehadi/ai-offers.git
cd ai-offers
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Other commands

Check `package.json` for the full list of scripts. Typical ones:

```bash
pnpm build   # production build
pnpm lint    # run ESLint
```

## Adding or updating an offer

[Explain how someone adds or fixes an offer. Example: "Offers live in `data/`. Add a new entry following the existing format, include the official source link, and open a pull request."]

## Contributing

Contributions are welcome.

1. Fork the repository and create a branch from `master`.
2. Make your change and run `pnpm lint`.
3. Open a pull request describing what you changed and why.

For bugs and ideas, please [open an issue](https://github.com/Programmer-Mehadi/ai-offers/issues). Offers should link to an official source so they can be verified.

## Maintainer

Built and maintained by [Md Zahirul Islam Mehadi](https://github.com/Programmer-Mehadi).

## License

[Add a license, e.g. MIT, and include a LICENSE file in the repo.]
