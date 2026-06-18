<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ai-offers

## Commands

| Command | Notes |
|---|---|
| `pnpm dev` | Start the Next.js public site. |
| `pnpm build` | Build the production app. Do not rely on this alone for types. |
| `pnpm start` | Serve the production build. |
| `pnpm lint` | Run ESLint. |
| `pnpm format` | Prettier write for `**/*.{ts,tsx}`. |
| `pnpm typecheck` | Run `tsc --noEmit`; important because `next.config.ts` ignores TypeScript build errors. |

## Architecture

- Public marketing/discovery site built with the App Router in `app/`.
- Route pages live under `app/**/page.tsx`; reusable UI lives in `components/`, with shadcn/ui primitives in `components/ui/`.
- Domain fallback data and types live in `data/`; shared helpers live in `lib/`.
- API reads go through `lib/api.ts`, which uses `NEXT_PUBLIC_API_URL` or `http://localhost:3000/v1`, unwraps Nest responses from `{ success, data }`, and falls back with `lib/fallback.ts` when requests fail.
- Component install/import basics are in `README.md`; link there instead of duplicating shadcn usage instructions.

## Conventions

- Use Tailwind v4 CSS-first styling from `app/globals.css` and the aliases in `components.json` (`@/components`, `@/lib`, `@/hooks`, `@/components/ui`).
- This app uses shadcn style `radix-nova`, `rsc: true`, neutral base color, and lucide icons.
- Prefer server-compatible components unless an interaction requires a client component.
- Keep public-site data mapping in `lib/api.ts` aligned with backend slugs and Mongo `_id` fields.
