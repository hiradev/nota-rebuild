"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapSetup";

export default function InsideTransition() {
  const sectionRef = useRef(null);
  const circleRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        circleRef.current,
        { scale: 0 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
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
            start: "10% top",
            end: "40% top",
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="inside__transition" ref={sectionRef}>
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
