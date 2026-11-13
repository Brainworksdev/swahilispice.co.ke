/**
 * Static site build — no dependencies.
 *   node build.js   → writes the production site to ./dist
 */
import { rmSync, mkdirSync, cpSync, writeFileSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import site from './src/data/site.js';
import { renderPage } from './src/components/layout.js';
import home from './src/pages/home.js';
import about from './src/pages/about.js';
import accommodation from './src/pages/accommodation.js';
import facilities from './src/pages/facilities.js';
import gallery from './src/pages/gallery.js';
import contact from './src/pages/contact.js';
import notFound from './src/pages/not-found.js';
import { privacy, terms, credits } from './src/pages/legal.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const pages = [home, about, accommodation, facilities, gallery, contact, privacy, terms, credits, notFound];

// 1. Clean output and copy static assets
rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(path.join(SRC, 'assets'), path.join(DIST, 'assets'), { recursive: true });
cpSync(path.join(SRC, 'static'), DIST, { recursive: true });

// 2. Cache-busting version from CSS + JS contents
const hash = createHash('sha1');
for (const f of ['assets/css/styles.css', 'assets/js/main.js']) hash.update(readFileSync(path.join(SRC, f)));
const version = hash.digest('hex').slice(0, 10);

// 3. Render pages
for (const page of pages) {
  writeFileSync(path.join(DIST, page.file), renderPage(page, version));
}

// 4. sitemap.xml + robots.txt + web manifest
const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .filter((p) => p.sitemap !== false)
  .map((p) => `  <url>\n    <loc>${site.url}/${p.file === 'index.html' ? '' : p.file}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${p.priority || '0.5'}</priority>\n  </url>`)
  .join('\n');
writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
writeFileSync(
  path.join(DIST, 'site.webmanifest'),
  JSON.stringify({
    name: site.name,
    short_name: site.shortName,
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F3',
    theme_color: '#123B50',
    icons: [
      { src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }, null, 2),
);

// 5. Report
const size = (dir) => readdirSync(dir).reduce((t, f) => {
  const p = path.join(dir, f);
  return t + (statSync(p).isDirectory() ? size(p) : statSync(p).size);
}, 0);
console.log(`\n✔ Built ${pages.length} pages to dist/  (${(size(DIST) / 1024).toFixed(0)} KB total, assets v${version})`);

// 6. Content checklist — everything awaiting confirmation from the business
const todo = [];
if (!site.address) todo.push('Physical address');
if (!site.mapEmbedUrl) todo.push('Google Maps embed URL');
if (!site.email) todo.push('Email address (optional)');
if (!site.checkInTime || !site.checkOutTime) todo.push('Check-in / check-out times');
if (!site.receptionHours) todo.push('Reception hours');
if (!site.story) todo.push('About page — hostel story / history');
if (!site.testimonials.length) todo.push('Genuine guest testimonials (section shows a feedback invite until added)');
if (!site.social.length) todo.push('Social media accounts (optional)');
site.rooms.filter((r) => !r.confirmed).forEach((r) => todo.push(`Room: "${r.name}" — name, description, occupancy, beds, rate, features`));
site.facilities.filter((f) => !f.confirmed).forEach((f) => todo.push(`Facility: ${f.name}`));
const ph = Object.entries(site.images).filter(([, v]) => v.illustrative).map(([k]) => k);
if (ph.length) todo.push(`Genuine hostel photos to replace illustrative stock images (${ph.length}): ${ph.join(', ')}`);
if (todo.length) {
  console.log(`\n⚠ Content awaiting confirmation (${todo.length}) — edit src/data/site.js:`);
  todo.forEach((t) => console.log(`   • ${t}`));
  console.log('');
}
