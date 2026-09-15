# NŌTA — rebuild

A rebuild of the NOTA smart-pen landing page: a Next.js (App Router) front
end driven by a "camera" scroll system (tall tracks with a sticky 100vh
viewport, stitched together with negative margins), animated with GSAP
ScrollTrigger (scrub) and smoothed with Lenis, with all copy, images, and
CTAs sourced from a Strapi CMS instead of being hardcoded.

## Why Next.js + Strapi

- **Next.js (App Router)** — the page is a single long-scroll marketing
  site with no client-side routing needs, but it does need server-rendered
  HTML for SEO/share previews and Next's `fetch` + `revalidate` model maps
  cleanly onto "mostly-static content that occasionally changes in a CMS."
  App Router's server components let each section fetch its own slice of
  Strapi data without a client-side data-fetching library.
- **GSAP + ScrollTrigger + Lenis** — the spec's effects (scrub-driven
  pinned sections, per-character text reveals, slat/curtain wipes) need
  frame-accurate scroll-linked animation and a virtual scroll layer to
  smooth trackpad/wheel input; GSAP's scrub timelines and Lenis's RAF-driven
  scroll are the standard pairing for this on marketing sites.
- **Strapi** — a self-hosted, free, open-source headless CMS was the
  simplest way to give this page a real content model (singleType pages,
  repeatable components, media) without paying for or wiring up a hosted
  CMS, and it runs alongside the Next app with zero extra infra for local
  dev.

## Content model

Everything the page renders is fetched from Strapi (`src/lib/strapi.js`)
rather than hardcoded, using four singleTypes plus one collectionType,
defined in `note-rebuild-cms/src/api/`:

- **`homepage`** — the twelve scrolling sections, each its own reusable
  component (`hero`, `specs`, `who`, `paper`, `inside`, `details`,
  `colors`), plus page-level `seo`. Nested components hold section-specific
  repeatables (e.g. `specs.cards`, `paper.slides`, `inside.blinds`,
  `colors.slides`) so editors can reorder/add cards or slides without a
  schema change.
- **`header`** — nav links, the order CTA, and the waitlist modal copy.
- **`footer`** — tagline, contact/legal links, credit links, copyright.
- **`global`** — site name, favicon, description, and default SEO
  (fallback for pages that don't set their own).
- **`waitlist-submission`** (collectionType) — emails captured from the
  homepage "stay ahead" form, with a honeypot field and a `source` tag for
  basic spam filtering; not surfaced back to the front end.

Shared components (`layout.text-link`, `layout.nav-link`, `layout.cta`,
`layout.waitlist-modal`, `shared.seo`) are reused across content types so
link/CTA/SEO shapes stay consistent.

`src/lib/strapi.js` centralizes all reads: one `getX()` function per
content type with an explicit `populate` tree (Strapi doesn't populate
nested relations/components by default), a small hand-rolled query-string
builder for Strapi's bracket-notation `populate`/`filters` params, and a
60-second `revalidate` so content edits show up without a full redeploy.

## Getting started

You need two things running locally: the Strapi CMS (content + media) and
the Next.js app (reads from it).

```bash
# 1. Strapi CMS
cd note-rebuild-cms
npm install
npm run develop        # http://localhost:1337/admin — create an admin user on first run
```

In the Strapi admin, create an **API Token** (Settings → API Tokens,
read-only is enough) and publish the `Homepage`, `Header`, `Footer`, and
`Global` singleTypes.

```bash
# 2. Next.js app (from the repo root)
npm install
cp .env.example .env.local
# set NEXT_PUBLIC_STRAPI_URL (default http://localhost:1337) and
# STRAPI_API_TOKEN to the token you just created
npm run dev
```

Then open http://localhost:3000. For a production build:

```bash
npm run build
npm run start
```

## What's implemented

- Full type scale, color tokens, container, radii and glass effects
  (`src/app/globals.css`), with all six breakpoint bands (≤479, ≤767,
  ≤991, base 992–1439, ≥1440, ≥1920).
- The camera/scroll track architecture for all 12 sections
  (`src/app/sections.css`, one component per section under
  `src/components/`), matching the measured track-height table.
- Lenis + GSAP ScrollTrigger wiring (`src/lib/SmoothScroll.jsx`,
  `src/lib/gsapSetup.js`) with the spec's exact Lenis config (duration
  1.2, lerp 0.08, smoothWheel, custom exponential easing).
- The per-character scroll-highlight text effect ("who it's for"), the
  25-slat venetian-blind image reveal ("inside the box"), the six-column
  curtain wipes, the paper-slide cross-fades with pagination, and the
  five-state color section with its own pagination.
- A Strapi-backed content layer (`src/lib/strapi.js`, `note-rebuild-cms/`)
  for every section, the header/footer, and the waitlist form, so content
  changes don't require a code change or redeploy.
- A simplified static fallback (`src/components/StaticExperience.jsx`)
  for the <992px "hard fork" the spec calls out, since the animated
  desktop experience is intentionally not meant to run there.

## Key trade-offs

- **Two servers to run locally** instead of one, in exchange for a real
  content model editors can use without touching code — worth it for a
  marketing page whose copy/imagery will change more often than its
  layout.
- **Server-side `fetch` with a fixed 60s revalidate**, not on-demand ISR
  webhooks — simpler to set up, at the cost of edits taking up to a minute
  to appear.
- **Hand-rolled Strapi query-string builder** instead of pulling in
  `qs`/`qs-esm` as a dependency — the populate shapes are fixed and known
  ahead of time, so a small local function avoided an extra dependency.
- **No client-side data fetching/caching library** (SWR/React Query) —
  everything is fetched server-side per request, which is enough for a
  mostly-static page and keeps the client bundle smaller.

## What's placeholder / not finished

- Some card copy (exact spec numbers) can still be illustrative
  placeholder text if not yet filled in via the Strapi admin — the build
  spec described structure and section titles but not every line of final
  copy.
- The hero's Lottie "turntable" animation needs a real Lottie JSON file
  uploaded in Strapi (`hero.lottieAnimation`) to replace the parallax
  placeholder.
- Animation timing (start/end scrub windows) is a close-reading
  implementation of the spec's descriptions but hasn't been visually
  tuned against the live site side-by-side — expect to nudge easing/
  offsets once you're looking at both in a browser.
- No on-demand revalidation webhook from Strapi → Next, so content edits
  wait for the 60s cache window rather than appearing instantly.
- No automated tests.

## AI tools used

This rebuild was built with [Claude Code](https://claude.com/claude-code)
(Claude Sonnet), used for: scaffolding the Next.js App Router project and
Strapi content types from the build spec; implementing the GSAP/
ScrollTrigger/Lenis scroll-camera system and per-section animations; wiring
the Strapi content layer (`src/lib/strapi.js`) and populate queries;
auditing the rebuilt sections against the live site to fix copy mismatches,
accessibility gaps (accessible names on scramble/split-char text), a
missing order-CTA modal, footer content/links, and pagination/background
transition bugs; and drafting this README.

The [BMAD method](https://github.com/bmad-code-org/BMAD-METHOD) (via its
Claude Code skills) was used alongside Claude Code for the more structured
parts of the workflow — turning the build spec into a working spec/story
breakdown and driving implementation and review through its agent
workflows, rather than a single unstructured prompt-and-build loop.
