---
name: sanity-cms
description: Schema fields, image URL builder usage, and ISR/revalidation conventions for the photography Sanity.io project backing arpitshah.in. Use whenever touching lib/sanity.ts, any Sanity schema file, or photography data-fetching code.
---

# Sanity CMS — arpitshah.in

## Status: spec-derived, not project-verified

Written before the real Sanity project exists ([PRD.md §7](../../../PRD.md) item 3). Everything below is derived from the PRD spec, not confirmed against a live project. Re-verify before treating any of it as final — see the checklist at the bottom.

PRD.md §8 explicitly leaves the `/studio` embed-vs-subdomain choice undecided. **Don't resolve that non-decision in code.** `app/studio/[[...tool]]/page.tsx` is deliberately not scaffolded. If something must compile against a Studio route, use the embedded path as an explicitly-commented provisional default (lower setup cost, easiest to delete) — never silently commit to one option.

## Photo document schema

From PRD.md §3, mirrored in `lib/sanity.ts`'s `Photo` interface:

```
image           — Sanity image asset (auto-optimized, CDN-served)
title, caption
location
tags[]          — species/subject tags (PRD calls this "species/tags[]")
camera, lens, focalLength, aperture, shutterSpeed, iso   — EXIF-style, shown as captions
takenAt         — date
featured        — boolean, drives home-page teaser selection
```

## Client setup

`lib/sanity.ts` reads `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` (default `production`). `client` is `null` and `sanityConfigured` is `false` when the project ID isn't set — every caller must handle that, since **the app must build and run with zero Sanity env vars set**. `app/photography/page.tsx` and `components/PhotoGrid.tsx` already follow this pattern (fall back to a placeholder grid); replicate it in any new photography-related code rather than assuming `client` is non-null.

## GROQ query conventions

```groq
*[_type == "photo"] | order(takenAt desc)                    // all photos, newest first
*[_type == "photo" && featured == true] | order(takenAt desc) // home-page teaser
```

Both are exported from `lib/sanity.ts` as `allPhotosQuery` / `featuredPhotosQuery`.

## Image URL builder usage

```ts
import { urlFor } from '@/lib/sanity'
urlFor(photo.image).width(400).height(400).url()
```

Size for context: small/square for grid tiles, larger for a detail view if one ships (see next section). `next.config.ts` already whitelists `cdn.sanity.io` in `images.remotePatterns` so `next/image` can load these URLs once real photos exist.

## ISR/revalidation approach

Not yet settled — recommend either a route-level `revalidate` export on `app/photography/page.tsx`, or a Sanity webhook hitting a Next.js revalidation route on publish, for near-real-time updates without a full redeploy. Validate whichever approach once the real project exists and webhook delivery can actually be tested.

## Studio route

Intentionally not scaffolded (see Status section above). When it is built: login-gated to Arpit's account only (PRD §3), path structure `app/studio/[[...tool]]/page.tsx` per PRD §6 if the embedded option is chosen.

## Photo detail pages

`/photography/[id]` is an explicit PRD §8 non-decision — "optional for v1." Don't build it speculatively; the gallery grid (`PhotoGrid`/`PhotoTile`) works standalone without it.

## Re-verify checklist (once the real Sanity project exists)

- [ ] Confirm actual env var names match what Sanity's setup wizard generates — update `.env.example` and `lib/sanity.ts` if they differ
- [ ] Confirm dataset name (`production` assumed)
- [ ] Resolve the embed-vs-subdomain decision, delete the unused path/config
- [ ] Implement and test the real ISR/webhook revalidation mechanism
- [ ] Add `templates/photo-schema.ts` (a real `defineField` array) once schema code can be tested against the live project — not included yet since it can't be verified
