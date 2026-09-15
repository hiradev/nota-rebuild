"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapSetup";

const LINE_1 = "Smart pen";
const LINE_2 = "for real thinking";

/** Scramble-reveal: characters cycle through random glyphs before
 * settling on the final text. Plays once on mount (matches the live
 * site's decode-in effect) rather than scrubbing with scroll position —
 * scroll-linked reveal left the headline stuck mid-scramble whenever the
 * page wasn't at the very top. */
function useScramble(ref, text, delay = 0) {
  useEffect(() => {
    if (!ref.current) return;
    const { gsap } = ensureGsap();
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const el = ref.current;
    const chars = text.split("");
    const state = { progress: 0 };

    const tween = gsap.to(state, {
      progress: 1,
      duration: 1.1,
      delay,
      ease: "power1.out",
      onUpdate: () => {
        const revealCount = Math.floor(state.progress * chars.length);
        el.textContent = chars
          .map((c, i) => {
            if (c === " ") return " ";
            if (i < revealCount) return c;
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join("");
      },
      onComplete: () => {
        el.textContent = text;
      },
    });

    return () => tween.kill();
  }, [ref, text, delay]);
}

export default function Cover() {
  const sectionRef = useRef(null);
  const cameraRef = useRef(null);
  const lottieWrapRef = useRef(null);
  const lottieContainerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useScramble(line1Ref, LINE_1, 0);
  useScramble(line2Ref, LINE_2, 0.15);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      // Gentle parallax/scale on the wrapper, independent of the
      // frame-seek below.
      gsap.fromTo(
        lottieWrapRef.current,
        { yPercent: 4, scale: 1.28 },
        {
          yPercent: -4,
          scale: 1.32,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    // Scrub the Lottie "turntable" render by seeking its frame to
    // scroll progress through the hero track. Uses lottie-web's
    // loadAnimation/goToAndStop directly rather than the <lottie-player>
    // custom element — that element's "ready" event is a race against
    // ScrollTrigger's first onUpdate, and losing that race left the
    // player permanently un-seeked (which reads as a dead/black hero).
    let anim;
    let totalFrames = 0;
    let st;
    let cancelled = false;

    import("lottie-web").then(({ default: lottie }) => {
      if (cancelled || !lottieContainerRef.current) return;
      anim = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "/lottie/cover.json",
      });
      anim.addEventListener("DOMLoaded", () => {
        totalFrames = anim.totalFrames;
      });

      st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (totalFrames > 1) {
            anim.goToAndStop(
              Math.floor(self.progress * (totalFrames - 1)),
              true
            );
          }
        },
      });
    });

    return () => {
      cancelled = true;
      ctx.revert();
      st?.kill();
      anim?.destroy();
    };
  }, []);

  return (
    <section className="cover" ref={sectionRef}>
      <div className="cover__camera" ref={cameraRef}>
        <div className="cover__lottie-pen" ref={lottieWrapRef}>
          <div ref={lottieContainerRef} className="cover__lottie-canvas" />
        </div>
        <div className="cover__wrapper">
          <div className="cover__headline-wrapper">
            <h1 className="headline--1 tc--main-white" ref={line1Ref}>
              {LINE_1}
            </h1>
            <h1 className="headline--1 tc--main-white" ref={line2Ref}>
              {LINE_2}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
