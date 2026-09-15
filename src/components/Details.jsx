"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ensureGsap } from "@/lib/gsapSetup";
import { strapiMediaUrl } from "@/lib/strapi";
import { ImagePlaceholder } from "./Placeholder";

function RevealCard({ className, label, caption, image }) {
  const imgRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 1.3 },
        {
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: true,
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <article className={`details__card ${className}`} ref={rootRef}>
      <div ref={imgRef} style={{ position: "absolute", inset: 0 }}>
        {image ? (
          <Image
            src={image}
            alt={caption || label}
            fill
            style={{ objectFit: "cover" }}
            sizes="50vw"
          />
        ) : (
          <ImagePlaceholder
            label={label}
            className="details__card-image-placeholder"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>
      {caption?.trim() && (
        <div className="details__text-wrapper bc--black-30">
          <span className="headline--4 tc--main-white">{caption}</span>
        </div>
      )}
    </article>
  );
}

const CARD_LAYOUT_CLASSES = [
  "details__card--tall",
  "details__card--pill-sm",
  "details__card--right",
  "details__card--top-large",
  "details__card--top-pill",
];

export default function Details({ data }) {
  const cards = (data?.cards || []).map((card, i) => ({
    ...card,
    image: strapiMediaUrl(card.image),
    className: CARD_LAYOUT_CLASSES[i] || "",
  }));
  const videoUrl = strapiMediaUrl(data?.backgroundVideo) || "/video/details-video.mp4";

  const videoRef = useRef(null);
  const videoWrapRef = useRef(null);

  useEffect(() => {
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: videoWrapRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: true,
          },
        }
      );
    }, videoWrapRef);
    return () => ctx.revert();
  }, []);

  const [card1, card2, card3, card4, card5] = cards;

  return (
    <section className="details" data-header-theme="light">
      <div className="container--primary">
        <div className="details__wrapper">
          <div className="details__content-wrapper--center">
            <div className="details__cards-wrapper">
              {card1 ? <RevealCard {...card1} label={card1.caption} /> : null}
              {card2 ? <RevealCard {...card2} label={card2.caption} /> : null}
            </div>
            {card3 ? <RevealCard {...card3} label={card3.caption} /> : null}
          </div>

          <div className="details__video-wrapper" ref={videoWrapRef}>
            <div className="details__video-content" ref={videoRef}>
              <video
                className="details__video-placeholder"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={videoUrl}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
              />
            </div>
          </div>

          <div className="details__content-wrapper--top">
            {card4 ? <RevealCard {...card4} label={card4.caption} /> : null}
            {card5 ? <RevealCard {...card5} label={card5.caption} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
