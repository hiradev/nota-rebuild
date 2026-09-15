"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapSetup";
import SplitChars from "./SplitChars";

const TEXT1 =
  "Some thoughts need time, space, and a physical trace to exist. Writing by hand creates focus, presence, and a deeper connection with ideas. This tool is built around that simple truth.";

const AUDIENCE_LINES = [
  "This tool is made for people who think on paper. It",
  "keeps handwriting natural and focused, letting you write the way you always have without distractions or screens getting in the way.",
  "Everything you write syncs to the app, where",
  "your notes are organized, searchable, and ready to work with AI when you need more clarity or structure.",
];

const THESES = [
  {
    title: "Students & Learners",
    body: "Handwritten notes stay personal and intuitive, but become searchable, organized, and easy to study. Lectures, ideas, and revisions are captured as they are — then supported by AI summaries, text recognition, and quick navigation when it matters most.",
  },
  {
    title: "Creators, Designers & Architects",
    body: "Sketches, diagrams, concepts, and fragments of ideas belong on paper. This tool makes sure they don't disappear. Everything drawn or written is safely stored, easy to revisit, and ready to evolve into something bigger — without interrupting the creative flow.",
  },
  {
    title: "Managers & Product Thinkers",
    body: "Meetings start on paper and end with structure. Notes turn into clear summaries, tasks, and follow-ups. The pen captures everything quietly, while the app helps organize decisions without pulling attention away from the room.",
  },
];

export default function Who() {
  const sectionRef = useRef(null);
  const textSectionRef = useRef(null);
  const text1Ref = useRef(null);
  const thesesSectionRef = useRef(null);
  const thesesWrapRef = useRef(null);
  const videoSectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      // Whole section stays hidden behind the who-transition curtains and
      // snaps to visible only once its own camera takes over (verified
      // against the live site: .who's opacity is a hard 0/1 step tied to
      // scroll position, not a scrubbed fade — it never blends with the
      // still-visible Specs cards above it).
      gsap.set(sectionRef.current, { opacity: 0 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        onEnter: () => gsap.set(sectionRef.current, { opacity: 1 }),
        onLeaveBack: () => gsap.set(sectionRef.current, { opacity: 0 }),
      });

      // Character-by-character highlight, 40% white -> full white
      const chars = text1Ref.current.querySelectorAll(".who__text1-child");
      gsap.set(chars, { color: "rgba(255,255,255,0.4)" });
      ScrollTrigger.create({
        trigger: textSectionRef.current,
        start: "top top",
        end: "bottom top",
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

      // Video grows and settles into frame
      gsap.fromTo(
        videoRef.current,
        { y: "-17.5vh", scale: 0.7 },
        {
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: videoSectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="who" ref={sectionRef} id="who">
      <div className="who__text-content" ref={textSectionRef}>
        <div className="who__text-camera">
          <div className="container--primary">
            <div className="who__text-wrapper">
              <div className="who__text1-wrapper">
                <SplitChars
                  text={TEXT1}
                  className="who__text1 large-text--1"
                  ref={text1Ref}
                />
              </div>
              <div className="who__text2-wrapper">
                <span className="descriptor tc--main-white-40">
                  Who it&apos;s for:
                </span>
                <div className="who__descriptor-wrapper">
                  {AUDIENCE_LINES.map((line) => (
                    <span
                      className="large-text--2 tc--main-white"
                      key={line}
                    >
                      {line}
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
            {THESES.map((thesis) => (
              <div className="thesis__content" key={thesis.title}>
                <h3 className="headline--3 tc--main-white">{thesis.title}</h3>
                <p className="main-text tc--main-white-40">{thesis.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="who__video-content" ref={videoSectionRef}>
        <div className="who__video-camera">
          <div ref={videoRef} style={{ width: "100%", height: "46.57vw" }}>
            <video
              className="who__video-placeholder"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src="/video/who-video.mp4"
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
