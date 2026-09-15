"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapSetup";
import Image from "next/image";

const SLIDES = [
  {
    id: 1,
    image: "/images/paper-slide-1.webp",
    heading: "We use special paper with a nearly invisible pattern",
    body: "For the pen, it's a precise map.",
  },
  {
    id: 2,
    image: "/images/paper-slide-2.webp",
    heading: "Looks like paper",
    body: "For you, it's just a blank sheet.",
  },
  {
    id: 3,
    image: "/images/paper-slide-3.webp",
    heading: "No delays. No glitches. No random effects.",
    body: "AI-powered structure.",
  },
  {
    id: 4,
    image: "/images/paper-slide-4.webp",
    heading: "Everything you write is synced to your phone in real time",
    body: "Your notes. Already there.",
  },
];

export default function Paper() {
  const sectionRef = useRef(null);
  const coverRef = useRef(null);
  const curtainsRef = useRef(null);
  const slideRefs = useRef([]);
  const imageRefs = useRef([]);
  const dotsRef = useRef([]);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      // Six-column wipe revealing the section under the black cover. Both
      // the cover and curtains stay black (not white) - per the reference
      // audit this carousel continues on a black background the whole way
      // through and only flips to white after it hands off to the next
      // section.
      const curtains = curtainsRef.current.querySelectorAll(
        ".paper__curtain"
      );
      gsap.fromTo(
        curtains,
        { height: "0vh" },
        {
          height: "100vh",
          ease: "none",
          stagger: 0.03,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "10% top",
            scrub: true,
          },
        }
      );

      // Black cover dissolves away
      gsap.fromTo(
        coverRef.current,
        { autoAlpha: 1 },
        {
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "5% top",
            end: "18% top",
            scrub: true,
          },
        }
      );

      // Slides 2-4 cross-fade in with a slow zoom-out; each occupies an
      // equal band of the 600vh track after the cover reveal.
      const bandStart = 0.2;
      const bandEnd = 0.95;
      const perSlide = (bandEnd - bandStart) / (SLIDES.length - 1);

      const setActiveDot = (index) => {
        dotsRef.current.forEach((d, di) =>
          d?.classList.toggle("paper__pagination-item--active", di === index)
        );
      };

      SLIDES.slice(1).forEach((slide, i) => {
        const start = bandStart + i * perSlide;
        const end = start + perSlide;
        gsap.fromTo(
          slideRefs.current[i + 1],
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${start * 100}% top`,
              end: `${end * 100}% top`,
              scrub: true,
            },
          }
        );
        gsap.fromTo(
          imageRefs.current[i + 1],
          { scale: 1.4 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${start * 100}% top`,
              end: `${end * 100}% top`,
              scrub: true,
            },
          }
        );

        // pagination swap
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: `${start * 100}% top`,
          end: `${end * 100}% top`,
          scrub: true,
          onToggle: (self) => {
            if (self.isActive) {
              // Entering this frame's band (either scroll direction).
              setActiveDot(i + 1);
            } else if (self.direction === -1) {
              // Scrolled back up past this frame's start: restore the
              // previous frame's dot instead of leaving this one lit.
              setActiveDot(i);
            }
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="paper" ref={sectionRef}>
      <div className="paper__camera">
        {SLIDES.slice()
          .reverse()
          .map((slide, revIdx) => {
            const idx = SLIDES.length - 1 - revIdx;
            return (
              <div
                className="paper__slide"
                key={slide.id}
                ref={(el) => (slideRefs.current[idx] = el)}
                style={{ zIndex: idx + 1 }}
              >
                <div
                  ref={(el) => (imageRefs.current[idx] = el)}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.heading}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100vw"
                    priority={idx === 0}
                  />
                </div>
                <div className="paper__slide-container">
                  <h3 className="paper__heading large-text--1 tc--main-white">
                    {slide.heading}
                  </h3>
                  <div className="paper__description">
                    <div className="paper__plate">
                      <h4 className="headline--3 tc--main-white">
                        {slide.heading}
                      </h4>
                    </div>
                    <div className="paper__plate">
                      <p className="main-text tc--main-white">{slide.body}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        <div className="paper__pagination">
          {SLIDES.map((slide, i) => (
            <div
              className={`paper__pagination-item${
                i === 0 ? " paper__pagination-item--active" : ""
              }`}
              key={slide.id}
              ref={(el) => (dotsRef.current[i] = el)}
            />
          ))}
        </div>

        <div className="paper__cover bc--main-black" ref={coverRef}>
          <h2 className="page__heading headline--2 tc--gray">Works with</h2>
          <h2 className="page__heading headline--2 tc--main-white">
            smart paper
          </h2>
        </div>

        <div className="paper__curtains" ref={curtainsRef}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              className={`paper__curtain${
                i === 5 ? " paper__curtain--last" : ""
              }`}
              key={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
