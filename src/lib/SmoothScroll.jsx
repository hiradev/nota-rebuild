"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ensureGsap } from "@/lib/gsapSetup";
import { setLenisInstance } from "@/lib/lenisInstance";

/** Wires Lenis smooth scroll into GSAP's ticker so ScrollTrigger stays in
 * sync with the smoothed scroll position. Config transcribed from the spec. */
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
    setLenisInstance(lenis);

    function raf(time) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    // Images/Lottie/video resolve async and can shift page height after
    // triggers are calculated — re-refresh on load and on further resize.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    let resizeTimer;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refresh, 150);
    });
    ro.observe(document.body);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.removeEventListener("load", refresh);
      ro.disconnect();
      clearTimeout(resizeTimer);
      setLenisInstance(null);
    };
  }, []);

  return children;
}
