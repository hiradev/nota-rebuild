# Real assets — status

Real photography and video from the live site (`nota.uprock.pro`) have been
downloaded into `public/` and wired into the components. What's still
placeholder is called out at the bottom.

## Downloaded and wired in

| File | Used in | Component |
|---|---|---|
| `images/hero-pen.webp` | Cover/hero (static stand-in for the Lottie turntable) | `Cover.jsx` |
| `images/paper-slide-1.webp` … `paper-slide-4.webp` | Paper section, slides 1–4 | `Paper.jsx` |
| `images/blinds-1.webp` … `blinds-3.webp` | Inside the box, 3 blinds items (kit / pen / adapter) | `Inside.jsx` |
| `images/color-1.webp` … `color-5.webp` | Colors section, 5 states (silver/graphite/blue/red/orange) | `Colors.jsx` |
| `video/who-video.mp4` | Who it's for, sub-scene C — muted, plays once (not looped) | `Who.jsx` |
| `video/details-video.mp4` | Details, pill video — muted, looping | `Details.jsx` |
| `lottie/cover.json` | Downloaded but not yet wired (see below) | — |

All images were served as WebP regardless of their source URL's extension
(confirmed via magic-byte detection), so they're saved as `.webp`. Both
videos were byte-verified against the live site's `Content-Length`.

Note on the Colors mapping: only one of two parallel 5-image sets found on
the live DOM (`library_image-14781-...`) was downloaded and used. A second,
similarly-shaped set (`library_image-14782-...`) exists on the live page
and wasn't mapped to a section — it's possibly a hover/alt state. Worth a
quick check against the live site if you want full coverage. See
`ASSET-URLS.md` for the raw URL if you want to pull it in.

## Still placeholder

- **Lottie turntable** (`Cover.jsx`): `public/lottie/cover.json` (1.7MB) is
  downloaded but not wired in — it's still a static `hero-pen.webp` image
  with a parallax effect standing in for it. To finish this: `npm install
  @lottiefiles/lottie-player`, then swap the `<Image>` in the
  `.cover__lottie-pen` div for a `<lottie-player>` element, seeking its
  frame from `ScrollTrigger`'s progress instead of the current parallax.
- **Details section card photos** (`Details.jsx`): the tall card, the two
  pill cards, the right card, and the top-large/top-pill cards
  (`RevealCard` instances) have no sourced images — no distinct URLs for
  these were confidently identified on the live DOM in the scrape. They're
  still `ImagePlaceholder`. `ASSET-URLS.md` has some `scene_6`
  background-image URLs that might be a best-guess match if you want to
  try wiring them in.
- **Specs section pen render** (`Specs.jsx`): still `ImagePlaceholder` —
  no distinct source image was identified either.

## Copy accuracy note

Spec card values (sampling rate, pressure levels, etc.), the "who it's
for" audience lines, and footer contact details are placeholder copy — the
original build spec only gave section titles/structure, not the exact
numbers on every card. Swap in the real copy from the live site if needed.
