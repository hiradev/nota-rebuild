"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapSetup";
import { strapiMediaUrl } from "@/lib/strapi";
import Image from "next/image";

export default function Paper({ data }) {
  const coverHeadlineLine1 = data?.coverHeadlineLine1 || "";
  const coverHeadlineLine2 = data?.coverHeadlineLine2 || "";
  const slides = (data?.slides || []).map((slide, i) => ({
    id: i,
    image: strapiMediaUrl(slide.image),
    heading: slide.heading,
    body: slide.body,
    description: slide.description,
  }));

  const sectionRef = useRef(null);
  const coverRef = useRef(null);
  const curtainsRef = useRef(null);
  const slideRefs = useRef([]);
  const imageRefs = useRef([]);
  const dotsRef = useRef([]);
  const blackoutRef = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      // Timing is anchored to Who's non-sticky .who__video-content (not
      // percentages of .paper's own sticky height — unreliable, see Who.jsx).
      const WHO_CAMERA_VH = 100; // .who__video-camera's height
      const PAPER_OVERLAP_VH = 100; // .paper's margin-top in sections.css
      const whoReleaseMarker = ScrollTrigger.create({
        trigger: document.querySelector(".who__video-content"),
        start: "bottom bottom",
      });
      const vh = (n) => (n / 100) * window.innerHeight;
      const paperLockPoint = () =>
        whoReleaseMarker.start + vh(WHO_CAMERA_VH - PAPER_OVERLAP_VH);
      const lockPlus = (vhAmount) => () => paperLockPoint() + vh(vhAmount);

      // No separate slide-up tween on the cover: the overlap margin's
      // native scroll already produces that motion — adding one double-counted it.

      // Six-column white wipe reveals the carousel. Stagger runs from the
      // LAST curtain first, matching the reference site's own wipe direction.
      const curtains = curtainsRef.current.querySelectorAll(
        ".paper__curtain"
      );
      gsap.fromTo(
        curtains,
        { height: "0vh" },
        {
          height: "100vh",
          ease: "none",
          stagger: { each: 0.03, from: "end" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: lockPlus(0),
            end: lockPlus(60),
            scrub: true,
          },
        }
      );

      // Finishes well before the curtain exit ends, so the cover is fully
      // gone (not a faint ghost) while curtains are still mid-exit.
      gsap.fromTo(
        coverRef.current,
        { autoAlpha: 1 },
        {
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: lockPlus(30),
            end: lockPlus(75),
            scrub: true,
          },
        }
      );

      // Exits via yPercent 0->100 (dropping off-stage), not a height
      // shrink — keeps full 100vh height, stagger reversed to leftmost-first.
      gsap.fromTo(
        curtains,
        { yPercent: 0 },
        {
          yPercent: 100,
          ease: "none",
          stagger: 0.03,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: lockPlus(72),
            end: lockPlus(108),
            scrub: true,
          },
        }
      );

      // Slides 2-4 cross-fade in equal bands after the cover reveal.
      // bandEndVh must stay well under (.paper's height - 100vh camera unstick point).
      const bandStartVh = 120;
      const bandEndVh = 470;
      const perSlideVh = (bandEndVh - bandStartVh) / (slides.length - 1);

      // Each band holds a static pause, then a quick crossfade (not
      // stretched full-band) — the Ken Burns zoom still runs full-band width.
      const delayVh = 25;
      const fadeVh = 20;

      const setActiveDot = (index) => {
        dotsRef.current.forEach((d, di) =>
          d?.classList.toggle("paper__pagination-item--active", di === index)
        );
      };

      slides.slice(1).forEach((slide, i) => {
        const startVh = bandStartVh + i * perSlideVh;
        const endVh = startVh + perSlideVh;
        const fadeStartVh = startVh + delayVh;
        const fadeEndVh = fadeStartVh + fadeVh;

        gsap.fromTo(
          slideRefs.current[i + 1],
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: lockPlus(fadeStartVh),
              end: lockPlus(fadeEndVh),
              scrub: true,
            },
          }
        );
        // Ken Burns zoom is forward-only: tracks max progress reached (not a
        // plain bidirectional scrub) so scrolling back up doesn't reverse it.
        gsap.set(imageRefs.current[i + 1], { scale: 1.4 });
        let maxZoomProgress = 0;
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: lockPlus(startVh),
          end: lockPlus(endVh),
          onUpdate: (self) => {
            if (self.progress > maxZoomProgress) {
              maxZoomProgress = self.progress;
              gsap.set(imageRefs.current[i + 1], {
                scale: 1.4 - 0.4 * maxZoomProgress,
              });
            }
          },
        });

        // pagination swap - flips right as the quick fade kicks in.
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: lockPlus(fadeStartVh),
          end: lockPlus(fadeEndVh),
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

      // Fades to black before lockPlus(500) so InsideTransition's rise (which
      // starts 100vh before its own pin point) reads as black-on-black, not a slide.
      gsap.fromTo(
        blackoutRef.current,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: lockPlus(480),
            end: lockPlus(500),
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="paper" ref={sectionRef} data-header-theme="dark">
      <div className="paper__camera">
        {slides
          .slice()
          .reverse()
          .map((slide, revIdx) => {
            const idx = slides.length - 1 - revIdx;
            return (
              <article
                className="paper__slide"
                key={slide.id}
                ref={(el) => (slideRefs.current[idx] = el)}
                style={{ zIndex: idx + 1 }}
              >
                <div
                  ref={(el) => (imageRefs.current[idx] = el)}
                  style={{ position: "absolute", inset: 0 }}
                >
                  {slide.image ? (
                    <Image
                      src={slide.image}
                      alt={slide.heading}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="100vw"
                      priority={idx === 0}
                    />
                  ) : null}
                </div>
                <div className="paper__slide-container">
                  <h3 className="paper__heading large-text--1 tc--main-white">
                    {slide.heading}
                  </h3>
                  <div className="paper__description">
                    <div className="paper__plate">
                      <h4 className="headline--3 tc--main-white">
                        {slide.body}
                      </h4>
                    </div>
                    {slide.description ? (
                      <div className="paper__plate">
                        <p className="main-text tc--main-white">
                          {slide.description}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}

        <ul className="paper__pagination">
          {slides.map((slide, i) => (
            <li
              className={`paper__pagination-item${
                i === 0 ? " paper__pagination-item--active" : ""
              }`}
              key={slide.id}
              ref={(el) => (dotsRef.current[i] = el)}
            />
          ))}
        </ul>

        <div className="paper__cover bc--main-white" ref={coverRef}>
          <h2 className="page__heading headline--2 tc--gray">{coverHeadlineLine1}</h2>
          <h2 className="page__heading headline--2 tc--main-black">
            {coverHeadlineLine2}
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

        <div className="paper__blackout" ref={blackoutRef} />
      </div>
    </section>
  );
}
