import { forwardRef } from "react";

/**
 * Splits text into one per-character span for the GSAP scroll-scrub highlight.
 * Wrapper carries aria-label={text}; children are aria-hidden to avoid double-reading.
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
