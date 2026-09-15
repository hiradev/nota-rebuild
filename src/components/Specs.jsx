"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ensureGsap } from "@/lib/gsapSetup";

const CARDS = [
  {
    title: "Writing System",
    rows: [
      "Fountain pen nib",
      "Natural ink flow",
      "Replaceable fountain-pen ink cartridge",
      "Designed for precise, expressive handwriting",
    ],
  },
  {
    title: "Capture Technology",
    rows: [
      "High-precision optical tracking",
      "Real-time stroke capture",
      "Line-by-line accuracy",
      "Supports handwriting, diagrams, sketches",
    ],
  },
  {
    title: "Digital Continuity",
    rows: [
      "Notes sync automatically",
      "Searchable over time",
      "Structured with AI support",
      "Ready when you return",
    ],
  },
];

export default function Specs() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const textWrapRef = useRef(null);
  const imgWrapRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        textWrapRef.current,
        { y: "32.68vh", opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "center center",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        imgWrapRef.current,
        { yPercent: 130 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "center top",
            scrub: true,
          },
        }
      );

      const cards = listRef.current.querySelectorAll(".specs-list__card");
      gsap.fromTo(
        cards,
        { yPercent: 140 },
        {
          yPercent: 0,
          ease: "none",
          stagger: 0.06,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "center center",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="specs" ref={sectionRef} id="specs">
      <div className="specs__camera">
        <div className="specs__content bc--main-white" ref={contentRef}>
          <div className="specs__content-text-wrapper" ref={textWrapRef}>
            <h2 className="headline--1 tc--gray">Nota pen</h2>
            <h2 className="headline--1 tc--main-black">Specifications</h2>
          </div>

          <div className="specs-content__img-wrapper" ref={imgWrapRef}>
            <Image
              src="/images/specs-pen.png"
              alt="Nota pen"
              width={233}
              height={734}
              className="specs__content--img"
            />
          </div>

          <div className="specs-pack__list" ref={listRef}>
            {CARDS.map((card) => (
              <div className="specs-list__card" key={card.title}>
                <div className="specs-card__top-content bc--black-2 effect--glass">
                  <h3 className="headline--3 tc--main-black">{card.title}</h3>
                </div>
                <div className="specs-card__bottom-content bc--black-2 effect--glass">
                  {card.rows.map((label, i) => (
                    <div
                      className={`specs-card__bottom-info${
                        i === card.rows.length - 1
                          ? " specs-card__bottom-info--last"
                          : ""
                      }`}
                      key={label}
                    >
                      <div className="specs-card__bottom-wrapper">
                        <span className="card-text tc--main-black">
                          {label}
                        </span>
                        <span className="specs-card__bottom-dot bc--black-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
