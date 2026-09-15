"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapSetup";

export default function InsideTransition() {
  const sectionRef = useRef(null);
  const circleRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      // Anchored at "top top" (real pin point) with plain vh() offsets,
      // not percentage-of-trigger — same technique as Paper.jsx's lock point.
      const topMarker = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
      });
      const vh = (n) => (n / 100) * window.innerHeight;
      const topPlus = (n) => () => topMarker.start + vh(n);

      // Phase 1: circle opens from center to its resting CSS size once
      // this camera pins (Paper.jsx keeps .paper black until then).
      gsap.fromTo(
        circleRef.current,
        { scale: 0 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: topPlus(0),
            end: topPlus(65),
            scrub: true,
          },
        }
      );

      // Phase 2: circle keeps expanding (scale 6, covers any viewport
      // diagonal) until solid white, handing off to .inside's own white bg.
      gsap.fromTo(
        circleRef.current,
        { scale: 1 },
        {
          scale: 6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: topPlus(65),
            end: topPlus(165),
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        titleRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: topPlus(20),
            end: topPlus(90),
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="inside__transition" ref={sectionRef} data-header-theme="dark">
      <div className="inside__transition-camera">
        <div
          className="inside__transition-circle bc--main-white"
          ref={circleRef}
        />
        <div className="inside__title-wrapper" ref={titleRef}>
          <h2 className="headline--2 tc--main-black">
            Inside
            <br />
            the box
          </h2>
        </div>
      </div>
    </section>
  );
}
