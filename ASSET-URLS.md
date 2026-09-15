# NŌTA — full asset URL inventory

Scraped from `https://nota.uprock.pro/` by scrolling the full page (it's
~14,100px tall) and reading every `<img>`, `<video>`/`<source>`,
`<lottie-player>`, and CSS `background-image` in the rendered DOM. Some
entries are multiple crop/resolution variants of the same shot (responsive
breakpoints) rather than distinct images — noted where obvious.

I couldn't download these directly from here (see the note at the
bottom), so this is the raw list — pull them yourself with `curl -O
"<url>"`, a download manager, or your browser's Network tab (which will
also show it truly hitting the wire, confirming these are current).

## Lottie animation

- `https://nota.uprock.pro/f/0_refinedcover_03_09.json` — hero pen turntable, driven by `lottie-interactivity` in scroll mode (per spec: 1.73MB, 1920×1080, 76 frames)

## Video

- `https://nota.uprock.pro/f/25824d842058045cd73c3feba327dd09_1920.mp4` — "Who it's for" clip (muted, plays once)
- `https://nota.uprock.pro/f/7b66fa812d04f9c7075f91ef42d4dd53_1920.mp4` — Details pill-video (muted, loops)

## Hero / Cover

- `https://nota.uprock.pro/thumb/2/zOzK4LBsVJn0W98Pf5CalQ/364r1526/d/library_image-14634-symbol-is6ru9kkd-nota_hero_image_adaptive_866220.png`

## Header / logo

- `https://nota.uprock.pro/thumb/2/GHsyb1KhYB2zpeQZqk1haQ/640r480/d/library_image-14633-symbol-i0odde8nz-logo.svg`

## "Works with smart paper" — 4 slides

- `https://nota.uprock.pro/thumb/2/hkWO_0PdjAnQD0OeUgMd8g/1920r1080/d/nota_scene_4_img_01.jpg`
- `https://nota.uprock.pro/thumb/2/7YfwgKVakw18X4hnPZia0Q/1920r1080/d/nota_scene_4_img_02.jpg`
- `https://nota.uprock.pro/thumb/2/5RXD9D7cr-Ez9A9KxlC5hw/1920r1080/d/nota_scene_4_img_03.jpg`
- `https://nota.uprock.pro/thumb/2/XYdQ9jPC6FwmZfYcoOuhgQ/1920r1080/d/nota_scene_4_img_04.jpg`

## "Inside the box" — 3 items, each with several responsive crops

Block "41" (Smart Pen kit, largest first):
- `https://nota.uprock.pro/thumb/2/NdNsA4zjgwV803LVWQCIkg/1276r2108/d/41_block.jpg`
- `https://nota.uprock.pro/thumb/2/Tve6Pa_mEfVFg1C_ZXVEtw/1276r2108/d/41_block_480.jpg`
- `https://nota.uprock.pro/thumb/2/F_P4aLU5KdbclXhQnZ2QpQ/640r480/d/41_block.jpg`
- `https://nota.uprock.pro/thumb/2/ctuI-vbcqn2J7cCUXnBXig/1276r2108/d/41_block1212.png`
- `https://nota.uprock.pro/thumb/2/-wr1GZBOmPey4dEvavt0Fw/640r480/d/41_block1212.png`
- `https://nota.uprock.pro/thumb/2/5UFl0MtPdpTU7FJxOYseJQ/480r1020/d/41_block_mobile_1.jpg`
- `https://nota.uprock.pro/thumb/2/thSkq4Kg7lqMfHmr5pPYxQ/480r1020/d/41_block_mobile_2.jpg`
- `https://nota.uprock.pro/thumb/2/_n2BDCbkxVH2Lw8Lt0bM7g/480r1020/d/41_block_mobile_3.jpg`
- `https://nota.uprock.pro/thumb/2/vlxkkI1Wv5e9o1FRJ6IWmA/480r1020/d/41_block_mobile_4.jpg`

Block "42":
- `https://nota.uprock.pro/thumb/2/V-Pld1tdphvc6bqPvkKsvw/1276r2108/d/42_block.jpg`
- `https://nota.uprock.pro/thumb/2/DsywoH6-Vx8zTSoNO75b-A/1276r2108/d/42_block_480.jpg`
- `https://nota.uprock.pro/thumb/2/FulYM5xyA7yVsDY4-9XuHQ/640r480/d/42_block.jpg`

Block "43":
- `https://nota.uprock.pro/thumb/2/uY0WbSXhbz5r3fxyMekPng/1276r2108/d/43_block.jpg`
- `https://nota.uprock.pro/thumb/2/XAWvWz3aFFaaSsy_luH5-w/1276r2108/d/43_block_480.jpg`
- `https://nota.uprock.pro/thumb/2/lgfT49LtqL0FbROrmSOYew/640r480/d/43_block.jpg`

## "Who it's for" — scene 2 / scene 5 imagery

- `https://nota.uprock.pro/thumb/2/E_-dKzAg6YZhD4xJJ6rAMA/233r734/d/library_image-14700-symbol-iw3g92519-nota_scene_2_img.png`
- `https://nota.uprock.pro/thumb/2/xuUeDdKthCFm9DOCDquDXw/896r141/d/library_image-14699-symbol-icoj9ef2j-scene2-adaptive480-ezgifcom-png-to-webp-converter.webp`
- `https://nota.uprock.pro/thumb/2/DpQxNCkA1E7yEZmCJGLyNA/471r2052/d/library_image-14699-symbol-icoj9ef2j-scene2-adaptive768-ezgifcom-png-to-webp-converter.webp`
- `https://nota.uprock.pro/d/library_image-14643-symbol-ispnvazts-nota_scene_5_img_01_adaptive.jpg`
- `https://nota.uprock.pro/d/library_image-14643-symbol-ispnvazts-nota_scene_5_img_02.jpg`
- `https://nota.uprock.pro/d/library_image-14643-symbol-ispnvazts-nota_scene_5_img_03.jpg`
- `https://nota.uprock.pro/d/library_image-14643-symbol-ispnvazts-new-scene_5_adapter.jpg`
- `https://nota.uprock.pro/d/library_image-14642-symbol-it4oyiz32-nota_scene_5_img_01_adaptive.jpg` (mobile/768 variant set)
- `https://nota.uprock.pro/d/library_image-14642-symbol-it4oyiz32-scene_5_768_devise-1.png`
- `https://nota.uprock.pro/d/library_image-14642-symbol-it4oyiz32-nota_scene_5_img3_768.jpg`

## Details section — scene 6 imagery

Desktop/≥992 set:
- `https://nota.uprock.pro/d/library_image-14686-symbol-i71z9t68q-scene_6_992_card-1.jpg`
- `https://nota.uprock.pro/d/library_image-14686-symbol-i71z9t68q-nota_scene_6_img_02.jpg`
- `https://nota.uprock.pro/d/library_image-14686-symbol-i71z9t68q-nota_scene_6_img_03.jpg`
- `https://nota.uprock.pro/d/library_image-14686-symbol-i71z9t68q-scene_6_992_card-5.jpg`
- `https://nota.uprock.pro/d/library_image-14686-symbol-i71z9t68q-nota_scene_6_img_06.jpg`

Mobile/768 set:
- `https://nota.uprock.pro/d/library_image-14685-symbol-iag8qchrn-nota_scene_6_img_01.jpg`
- `https://nota.uprock.pro/d/library_image-14685-symbol-iag8qchrn-nota_scene_6_img_02.jpg`
- `https://nota.uprock.pro/d/library_image-14685-symbol-iag8qchrn-scene_6_768_card-3.png`
- `https://nota.uprock.pro/d/library_image-14685-symbol-iag8qchrn-scene_6_768_card-5.png`
- `https://nota.uprock.pro/d/library_image-14685-symbol-iag8qchrn-scene_6_768_card-6.png`

## Colors section — scene 7 imagery (two 5-image sets)

Set A (`library_image-14781`) — likely the 5 color states in order (silver/graphite/blue/red/orange per the spec copy):
- `https://nota.uprock.pro/thumb/2/1SLA07O2y250d4sm92qnPg/1920r1080/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_01.jpg`
- `https://nota.uprock.pro/thumb/2/TYFFgx_5tk3Z54ItqSDO4w/1920r1080/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_02.jpg`
- `https://nota.uprock.pro/thumb/2/WoVgGWdUhndJDCN4Hp4Y4w/1920r1080/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_03.jpg`
- `https://nota.uprock.pro/thumb/2/p8a6t6D7aO3tSc3x4pW7nw/1920r1080/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_04.jpg`
- `https://nota.uprock.pro/thumb/2/XcxX2unL4tshlrNkYB4sRg/1920r1080/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_05.jpg`

Set B (`library_image-14782`) — same 5, unclear if hover/alt state or a different breakpoint:
- `https://nota.uprock.pro/thumb/2/s3CSLofcpmb3mJNh_0AxHg/1920r1080/d/library_image-14782-symbol-icmdrs40h-nota_scene_7_img_01.jpg`
- `https://nota.uprock.pro/thumb/2/57-AneXzVvhacM8Plv-mCA/1920r1080/d/library_image-14782-symbol-icmdrs40h-nota_scene_7_img_02.jpg`
- `https://nota.uprock.pro/thumb/2/rsmkTaYuQrbSkzUYU_iQWg/1920r1080/d/library_image-14782-symbol-icmdrs40h-nota_scene_7_img_03.jpg`
- `https://nota.uprock.pro/thumb/2/nTFFf7KN2tETtuSq70lj1Q/1920r1080/d/library_image-14782-symbol-icmdrs40h-nota_scene_7_img_04.jpg`
- `https://nota.uprock.pro/thumb/2/frnjDUP5_aZbwYf4snvBAw/1920r1080/d/library_image-14782-symbol-icmdrs40h-nota_scene_7_img_05.jpg`

Small decorative element used near this section:
- `https://nota.uprock.pro/thumb/2/XFO-Z6KKLQ1J3F5qhK1gag/640r480/d/library_image-14785-symbol-iof6gcmn1-ellipse_6750.svg`

## Order popup

- `https://nota.uprock.pro/thumb/2/48v7oqZUAYG0LHOJ-CgFqA/1472r1008/d/library_image-14639-symbol-ibp1e2m59-popup_order-img.png`
- `https://nota.uprock.pro/thumb/2/89XFsBtyOJQj6l1MDE9mcA/896r578/d/library_image-14639-symbol-ibp1e2m59-popup_order-img480.png`
- `https://nota.uprock.pro/thumb/2/23v_cjk1hEG0m1FgxLR3Qg/600r590/d/library_image-14639-symbol-ibp1e2m59-popup_order-img320.png`
- `https://nota.uprock.pro/d/library_image-14638-symbol-i7xmw95e4-popup-close.svg`

## UI chrome / icons (builder defaults, not product photography)

- `https://nota.uprock.pro/g/s3/mosaic/images/widgets/popup-close.svg`
- `https://nota.uprock.pro/g/s3/mosaic/images/widgets/slider-arrow-left.svg`
- `https://nota.uprock.pro/g/s3/mosaic/images/widgets/slider-arrow-right.svg`
- `https://nota.uprock.pro/g/s3/mosaic/images/widgets/badge-light-logo.svg`
- `https://nota.uprock.pro/d/library_image-14784-symbol-icidatenz-frame.svg`

## Bulk download (run wherever you have direct network access to the site)

```bash
mkdir -p nota-assets && cd nota-assets
# paste every URL above into urls.txt, one per line, then:
while read -r url; do
  curl -sS -O --remote-header-name "$url" || echo "FAILED: $url"
done < urls.txt
```

Or with `wget`:

```bash
wget -i urls.txt -P nota-assets
```

## Why I'm handing you URLs instead of files

Two things stopped me from downloading these directly for you:

1. This working environment's network is on an allowlist that doesn't
   include `nota.uprock.pro` — a direct request from here comes back
   "Host not in allowlist." Confirmed with a raw `curl`.
2. I *can* reach the live site through a separate browser tool, but
   relaying file bytes back through the model as text (base64) is not a
   reliable transfer method — I tested it on one image and the result
   came out corrupted. Fine for small JSON/text, not safe for ~50 binary
   files.

The reliable fix is running the download from somewhere with direct
network access to the site — your own machine, most simply. If you
later want me to actually pull these files down (not just list them),
connecting a folder from your computer to this session would let me
run the download directly there and land the results in a folder you
choose.

## What I didn't find

I didn't spot a per-color pagination label confirming which of the two
scene_7 sets (A/B above) is the "hover" or hi-res state versus the base
state — check the live site's Network tab while switching colors to
confirm. I also didn't find separate individual photos for the
Specifications section's pen render or the Details section's
tall/pill-card captions as distinct URLs beyond the scene_6 set above —
they may be cropped from the same source images via CSS rather than
served as separate files.
