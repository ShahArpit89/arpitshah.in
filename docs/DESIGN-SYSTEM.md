# arpitshah.in — Design System

Source of truth: [`design/homepage-mockup.html`](../design/homepage-mockup.html) (Version 4, "Signal"), finalized per [PRD.md](PRD.md) §4. This document is the baseline for every subpage — Portfolio, Projects, Blog, Photography must read as the same product, not four skins.

Status: pre-implementation. No components exist in code yet — this documents the mockup so the tokens/patterns port 1:1 into Tailwind config + React components rather than getting reinvented per page.

## Design Tokens

### Color

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#f4f1ea` | `#131315` | Page background |
| `--paper-raised` | `#ffffff` | `#1b1b1e` | Cards/raised surfaces |
| `--ink` | `#15161a` | `#efece4` | Primary text |
| `--ink-soft` | `#6c7066` | `#98988e` | Muted text, timestamps, nav |
| `--line` | `#ded8ca` | `#302f2c` | Hairline borders/dividers |
| `--flare` | `#c22a5c` | `#ef5c86` | **Engineering accent** — the one accent, used for links, tags, primary emphasis |
| `--flare-ink` | `#fff0f4` | `#2a0410` | Text-on-flare (e.g. `::selection`) |
| `--gold` | `#b9812f` | `#dba75a` | **Photography accent** — sparing use only: "Also" label, photography tags/category labels |

Rules:
- `--flare` and `--gold` are never both primary in the same section. Flare leads (engineering-first hierarchy per PRD §1); gold marks photography content specifically.
- All tokens defined as CSS custom properties on `:root`, overridden under `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])`, and again under `:root[data-theme="dark"]` for explicit user choice. Three viewer states: explicit light, explicit dark, OS-driven. No component should hardcode a hex value — always reference the token.

### Type

| Role | Family | Usage |
|---|---|---|
| Display | Instrument Serif (italic) | Headlines only — H1/H2, restrained. Never body copy. |
| Body | Karla | All paragraph/UI text. Weights 400/500/600/700 loaded. |
| Mono/labels | Fragment Mono | Nav links, timestamps, category tags, the IST clock, button labels, footer |

Google Fonts import: `Instrument+Serif:ital@0;1`, `Karla:wght@400;500;600;700`, `Fragment+Mono`.

### Motion

| Token | Value | Use |
|---|---|---|
| Reveal transition | `opacity .6s ease, transform .6s ease` from `translateY(14px)` | Below-fold sections on first view |
| Hover zoom | `transform .5s ease`, scale to `1.06` | Photo grid tiles |
| Underline grow | `right .25s ease` (right: 100% → 0) | Text link hover |
| Blob drift | `22s ease-in-out infinite`, translate + scale(1.04) | Decorative hero background only |
| Reduced motion | `.blob{animation:none}` under `prefers-reduced-motion: reduce` | Must be replicated for any new looping animation |

### Radius / borders

- Full-round pills (`rounded-full`) for CTA buttons.
- `rounded-md` for photo tiles.
- Borders are single hairlines (`border-color: var(--line)`) — never doubled. See watch-item below.

## Components

### Header / Nav

**Description:** Sticky single-row masthead — site mark + live IST clock on the left, section nav on the right.

**Structure:** `header` is one flex row, one hairline border via page-section dividers below it — the header itself carries no bottom border in the mockup; separation comes from `backdrop-blur` + translucent `--paper` background (`bg-[var(--paper)]/80`).

**States**

| State | Visual | Behavior |
|---|---|---|
| Default | Nav links in `--ink-soft`, mono uppercase, tracked | — |
| Hover | Link color → `--flare`; underline grows left→right (`underline-grow`) | 0.25s ease |
| Scrolled | Sticky, blurred background so content doesn't run under it | `sticky` + `backdrop-blur` |

**Accessibility**
- Nav links are real `<a href="#...">` — keyboard-focusable and tabbable by default; no custom role needed.
- Respect `safe-area-inset-top` (already in mockup via inline style) for notched devices.

**Do's and Don'ts**

| ✅ Do | ❌ Don't |
|---|---|
| Keep exactly one hairline border between header and content | Stack a border on `.masthead` **and** `.masthead nav` — this produced a real double-line/underline/bullet regression during design review (PRD §4). Selector must be `.masthead .nav`, never `.masthead nav`, wherever this is ported to a scoped component class. |
| Style nav links as plain text | Style nav links as buttons/pills |

### Hero

**Description:** Engineering-first intro — eyebrow label, italic serif headline with one `--flare`-colored word, first-person body copy, two CTAs.

**Variants:** single variant (home page only). Portfolio/Projects/Blog/Photography get simpler page headers, not this full hero — but reuse the eyebrow-label + serif-headline pattern for visual consistency.

**Copy voice:** first-person, conversational ("Hi, I'm Arpit — I build applied-AI products, end to end."). Never third-person/editorial, on this page or subpages.

**Elements**
- Eyebrow: `font-mono text-xs uppercase tracking-[.18em]`, colored `--gold` (this is the one place gold appears on a non-photography element — it marks "location/role" metadata, not category).
- Headline: `font-display italic`, one emphasized span in `--flare`.
- Live clock: Asia/Kolkata, updates every second, format `IST HH:MM:SS`. Authentic detail, not decorative — must show real current time, not a static string.
- Decorative `.blob`: radial gradient in `--flare`, blurred, slow drift animation — purely ambient, `pointer-events-none`, disabled under reduced-motion.

**Accessibility**
- Clock updates via `setInterval`; should be marked `aria-hidden` or use `aria-live="off"` equivalent — it's decorative flavor text, not an announcement, and must not spam screen readers every second.

### Button (CTA)

**Variants**

| Variant | Use When | Visual |
|---|---|---|
| Primary | Main action (e.g. "View portfolio") | Filled: `background: var(--ink)`, `color: var(--paper)`, `rounded-full` |
| Secondary | Supporting action (e.g. "See projects") | Outline: `border-color: var(--ink)`, `color: var(--ink)`, transparent fill, `rounded-full` |

**Props pattern (React)**

| Property | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Visual style |
| `href` | `string` | — | Renders as `<a>`; buttons here are navigational, not form actions |

**States:** default, hover (**resolved** — `hover:opacity-90` with `transition-opacity`, both variants; see `components/Button.tsx`). No disabled/loading state exists yet — add one if any button ever triggers an async action (e.g. a future contact form).

**Accessibility**
- Role: native `<a>`/`<button>`, no ARIA override needed.
- Label text must stay in the button (`View portfolio →`), not icon-only.

### Section Divider

Single `<div class="h-px w-full" style="background:var(--line)">` between major sections. One hairline, full width. Reuse this exact pattern everywhere a section boundary is needed — don't invent a second divider style.

### Blog Post Row

**Description:** List-item pattern for the blog preview (home) and full blog index.

**Structure:** grid `[90px_1fr_auto]` (mobile) / `[110px_1fr_auto]` (sm+) — timestamp, content, "Read →" link.

**Fields:** `time` (mono, `--ink-soft`), category label (mono, uppercase, 10px, colored by topic — `--flare` for Engineering, `--gold` for Photography), title (`text-lg font-semibold`).

**States**

| State | Visual |
|---|---|
| Default | As above |
| Hover (row) | Title `opacity: .7` via `group-hover` |

**Do's and Don'ts**

| ✅ Do | ❌ Don't |
|---|---|
| Color the category label by topic (flare=engineering, gold=photography) | Introduce a third category color |
| Keep one `border-t` per row, `border-b` on the last row only | Double-border rows |

### Photo Grid Tile

**Description:** Square gallery tile, 3-col mobile / 6-col desktop grid, used in the home teaser and the full `/photography` gallery.

**Behavior:** `frame-zoom` class scales inner image/svg to `1.06` on hover, `.5s ease`. Border: single hairline, `rounded-md`.

**States**

| State | Visual | Behavior |
|---|---|---|
| Default | `aspect-square`, bordered, overflow hidden | — |
| Hover | Inner image scales to 1.06 | Container clips via `overflow:hidden`, so zoom never breaks grid layout |

**Open item carried from PRD:** all current tiles are placeholder SVGs — swap for real photos (with EXIF caption data per the Sanity schema in PRD §3) before launch. Component should be built to take `image`, `caption`, `camera/lens/focalLength/aperture/shutterSpeed/iso` props now, even while placeholders are still in use.

### Scroll-Reveal Pattern

Not a component but a behavioral pattern used by Blog and Photography sections (`data-reveal` attribute):
- Sections below the fold start `opacity:0; translateY(14px)` **only if** they're off-screen on load (checked via `getBoundingClientRect` before applying `.reveal-pending`).
- `IntersectionObserver` at `threshold: 0.15` swaps to `.reveal-in`, then unobserves.
- Everything above the fold renders visible at rest — no content ever starts hidden waiting on JS. This is a hard rule (PRD §4), not a style preference: it's a resilience requirement in case JS is slow/blocked.
- Guard with `if(!('IntersectionObserver' in window)) return;` — no-JS/old-browser fallback is simply "always visible."

### Footer

Simple flex row, mono text, `--ink-soft`, top hairline border. Copyright + link list. No variants.

## Theming Implementation Notes

- Selection color (`::selection`) is themed too: `background: var(--flare)`, `color: var(--flare-ink)` — don't forget this when porting to global CSS, it's easy to drop.
- `data-theme="light"` / `data-theme="dark"` attribute on `:root` (or `<html>`) drives explicit override; absence of the attribute falls through to `prefers-color-scheme`. Theme toggle component (not yet in mockup) should just set/clear this attribute — no other logic needed.

## Watch-Items for Implementation

1. **Nav border bug class:** `.masthead nav` vs `.masthead .nav` caused a real double-line/underline/bullet regression during design review (PRD §4). Resolved in `components/Nav.tsx` by applying Tailwind utilities directly to elements — no hand-rolled scoped CSS class exists to regress.
2. **Button hover state** — resolved, see Button component section above.
3. **Spacing scale** isn't tokenized — mockup uses raw Tailwind spacing utilities (`py-14`, `gap-4`, etc.) directly rather than custom properties. Fine to keep using Tailwind's default scale rather than adding redundant custom spacing tokens, but note it's an intentional gap, not an oversight, if a future audit flags "no `--space-*` tokens."
