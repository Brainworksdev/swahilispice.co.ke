/**
 * Downloads the selected stock photographs (Pexels) as optimised WebP files
 * at two widths and writes the image attribution & licence register.
 *
 *   node scripts/fetch-photos.js
 *
 * Output:
 *   src/assets/images/<name>-800.webp, <name>-1600.webp
 *   src/assets/images/credits.json   (read by the build / site data)
 *   IMAGE-CREDITS.md                 (human-readable licence register)
 *
 * All photos are ILLUSTRATIVE stock imagery — not photographs of Swahili Spice
 * Hostel. Replace them with genuine property photography when available.
 * Requires curl (Pexels blocks Node's fetch client).
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync, readFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src', 'assets', 'images');
mkdirSync(OUT, { recursive: true });
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
// Full-bleed hero needs wide files; everything else displays at ≤ ~50vw.
const widthsFor = (p) => (p.hero ? [960, 1920] : [640, 1280]);
const QUALITY = 62;

// name → Pexels photo id, alt text, subject note
export const PHOTOS = [
  { name: 'mombasa-dhow-sunrise', id: 37489740, hero: true, alt: 'A fisherman sailing a traditional dhow at sunrise off Mombasa' },
  { name: 'swahili-carved-door', id: 11025240, alt: 'An ornate carved wooden Swahili door set in a white stone wall' },
  { name: 'bedroom-mosquito-net', id: 33613737, alt: 'A bright guest bedroom with a mosquito net and red bedspread' },
  { name: 'twin-bedroom-african-print', id: 33613747, alt: 'A twin bedroom with colourful African-print quilts' },
  { name: 'twin-bedroom-mosquito-nets', id: 33613739, alt: 'A simple twin bedroom with two beds and mosquito nets' },
  { name: 'bedroom-african-decor', id: 33613748, alt: 'A twin guest room decorated with African-themed textiles' },
  { name: 'swahili-dining-room', id: 3954177, alt: 'Wooden tables and chairs beside tall shuttered windows and plants' },
  { name: 'arched-lounge', id: 20143786, alt: 'A warm, softly lit lounge with an arched doorway' },
  { name: 'chai-tea', id: 33210272, alt: 'Glasses of spiced chai served in afternoon light' },
  { name: 'kenyan-dish', id: 30987055, alt: 'A plated Kenyan dish served in warm ambient light' },
  { name: 'swahili-inlaid-entrance', id: 16520657, alt: 'A richly carved wooden Swahili entrance with an inlaid frame' },
  { name: 'mombasa-old-town', id: 30441418, alt: 'Historic buildings with wooden balconies in Old Town Mombasa' },
  { name: 'lamu-alleyway', id: 28547796, alt: 'A narrow alleyway in Lamu, Kenya, with a painted juice shop sign' },
  { name: 'stone-town-passage', id: 33568923, alt: 'A historic stone passage with open blue doors leading to the sea' },
  { name: 'watamu-beach', id: 29578087, alt: 'A white-sand beach and turquoise water at Watamu, Kenya' },
  { name: 'kwale-beachfront', id: 35889792, alt: 'A calm beachfront with clear water in Kwale County, Kenya' },
];

const curl = (args) => execFileSync('curl', ['-s', '-L', '-m', '60', '-A', UA, ...args], { maxBuffer: 1e8 });

function meta(id) {
  const html = curl([`https://www.pexels.com/photo/${id}/`]).toString();
  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m) => { try { return JSON.parse(m[1]); } catch { return null; } })
    .find((j) => j && j.creator);
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  const dims = html.match(/"width":(\d+),"height":(\d+)/);
  if (!ld || !dims) throw new Error(`Could not read metadata for Pexels photo ${id}`);
  return {
    photographer: ld.creator.name.replace(/\s+/g, ' ').trim(),
    photographerUrl: ld.creator.url,
    pageUrl: canonical || `https://www.pexels.com/photo/${id}/`,
    license: ld.license || 'https://www.pexels.com/license/',
    title: ld.name || '',
    width: Number(dims[1]),
    height: Number(dims[2]),
  };
}

// Reuse metadata from a previous run to avoid re-requesting photo pages.
const cacheFile = path.join(OUT, 'credits.json');
const cached = existsSync(cacheFile) ? JSON.parse(readFileSync(cacheFile, 'utf8')) : {};
const sleep = (ms) => execFileSync(process.execPath, ['-e', `setTimeout(()=>{},${ms})`]);
function metaWithRetry(p) {
  const c = cached[p.name];
  if (c && c.id === p.id && c.photographer) {
    const { photographer, photographerUrl, pageUrl, license, title, width, height } = c;
    return { photographer, photographerUrl, pageUrl, license, title, width, height };
  }
  for (let attempt = 1; ; attempt++) {
    try { return meta(p.id); } catch (e) { if (attempt >= 4) throw e; sleep(4000 * attempt); }
  }
}

const credits = {};
for (const p of PHOTOS) {
  const m = metaWithRetry(p);
  const files = {};
  for (const w of widthsFor(p)) {
    const file = path.join(OUT, `${p.name}-${w}.webp`);
    if (!existsSync(file)) {
      const buf = curl([`https://images.pexels.com/photos/${p.id}/pexels-photo-${p.id}.jpeg?auto=compress&cs=tinysrgb&fm=webp&q=${QUALITY}&w=${w}`]);
      if (buf.length < 5000 || buf.slice(8, 12).toString() !== 'WEBP') throw new Error(`Bad download for ${p.name} @${w}`);
      writeFileSync(file, buf);
    }
    files[w] = { file: `assets/images/${p.name}-${w}.webp`, height: Math.round((w * m.height) / m.width), kb: Math.round(statSync(file).size / 1024) };
  }
  credits[p.name] = { ...p, ...m, files };
  console.log(`✔ ${p.name.padEnd(28)} ${m.photographer.padEnd(24)} ${Object.values(files).map((x) => x.kb + 'KB').join(' / ')}`);
}
writeFileSync(path.join(OUT, 'credits.json'), JSON.stringify(credits, null, 2));

const rows = Object.values(credits).map((c) =>
  `| \`${c.name}\` | [Pexels ${c.id}](${c.pageUrl}) | [${c.photographer}](${c.photographerUrl}) | [Pexels License](https://www.pexels.com/license/) | ${c.alt} |`);
writeFileSync(path.join(ROOT, 'IMAGE-CREDITS.md'), `# Image attribution & licence register

All photographs on swahilispice.co.ke are **illustrative stock images**. They are **not** photographs of Swahili Spice Hostel's rooms, facilities or premises, and should be replaced with genuine property photography when available.

## Licence

Every image below comes from [Pexels](https://www.pexels.com) under the [Pexels License](https://www.pexels.com/license/):

- Free for commercial and non-commercial use, including on websites.
- Attribution isn't required, but it's appreciated, so photographers are credited here.
- Not allowed: selling unaltered copies, implying endorsement by people or brands shown, or redistributing the images as a stock collection.

Licence terms were checked on ${new Date().toISOString().slice(0, 10)} via each photo's page metadata (\`isAccessibleForFree\`, \`license\`).

## Register

| File | Source | Photographer | Licence | Description |
|---|---|---|---|---|
${rows.join('\n')}

Files live in \`src/assets/images/\` as WebP (hero: 960/1920px wide; others: 640/1280px wide). To refresh them, run \`node scripts/fetch-photos.js\`.
`);
console.log(`\nWrote ${Object.keys(credits).length} photos, credits.json and IMAGE-CREDITS.md`);
