"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsap } from "@/lib/gsapSetup";

export default function Preloader() {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const { gsap } = ensureGsap();
    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(counter.value)),
      onComplete: () => {
        gsap.to(ref.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power1.out",
          onComplete: () => setDone(true),
        });
      },
    });
    return () => tween.kill();
  }, []);

  if (done) return null;

  return (
    <div ref={ref} className="preload bc--main-radial desktop-experience">
      <span className="preload__counter counter headline--1 tc--main-white">
        {count}%
      </span>
    </div>
  );
}
