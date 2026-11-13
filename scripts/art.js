/**
 * Generates the placeholder illustrations in src/assets/img/art/.
 * These are stand-ins until real hostel photography is supplied.
 * Run: node scripts/art.js
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'img', 'art');
mkdirSync(OUT, { recursive: true });

const C = {
  ocean: '#123B50', deep: '#0B2836', soft: '#1D5068', sea: '#2A6680',
  sand: '#E8D8BE', sandL: '#F3EADB', sandD: '#D6C09B', sandDD: '#BFA57C',
  terra: '#C66A43', terraD: '#A24F2C', terraL: '#DE9472', off: '#FAF8F3', char: '#252525',
  sun: '#F4C58F', dusk: '#E39B73', wood: '#7A4A2E', woodD: '#5B341F', woodL: '#9A6340', green: '#5F7A5A', greenD: '#45604A',
};

const svg = (w, h, body, defs = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">${defs ? `<defs>${defs}</defs>` : ''}${body}</svg>\n`;

/** Pointed Swahili arch: opening from x0..x1, springs at y=s, apex at y=a, down to bottom b. */
const arch = (x0, x1, s, a, b) => {
  const cx = (x0 + x1) / 2;
  const k = (s - a) * 0.15;
  return `M${x0} ${b}V${s}C${x0} ${s - (s - a) * 0.55} ${cx - (x1 - x0) * 0.18} ${a + k} ${cx} ${a}C${cx + (x1 - x0) * 0.18} ${a + k} ${x1} ${s - (s - a) * 0.55} ${x1} ${s}V${b}Z`;
};

const star = (cx, cy, r, inner, fill, n = 8) => {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const rr = i % 2 ? inner : r;
    const t = (Math.PI / n) * i - Math.PI / 2;
    pts.push(`${(cx + rr * Math.cos(t)).toFixed(1)},${(cy + rr * Math.sin(t)).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="${fill}"/>`;
};

const kangaRow = (x, y, w, size, c1, c2) => {
  let s = '';
  for (let i = 0; x + i * size < x + w; i++) {
    const px = x + i * size;
    s += `<path d="M${px} ${y + size / 2}l${size / 2} -${size / 2}l${size / 2} ${size / 2}z" fill="${i % 2 ? c1 : c2}"/>`;
  }
  return s;
};

const dhow = (x, y, s, fill) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="${fill}"><path d="M-60 0h120l-18 16H-46z"/><path d="M-4 -2V-118" stroke="${fill}" stroke-width="3"/><path d="M-2 -116C30 -96 58 -50 62 -6H-2z"/><path d="M-30 -86 70 -128" stroke="${fill}" stroke-width="2.5"/></g>`;

const sunsetSky = (id) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B4A62"/><stop offset=".55" stop-color="#C98468"/><stop offset=".85" stop-color="${C.sun}"/><stop offset="1" stop-color="#F6D7AE"/></linearGradient>`;
const seaGrad = (id) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sea}"/><stop offset="1" stop-color="${C.deep}"/></linearGradient>`;

const sunPath = (cx, cy, r, horizon, w) => {
  let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.sun}"/>`;
  for (let i = 0; i < 9; i++) {
    const yy = horizon + 14 + i * 22;
    const ww = w * (1 - i * 0.08);
    s += `<rect x="${cx - ww / 2}" y="${yy}" width="${ww}" height="${4 - i * 0.25}" rx="2" fill="${C.sun}" opacity="${0.75 - i * 0.07}"/>`;
  }
  return s;
};

const plant = (x, y, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-34 0h68l-10 70h-48z" fill="${C.terra}"/><path d="M-34 0h68v10h-68z" fill="${C.terraD}"/>` +
  [[-6, -150, -60], [4, -170, 10], [10, -140, 55], [-2, -120, -90], [6, -110, 85]]
    .map(([dx, h, rot]) => `<path d="M0 0C${dx - 20} ${h * 0.4} ${dx - 10} ${h * 0.8} ${dx} ${h}C${dx + 16} ${h * 0.7} ${dx + 14} ${h * 0.35} 0 0z" fill="${C.green}" transform="rotate(${rot * 0.35})"/>`).join('') +
  `<path d="M0 0C-8 -60 -4 -110 4 -160" stroke="${C.greenD}" stroke-width="3" fill="none"/></g>`;

/* ---------------------------------------------------------------- HERO */
function hero() {
  const W = 1600, H = 1000, horizon = 640;
  const a1 = arch(840, 1180, 380, 170, H);
  const a2 = arch(1250, 1590, 380, 170, H);
  const defs = sunsetSky('sky') + seaGrad('sea') +
    `<linearGradient id="wall" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.deep}"/><stop offset=".55" stop-color="#0F3446"/><stop offset="1" stop-color="#174559"/></linearGradient>` +
    `<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C79A78"/><stop offset="1" stop-color="#8E5B3F"/></linearGradient>`;
  const body = `
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <circle cx="1260" cy="140" r="1.6" fill="${C.off}" opacity=".7"/><circle cx="980" cy="210" r="1.2" fill="${C.off}" opacity=".6"/><circle cx="1450" cy="260" r="1.4" fill="${C.off}" opacity=".5"/>
  ${sunPath(1220, horizon - 40, 78, horizon, 220)}
  <path d="M600 ${horizon}C760 ${horizon - 40} 860 ${horizon - 28} 980 ${horizon - 8}S1180 ${horizon - 18} 1300 ${horizon}z" fill="#3D5F6C" opacity=".75"/>
  <rect y="${horizon}" width="${W}" height="${H - horizon}" fill="url(#sea)"/>
  ${sunPath(1220, -1000, 0, horizon, 240)}
  ${dhow(1010, horizon + 18, 0.95, C.deep)}
  <path d="M0 860H${W}V${H}H0z" fill="url(#floor)"/>
  <path d="M0 860H${W}" stroke="${C.terraL}" stroke-width="3" opacity=".6"/>
  <path fill="url(#wall)" fill-rule="evenodd" d="M0 0H${W}V${H}H0Z ${a1} ${a2}"/>
  <path d="${a1}" fill="none" stroke="${C.terra}" stroke-width="4" opacity=".55"/>
  <path d="${a2}" fill="none" stroke="${C.terra}" stroke-width="4" opacity=".55"/>
  <g opacity=".22">${kangaRow(820, 120, 780, 24, C.terra, C.sand)}</g>
  ${star(1010, 116, 18, 8, C.terra)}${star(1420, 116, 18, 8, C.terra)}
  <rect x="1180" y="380" width="70" height="620" fill="#0D2F40"/>
  <g transform="translate(1215 880)"><path d="M-40 0h80l-12 120h-56z" fill="${C.terraD}"/></g>
  ${plant(1215, 880, 1.1)}
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="${C.deep}"/>`;
  return svg(W, H, body, defs);
}

/* ---------------------------------------------------------------- COAST */
function coast() {
  const W = 1200, H = 900, horizon = 520;
  const defs = sunsetSky('sky2') + seaGrad('sea2');
  const waves = Array.from({ length: 7 }, (_, i) => {
    const y = horizon + 70 + i * 48;
    return `<path d="M0 ${y}c60-12 120-12 180 0s120 12 180 0 120-12 180 0 120 12 180 0 120-12 180 0 120 12 180 0 120-12 180 0" stroke="${C.off}" stroke-opacity="${0.12 + i * 0.02}" stroke-width="2" fill="none"/>`;
  }).join('');
  const body = `
  <rect width="${W}" height="${H}" fill="url(#sky2)"/>
  ${sunPath(820, horizon - 60, 90, horizon, 260)}
  <path d="M0 ${horizon}C160 ${horizon - 50} 300 ${horizon - 40} 420 ${horizon - 12}S640 ${horizon - 20} 720 ${horizon}z" fill="#3D5F6C" opacity=".8"/>
  <rect y="${horizon}" width="${W}" height="${H - horizon}" fill="url(#sea2)"/>
  ${sunPath(820, -1000, 0, horizon, 280)}
  ${waves}
  ${dhow(520, horizon + 60, 2.2, C.deep)}
  <path d="M0 ${H - 120}C200 ${H - 160} 360 ${H - 120} 520 ${H - 140}S900 ${H - 100} ${W} ${H - 150}V${H}H0z" fill="${C.sand}"/>
  <path d="M0 ${H - 70}C260 ${H - 100} 520 ${H - 60} ${W} ${H - 90}V${H}H0z" fill="${C.sandD}"/>`;
  return svg(W, H, body, defs);
}

/* ---------------------------------------------------------- room pieces */
const wall = (W, H, color, floorY, floorColor) =>
  `<rect width="${W}" height="${H}" fill="${color}"/><rect y="${floorY}" width="${W}" height="${H - floorY}" fill="${floorColor}"/>`;

const windowArch = (x0, x1, s, a, b, id) =>
  `<clipPath id="${id}"><path d="${arch(x0, x1, s, a, b)}"/></clipPath>
   <g clip-path="url(#${id})"><rect x="${x0}" y="${a}" width="${x1 - x0}" height="${b - a}" fill="#9FC2CF"/>
   <rect x="${x0}" y="${a + (b - a) * 0.58}" width="${x1 - x0}" height="${(b - a) * 0.42}" fill="${C.sea}"/>
   <circle cx="${x0 + (x1 - x0) * 0.7}" cy="${a + (b - a) * 0.42}" r="${(x1 - x0) * 0.1}" fill="${C.off}" opacity=".7"/>
   <path d="M${x0} ${a + (b - a) * 0.58}h${x1 - x0}" stroke="${C.off}" stroke-opacity=".5" stroke-width="2"/></g>
   <path d="${arch(x0, x1, s, a, b)}" fill="none" stroke="${C.off}" stroke-width="14"/>
   <path d="M${(x0 + x1) / 2} ${a}V${b}M${x0} ${s + 20}H${x1}" stroke="${C.off}" stroke-width="6"/>`;

const bed = (x, y, w, linen, throwC, head) => `
  <rect x="${x - 20}" y="${y - 190}" width="${w + 40}" height="200" rx="6" fill="${head}"/>
  <rect x="${x}" y="${y - 20}" width="${w}" height="110" rx="8" fill="${linen}"/>
  <rect x="${x + 30}" y="${y - 70}" width="${w * 0.36}" height="62" rx="20" fill="${C.off}"/>
  <rect x="${x + w * 0.6 - 30}" y="${y - 70}" width="${w * 0.36}" height="62" rx="20" fill="${C.off}"/>
  <path d="M${x} ${y + 40}h${w}v50a8 8 0 0 1-8 8H${x + 8}a8 8 0 0 1-8-8z" fill="${throwC}"/>
  <g opacity=".5">${kangaRow(x, y + 46, w, 16, C.off, C.sand)}</g>
  <rect x="${x - 10}" y="${y + 96}" width="${w + 20}" height="22" fill="${C.woodD}"/>`;

const sideTable = (x, y) => `
  <rect x="${x}" y="${y}" width="90" height="100" fill="${C.wood}"/><rect x="${x}" y="${y}" width="90" height="10" fill="${C.woodL}"/>
  <rect x="${x + 30}" y="${y - 60}" width="30" height="60" fill="${C.sandL}"/><path d="M${x + 15} ${y - 60}h60l-12-50h-36z" fill="${C.terraL}"/>`;

const pendant = (x, top, y, c = C.terra) =>
  `<path d="M${x} ${top}V${y}" stroke="${C.char}" stroke-width="2"/><path d="M${x - 46} ${y + 50}C${x - 46} ${y + 10} ${x - 20} ${y} ${x} ${y}S${x + 46} ${y + 10} ${x + 46} ${y + 50}z" fill="${c}"/><ellipse cx="${x}" cy="${y + 52}" rx="20" ry="6" fill="${C.sun}"/>`;

const rug = (cx, y, w, h) =>
  `<ellipse cx="${cx}" cy="${y}" rx="${w / 2}" ry="${h / 2}" fill="${C.terra}" opacity=".9"/><ellipse cx="${cx}" cy="${y}" rx="${w / 2 - 24}" ry="${h / 2 - 10}" fill="none" stroke="${C.sand}" stroke-width="3" stroke-dasharray="10 8"/>`;

/* ---------------------------------------------------------------- ROOMS */
function room1() {
  const W = 1200, H = 900;
  return svg(W, H, `
  ${wall(W, H, C.sandL, 690, C.sandD)}
  <rect x="0" y="0" width="420" height="690" fill="${C.sand}"/>
  ${windowArch(110, 330, 260, 120, 560, 'w1')}
  <path d="M0 690H${W}" stroke="${C.sandDD}" stroke-width="3"/>
  ${bed(470, 600, 520, C.off, C.ocean, C.wood)}
  ${sideTable(1020, 600)}
  ${pendant(780, 0, 150)}
  ${rug(720, 800, 760, 120)}
  ${plant(250, 700, 0.8)}
  <g opacity=".35">${star(730, 300, 34, 15, C.terra)}</g>`);
}

function room2() {
  const W = 1200, H = 900;
  return svg(W, H, `
  ${wall(W, H, '#EFE3CF', 700, '#C9AE86')}
  ${windowArch(720, 1060, 300, 90, 620, 'w2')}
  <path d="M120 0C120 220 160 360 210 560M820 0C820 220 780 360 730 560" stroke="${C.off}" stroke-opacity=".0" fill="none"/>
  <path d="M170 60h520v14H170z" fill="${C.woodD}"/>
  <path d="M180 74C150 300 160 480 130 640H730C700 480 710 300 680 74z" fill="${C.off}" opacity=".55"/>
  ${bed(200, 610, 460, C.off, C.terra, '#B98D64')}
  ${sideTable(40, 610)}
  <path d="M0 700H${W}" stroke="${C.sandDD}" stroke-width="3"/>
  ${rug(450, 810, 700, 110)}
  ${plant(1100, 720, 0.85)}`);
}

function room3() {
  const W = 1200, H = 900;
  const bunk = (x) => `
    <rect x="${x}" y="150" width="18" height="600" fill="${C.wood}"/><rect x="${x + 402}" y="150" width="18" height="600" fill="${C.wood}"/>
    <rect x="${x + 18}" y="330" width="384" height="56" rx="6" fill="${C.off}"/><path d="M${x + 18} 350h384v36H${x + 18}z" fill="${C.ocean}"/>
    <rect x="${x + 40}" y="300" width="120" height="40" rx="14" fill="${C.off}"/>
    <rect x="${x + 18}" y="386" width="384" height="18" fill="${C.woodD}"/>
    <rect x="${x + 18}" y="610" width="384" height="56" rx="6" fill="${C.off}"/><path d="M${x + 18} 630h384v36H${x + 18}z" fill="${C.terra}"/>
    <rect x="${x + 40}" y="580" width="120" height="40" rx="14" fill="${C.off}"/>
    <rect x="${x + 18}" y="666" width="384" height="18" fill="${C.woodD}"/>
    <rect x="${x + 18}" y="230" width="384" height="12" fill="${C.wood}"/>
    <g stroke="${C.wood}" stroke-width="10">${[0, 1, 2, 3].map((i) => `<path d="M${x + 360} ${420 + i * 50}h40"/>`).join('')}</g>
    <g opacity=".45">${kangaRow(x + 18, 372, 384, 14, C.off, C.sand)}</g>`;
  return svg(W, H, `
  ${wall(W, H, C.sandL, 740, C.sandD)}
  <rect x="520" y="0" width="160" height="740" fill="${C.sand}"/>
  ${windowArch(545, 655, 220, 130, 470, 'w3')}
  <path d="M0 740H${W}" stroke="${C.sandDD}" stroke-width="3"/>
  ${bunk(70)}${bunk(710)}
  ${rug(600, 830, 420, 80)}`);
}

function lounge() {
  const W = 1200, H = 900;
  return svg(W, H, `
  ${wall(W, H, C.sandL, 700, C.sandD)}
  ${windowArch(120, 380, 280, 110, 600, 'w4')}
  ${windowArch(820, 1080, 280, 110, 600, 'w5')}
  <path d="M0 700H${W}" stroke="${C.sandDD}" stroke-width="3"/>
  <rect x="420" y="520" width="380" height="140" rx="16" fill="${C.ocean}"/>
  <rect x="400" y="580" width="420" height="110" rx="14" fill="${C.soft}"/>
  <rect x="440" y="500" width="110" height="90" rx="18" fill="${C.terra}"/><rect x="560" y="505" width="100" height="85" rx="18" fill="${C.sand}"/><rect x="670" y="500" width="110" height="90" rx="18" fill="${C.terraL}"/>
  <rect x="410" y="690" width="16" height="30" fill="${C.woodD}"/><rect x="794" y="690" width="16" height="30" fill="${C.woodD}"/>
  ${rug(610, 800, 820, 130)}
  <rect x="520" y="740" width="180" height="20" rx="4" fill="${C.wood}"/><rect x="540" y="760" width="14" height="40" fill="${C.woodD}"/><rect x="666" y="760" width="14" height="40" fill="${C.woodD}"/>
  <rect x="570" y="716" width="40" height="26" rx="4" fill="${C.off}"/><circle cx="650" cy="732" r="12" fill="${C.terraD}"/>
  ${plant(1130, 710, 0.9)}${plant(60, 710, 0.7)}
  ${pendant(610, 0, 220, C.ocean)}`);
}

function dining() {
  const W = 1200, H = 900;
  const chair = (x, flip) => `<g transform="translate(${x} 0) scale(${flip ? -1 : 1} 1)"><path d="M0 420h18v380H0z" fill="${C.woodD}"/><path d="M0 600h110v18H0z" fill="${C.wood}"/><path d="M92 618h18v182H92z" fill="${C.woodD}"/><path d="M4 440h14v150H4z" fill="${C.wood}"/></g>`;
  return svg(W, H, `
  ${wall(W, H, '#EFE3CF', 720, '#C9AE86')}
  <g opacity=".3">${kangaRow(0, 360, W, 26, C.terra, C.ocean)}</g>
  ${windowArch(470, 730, 230, 70, 330, 'w6')}
  <path d="M0 720H${W}" stroke="${C.sandDD}" stroke-width="3"/>
  ${chair(190, false)}${chair(1010, true)}
  <rect x="300" y="560" width="600" height="24" fill="${C.wood}"/><rect x="290" y="584" width="620" height="10" fill="${C.woodD}"/>
  <rect x="330" y="594" width="20" height="210" fill="${C.woodD}"/><rect x="850" y="594" width="20" height="210" fill="${C.woodD}"/>
  <path d="M520 560c0-60 30-90 80-90s80 30 80 90z" fill="${C.ocean}"/><path d="M680 520c30-6 46 4 52 24" stroke="${C.ocean}" stroke-width="10" fill="none"/><rect x="585" y="452" width="30" height="20" rx="6" fill="${C.terra}"/>
  <path d="M400 530h50l-6 30h-38z" fill="${C.off}"/><path d="M450 538c12 0 14 14 2 16" stroke="${C.off}" stroke-width="4" fill="none"/>
  <path d="M760 530h50l-6 30h-38z" fill="${C.off}"/><path d="M810 538c12 0 14 14 2 16" stroke="${C.off}" stroke-width="4" fill="none"/>
  <ellipse cx="340" cy="556" rx="34" ry="6" fill="${C.terraL}"/><circle cx="330" cy="546" r="9" fill="#E7B23F"/><circle cx="348" cy="548" r="8" fill="${C.terra}"/>
  ${pendant(600, 0, 230)}
  ${plant(1110, 730, 0.75)}`);
}

/* ------------------------------------------------------------- COURTYARD */
function courtyard() {
  const W = 1000, H = 1250;
  const tiles = [];
  for (let r = 0; r < 6; r++) for (let c = 0; c < 9; c++) {
    tiles.push(`<path d="M${c * 120 - (r % 2) * 60} ${960 + r * 50}l60-25 60 25-60 25z" fill="${(r + c) % 2 ? C.sandD : C.sand}"/>`);
  }
  return svg(W, H, `
  <rect width="${W}" height="${H}" fill="${C.sandL}"/>
  <rect y="960" width="${W}" height="${H - 960}" fill="${C.sandD}"/>${tiles.join('')}
  <path d="M0 0H${W}L${W} 420 0 900z" fill="#F7EFE2" opacity=".6"/>
  <path d="${arch(300, 700, 420, 150, 960)}" fill="${C.wood}"/>
  <path d="${arch(330, 670, 430, 190, 960)}" fill="${C.woodD}"/>
  <path d="M500 190V960" stroke="${C.wood}" stroke-width="10"/>
  <g fill="#D7A85A">${Array.from({ length: 6 }, (_, r) => [400, 600].map((x) => `<circle cx="${x}" cy="${500 + r * 80}" r="7"/>`).join('')).join('')}</g>
  <g opacity=".55">${kangaRow(300, 130, 400, 20, C.terra, C.ocean)}</g>
  ${star(500, 90, 26, 11, C.terra)}
  <rect x="260" y="944" width="480" height="18" fill="${C.sandDD}"/>
  ${plant(170, 960, 1.3)}${plant(830, 960, 1.15)}
  <path d="M0 1080L${W} 1180V${H}H0z" fill="${C.deep}" opacity=".06"/>`);
}

/* ----------------------------------------------------------------- DOOR */
function door() {
  const W = 900, H = 1200;
  const carve = [];
  for (let y = 300; y < 1100; y += 40) carve.push(`<path d="M190 ${y}l14 20-14 20-14-20z" fill="${C.woodL}"/><path d="M710 ${y}l14 20-14 20-14-20z" fill="${C.woodL}"/>`);
  const studs = [];
  for (let r = 0; r < 7; r++) for (let c = 0; c < 4; c++) studs.push(`<circle cx="${290 + c * 107}" cy="${430 + r * 95}" r="9" fill="#D9AE5E"/><circle cx="${287 + c * 107}" cy="${427 + r * 95}" r="3" fill="#F3D79A"/>`);
  return svg(W, H, `
  <rect width="${W}" height="${H}" fill="${C.sand}"/>
  <path d="M0 0H${W}V${H}H0z" fill="url(#plaster)" opacity=".5"/>
  <rect x="150" y="220" width="600" height="900" fill="${C.wood}"/>
  <path d="M150 220h600v90H150z" fill="${C.woodD}"/>
  <path d="M190 300C260 230 380 200 450 200S640 230 710 300z" fill="${C.woodL}"/>
  ${star(450, 260, 30, 13, C.terra)}
  ${carve.join('')}
  <rect x="240" y="320" width="420" height="800" fill="${C.woodD}"/>
  <path d="M450 320V1120" stroke="${C.wood}" stroke-width="8"/>
  ${studs.join('')}
  <rect x="240" y="320" width="420" height="40" fill="${C.wood}"/>
  <circle cx="430" cy="760" r="14" fill="#D9AE5E"/><circle cx="470" cy="760" r="14" fill="#D9AE5E"/>
  <rect x="110" y="1120" width="680" height="30" fill="${C.sandDD}"/><rect x="80" y="1150" width="740" height="50" fill="${C.sandD}"/>
  ${plant(80, 1150, 0.9)}`, `<linearGradient id="plaster" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.off}"/><stop offset="1" stop-color="${C.sandD}"/></linearGradient>`);
}

const files = { 'hero.svg': hero, 'coast.svg': coast, 'room-1.svg': room1, 'room-2.svg': room2, 'room-3.svg': room3, 'lounge.svg': lounge, 'dining.svg': dining, 'courtyard.svg': courtyard, 'door.svg': door };
for (const [name, fn] of Object.entries(files)) {
  const out = fn().replace(/\n\s+/g, '\n');
  writeFileSync(path.join(OUT, name), out);
  console.log(`  art/${name}  ${(out.length / 1024).toFixed(1)} KB`);
}
