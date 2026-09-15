"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapSetup";
import Blinds from "./Blinds";
import Image from "next/image";

function BlindsItem({ title, body, image, alt }) {
  const contentRef = useRef(null);
  const blindsRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      const slats = blindsRef.current.querySelectorAll(".inside__blind");
      gsap.fromTo(
        slats,
        { scaleY: 1 },
        {
          scaleY: 0,
          ease: "none",
          stagger: 0.01,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        contentRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 60%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="inside__blinds-item" ref={rootRef}>
      <Image
        src={image}
        alt={alt}
        fill
        style={{ objectFit: "cover" }}
        sizes="50vw"
      />
      <div ref={blindsRef}>
        <Blinds />
      </div>
      <div className="inside__blinds-content" ref={contentRef}>
        <h3 className="headline--3 tc--main-black">{title}</h3>
        <p className="main-text inside__blinds-text tc--gray">{body}</p>
      </div>
    </div>
  );
}

export default function Inside() {
  return (
    <section className="inside" id="inside">
      <div className="container--primary">
        <div className="inside__complete-wrapper">
          <BlindsItem
            image="/images/blinds-1.webp"
            alt="Full kit — pen, notepad, charging cable, and instructions"
            title="A complete, ready-to-use set"
            body="Everything in one box: the pen, a notepad, a charging cable, and instructions — ready to write from day one."
          />
        </div>

        <div className="inside__text-wrapper">
          <p className="inside__text--animation">
            Built like a precision instrument. Priced like one you&apos;d
            actually buy.
          </p>
        </div>

        <div className="inside__device-wrapper">
          <BlindsItem
            image="/images/blinds-2.webp"
            alt="Smart Pen — machined aluminum body"
            title="Smart Pen"
            body="Machined aluminum body, durable metal nib, and a low-profile control button."
          />
          <BlindsItem
            image="/images/blinds-3.webp"
            alt="Charging Adapter"
            title="Charging Adapter"
            body="USB-C fast charge — 10 minutes on the dock covers a full day of writing."
          />
        </div>
      </div>
    </section>
  );
}
