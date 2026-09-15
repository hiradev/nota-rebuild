"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapSetup";
import { WIPE_START, WIPE_END_OFFSET } from "@/lib/whoTransitionTiming";

export default function WhoTransition() {
  const sectionRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      const bars = cameraRef.current.querySelectorAll(
        ".who-transition__curtain, .who-transition__curtain--top"
      );
      // Trigger is #specs, not this section: wipe waits for the Specs cards'
      // entrance tween to finish (WIPE_START), then a deliberate pause before firing.
      gsap.fromTo(
        bars,
        { width: "0%" },
        {
          width: "100%",
          ease: "none",
          stagger: { each: 0.15, from: "end" },
          scrollTrigger: {
            trigger: document.querySelector("#specs"),
            start: WIPE_START,
            end: WIPE_END_OFFSET,
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="who-transition" ref={sectionRef} data-header-theme="dark">
      <div className="who-transition__camera">
        <div className="who-transition__curtains-wrapper" ref={cameraRef}>
          <div className="who-transition__curtain--top" />
          <div className="who-transition__curtain" />
          <div className="who-transition__curtain" />
          <div className="who-transition__curtain" />
        </div>
      </div>
    </section>
  );
}
