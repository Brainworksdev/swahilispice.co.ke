/**
 * Generates favicon / app icons / logo PNG using headless Chrome (link preview: scripts/og-image.js).
 * Run once after changing the brand: node scripts/brand-assets.js
 * Requires Google Chrome or Microsoft Edge installed (set CHROME_PATH to override).
 */
import { writeFileSync, mkdirSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { logoMark } from '../src/components/ui.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMG = path.join(ROOT, 'src', 'assets', 'img');
const STATIC = path.join(ROOT, 'src', 'static');
mkdirSync(IMG, { recursive: true });
mkdirSync(STATIC, { recursive: true });

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const CHROME = candidates.find((c) => existsSync(c));
if (!CHROME) throw new Error('Chrome/Edge not found. Set CHROME_PATH.');

// Favicon SVG — mark on ocean tile
const mark = (color, accent) => logoMark({ size: 48, className: '' }).replace(/currentColor/g, color).replace('var(--mark-accent, #C66A43)', accent);
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#123B50"/><g transform="translate(14.5 7) scale(0.875)">${mark('#E8D8BE', '#C66A43').replace(/<svg[^>]*>|<\/svg>/g, '')}</g></svg>`;
writeFileSync(path.join(IMG, 'favicon.svg'), faviconSvg);

const tmp = path.join(tmpdir(), `ss-brand-${Date.now()}`);
mkdirSync(tmp, { recursive: true });

function shoot(name, html, w, h, transparent = false) {
  const file = path.join(tmp, `${name}.html`);
  writeFileSync(file, `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden;${transparent ? 'background:transparent' : ''}}</style>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=DM+Sans:wght@400..600&display=block"></head><body>${html}</body></html>`);
  const out = path.join(tmp, `${name}.png`);
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    `--window-size=${w},${h}`, `--screenshot=${out}`, '--virtual-time-budget=4000',
    ...(transparent ? ['--default-background-color=00000000'] : []),
    pathToFileURL(file).href,
  ], { stdio: 'ignore' });
  return readFileSync(out);
}

const tile = (size) => `<div style="width:${size}px;height:${size}px;display:grid;place-items:center;background:#123B50">${mark('#E8D8BE', '#C66A43').replace('width="40"', `width="${size * 0.5}"`).replace('height="48"', `height="${size * 0.6}"`)}</div>`;

const icons = { 'apple-touch-icon.png': 180, 'icon-192.png': 192, 'icon-512.png': 512 };
for (const [name, size] of Object.entries(icons)) writeFileSync(path.join(IMG, name), shoot(name, tile(size), size, size));

// favicon.ico (PNG-in-ICO, 32×32)
const png32 = shoot('fav32', `<div style="width:32px;height:32px;border-radius:6px;display:grid;place-items:center;background:#123B50">${mark('#E8D8BE', '#C66A43').replace('width="40"', 'width="17"').replace('height="48"', 'height="21"').replace(/stroke-width="2(\.2)?"/g, 'stroke-width="3.4"')}</div>`, 32, 32, true);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12); header.writeUInt32LE(png32.length, 14); header.writeUInt32LE(22, 18);
writeFileSync(path.join(STATIC, 'favicon.ico'), Buffer.concat([header, png32]));

// Logo PNG (for structured data)
writeFileSync(path.join(IMG, 'logo.png'), shoot('logo', `<div style="width:600px;height:600px;display:grid;place-items:center;background:#FAF8F3"><div style="display:grid;justify-items:center;gap:22px;color:#123B50">${mark('#123B50', '#C66A43').replace('width="40"', 'width="170"').replace('height="48"', 'height="204"')}<div style="font-family:Fraunces,serif;font-size:58px;line-height:1">Swahili Spice</div><div style="font-family:'DM Sans',sans-serif;font-weight:600;font-size:20px;letter-spacing:.5em;margin-right:-.5em">HOSTEL</div></div></div>`, 600, 600));

rmSync(tmp, { recursive: true, force: true });
console.log('Brand assets written: favicon.svg, favicon.ico, apple-touch-icon.png, icon-192/512.png, logo.png (link preview: node scripts/og-image.js)');
