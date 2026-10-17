const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function createIco(images) {
  const count = images.length;
  const headerLength = 6 + count * 16;
  let offset = headerLength;
  const header = Buffer.alloc(headerLength);

  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(count, 4); // number of icons

  for (let i = 0; i < count; i++) {
    const { buf, width, height } = images[i];
    const entryOffset = 6 + i * 16;
    header.writeUInt8(width >= 256 ? 0 : width, entryOffset); // width
    header.writeUInt8(height >= 256 ? 0 : height, entryOffset + 1); // height
    header.writeUInt8(0, entryOffset + 2); // color count
    header.writeUInt8(0, entryOffset + 3); // reserved
    header.writeUInt16LE(1, entryOffset + 4); // planes
    header.writeUInt16LE(32, entryOffset + 6); // bpp
    header.writeUInt32LE(buf.length, entryOffset + 8); // size of image data
    header.writeUInt32LE(offset, entryOffset + 12); // offset of image data
    offset += buf.length;
  }

  return Buffer.concat([header, ...images.map((img) => img.buf)]);
}

async function generate() {
  const rootDir = path.resolve(__dirname, '..');
  const srcLogo = path.join(rootDir, 'public', 'images', 'royalpro_logo.png');

  if (!fs.existsSync(srcLogo)) {
    console.error('Source logo does not exist:', srcLogo);
    process.exit(1);
  }

  console.log('Generating optimized favicon files from:', srcLogo);

  // Generate individual PNG buffers with high quality Lanczos3 kernel
  const p16 = await sharp(srcLogo).resize(16, 16, { kernel: 'lanczos3' }).png().toBuffer();
  const p32 = await sharp(srcLogo).resize(32, 32, { kernel: 'lanczos3' }).png().toBuffer();
  const p48 = await sharp(srcLogo).resize(48, 48, { kernel: 'lanczos3' }).png().toBuffer();
  const p96 = await sharp(srcLogo).resize(96, 96, { kernel: 'lanczos3' }).png().toBuffer();
  const p180 = await sharp(srcLogo).resize(180, 180, { kernel: 'lanczos3' }).png().toBuffer();
  const p192 = await sharp(srcLogo).resize(192, 192, { kernel: 'lanczos3' }).png().toBuffer();
  const p512 = await sharp(srcLogo).resize(512, 512, { kernel: 'lanczos3' }).png().toBuffer();

  // Create multi-resolution ICO file (16x16, 32x32, 48x48)
  const icoBuffer = await createIco([
    { buf: p16, width: 16, height: 16 },
    { buf: p32, width: 32, height: 32 },
    { buf: p48, width: 48, height: 48 },
  ]);

  // Target destinations:
  // 1. public/
  const publicDir = path.join(rootDir, 'public');
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), p48);
  fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), p48);
  fs.writeFileSync(path.join(publicDir, 'favicon-96x96.png'), p96);
  fs.writeFileSync(path.join(publicDir, 'favicon-192x192.png'), p192);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), p180);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon-precomposed.png'), p180);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), p512);

  // 2. src/app/ (Next.js App Router conventions)
  const appDir = path.join(rootDir, 'src', 'app');
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'icon.png'), p512);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), p180);

  // 3. Web App Manifest for mobile and Chrome
  const manifest = {
    name: 'Royalpro Industrial',
    short_name: 'Royalpro',
    description: 'Specialists in Heavy Duty Industrial Factory Sheds, PEB Steel Structure Work, and Complete Interior Solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  };

  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));

  console.log('Successfully generated all favicon and icon files!');
}

generate().catch((err) => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
