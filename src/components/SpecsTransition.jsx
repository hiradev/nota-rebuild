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
      // Black backdrop and curtain rise share one timeline/scrollTrigger
      // (not two separate ones on the same trigger+start+end — GSAP only
      // actually drives the first ScrollTrigger created against a given
      // trigger element's identical range; a second one with the same
      // numbers gets created but never updates on scroll) so black only
      // ever shows in the sliver curtains haven't covered yet, instead of
      // racing ahead and holding a solid black screen on its own.
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
    <section className="transition-specs negative-margin--100-vh" ref={sectionRef}>
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
