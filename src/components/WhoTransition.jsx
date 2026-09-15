"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapSetup";

export default function WhoTransition() {
  const sectionRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      const bars = cameraRef.current.querySelectorAll(
        ".who-transition__curtain, .who-transition__curtain--top"
      );
      // Bottom row closes first, top sliver last — verified against the
      // live site (row 4's width leads row 1's by a wide margin
      // throughout), so the wipe reads as rising up from below rather
      // than dropping down from the top.
      gsap.fromTo(
        bars,
        { width: "0%" },
        {
          width: "100%",
          ease: "none",
          stagger: { each: 0.15, from: "end" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top-=150%",
            end: "+=90%",
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="who-transition" ref={sectionRef}>
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
