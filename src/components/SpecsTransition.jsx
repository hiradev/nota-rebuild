"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapSetup";

export default function SpecsTransition() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const curtainsRef = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      // One shared timeline, not two separate ScrollTriggers on the same
      // range — GSAP only drives the first one created for identical triggers.
      const curtains = curtainsRef.current.querySelectorAll(
        ".transition-specs__curtain"
      );
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=80%",
          scrub: true,
        },
      });
      tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, ease: "none" }, 0);
      tl.fromTo(
        curtains,
        { yPercent: 100 },
        { yPercent: 0, ease: "none", stagger: 0.03 },
        0
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="transition-specs negative-margin--100-vh"
      ref={sectionRef}
      data-header-theme="light"
    >
      <div className="transition-specs__camera">
        <div className="transition-specs__black-bg" ref={bgRef} />
        <div
          className="transition-specs__curtains-wrapper"
          ref={curtainsRef}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="transition-specs__curtain" key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
