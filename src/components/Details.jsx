"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapSetup";
import { ImagePlaceholder } from "./Placeholder";

function RevealCard({ className, label, caption }) {
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
    <div className={`details__card ${className}`} ref={rootRef}>
      <div ref={imgRef} style={{ position: "absolute", inset: 0 }}>
        <ImagePlaceholder
          label={label}
          className="details__card-image-placeholder"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      {caption && (
        <div className="details__text-wrapper bc--black-30">
          <span className="headline--4 tc--main-white">{caption}</span>
        </div>
      )}
    </div>
  );
}

export default function Details() {
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

  return (
    <section className="details">
      <div className="container--primary">
        <div className="details__wrapper">
          <div className="details__content-wrapper--center">
            <div className="details__cards-wrapper">
              <RevealCard
                className="details__card--tall"
                label="Pen on desk, top-down"
                caption="Flush-fit precision cap"
              />
              <RevealCard
                className="details__card--pill-sm"
                label="Nib close-up"
                caption="Durable metal nib, low-profile control button"
              />
            </div>
            <RevealCard
              className="details__card--right"
              label="Pen colorway lineup"
              caption="Refined colors. Personal expression"
            />
          </div>

          <div className="details__video-wrapper" ref={videoWrapRef}>
            <div className="details__video-content" ref={videoRef}>
              <video
                className="details__video-placeholder"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src="/video/details-video.mp4"
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
              />
            </div>
          </div>

          <div className="details__content-wrapper--top">
            <RevealCard
              className="details__card--top-large"
              label="Pen body macro"
              caption="Aluminum body"
            />
            <RevealCard
              className="details__card--top-pill"
              label="Cap detail"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
