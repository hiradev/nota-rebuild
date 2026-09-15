'use strict';

const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types');
const { global, header, footer, homepage } = require('../data/data.json');

async function seedExampleApp() {
  const shouldImportSeedData = await isFirstRun();

  if (shouldImportSeedData) {
    try {
      console.log('Setting up the template...');
      await importSeedData();
      console.log('Ready to go');
    } catch (error) {
      console.log('Could not import seed data');
      console.error(error);
    }
  } else {
    console.log(
      'Seed data has already been imported. We cannot reimport unless you clear your database first.'
    );
  }
}

async function isFirstRun() {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'setup',
  });
  const initHasRun = await pluginStore.get({ key: 'initHasRun' });
  await pluginStore.set({ key: 'initHasRun', value: true });
  return !initHasRun;
}

async function setPublicPermissions(newPermissions) {
  // Find the ID of the public role
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: {
      type: 'public',
    },
  });

  // Create the new permissions and link them to the public role
  const allPermissionsToCreate = [];
  Object.keys(newPermissions).map((controller) => {
    const actions = newPermissions[controller];
    const permissionsToCreate = actions.map((action) => {
      return strapi.query('plugin::users-permissions.permission').create({
        data: {
          action: `api::${controller}.${controller}.${action}`,
          role: publicRole.id,
        },
      });
    });
    allPermissionsToCreate.push(...permissionsToCreate);
  });
  await Promise.all(allPermissionsToCreate);
}

function getFileSizeInBytes(filePath) {
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats['size'];
  return fileSizeInBytes;
}

function getFileData(fileName) {
  const filePath = path.join('data', 'uploads', fileName);
  // Parse the file metadata
  const size = getFileSizeInBytes(filePath);
  const ext = fileName.split('.').pop();
  const mimeType = mime.lookup(ext || '') || '';

  return {
    filepath: filePath,
    originalFileName: fileName,
    size,
    mimetype: mimeType,
  };
}

async function uploadFile(file, name) {
  return strapi
    .plugin('upload')
    .service('upload')
    .upload({
      files: file,
      data: {
        fileInfo: {
          alternativeText: `An image uploaded to Strapi called ${name}`,
          caption: name,
          name,
        },
      },
    });
}

// Create an entry and attach files if there are any. Strapi v5's Document
// Service always creates a draft unless `status: 'published'` is passed
// explicitly — setting `publishedAt` on the data alone (the v4 pattern)
// is silently ignored for draftAndPublish-enabled content types.
async function createEntry({ model, entry }) {
  try {
    await strapi.documents(`api::${model}.${model}`).create({
      data: entry,
      status: 'published',
    });
  } catch (error) {
    console.error({ model, entry, error });
  }
}

async function checkFileExistsBeforeUpload(files) {
  const existingFiles = [];
  const uploadedFiles = [];
  const filesCopy = [...files];

  for (const fileName of filesCopy) {
    // Check if the file already exists in Strapi
    const fileWhereName = await strapi.query('plugin::upload.file').findOne({
      where: {
        name: fileName.replace(/\..*$/, ''),
      },
    });

    if (fileWhereName) {
      // File exists, don't upload it
      existingFiles.push(fileWhereName);
    } else {
      // File doesn't exist, upload it
      const fileData = getFileData(fileName);
      const fileNameNoExtension = fileName.split('.').shift();
      const [file] = await uploadFile(fileData, fileNameNoExtension);
      uploadedFiles.push(file);
    }
  }
  const allFiles = [...existingFiles, ...uploadedFiles];
  // If only one file then return only that file
  return allFiles.length === 1 ? allFiles[0] : allFiles;
}

// Uploads a single named file (or resolves to null if the fileName is falsy —
// several homepage cards reference real photography that doesn't exist yet).
async function resolveSingleFile(fileName) {
  if (!fileName) return null;
  return checkFileExistsBeforeUpload([fileName]);
}

async function importGlobal() {
  const favicon = await resolveSingleFile(global.favicon);
  const shareImage = await resolveSingleFile(global.defaultSeo.shareImage);
  return createEntry({
    model: 'global',
    entry: {
      ...global,
      favicon,
      publishedAt: Date.now(),
      defaultSeo: {
        ...global.defaultSeo,
        shareImage,
      },
    },
  });
}

async function importHeader() {
  return createEntry({
    model: 'header',
    entry: {
      ...header,
      publishedAt: Date.now(),
    },
  });
}

async function importFooter() {
  return createEntry({
    model: 'footer',
    entry: {
      ...footer,
      publishedAt: Date.now(),
    },
  });
}

async function importHomepage() {
  const heroLottie = await resolveSingleFile(homepage.hero.lottieAnimation);
  const specsPenImage = await resolveSingleFile(homepage.specs.penImage);
  const whoVideo = await resolveSingleFile(homepage.who.backgroundVideo);
  const detailsVideo = await resolveSingleFile(homepage.details.backgroundVideo);
  const seoShareImage = await resolveSingleFile(homepage.seo.shareImage);

  const paperSlides = await Promise.all(
    homepage.paper.slides.map(async (slide) => ({
      ...slide,
      image: await resolveSingleFile(slide.image),
    }))
  );

  const blinds = await Promise.all(
    homepage.inside.blinds.map(async (blind) => ({
      ...blind,
      image: await resolveSingleFile(blind.image),
    }))
  );

  const detailCards = await Promise.all(
    homepage.details.cards.map(async (card) => ({
      ...card,
      image: await resolveSingleFile(card.image),
    }))
  );

  const colorSlides = await Promise.all(
    homepage.colors.slides.map(async (slide) => ({
      ...slide,
      image: await resolveSingleFile(slide.image),
    }))
  );

  return createEntry({
    model: 'homepage',
    entry: {
      ...homepage,
      publishedAt: Date.now(),
      hero: { ...homepage.hero, lottieAnimation: heroLottie },
      specs: { ...homepage.specs, penImage: specsPenImage },
      who: { ...homepage.who, backgroundVideo: whoVideo },
      paper: { ...homepage.paper, slides: paperSlides },
      inside: { ...homepage.inside, blinds },
      details: { cards: detailCards, backgroundVideo: detailsVideo },
      colors: { slides: colorSlides },
      seo: { ...homepage.seo, shareImage: seoShareImage },
    },
  });
}

async function importSeedData() {
  // Allow public read of homepage content; only public create for waitlist submissions.
  await setPublicPermissions({
    global: ['find'],
    header: ['find'],
    footer: ['find'],
    homepage: ['find'],
    'waitlist-submission': ['create'],
  });

  // Create all entries
  await importGlobal();
  await importHeader();
  await importFooter();
  await importHomepage();
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedExampleApp();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
