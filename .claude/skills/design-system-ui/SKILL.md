---
name: design-system-ui
description: How to build or edit any page or component for arpitshah.in so it matches the finalized design system instead of inventing a new look. Use this whenever about to create or edit anything under app/ or components/ that renders visible UI — a new page, a new shared component, or a restyle of an existing one, even a small tweak to a button or card. Also use if asked to "match the mockup," "keep this consistent with the rest of the site," or "why does this look different from the homepage."
---

# Design System UI — arpitshah.in

## Source of truth

Don't restate these here, read them:

- [design/DESIGN-SYSTEM.md](../../../design/DESIGN-SYSTEM.md) — tokens, type, motion, every component's variants/states/accessibility notes
- [design/homepage-mockup.html](../../../design/homepage-mockup.html) — the literal finalized reference

This skill is the workflow layer: what to check, in what order, before writing UI code.

## Before you build

1. Check DESIGN-SYSTEM.md's Components section for an existing pattern first. A "new" card/row/tile is very likely a variant of Blog Post Row, Photo Grid Tile, or the Button component, not a fresh design.
2. Check `components/` for an existing implementation before adding a new one — `Nav.tsx`, `Button.tsx`, `PostCard.tsx`, `ProjectCard.tsx`, `PhotoGrid.tsx`/`PhotoTile.tsx`, `SectionDivider.tsx`, `ScrollReveal.tsx`, `IstClock.tsx`, `Footer.tsx`, `Hero.tsx` already exist.
3. Use the token utility classes (`bg-paper`, `text-ink`, `text-ink-soft`, `border-line`, `text-flare`, `text-gold`, `font-display`, `font-mono`) — never a hardcoded hex value. These are wired in `app/globals.css` via Tailwind v4's `@theme inline`.

## Gaps and bugs already resolved — don't reopen them

- **Button hover state:** resolved as `hover:opacity-90` + `transition-opacity` on both variants (`components/Button.tsx`). Don't invent a second hover treatment elsewhere.
- **Nav double-border bug class:** the mockup's earlier `.masthead nav` vs `.masthead .nav` regression (DESIGN-SYSTEM.md watch-item #1) is structurally avoided in `components/Nav.tsx` by using Tailwind utilities directly on elements instead of a hand-rolled scoped CSS class. Keep doing that for any other structural component — don't introduce a new scoped selector for layout/borders when a utility class does the job.

## Gap to respect — no spacing tokens

DESIGN-SYSTEM.md documents this as intentional: use Tailwind's default spacing scale (`py-14`, `gap-4`, etc.) directly. Don't add `--space-*` custom properties.

## Theming checklist

- Never use Tailwind's `dark:` variant on a token color. Theming is 100% the CSS-variable layer (`prefers-color-scheme` + `data-theme` attribute in `app/globals.css`) — a token utility like `bg-paper` already resolves correctly in both themes.
- Test new UI in light, dark, and OS-driven (no explicit choice) states before calling it done.

## Motion checklist

- Reuse `<ScrollReveal>` for below-the-fold sections, the existing `.frame-zoom`/`underline-grow` CSS classes for hover effects — don't write new transition CSS for something these already cover.
- Any new looping/decorative animation must be guarded under `prefers-reduced-motion: reduce`, matching `.blob`'s pattern in `app/globals.css`.

## Accessibility carry-overs

- Nav links and CTAs are real `<Link>`/`<a>` elements — no `<div onClick>` buttons.
- `IstClock` is `aria-hidden` — it's decorative flavor text, not something a screen reader should announce every second.
- Button labels stay as visible text, not icon-only.

See DESIGN-SYSTEM.md's per-component Accessibility subsections for anything not covered above.

For a condensed pre-PR pass, see [references/component-checklist.md](references/component-checklist.md).
