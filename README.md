# NŌTA — rebuild

A Next.js (App Router) rebuild of the NOTA smart-pen landing page, following
the build spec: a "camera" scroll system (tall tracks with a sticky 100vh
viewport, stitched together with negative margins) driven by GSAP
ScrollTrigger (scrub) and smoothed with Lenis.

## Getting started

This project's dependencies could not be installed from inside the sandbox
that built it (outbound access to the npm registry is blocked there), so
it hasn't been run or built yet. On your own machine:

```bash
npm install
npm run dev
```

Then open http://localhost:3000. For a production build:

```bash
npm run build
npm run start
```

## What's implemented

- Full type scale, color tokens, container, radii and glass effects from
  the spec (`src/app/globals.css`), with all six breakpoint bands
  (≤479, ≤767, ≤991, base 992–1439, ≥1440, ≥1920).
- The camera/scroll track architecture for all 12 sections
  (`src/app/sections.css`, one component per section under
  `src/components/`), matching the measured track-height table.
- Lenis + GSAP ScrollTrigger wiring (`src/lib/SmoothScroll.jsx`,
  `src/lib/gsapSetup.js`) with the spec's exact Lenis config (duration
  1.2, lerp 0.08, smoothWheel, custom exponential easing).
- The per-character scroll-highlight text effect ("who it's for"),
  the 25-slat venetian-blind image reveal ("inside the box"), the
  six-column curtain wipes, the paper-slide cross-fades with pagination,
  and the five-state color section with its own pagination.
- A simplified static fallback (`src/components/StaticExperience.jsx`)
  for the <992px "hard fork" the spec calls out, since the animated
  desktop experience is intentionally not meant to run there.

## What's placeholder

All photography, the two videos, and the hero Lottie animation are
placeholder graphics — see `ASSETS.md` for exactly what to source from
the live site and where each file goes. Some card copy (exact spec
numbers, audience/footer copy) is illustrative placeholder text since the
build spec described structure and section titles but not every line of
final copy.

## Notes for further work

- The hero's Lottie "turntable" is currently a parallax placeholder.
  ASSETS.md explains how to wire in the real Lottie file once you have it.
- Animation timing (start/end scrub windows) is a close-reading
  implementation of the spec's descriptions but hasn't been visually
  tuned against the live site side-by-side — expect to nudge easing/
  offsets once you're looking at both in a browser.
