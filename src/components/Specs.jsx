"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ensureGsap } from "@/lib/gsapSetup";
import { strapiMediaUrl } from "@/lib/strapi";

export default function Specs({ data }) {
  const headingLine1 = data?.headingLine1 || "";
  const headingLine2 = data?.headingLine2 || "";
  const penImageUrl = strapiMediaUrl(data?.penImage) || "/images/specs-pen.png";
  const cards = data?.cards || [];

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

      const cardEls = listRef.current.querySelectorAll(".specs-list__card");
      gsap.fromTo(
        cardEls,
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
    <section className="specs" ref={sectionRef} id="specs" data-header-theme="light">
      <div className="specs__camera">
        <div className="specs__content bc--main-white" ref={contentRef}>
          <div className="specs__content-text-wrapper" ref={textWrapRef}>
            <h2 className="headline--1 tc--gray">{headingLine1}</h2>
            <h2 className="headline--1 tc--main-black">{headingLine2}</h2>
          </div>

          <figure className="specs-content__img-wrapper" ref={imgWrapRef}>
            <Image
              src={penImageUrl}
              alt="Nota pen"
              width={233}
              height={734}
              className="specs__content--img"
            />
          </figure>

          <ul className="specs-pack__list" ref={listRef}>
            {cards.map((card) => (
              <li className="specs-list__card" key={card.title}>
                <div className="specs-card__top-content effect--glass-specs">
                  <h3 className="headline--3 tc--main-black">{card.title}</h3>
                </div>
                <div className="specs-card__bottom-content effect--glass-specs">
                  {(card.lines || []).map((line, i, arr) => (
                    <div
                      className={`specs-card__bottom-info${
                        i === arr.length - 1
                          ? " specs-card__bottom-info--last"
                          : ""
                      }`}
                      key={line.text}
                    >
                      <div className="specs-card__bottom-wrapper">
                        <span className="card-text tc--main-black">
                          {line.text}
                        </span>
                        <span className="specs-card__bottom-dot bc--black-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
