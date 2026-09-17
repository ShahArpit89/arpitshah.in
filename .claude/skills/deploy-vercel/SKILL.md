---
name: deploy-vercel
description: How arpitshah.in deploys to Vercel — required environment variables, what happens automatically on push/PR, and the arpitshah.in DNS cutover that hasn't happened yet. Use whenever asked to "deploy," "set up Vercel," "why didn't my change go live," "add an env var," or anything about the site's production/preview URLs and domain.
---

# Deploy — Vercel

## Overview

Next.js on Vercel, zero-config, deploying off `main` ([PRD.md §5](../../../PRD.md)). Every PR gets its own preview deployment automatically — see [git-workflow](../git-workflow/SKILL.md) for the PR/merge policy this ties into.

## Environment variables

| Variable                        | Purpose                               | Environments        |
| ------------------------------- | ------------------------------------- | ------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity client                         | Production, Preview |
| `NEXT_PUBLIC_SANITY_DATASET`    | Sanity dataset (default `production`) | Production, Preview |
| `SANITY_API_READ_TOKEN`         | Server-side Sanity reads, if needed   | Production, Preview |

Mirrors `.env.example`. All currently unset — Sanity project doesn't exist yet ([sanity-cms](../sanity-cms/SKILL.md)), and the app is built to run without them. Whether Preview should point at a separate Sanity dataset than Production is an open decision, not yet needed.

## Preview deploys

Every PR gets a unique Vercel preview URL automatically, posted as a check on the PR. Paste it into the PR template's Testing section — that's what makes "checked in both themes" and "checked mobile viewport" (from `.github/pull_request_template.md`) verifiable by looking at the actual deployed page rather than just local `npm run dev`.

## Production deploy

Squash-merging a PR into `main` triggers a production deploy automatically. No manual deploy step under normal flow.

## DNS cutover — not yet done

PRD.md §7 item 5: domain is registered but DNS isn't pointed at Vercel yet. General shape, when it's time:

1. Add `arpitshah.in` as a domain in the Vercel project settings.
2. Vercel issues the DNS records to add (A/CNAME, varies by registrar setup).
3. Add those records at the domain registrar.
4. Wait for DNS propagation and Vercel's automatic SSL certificate issuance.

This requires Arpit's own registrar login — treat it as something he does himself, not an unsupervised step to take on his behalf. See [references/dns-cutover-steps.md](references/dns-cutover-steps.md) for a more detailed walkthrough when it's actually time to do this.

## Pre-cutover checks

Before flipping DNS, run through the PR template's build/theme/mobile checklist against the current production deployment, not just the last preview — the site should already be in the state you want the public to see.

## Rollback

Vercel keeps every deployment and supports instant rollback to a previous one. Combined with squash-merge (one clean commit per feature, per git-workflow), reverting a bad production deploy is reverting exactly one commit — bisect and rollback stay simple by construction.
