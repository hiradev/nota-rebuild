'use strict';

const path = require('path');
const sharp = require('sharp');

const src = 'C:/Users/HP/.claude/image-cache/c0bc3fa6-6a5a-4a7f-b730-74c8c4b6edff/10.png';
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');

const targets = [
  { file: 'blinds_1_a87a78aeeb.webp', width: 926, height: 1234 },
  { file: 'large_blinds_1_a87a78aeeb.webp', width: 750, height: 1000 },
  { file: 'medium_blinds_1_a87a78aeeb.webp', width: 563, height: 750 },
  { file: 'small_blinds_1_a87a78aeeb.webp', width: 375, height: 500 },
  { file: 'thumbnail_blinds_1_a87a78aeeb.webp', width: 117, height: 156 },
];

async function main() {
  for (const { file, width, height } of targets) {
    const outPath = path.join(uploadsDir, file);
    await sharp(src)
      .resize(width, height, { fit: 'cover', position: 'centre' })
      .webp()
      .toFile(outPath + '.tmp');
    const fs = require('fs');
    fs.renameSync(outPath + '.tmp', outPath);
    console.log('wrote', file);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
