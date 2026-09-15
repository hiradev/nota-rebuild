'use strict';

const { homepage } = require('../data/data.json');

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = 'error';

  const existing = await strapi.documents('api::homepage.homepage').findFirst({
    populate: { paper: { populate: { slides: { populate: ['image'] } } } },
  });
  if (!existing) {
    console.log('No homepage entry found - nothing to update.');
    await app.destroy();
    process.exit(0);
  }

  const mergedSlides = existing.paper.slides.map((slide) => {
    const seedSlide = homepage.paper.slides.find(
      (s) => s.heading === slide.heading || s.heading.startsWith(slide.heading)
    );
    return {
      id: slide.id,
      image: slide.image?.id ?? slide.image,
      heading: seedSlide ? seedSlide.heading : slide.heading,
      body: seedSlide ? seedSlide.body : slide.body,
      description: seedSlide ? seedSlide.description : slide.description,
    };
  });

  await strapi.documents('api::homepage.homepage').update({
    documentId: existing.documentId,
    data: {
      paper: {
        coverHeadlineLine1: existing.paper.coverHeadlineLine1,
        coverHeadlineLine2: existing.paper.coverHeadlineLine2,
        slides: mergedSlides,
      },
    },
  });

  await strapi.documents('api::homepage.homepage').publish({
    documentId: existing.documentId,
  });

  console.log('Paper slides updated and published.');
  await app.destroy();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
