"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsap } from "@/lib/gsapSetup";
import { getLenisInstance } from "@/lib/lenisInstance";

export default function Preloader() {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  // Locks scroll + Lenis until 100% (prevents a jump-on-unlock); deferred a
  // frame so SmoothScroll's parent effect has already created the instance.
  useEffect(() => {
    document.body.classList.add("is-preloading");
    const raf = requestAnimationFrame(() => getLenisInstance()?.stop());
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const { gsap } = ensureGsap();
    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(counter.value)),
      onComplete: () => {
        document.body.classList.remove("is-preloading");
        getLenisInstance()?.start();
        gsap.to(ref.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power1.out",
          onComplete: () => setDone(true),
        });
      },
    });
    return () => {
      tween.kill();
      document.body.classList.remove("is-preloading");
      getLenisInstance()?.start();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={ref}
      className="preload bc--main-radial desktop-experience"
      role="status"
      aria-live="polite"
    >
      <span className="preload__counter counter headline--1 tc--main-white">
        {count}%
      </span>
    </div>
  );
}
