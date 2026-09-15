"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapSetup";
import { WIPE_COMPLETE_START } from "@/lib/whoTransitionTiming";
import { strapiMediaUrl } from "@/lib/strapi";
import SplitChars from "./SplitChars";

export default function Who({ data }) {
  const introText = data?.introText || "";
  const audienceLabel = data?.audienceLabel || "";
  const audienceLines = data?.audienceLines || [];
  const theses = data?.theses || [];
  const videoUrl = strapiMediaUrl(data?.backgroundVideo) || "/video/who-video.mp4";

  const sectionRef = useRef(null);
  const textSectionRef = useRef(null);
  const text1Ref = useRef(null);
  const text1WrapRef = useRef(null);
  const text2WrapRef = useRef(null);
  const thesesSectionRef = useRef(null);
  const thesesWrapRef = useRef(null);
  const videoSectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      // Reveal waits for BOTH the curtain wipe (WIPE_COMPLETE_START) and this
      // section's own sticky camera lock — either alone risks reveal-before-settle.
      gsap.set(sectionRef.current, { opacity: 0 });
      gsap.set([text1WrapRef.current, text2WrapRef.current], { opacity: 0 });

      const specsEl = document.querySelector("#specs");
      const wipeCompleteMarker = ScrollTrigger.create({
        trigger: specsEl,
        start: WIPE_COMPLETE_START,
      });
      const cameraLockMarker = ScrollTrigger.create({
        trigger: textSectionRef.current,
        start: "top top",
      });

      // Point text1 becomes visible — also reused as the char-highlight's
      // own start, so its 0-100% progress isn't spent before text is visible.
      const revealStart = () =>
        Math.max(wipeCompleteMarker.start, cameraLockMarker.start);

      // Release point is "bottom bottom", NOT "bottom top" — the latter is
      // one full camera-height (100vh) too late for a CSS-sticky (not pin:true) hold.
      const sectionEndMarker = ScrollTrigger.create({
        trigger: textSectionRef.current,
        start: "bottom bottom",
      });

      // text2 fades in at the highlight's own midpoint (50%), computed
      // directly — not an independent #specs-relative offset (that got swamped).
      const text2Start = () => (revealStart() + sectionEndMarker.start) / 2;

      ScrollTrigger.create({
        start: revealStart,
        onEnter: () => {
          gsap.set(sectionRef.current, { opacity: 1 });
          gsap.to(text1WrapRef.current, {
            opacity: 1,
            duration: 0.9,
            ease: "power1.out",
          });
        },
        onLeaveBack: () => {
          gsap.set(text1WrapRef.current, { opacity: 0 });
          gsap.set(sectionRef.current, { opacity: 0 });
        },
      });

      ScrollTrigger.create({
        start: text2Start,
        onEnter: () =>
          gsap.to(text2WrapRef.current, {
            opacity: 1,
            duration: 0.9,
            ease: "power1.out",
          }),
        onLeaveBack: () =>
          gsap.to(text2WrapRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power1.out",
          }),
      });

      // Char-by-char highlight, 40% -> full white. Starts at revealStart,
      // ends at sectionEndMarker so 100% lands exactly on the release point.
      const chars = text1Ref.current.querySelectorAll(".who__text1-child");
      gsap.set(chars, { color: "rgba(255,255,255,0.4)" });
      ScrollTrigger.create({
        start: revealStart,
        end: () => sectionEndMarker.start,
        scrub: true,
        onUpdate: (self) => {
          const reveal = Math.floor(self.progress * chars.length);
          chars.forEach((c, i) => {
            c.style.color = i < reveal ? "#fff" : "rgba(255,255,255,0.4)";
          });
        },
      });

      // Theses slide in from the right, staggered
      const theses = thesesWrapRef.current.querySelectorAll(".thesis__content");
      gsap.fromTo(
        theses,
        { xPercent: 110 },
        {
          xPercent: 0,
          ease: "none",
          stagger: 0.15,
          scrollTrigger: {
            trigger: thesesSectionRef.current,
            start: "top bottom",
            end: "bottom center",
            scrub: true,
          },
        }
      );

      // Pen video: grows from a small top-right inset box to full-bleed, holds,
      // shrinks + fades. Self-contained — all stages are % of VIDEO_TOTAL_VH.
      const VIDEO_CAMERA_VH = 100;
      const GROW_VH = 100;
      const HOLD_VH = 40;
      const SHRINK_VH = 70;
      const TAIL_VH = 10;
      const VIDEO_TOTAL_VH =
        VIDEO_CAMERA_VH + GROW_VH + HOLD_VH + SHRINK_VH + TAIL_VH;
      const pct = (vh) => `${(vh / VIDEO_TOTAL_VH) * 100}% top`;

      const boxFrom = {
        width: "44vw",
        height: "36vh",
        right: "2.32vw",
        top: "2.32vw",
      };
      const boxFull = {
        width: "100vw",
        height: "100vh",
        right: "0vw",
        top: "0vw",
      };

      // "top bottom" (entering viewport), not "top top" (camera locking) —
      // box grows the moment it scrolls into view, not once pinned.
      gsap.fromTo(videoRef.current, boxFrom, {
        ...boxFull,
        ease: "none",
        scrollTrigger: {
          trigger: videoSectionRef.current,
          start: "top bottom",
          end: pct(GROW_VH),
          scrub: true,
        },
      });

      // Shrink-out scales down + fades in place (center-anchored), not a
      // return to the small top-right box.
      gsap.fromTo(
        videoRef.current,
        { scale: 1, opacity: 1 },
        {
          scale: 0.7,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: videoSectionRef.current,
            start: pct(GROW_VH + HOLD_VH),
            end: pct(GROW_VH + HOLD_VH + SHRINK_VH),
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="who" ref={sectionRef} id="who" data-header-theme="dark">
      <div className="who__text-content" ref={textSectionRef}>
        <div className="who__text-camera">
          <div className="container--primary">
            <div className="who__text-wrapper">
              <div className="who__text1-wrapper" ref={text1WrapRef}>
                <SplitChars
                  text={introText}
                  className="who__text1 large-text--1"
                  ref={text1Ref}
                />
              </div>
              <div className="who__text2-wrapper" ref={text2WrapRef}>
                <span className="descriptor tc--main-white-40">
                  {audienceLabel}
                </span>
                <div className="who__descriptor-wrapper">
                  {audienceLines.map((line) => (
                    <span
                      className="large-text--2 tc--main-white"
                      key={line.text}
                    >
                      {line.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="who__theses-content" ref={thesesSectionRef}>
        <div className="container--primary">
          <div className="who__theses-wrapper" ref={thesesWrapRef}>
            {theses.map((thesis) => (
              <article className="thesis__content" key={thesis.title}>
                <h3 className="headline--3 tc--main-white">{thesis.title}</h3>
                <p className="main-text tc--main-white-40">{thesis.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="who__video-content" ref={videoSectionRef}>
        <div className="who__video-camera">
          <div className="who__video-box" ref={videoRef}>
            <video
              className="who__video-placeholder"
              src={videoUrl}
              muted
              playsInline
              preload="metadata"
              autoPlay
            />
          </div>
        </div>
      </div>
    </section>
  );
}
