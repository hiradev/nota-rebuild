import Image from "next/image";
import { strapiMediaUrl } from "@/lib/strapi";
import { ImagePlaceholder } from "./Placeholder";
import Footer from "./Footer";

/**
 * Below the 991px hard fork: a simplified static stack, no camera/scrub.
 * Reads the same data page.jsx fetched for desktop — never hardcode a second copy.
 */
export default function StaticExperience({ footer, homepage, nav }) {
  const hero = homepage?.hero || {};
  const specs = homepage?.specs || {};
  const who = homepage?.who || {};
  const paper = homepage?.paper || {};
  const inside = homepage?.inside || {};
  const details = homepage?.details || {};
  const colors = homepage?.colors || {};

  const specsPenImageUrl = strapiMediaUrl(specs.penImage) || "/images/specs-pen.png";
  const whoVideoUrl = strapiMediaUrl(who.backgroundVideo) || "/video/who-video.mp4";
  const [kit, pen, adapter] = inside.blinds || [];

  return (
    <div className="static-experience">
      <section className="static-hero" data-header-theme="dark">
        <div className="static-hero__media">
          <Image
            src="/images/hero-pen.webp"
            alt=""
            fill
            style={{ objectFit: "contain" }}
            sizes="100vw"
            priority
          />
        </div>
        <h1 className="headline--1 tc--main-white">
          {hero.headlineLine2 || hero.headlineLine1}
        </h1>
      </section>

      <section className="static-white" data-header-theme="light">
        <h2 className="headline--1 tc--gray">{specs.headingLine1}</h2>
        <h2 className="headline--1 tc--main-black">{specs.headingLine2}</h2>
        <div className="static-specs__pen">
          <Image
            src={specsPenImageUrl}
            alt="Nota pen"
            width={800}
            height={252}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <ul className="specs-pack__list">
          {(specs.cards || []).map((card) => (
            <li className="specs-list__card" key={card.title}>
              <div className="specs-card__top-content effect--glass-specs">
                <h3 className="headline--3 tc--main-black">{card.title}</h3>
              </div>
              <div className="specs-card__bottom-content effect--glass-specs">
                {(card.lines || []).map((line, i, arr) => (
                  <div
                    className={`specs-card__bottom-info${
                      i === arr.length - 1 ? " specs-card__bottom-info--last" : ""
                    }`}
                    key={line.text}
                  >
                    <div className="specs-card__bottom-wrapper">
                      <span className="card-text tc--main-black">{line.text}</span>
                      <span className="specs-card__bottom-dot bc--black-20" />
                    </div>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="static-black" data-header-theme="dark">
        <p className="large-text--1 tc--main-white">{who.introText}</p>

        {who.audienceLabel || (who.audienceLines || []).length ? (
          <div className="static-who__audience">
            <span className="descriptor tc--main-white-40">{who.audienceLabel}</span>
            <div className="static-who__audience-lines">
              {(who.audienceLines || []).map((line) => (
                <span className="large-text--2 tc--main-white" key={line.text}>
                  {line.text}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="static-who__theses">
          {(who.theses || []).map((thesis) => (
            <article key={thesis.title}>
              <h3 className="headline--3 tc--main-white">{thesis.title}</h3>
              <p className="main-text tc--main-white-40">{thesis.body}</p>
            </article>
          ))}
        </div>

        <div className="static-who__media">
          <video src={whoVideoUrl} muted playsInline autoPlay loop preload="metadata" />
        </div>
      </section>

      <section className="static-white" data-header-theme="light">
        <h2 className="headline--2 tc--gray">{paper.coverHeadlineLine1}</h2>
        <h2 className="headline--2 tc--main-black">{paper.coverHeadlineLine2}</h2>

        <div className="static-paper__slides">
          {(paper.slides || []).map((slide) => {
            const imageUrl = strapiMediaUrl(slide.image);
            return (
              <article className="static-paper__slide" key={slide.heading}>
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={slide.heading}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100vw"
                  />
                ) : null}
                <div className="paper__slide-container">
                  <h3 className="paper__heading large-text--1 tc--main-white">
                    {slide.heading}
                  </h3>
                  <div className="paper__description">
                    <div className="paper__plate">
                      <h4 className="headline--3 tc--main-white">{slide.body}</h4>
                    </div>
                    {slide.description ? (
                      <div className="paper__plate">
                        <p className="main-text tc--main-white">{slide.description}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <ul className="paper__pagination static-paper__pagination">
          {(paper.slides || []).map((slide, i) => (
            <li
              className={`paper__pagination-item${i === 0 ? " paper__pagination-item--active" : ""}`}
              key={slide.heading}
            />
          ))}
        </ul>
      </section>

      <section className="static-white" data-header-theme="light">
        {kit ? (
          <div className="static-inside__kit">
            <h3 className="headline--3 tc--main-black">{kit.title}</h3>
            <p className="main-text tc--gray">{kit.body}</p>
            <div className="static-inside__media">
              {strapiMediaUrl(kit.image) ? (
                <Image
                  src={strapiMediaUrl(kit.image)}
                  alt={kit.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="100vw"
                />
              ) : (
                <ImagePlaceholder label={kit.title} style={{ position: "absolute", inset: 0 }} />
              )}
            </div>
          </div>
        ) : null}

        {inside.tagline ? (
          <p className="large-text--1 tc--main-black static-inside__tagline">
            {inside.tagline}
          </p>
        ) : null}

        <div className="static-inside__devices">
          {[pen, adapter].filter(Boolean).map((device) => {
            const imageUrl = strapiMediaUrl(device.image);
            return (
              <div key={device.title} className="static-inside__device">
                <h3 className="headline--3 tc--main-black">{device.title}</h3>
                <p className="main-text tc--gray">{device.body}</p>
                <div className="static-inside__media">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={device.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="100vw"
                    />
                  ) : (
                    <ImagePlaceholder label={device.title} style={{ position: "absolute", inset: 0 }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="static-white" data-header-theme="light">
        <div className="static-cards">
          {(details.cards || []).map((card, i) => {
            const imageUrl = strapiMediaUrl(card.image);
            return (
              <div className="static-card" key={i}>
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={card.caption || ""}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100vw"
                  />
                ) : (
                  <ImagePlaceholder label={card.caption} style={{ position: "absolute", inset: 0 }} />
                )}
                {card.caption?.trim() ? (
                  <div className="details__text-wrapper static-details__caption bc--black-30">
                    <span className="headline--4 tc--main-white">{card.caption}</span>
                  </div>
                ) : null}
              </div>
            );
          })}
          <div className="static-card">
            <video
              src={strapiMediaUrl(details.backgroundVideo) || "/video/details-video.mp4"}
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

      <section className="static-black" data-header-theme="dark">
        <div className="static-cards">
          {(colors.slides || []).map((slide) => {
            const imageUrl = strapiMediaUrl(slide.image);
            return (
              <div className="static-card static-colors__card" key={slide.taglineLine1}>
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={`Pen colorway — ${slide.taglineLine1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100vw"
                  />
                ) : null}
                <div className="details__text-wrapper static-colors__caption bc--black-30">
                  <span className="headline--4 tc--main-white">
                    {slide.taglineLine1} {slide.taglineLine2}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer data={footer} nav={nav} id="about-mobile" />
    </div>
  );
}
