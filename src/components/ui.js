import site from '../data/site.js';
import { icon } from './icons.js';

/* ---------- helpers ---------- */

export const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const telHref = () => `tel:${site.phone.tel}`;

export const waHref = (message = site.whatsappMessage) =>
  `https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(message)}`;

export const roomWaMessage = (room) =>
  `Hello Swahili Spice Hostel, I'd like to enquire about the ${room.name}. Could you please share availability and rates? Thank you.`;

export const showTbc = (confirmed) => site.showPlaceholderLabels && !confirmed;

export const tbc = (confirmed = false, text = 'To be confirmed') =>
  showTbc(confirmed) ? `<span class="tbc">${esc(text)}</span>` : '';

/* ---------- brand ---------- */

function starPoints(cx, cy, outer, inner, n = 8) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / n) * i - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
}

/** Brand mark: a Swahili pointed arch framing a spice star over the sea. */
export function logoMark({ size = 40, className = 'logo__mark' } = {}) {
  return `<svg class="${className}" width="${Math.round(size * 0.84)}" height="${size}" viewBox="0 0 40 48" fill="none" aria-hidden="true" focusable="false">
    <path d="M5 46V22.5C5 12.8 12.6 6.2 20 2c7.4 4.2 15 10.8 15 20.5V46" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
    <polygon points="${starPoints(20, 24, 7, 3)}" fill="var(--mark-accent, #C66A43)"/>
    <path d="M10 39c2.5-2 5-2 7.5 0s5 2 7.5 0 5-2 7.5 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}

export function logo({ href = 'index.html', className = '' } = {}) {
  return `<a class="logo ${className}" href="${href}" aria-label="${esc(site.name)} — home">
    ${logoMark()}
    <span class="logo__text"><span class="logo__name">Swahili Spice</span><span class="logo__sub">Hostel</span></span>
  </a>`;
}

/* ---------- media ---------- */

/**
 * Responsive image. `key` refers to site.images.
 * Illustrative stock photos get a discreet "Illustrative photo" tag so they
 * are never mistaken for the hostel's actual rooms or premises.
 */
export const illustrativeTag = (img) =>
  img.illustrative ? '<span class="ph-tag">Illustrative photo</span>' : '';

export function figure(key, { className = '', eager = false, sizes = '100vw', caption = '', tag = true } = {}) {
  const img = site.images[key];
  if (!img) throw new Error(`Unknown image key: ${key}`);
  const srcset = img.srcset ? ` srcset="${img.srcset}" sizes="${sizes}"` : '';
  const loading = eager ? 'fetchpriority="high"' : 'loading="lazy"';
  const ph = tag ? illustrativeTag(img) : '';
  return `<figure class="media ${className}">
    <img src="${img.src}"${srcset} width="${img.width}" height="${img.height}" alt="${esc(img.alt)}" ${loading} decoding="async">
    ${ph}${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}
  </figure>`;
}

/* ---------- building blocks ---------- */

export function button({ href, label, variant = 'primary', iconName = '', external = false, className = '', attrs = '' }) {
  const ext = external ? ' target="_blank" rel="noopener"' : '';
  const ic = iconName ? icon(iconName, { size: 20 }) : '';
  return `<a class="btn btn--${variant} ${className}" href="${href}"${ext} ${attrs}>${ic}<span>${esc(label)}</span></a>`;
}

export const waButton = (opts = {}) =>
  button({ href: waHref(opts.message), label: opts.label || 'Book on WhatsApp', variant: opts.variant || 'whatsapp', iconName: 'whatsapp', external: true, className: opts.className || '' });

export const callButton = (opts = {}) =>
  button({ href: telHref(), label: opts.label || `Call ${site.phone.display}`, variant: opts.variant || 'ghost', iconName: 'phone', className: opts.className || '' });

export function eyebrow(sw, en) {
  return `<p class="eyebrow"><span class="eyebrow__sw" lang="sw">${esc(sw)}</span>${en ? `<span class="eyebrow__en">${esc(en)}</span>` : ''}</p>`;
}

export function sectionHead({ sw, en, title, intro = '', align = 'left', className = '' }) {
  return `<header class="section-head section-head--${align} ${className}" data-reveal>
    ${eyebrow(sw, en)}
    <h2 class="section-head__title">${title}</h2>
    ${intro ? `<p class="section-head__intro">${intro}</p>` : ''}
  </header>`;
}

/** Inner-page hero with arch pattern backdrop. */
export function pageHero({ sw, en, title, intro, image }) {
  return `<section class="page-hero">
    <div class="page-hero__pattern" aria-hidden="true"></div>
    <div class="container page-hero__inner">
      <div class="page-hero__text">
        ${eyebrow(sw, en)}
        <h1 class="page-hero__title">${title}</h1>
        ${intro ? `<p class="page-hero__intro">${intro}</p>` : ''}
      </div>
      ${image ? `<div class="page-hero__media">${figure(image, { className: 'media--arch', eager: true, sizes: '(min-width: 900px) 34vw, 80vw' })}</div>` : ''}
    </div>
  </section>`;
}

export const divider = (className = '') => `<div class="kanga ${className}" aria-hidden="true"></div>`;

/** A clearly labelled block for information the business has not yet supplied. */
export function placeholderBlock({ title, text, iconName = 'sparkle', actions = '' }) {
  return `<div class="placeholder" role="note">
    <span class="placeholder__icon">${icon(iconName)}</span>
    <div>
      <p class="placeholder__label">Awaiting details from Swahili Spice</p>
      <p class="placeholder__title">${title}</p>
      <p class="placeholder__text">${text}</p>
      ${actions ? `<div class="placeholder__actions">${actions}</div>` : ''}
    </div>
  </div>`;
}

/* ---------- accommodation ---------- */

const detail = (label, value, iconName) =>
  `<div class="spec"><dt>${icon(iconName, { size: 18 })}${label}</dt><dd>${value ? esc(value) : '<span class="spec__tbc">To be confirmed</span>'}</dd></div>`;

export function roomSpecs(room) {
  return `<dl class="specs">
    ${detail('Occupancy', room.occupancy, 'users')}
    ${detail('Beds', room.beds, 'bed')}
    <div class="spec"><dt>${icon('calendar', { size: 18 })}Rate</dt><dd>${room.price ? esc(room.price) : 'Rates on enquiry'}</dd></div>
  </dl>`;
}

export function roomCard(room, i) {
  return `<article class="room-card" data-reveal style="--d:${i * 80}ms">
    <a class="room-card__media" href="accommodation.html#${room.id}" tabindex="-1" aria-hidden="true">${figure(room.image, { sizes: '(min-width: 900px) 30vw, 90vw' })}</a>
    <div class="room-card__body">
      <div class="room-card__top"><span class="room-card__num">0${i + 1}</span>${tbc(room.confirmed)}</div>
      <h3 class="room-card__title"><a href="accommodation.html#${room.id}">${esc(room.name)}</a></h3>
      <p class="room-card__meta">${room.occupancy ? esc(room.occupancy) : 'Occupancy to be confirmed'} · ${room.price ? esc(room.price) : 'Rates on enquiry'}</p>
      <a class="link-arrow" href="accommodation.html#${room.id}">View details ${icon('arrow', { size: 18 })}</a>
    </div>
  </article>`;
}

/* ---------- facilities ---------- */

export function facilityItem(f, i = 0) {
  return `<li class="facility" data-reveal style="--d:${i * 60}ms">
    <span class="facility__icon">${icon(f.icon, { size: 28 })}</span>
    <h3 class="facility__name">${esc(f.name)}</h3>
    <p class="facility__text">${esc(f.text)}</p>
    ${tbc(f.confirmed)}
  </li>`;
}

/* ---------- conversion ---------- */

export function ctaBand({ title = 'Ready when you are.', text = 'Tell us your dates and we’ll confirm availability and rates. Booking enquiries are answered by our team — your stay is confirmed once we reply.' } = {}) {
  return `<section class="cta-band">
    <div class="cta-band__pattern" aria-hidden="true"></div>
    <div class="container cta-band__inner" data-reveal>
      <div>
        ${eyebrow('Karibu', 'You’re welcome here')}
        <h2 class="cta-band__title">${title}</h2>
        <p class="cta-band__text">${text}</p>
      </div>
      <div class="cta-band__actions">
        ${button({ href: 'contact.html#enquiry', label: 'Book your stay', variant: 'primary', iconName: 'calendar' })}
        ${waButton({ label: 'WhatsApp us', variant: 'light' })}
        ${callButton({ variant: 'ghost-light' })}
      </div>
    </div>
  </section>`;
}
