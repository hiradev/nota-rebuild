import Image from "next/image";
import { ImagePlaceholder } from "./Placeholder";

/**
 * Below the spec's 991px hard fork, the animated desktop experience is
 * replaced entirely by a static, non-scrubbed stack (per section 3:
 * "the entire animated desktop experience is display:none below it and
 * a completely separate set of --static sections takes over"). This is
 * a simplified content-complete version of that static stack — no
 * camera/scrub choreography, just the same copy laid out to read well
 * on a phone or tablet.
 */
export default function StaticExperience() {
  return (
    <main className="static-experience">
      <section className="static-hero">
        <h1 className="headline--1 tc--main-white">Smart pen</h1>
        <h1 className="headline--1 tc--main-white">for real thinking</h1>
      </section>

      <section className="static-black">
        <h2 className="headline--1 tc--gray">Nota pen</h2>
        <h2 className="headline--1 tc--main-white">Specifications</h2>
        <div className="static-cards">
          {[
            "Writing System",
            "Capture Technology",
            "Digital Continuity",
          ].map((title) => (
            <div
              className="static-card border-radius--spec-card bc--black-2"
              key={title}
            >
              <h3 className="headline--3 tc--main-white">{title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="static-black">
        <span className="descriptor tc--main-white-40">Who it&apos;s for:</span>
        <h2 className="large-text--1 tc--main-white">
          A pen for people who think best with ink, not a keyboard.
        </h2>
        <div className="static-cards">
          {[
            ["Students & Learners", "Lecture notes that transcribe themselves."],
            [
              "Creators, Designers & Architects",
              "Sketches captured at full fidelity.",
            ],
            [
              "Managers & Product Thinkers",
              "Meeting notes that sync the moment the pen leaves the page.",
            ],
          ].map(([title, body]) => (
            <div key={title}>
              <h3 className="headline--3 tc--main-white">{title}</h3>
              <p className="main-text tc--main-white-40">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="static-black">
        <h2 className="headline--2 tc--main-white">Works with smart paper</h2>
        <div className="static-cards">
          {[
            ["Special paper", "For the pen, it's a precise map.", "/images/paper-slide-1.webp"],
            ["Looks like paper", "For you, it's just a blank sheet.", "/images/paper-slide-2.webp"],
            ["No delays, no glitches", "AI-powered structure.", "/images/paper-slide-3.webp"],
            ["Real-time sync", "Your notes. Already there.", "/images/paper-slide-4.webp"],
          ].map(([heading, body, image]) => (
            <div
              className="static-card"
              key={heading}
              style={{ padding: "6vw", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
            >
              <Image
                src={image}
                alt={heading}
                fill
                style={{ objectFit: "cover" }}
                sizes="100vw"
              />
              <div style={{ position: "relative" }}>
                <h3 className="headline--3 tc--main-white">{heading}</h3>
                <p className="main-text tc--main-white">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="static-white">
        <h2 className="headline--2 tc--main-black">Inside the box</h2>
        <div className="static-cards">
          {[
            ["Smart Pen", "Machined aluminum body, durable metal nib."],
            ["Charging Adapter", "USB-C fast charge."],
          ].map(([title, body]) => (
            <div key={title}>
              <h3 className="headline--3 tc--main-black">{title}</h3>
              <p className="main-text tc--gray">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="static-black">
        <div className="static-cards">
          {[
            "Flush-fit precision cap",
            "Refined colors. Personal expression",
            "Durable metal nib, low-profile control button",
            "Aluminum body",
          ].map((caption) => (
            <div className="static-card" key={caption}>
              <ImagePlaceholder
                label={caption}
                style={{ position: "absolute", inset: 0 }}
              />
            </div>
          ))}
          <div className="static-card">
            <video
              src="/video/details-video.mp4"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </section>

      <section className="static-black">
        <h2 className="headline--2 tc--main-white">Colors</h2>
        <div className="static-cards">
          {[
            ["Silver", "Impossible to overthink", "/images/color-1.webp"],
            ["Graphite Black", "Clarity in silence.", "/images/color-2.webp"],
            ["Mist Blue", "Light thinking.", "/images/color-3.webp"],
            ["Precision Red", "Form follows thought.", "/images/color-4.webp"],
            ["Bright Orange", "Steady focus.", "/images/color-5.webp"],
          ].map(([name, tagline, image]) => (
            <div className="static-card" key={name}>
              <Image
                src={image}
                alt={`Pen colorway — ${name}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="100vw"
              />
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "4vw",
                }}
              >
                <p className="large-text--3 tc--main-white">{tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="static-black" style={{ paddingBottom: "16vw" }}>
        <p className="footer-text tc--main-white">
          A pen for people who think in ink first, pixels second.
        </p>
        <p className="footer-title tc--main-white-50" style={{ marginTop: "4vw" }}>
          © 2026 NŌTA. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
