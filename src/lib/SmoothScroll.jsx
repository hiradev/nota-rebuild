"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ensureGsap } from "@/lib/gsapSetup";

/**
 * Wires Lenis smooth scroll into GSAP's ticker so ScrollTrigger stays in
 * sync with the smoothed scroll position.
 *
 * Config transcribed from the spec: duration 1.2, lerp 0.08, smoothWheel
 * true, vertical orientation, exponential easing
 * t => Math.min(1, 1.001 - Math.pow(2, -10*t)).
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();

    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.08,
      smoothWheel: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return children;
}
