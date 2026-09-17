# arpitshah.in — Project Requirements Document

**Owner:** Arpit Shah
**Domain:** arpitshah.in (registered)
**Status:** Draft v1 — scaffolding not yet started
**Last updated:** 2026-09-17

## 1. Purpose

A personal website with three jobs, in priority order:

1. Present Arpit as a **software engineer** (AI-focused) — professional summary, portfolio, projects.
2. Showcase **wildlife photography** as a second craft.
3. Host a **blog** spanning both engineering and photography posts.

The site's information hierarchy must always read software engineering first, photography second — this is a deliberate, repeated decision from the design process (see §4).

## 2. Site Map

| Route | Purpose |
|---|---|
| `/` | Home — engineering-first hero, links into Portfolio/Projects, blog preview, photography teaser last |
| `/portfolio` | Professional portfolio — role, experience, skills, case studies |
| `/projects` | Project index — cards linking out to repos/live demos (MacFileDedup, others) |
| `/blog` | Post index (all posts, both topics) |
| `/blog/[slug]` | Individual post |
| `/photography` | Photo gallery, filterable by species/trip/tag |
| `/photography/[id]` | Single photo detail (EXIF, location, larger view) — optional for v1 |

Home page order is fixed: **Hero (engineering) → Blog → Photography**, per explicit design direction — photography is always last on the home page, even though it gets its own full page elsewhere.

## 3. Content Model & Update Workflow (Hybrid)

Decided explicitly: blog and projects are git-based; photography goes through a headless CMS. Rationale — blog posts and projects are authored by Arpit at a keyboard (git is natural); photos are the highest-frequency, highest-friction content type and benefit most from a real upload UI usable from a phone.

### Blog
- **Storage:** Markdown/MDX files in `content/blog/*.mdx`, one file per post.
- **Frontmatter:** `title`, `date`, `tags` (e.g. `engineering` / `photography`), `excerpt`, `cover` (optional).
- **Images in posts:** two supported paths —
  1. Local: drop the file in `public/blog/<slug>/`, reference with a normal Markdown image tag.
  2. CMS-hosted: reference a Sanity-hosted photo's CDN URL directly, to reuse a gallery photo without duplicating the file.
- **Publish flow:** add/edit `.mdx` file → `git push` → Vercel auto-deploys (~1 min).

### Projects
- **Storage:** `content/projects.json` (array of project objects: `title`, `description`, `stack[]`, `repoUrl`, `liveUrl`, `cover`, `status`).
- **Publish flow:** edit the JSON, `git push`.

### Photography
- **Storage:** Sanity.io (headless CMS), free tier, a single `photo` document schema:
  - `image` (Sanity image asset — auto-optimized, CDN-served)
  - `title`, `caption`
  - `location`, `species`/`tags[]`
  - `camera`, `lens`, `focalLength`, `aperture`, `shutterSpeed`, `iso` (EXIF-style fields, shown as captions on the site)
  - `takenAt` (date)
  - `featured` (boolean, for home page teaser selection)
- **Publish flow:** open Sanity Studio (embedded in the Next.js app at `/studio`, or a separate `studio.arpitshah.in` subdomain) in any browser → new Photo → drag image in → fill fields → Publish. No git, no redeploy required — content is fetched live (or via ISR revalidation).
- **Studio access:** login-gated to Arpit's account only.

## 4. Design System

Carried forward from the finalized homepage mockup — see `/design/homepage-mockup.html` (attached, Version 4 / "Signal").

- **Framework:** Tailwind CSS (utility classes) + a small set of CSS custom properties for theme tokens, so the same palette drives both Tailwind arbitrary-value classes and hand-written CSS.
- **Color tokens:**
  - `--paper` / `--paper-raised` — warm off-white ground (light); near-black (dark)
  - `--ink` / `--ink-soft` — primary and muted text
  - `--line` — hairline borders/dividers
  - `--flare` (raspberry-pink, `#c22a5c` light / `#ef5c86` dark) — the single engineering accent
  - `--gold` (`#b9812f` light / `#dba75a` dark) — the photography accent, used sparingly (tags, "Also" labels)
- **Type:**
  - Display: **Instrument Serif** (italic), used restrained — headline only
  - Body: **Karla**
  - Mono/labels: **Fragment Mono** — nav, timestamps, tags, the live IST clock
- **Theming:** all three viewer states supported — explicit light, explicit dark, and OS-driven (`prefers-color-scheme`) with no explicit choice.
- **Signature details established during design review:**
  - Header is a single row, one hairline border — no stacked/double dividers (a real CSS bug — `.masthead nav` instead of `.masthead .nav` — caused an earlier double-line/underline/bullet regression; watch for this class of bug when porting to components).
  - Nav links are plain text, not styled as buttons; hover underline grows from the left.
  - Hero copy is written in first person, conversational ("Hi, I'm Arpit — I build applied-AI products, end to end."), not third-person/editorial.
  - Hero includes a live Asia/Kolkata clock as a small authentic detail.
  - Section order is fixed: Hero → Blog → Photography, with an "Also —" label marking the photography section as secondary.
  - Below-the-fold sections (Blog, Photography) scroll-reveal on first view via `IntersectionObserver`; everything above the fold is visible at rest (no content ever starts hidden waiting on JS).
  - Photography grid uses hover-zoom on tiles; all photos in the mockup are placeholders and must be swapped for real frames before launch.

This design system (tokens, type, component patterns) is the baseline for every subpage — Portfolio, Projects, Blog, and Photography should all read as the same product, not four different skins.

## 5. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | |
| Styling | Tailwind CSS + CSS custom properties for theme tokens | matches mockup |
| Blog content | MDX files in-repo | see §3 |
| Projects content | JSON in-repo | see §3 |
| Photo content | Sanity.io (headless CMS) | see §3 |
| Image optimization | `next/image` (local) + Sanity's image CDN (gallery) | |
| Hosting | Vercel | zero-config Next.js deploys, free tier |
| Domain | arpitshah.in, DNS pointed at Vercel | not yet switched over |

## 6. Repository Structure (proposed)

```
arpitshah.in/
  app/
    page.tsx                 → home
    portfolio/page.tsx
    projects/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    photography/page.tsx
    studio/[[...tool]]/page.tsx   → embedded Sanity Studio (optional)
  content/
    blog/*.mdx
    projects.json
  lib/
    sanity.ts                → Sanity client + image URL builder
    mdx.ts                   → frontmatter/MDX parsing helpers
  components/
    Nav.tsx, Footer.tsx, PostCard.tsx, ProjectCard.tsx, PhotoGrid.tsx
  design/
    homepage-mockup.html     → finalized reference mockup (this document's attachment)
  public/
    blog/<slug>/...          → local post images
  PRD.md                     → this document
```

## 7. Open Items / Next Steps

1. Scaffold the Next.js + Tailwind project, porting the mockup's design tokens into `app/globals.css` / `tailwind.config`.
2. Build the home page from the mockup first (§4), then Portfolio, Projects, Blog, Photography in that order.
3. Arpit creates a free Sanity.io account and project; wire up `lib/sanity.ts` and the `photo` schema.
4. Write initial content: a few real projects, at least one real blog post, a first batch of real photos (replacing all placeholders).
5. Deploy to Vercel; switch arpitshah.in DNS over once the site is ready to go live.

## 8. Explicit Non-Decisions (deferred)

- Whether `/studio` is embedded in the main app or split to a subdomain — decide during Sanity setup.
- Whether individual photo detail pages (`/photography/[id]`) ship in v1 or later.
- Comments/newsletter on blog posts — not in scope unless requested.
- Analytics — not in scope unless requested.
