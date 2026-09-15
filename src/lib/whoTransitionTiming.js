// Shared scroll-timing for Specs -> WhoTransition -> Who. Both files anchor
// to "#specs bottom top" so tuning these numbers keeps them in sync.
export const WIPE_PAUSE_PCT = 15; // scroll-only pause after cards land, before the wipe starts
export const WIPE_DURATION_PCT = 220; // scroll distance the wipe itself takes to close to black

// Fires when the cards have landed and the pause has elapsed — the wipe's
// own scrollTrigger start.
export const WIPE_START = `bottom top-=${WIPE_PAUSE_PCT}%`;

// The wipe's scrollTrigger end, relative to WIPE_START.
export const WIPE_END_OFFSET = `+=${WIPE_DURATION_PCT}%`;

// Fires once the wipe has fully closed. Who's fade-in anchors here, not to
// its own sticky "top top" — that leaves no cushion for fast scrolling.
export const WIPE_COMPLETE_START = `bottom top-=${
  WIPE_PAUSE_PCT + WIPE_DURATION_PCT
}%`;

// NOTE: the text1->text2 stagger is NOT here as a #specs-relative percentage
// (tried once, removed) — it gets swamped by the later camera-lock point. Computed in Who.jsx instead.
