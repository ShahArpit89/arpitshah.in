# arpitshah.in

Personal site: software engineer portfolio, wildlife photography, and a blog spanning both. Next.js (App Router) + TypeScript + Tailwind CSS, MDX content in-repo, Sanity.io for photography, deployed on Vercel.

Three documents are the source of truth — this file orients you to them, it doesn't repeat them:

- **Product/content decisions** → [docs/PRD.md](docs/PRD.md)
- **Visual system** (tokens, type, components) → [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md)
- **Git conventions** (commits, branches, PRs) → [.claude/skills/git-workflow/SKILL.md](.claude/skills/git-workflow/SKILL.md)

## How work happens here

This project develops step by step from written specs, not big batched changes — see [.claude/skills/spec-driven-dev/SKILL.md](.claude/skills/spec-driven-dev/SKILL.md). Before starting any non-trivial task: check [specs/README.md](specs/README.md) for current status (what's Done vs Planned), write a spec if one doesn't exist yet, get it confirmed, then implement only that spec's scope on a matching `spec/NNNN-slug` branch. Don't batch multiple specs into one PR.

## Running it

```bash
npm install
npm run dev        # localhost:3000
npm run build
npm run lint
npm run typecheck
npm run format      # prettier --write .
```

Node version: whatever's current when you run it (no `.nvmrc` pinned yet). Package manager: npm.

## Where things live

| Path              | What                                                |
| ----------------- | --------------------------------------------------- |
| `app/`            | Routes (App Router)                                 |
| `components/`     | Shared UI components                                |
| `content/`        | Blog MDX + `projects.json` (git-based content)      |
| `lib/`            | `fonts.ts`, `mdx.ts`, `sanity.ts`, `projects.ts`    |
| `design/`         | Finalized reference mockup (`homepage-mockup.html`) |
| `docs/`           | `PRD.md`, `DESIGN-SYSTEM.md`                        |
| `specs/`          | One spec per task — see spec-driven-dev below       |
| `.claude/skills/` | Project-specific Claude skills (this list, below)   |

## Building UI

Consult [.claude/skills/design-system-ui](/.claude/skills/design-system-ui/SKILL.md) before adding or editing anything visible. The one rule worth repeating here because it's an easy habit to slip into: **never hardcode a hex color, and never use Tailwind's `dark:` variant on token colors** — theming is entirely the CSS-variable layer in `app/globals.css` (light/dark/OS-driven, per `docs/DESIGN-SYSTEM.md`).

## Adding content

Consult [.claude/skills/content-authoring](/.claude/skills/content-authoring/SKILL.md) for blog post frontmatter, the `projects.json` shape, and image-reference conventions.

## Sanity / photography

Consult [.claude/skills/sanity-cms](/.claude/skills/sanity-cms/SKILL.md). One invariant worth stating here since it's easy to break by accident: **the app must build and run with zero Sanity environment variables set** — `lib/sanity.ts` and `app/photography/page.tsx` fall back to a placeholder grid when unconfigured. Don't add a code path that assumes Sanity is always present.

## Deploying

Consult [.claude/skills/deploy-vercel](/.claude/skills/deploy-vercel/SKILL.md) for env vars, preview deploys, and the (not yet done) DNS cutover.

## Non-decisions — don't resolve these silently

Mirrors PRD.md §8. If a task seems to require deciding one of these, stop and ask rather than picking an answer as a side effect of unrelated work:

- Whether `/studio` is embedded in the main app or split to a subdomain
- Whether individual photo detail pages (`/photography/[id]`) ship in v1
- Comments/newsletter on blog posts
- Analytics

## Verification expectations

No test suite exists yet. "Done" means: `npm run build` succeeds, `npm run lint` and `npm run typecheck` are clean, and a manual check in light theme, dark theme, and at mobile width (per the PR template's checklist). Never commit `.env.local` or any real Sanity credentials.
