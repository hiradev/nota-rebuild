"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapSetup";
import Image from "next/image";

const COLORS = [
  { id: "silver", image: "/images/color-1.webp", line1: "Impossible to", line2: "overthink" },
  { id: "graphite", image: "/images/color-2.webp", line1: "Graphite Black.", line2: "Clarity in silence." },
  { id: "blue", image: "/images/color-3.webp", line1: "Mist Blue.", line2: "Light thinking." },
  { id: "red", image: "/images/color-4.webp", line1: "Precision Red.", line2: "Form follows thought." },
  { id: "orange", image: "/images/color-5.webp", line1: "Bright Orange.", line2: "Steady focus." },
];

export default function Colors() {
  const sectionRef = useRef(null);
  const wrapRefs = useRef([]);
  const dotsRef = useRef([]);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      const perSlide = 1 / COLORS.length;
      COLORS.slice(1).forEach((c, i) => {
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
    <section className="section-colors" ref={sectionRef} id="colors">
      <div className="section-colors__camera">
        {COLORS.map((c, i) => (
          <div
            className="section-colors__wrapper"
            key={c.id}
            ref={(el) => (wrapRefs.current[i] = el)}
            style={{ opacity: i === 0 ? 1 : undefined, zIndex: i + 1 }}
          >
            <Image
              src={c.image}
              alt={`Pen colorway — ${c.id}`}
              fill
              style={{ objectFit: "cover" }}
              sizes="100vw"
              priority={i === 0}
            />
            <div className="section-colors__content-wrapper container--primary">
              <div className="section-colors__text-wrapper large-text--3 tc--main-white">
                {c.line1}
              </div>
              <div className="section-colors__text-wrapper2 large-text--3 tc--main-white">
                {c.line2}
              </div>
            </div>
          </div>
        ))}

        <div className="section-colors__paginations-wrapper">
          {COLORS.map((c, i) => (
            <div
              className={`pagination-dot bc--white-40${
                i === 0 ? " pagination-dot--active" : ""
              }`}
              key={c.id}
              ref={(el) => (dotsRef.current[i] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
