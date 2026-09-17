# arpitshah.in

Arpit Shah's personal site — software engineering portfolio first, wildlife photography second, and a blog spanning both. Built with Next.js, TypeScript, and Tailwind CSS.

**Live site:** arpitshah.in (not yet live — DNS cutover pending, see [PRD.md §7](PRD.md#7-open-items--next-steps)).

## Getting started

Requires Node.js (a recent LTS) and npm.

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Project structure

See [PRD.md §6](PRD.md#6-repository-structure-proposed) for the authoritative repo layout and rationale.

## Content workflow

Blog posts and projects are authored as flat files in this repo (`content/blog/*.mdx`, `content/projects.json`) and go live on `git push`. Photography goes through a headless CMS (Sanity.io) so photos can be uploaded from a phone, no git required. Full rationale in [PRD.md §3](PRD.md#3-content-model--update-workflow-hybrid); the concrete how-to for adding a post/project/photo is in [.claude/skills/content-authoring](.claude/skills/content-authoring/SKILL.md).

## Tech stack

Next.js (App Router) + TypeScript, Tailwind CSS, MDX, Sanity.io, deployed on Vercel. Full details and rationale in [PRD.md §5](PRD.md#5-tech-stack).

## Deployment

Vercel, zero-config off `main`. See [.claude/skills/deploy-vercel](.claude/skills/deploy-vercel/SKILL.md) for environment variables and the DNS cutover steps.

## Design reference

[design/homepage-mockup.html](design/homepage-mockup.html) is the finalized visual reference; [design/DESIGN-SYSTEM.md](design/DESIGN-SYSTEM.md) documents the tokens, type, and component patterns extracted from it.

## License

All rights reserved. This is a personal site, not a library intended for reuse.
