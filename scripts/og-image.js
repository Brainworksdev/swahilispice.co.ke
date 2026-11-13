/**
 * Generates the social link-preview image (Open Graph / WhatsApp / Facebook / X)
 *   node scripts/og-image.js
 * Output: src/assets/img/og-image.jpg (1200×630, kept under ~300 KB for WhatsApp)
 *
 * Content (starting price, phone, location) is read from src/data/site.js,
 * so re-run this after changing rates or contact details.
 * Requires Google Chrome or Microsoft Edge (set CHROME_PATH to override).
 */
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync, existsSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import site from '../src/data/site.js';
import { logoMark } from '../src/components/ui.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src', 'assets', 'img', 'og-image.jpg');
const img = (name) => pathToFileURL(path.join(ROOT, 'src', 'assets', 'images', `${name}-1280.webp`)).href;
const CHROME = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find((c) => existsSync(c));
if (!CHROME) throw new Error('Chrome/Edge not found. Set CHROME_PATH.');

// Lowest room rate, e.g. "KES 2,000"
const prices = site.rooms.map((r) => r.price && r.price.match(/KES\s?[\d,]+/)).filter(Boolean).map((m) => m[0]);
const lowest = prices.sort((a, b) => Number(a.replace(/\D/g, '')) - Number(b.replace(/\D/g, '')))[0];
const town = site.address?.locality || 'Kenya';
const mark = logoMark({ size: 58, className: '' });

const icon = {
  bed: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18.5V6"/><path d="M3 14h18v4.5"/><path d="M21 14v-2.5A2.5 2.5 0 0 0 18.5 9H11v5"/><circle cx="7" cy="11" r="1.8"/></svg>',
  wifi: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M2.5 9a14 14 0 0 1 19 0"/><path d="M5.5 12.5a9.5 9.5 0 0 1 13 0"/><path d="M8.6 15.9a5 5 0 0 1 6.8 0"/><circle cx="12" cy="19" r="1" fill="currentColor"/></svg>',
  shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.3 7.5 9.5 4.4-1.2 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2.2 2.2L15.5 10"/></svg>',
  pin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>',
  wa: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4.2 19.8 5.3 16A8.5 8.5 0 1 1 8.4 19z"/><path d="M9.2 8.2c.3-.5.8-.5 1-.1l.8 1.7c.1.3 0 .6-.2.8l-.5.5a6 6 0 0 0 2.6 2.6l.5-.5c.2-.2.5-.3.8-.2l1.7.8c.4.2.4.7-.1 1-1 .8-2.3.8-3.6.1a8.4 8.4 0 0 1-3.2-3.2c-.6-1.3-.6-2.6.2-3.5z" fill="currentColor" stroke="none"/></svg>',
};

const kanga = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='14' viewBox='0 0 28 14'%3E%3Cpath d='M0 14 7 0l7 14z' fill='%23c66a43'/%3E%3Cpath d='M14 14 21 4l7 10z' fill='%23123b50'/%3E%3C/svg%3E\")";

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=DM+Sans:opsz,wght@9..40,400..700&display=block">
<style>
  *{box-sizing:border-box;margin:0}
  html,body{width:1200px;height:630px;overflow:hidden;background:#FAF8F3;font-family:'DM Sans',sans-serif;color:#123B50}
  .card{position:relative;width:1200px;height:630px;display:grid;grid-template-columns:620px 580px;overflow:hidden}
  .left{position:relative;height:630px;padding:46px 30px 0 60px;display:flex;flex-direction:column}
  .brand{display:flex;align-items:center;gap:16px;color:#123B50;--mark-accent:#C66A43}
  .brand svg{height:58px;width:auto}
  .name{font-family:Fraunces,serif;font-size:34px;line-height:1;font-weight:450}
  .sub{font-size:13px;font-weight:700;letter-spacing:.45em;margin-top:6px;color:#123B50;opacity:.8}
  .where{display:inline-flex;align-items:center;gap:8px;align-self:flex-start;margin-top:26px;padding:8px 14px;border-radius:999px;background:#C66A43;color:#fff;font-size:15px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
  h1{font-family:Fraunces,serif;font-weight:400;font-size:47px;line-height:1.04;letter-spacing:-.02em;margin-top:18px;color:#123B50}
  h1 em{font-style:italic;font-weight:300;color:#A24F2C}
  .chips{display:flex;gap:9px;margin-top:22px;flex-wrap:wrap}
  .chip{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border:1.5px solid rgba(18,59,80,.18);border-radius:8px;background:#fff;font-size:16px;font-weight:600;color:#123B50}
  .chip svg{color:#C66A43}
  .chip--price{background:#123B50;border-color:#123B50;color:#fff}
  .chip--price svg{color:#E8D8BE}
  .chip--price b{color:#F4C58F}
  .cta{display:flex;flex-direction:column;align-items:flex-start;gap:10px;margin-top:auto;margin-bottom:38px}
  .wa{display:inline-flex;align-items:center;gap:12px;padding:12px 22px 12px 14px;border-radius:999px;background:#1D7A4C;color:#fff;font-size:21px;font-weight:700;box-shadow:0 10px 24px -12px rgba(29,122,76,.8)}
  .wa span{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.18)}
  .url{font-size:19px;font-weight:600;color:#5B5853}
  .right{position:relative;height:630px;padding:26px 26px 38px 0;display:grid;grid-template-columns:1.2fr 1fr;grid-template-rows:repeat(2,minmax(0,1fr));gap:12px}
  .ph{position:relative;overflow:hidden;border-radius:10px;background:#E8D8BE;min-height:0}
  .ph img{width:100%;height:100%;object-fit:cover;display:block}
  .ph--main{grid-row:span 2;border-radius:999px 999px 10px 10px}
  .ph--main img{object-position:45% 70%}
  .badge{position:absolute;left:50%;bottom:18px;transform:translateX(-50%);white-space:nowrap;padding:8px 16px;border-radius:999px;background:rgba(250,248,243,.95);color:#123B50;font-family:Fraunces,serif;font-style:italic;font-size:20px}
  .kanga{position:absolute;left:0;right:0;bottom:0;height:12px;background:${kanga} repeat-x;background-size:24px 12px}
</style></head><body>
<div class="card">
  <div class="left">
    <div class="brand">${mark}<div><div class="name">Swahili Spice</div><div class="sub">HOSTEL</div></div></div>
    <div class="where">${icon.pin}${town}, Kenya${site.foundingYear ? ` · Since ${site.foundingYear}` : ''}</div>
    <h1>Warm Swahili hospitality, <em>a restful place to stay.</em></h1>
    <div class="chips">
      ${lowest ? `<div class="chip chip--price">${icon.bed}Rooms from <b>${lowest}</b>/night</div>` : ''}
      <div class="chip">${icon.wifi}Free Wi-Fi</div>
      <div class="chip">${icon.shield}24-hr security</div>
    </div>
    <div class="cta">
      <div class="wa"><span>${icon.wa}</span>Book on WhatsApp ${site.phone.display}</div>
      <div class="url">swahilispice.co.ke</div>
    </div>
  </div>
  <div class="right">
    <div class="ph ph--main"><img src="${img('watamu-beach')}"><div class="badge">Karibu ${town}</div></div>
    <div class="ph"><img src="${img('twin-bedroom-african-print')}"></div>
    <div class="ph"><img src="${img('mombasa-old-town')}"></div>
  </div>
  <div class="kanga"></div>
</div>
</body></html>`;

// Render with headless Chrome via the DevTools protocol → JPEG
const tmp = path.join(tmpdir(), `ss-og-${Date.now()}`);
mkdirSync(tmp, { recursive: true });
const file = path.join(tmp, 'og.html');
writeFileSync(file, html);
const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${path.join(tmp, 'profile')}`, '--hide-scrollbars', '--window-size=1200,630', 'about:blank']);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 30 && !targets; i++) { await wait(300); try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch {} }
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0; const pend = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: pathToFileURL(file).href });
await wait(1500);
await send('Runtime.evaluate', { expression: 'Promise.all([document.fonts.ready, ...[...document.images].map(i => i.decode().catch(()=>{}))])', awaitPromise: true });
await wait(300);
let quality = 86, buf;
do {
  const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality, clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } });
  buf = Buffer.from(shot.result.data, 'base64');
  quality -= 6;
} while (buf.length > 280 * 1024 && quality > 50);
writeFileSync(OUT, buf);
ws.close(); chrome.kill();
await wait(500);
rmSync(tmp, { recursive: true, force: true });
console.log(`og-image.jpg written (${Math.round(statSync(OUT).size / 1024)} KB, quality ${quality + 6})`);
process.exit(0);
