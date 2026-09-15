"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapSetup";
import { strapiMediaUrl } from "@/lib/strapi";
import Blinds from "./Blinds";
import Image from "next/image";

function BlindsItem({ title, body, image, alt, sizes = "50vw" }) {
  const contentRef = useRef(null);
  const blindsRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      // "top 40%" (not "bottom 40%") so the wipe completes shortly after
      // entering view, matching Details.jsx's own reveal window.
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
            start: "top 90%",
            end: "top 40%",
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
            start: "top 80%",
            end: "top 45%",
            scrub: true,
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <article className="inside__blinds-item" ref={rootRef}>
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          style={{ objectFit: "cover" }}
          sizes={sizes}
        />
      ) : null}
      <div ref={blindsRef}>
        <Blinds />
      </div>
      <div className="inside__blinds-content" ref={contentRef}>
        <h3 className="headline--3 tc--main-black">{title}</h3>
        <p className="main-text inside__blinds-text tc--gray">{body}</p>
      </div>
    </article>
  );
}

export default function Inside({ data }) {
  const blinds = data?.blinds || [];
  const tagline = data?.tagline || "";
  const [kit, pen, adapter] = blinds;

  return (
    <section className="inside" id="inside" data-header-theme="light">
      <div className="container--primary">
        {kit ? (
          <div className="inside__complete-wrapper">
            <BlindsItem
              image={strapiMediaUrl(kit.image)}
              alt={kit.title}
              title={kit.title}
              body={kit.body}
              sizes="100vw"
            />
          </div>
        ) : null}

        <div className="inside__text-wrapper">
          <p className="inside__text--animation">{tagline}</p>
        </div>

        <div className="inside__device-wrapper">
          {pen ? (
            <BlindsItem
              image={strapiMediaUrl(pen.image)}
              alt={pen.title}
              title={pen.title}
              body={pen.body}
            />
          ) : null}
          {adapter ? (
            <BlindsItem
              image={strapiMediaUrl(adapter.image)}
              alt={adapter.title}
              title={adapter.title}
              body={adapter.body}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
