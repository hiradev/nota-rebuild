"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapSetup";
import { strapiMediaUrl } from "@/lib/strapi";
import Image from "next/image";

export default function Colors({ data }) {
  const colors = (data?.slides || []).map((slide, i) => ({
    id: i,
    image: strapiMediaUrl(slide.image),
    line1: slide.taglineLine1,
    line2: slide.taglineLine2,
  }));

  const sectionRef = useRef(null);
  const wrapRefs = useRef([]);
  const dotsRef = useRef([]);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      // +1 reserves one slide-width of pure dwell time so the last slide
      // holds fully visible before the section releases (matches sections.css).
      const perSlide = 1 / (colors.length + 1);

      // Dot 1 needs its own zone too, so pagination resets to it on scroll-back
      // (onToggle only fires "on enter", never resets on leave otherwise).
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "0% top",
        end: `${perSlide * 100}% top`,
        scrub: true,
        onToggle: (self) => {
          if (self.isActive) {
            dotsRef.current.forEach((d, di) =>
              d?.classList.toggle("pagination-dot--active", di === 0)
            );
          }
        },
      });

      colors.slice(1).forEach((c, i) => {
        const idx = i + 1;
        const start = idx * perSlide;
        const end = start + perSlide;
        gsap.fromTo(
          wrapRefs.current[idx],
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
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: `${start * 100}% top`,
          end: `${end * 100}% top`,
          scrub: true,
          onToggle: (self) => {
            if (self.isActive) {
              dotsRef.current.forEach((d, di) =>
                d?.classList.toggle("pagination-dot--active", di === idx)
              );
            }
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section-colors" ref={sectionRef} id="colors" data-header-theme="dark">
      <div className="section-colors__camera">
        {colors.map((c, i) => (
          <article
            className="section-colors__wrapper"
            key={c.id}
            ref={(el) => (wrapRefs.current[i] = el)}
            style={{ opacity: i === 0 ? 1 : undefined, zIndex: i + 1 }}
          >
            {c.image ? (
              <Image
                src={c.image}
                alt={`Pen colorway — ${c.line1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="100vw"
                priority={i === 0}
              />
            ) : null}
            <div className="section-colors__content-wrapper container--primary">
              <p className="section-colors__text-wrapper large-text--3 tc--main-white">
                {c.line1}
              </p>
              <p className="section-colors__text-wrapper2 large-text--3 tc--main-white">
                {c.line2}
              </p>
            </div>
          </article>
        ))}

        <ul className="section-colors__paginations-wrapper">
          {colors.map((c, i) => (
            <li
              className={`pagination-dot bc--white-40${
                i === 0 ? " pagination-dot--active" : ""
              }`}
              key={c.id}
              ref={(el) => (dotsRef.current[i] = el)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
