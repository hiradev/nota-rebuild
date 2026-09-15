import { forwardRef } from "react";

/**
 * Splits text into one <span class="who__text1-child"> per character
 * (spaces preserved as fixed-width .space-char spans), matching the
 * "who__text1" scroll-scrub highlight described in the spec: each
 * character transitions from 40% white to full white as the section
 * scrolls, driven externally via GSAP by targeting `.who__text1-child`.
 *
 * Accessibility: SplitChars is the only place this sentence's text lives
 * in the DOM (Who.jsx doesn't duplicate it in a heading/paragraph), so the
 * wrapping span itself carries `aria-label={text}` as the real accessible
 * name. The per-character children exist purely to drive the GSAP color
 * scrub and must not be exposed to assistive tech (or the wrapper's name
 * would be followed by every single letter read out again) — so each
 * child span is `aria-hidden`, while the wrapper is left un-hidden so its
 * aria-label is actually announced.
 */
const SplitChars = forwardRef(function SplitChars({ text, className }, ref) {
  const chars = Array.from(text);
  return (
    <span className={className} ref={ref} aria-label={text}>
      {chars.map((ch, i) =>
        ch === " " ? (
          <span key={i} className="space-char" aria-hidden="true" />
        ) : (
          <span key={i} className="who__text1-child" aria-hidden="true">
            {ch}
          </span>
        )
      )}
    </span>
  );
});

export default SplitChars;
