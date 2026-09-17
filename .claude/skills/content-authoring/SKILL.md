---
name: content-authoring
description: How to add or edit a blog post, project, or photo on arpitshah.in — exact MDX frontmatter fields, image path conventions, the projects.json shape, and (once Sanity exists) the photo upload workflow. Use whenever asked to "add a blog post," "add a project," "write about X," or "add these photos to the gallery" — before creating or editing anything under content/ or touching Sanity Studio.
---

# Content Authoring — arpitshah.in

## Overview

Hybrid content model (see [PRD.md §3](../../../docs/PRD.md) for full rationale): blog posts and projects are git-based flat files, photography goes through Sanity.io. Blog/projects go live on `git push` (Vercel auto-deploy, ~1 min); photography goes live on Studio publish, no redeploy.

## Adding a blog post

Create `content/blog/<slug>.mdx`. Required frontmatter (see [templates/BLOG_POST_TEMPLATE.mdx](templates/BLOG_POST_TEMPLATE.mdx)):

```yaml
title: 'Post title'
date: 'YYYY-MM-DD'
tags: ['engineering'] # or ["photography"] — drives the category color on the blog row (flare vs gold)
excerpt: 'One-line summary shown in listings.'
cover: '/blog/<slug>/cover.jpg' # optional
```

MDX comments must use `{/* ... */}`, never HTML `<!-- -->` — the MDX compiler treats `<!--` as invalid JSX and the build fails. (Also: don't run `npm run format` against `.mdx` files — Prettier's markdown parser mangles `{/* */}` into `{/_ _/}`, corrupting it. `.prettierignore` already excludes `**/*.mdx` for this reason.)

Commit with `docs(blog)` or `feat(blog)` per [git-workflow](../git-workflow/SKILL.md), scope `blog`.

## Adding an image to a post

Two supported paths (PRD §3):

**Local** — drop the file in `public/blog/<slug>/`, reference normally:

```md
![Alt text](/blog/<slug>/image.jpg)
```

**Sanity-hosted** — reuse a gallery photo's CDN URL directly, without duplicating the file:

```md
![Alt text](https://cdn.sanity.io/images/<project>/<dataset>/<asset-id>.jpg)
```

Prefer local for images that only ever appear in one post; prefer the Sanity URL when reusing a photo that's already in the gallery.

## Adding a project

Edit `content/projects.json` (currently `[]`) — array of objects shaped like [templates/PROJECT_ENTRY_TEMPLATE.json](templates/PROJECT_ENTRY_TEMPLATE.json):

```json
{
  "title": "MacFileDedup",
  "description": "One or two sentences.",
  "stack": ["Swift", "SwiftUI"],
  "repoUrl": "https://github.com/...",
  "liveUrl": "",
  "cover": "",
  "status": "active"
}
```

`status` values aren't enumerated anywhere in PRD.md — pick something readable (`active`, `archived`, `wip`) but don't treat any particular set as fixed; flag it if a future page needs to branch on specific status values, since that taxonomy doesn't exist yet.

## Adding or editing photography

Not usable until `/studio` exists (PRD §7 item 3 — not yet built, see [sanity-cms](../sanity-cms/SKILL.md)). Once it does: open Studio, new Photo document, drag image in, fill fields (title, caption, location, tags, camera/lens/focalLength/aperture/shutterSpeed/iso, takenAt, featured), Publish. No git commit, no redeploy — content is fetched live or via ISR. Field-level schema detail lives in [sanity-cms](../sanity-cms/SKILL.md), not here — this skill covers the authoring workflow only.

## Publish flow summary

| Content type    | Flow                                                        |
| --------------- | ----------------------------------------------------------- |
| Blog / Projects | Edit file → `git push` → Vercel auto-deploy (~1 min)        |
| Photography     | Studio → Publish → live immediately or via ISR, no redeploy |
