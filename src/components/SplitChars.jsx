import { forwardRef } from "react";

/**
 * Splits text into one <span class="who__text1-child"> per character
 * (spaces preserved as fixed-width .space-char spans), matching the
 * "who__text1" scroll-scrub highlight described in the spec: each
 * character transitions from 40% white to full white as the section
 * scrolls, driven externally via GSAP by targeting `.who__text1-child`.
 */
const SplitChars = forwardRef(function SplitChars({ text, className }, ref) {
  const chars = Array.from(text);
  return (
    <span className={className} ref={ref}>
      {chars.map((ch, i) =>
        ch === " " ? (
          <span key={i} className="space-char" aria-hidden="true" />
        ) : (
          <span key={i} className="who__text1-child">
            {ch}
          </span>
        )
      )}
    </span>
  );
});

export default SplitChars;
