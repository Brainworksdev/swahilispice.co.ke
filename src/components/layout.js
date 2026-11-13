import site from '../data/site.js';
import { icon } from './icons.js';
import { esc, logo, logoMark, telHref, waHref, button } from './ui.js';

export const NAV = [
  { href: 'index.html', label: 'Home', id: 'home' },
  { href: 'about.html', label: 'About', id: 'about' },
  { href: 'accommodation.html', label: 'Accommodation', id: 'accommodation' },
  { href: 'facilities.html', label: 'Facilities', id: 'facilities' },
  { href: 'gallery.html', label: 'Gallery', id: 'gallery' },
  { href: 'contact.html', label: 'Contact', id: 'contact' },
];

/** schema.org structured data — only includes verified fields. */
function structuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Hostel',
    '@id': `${site.url}/#hostel`,
    name: site.name,
    url: `${site.url}/`,
    telephone: site.phone.tel,
    image: `${site.url}/assets/img/og-image.png`,
    logo: `${site.url}/assets/img/logo.png`,
    description: 'Comfortable, affordable accommodation with warm Swahili hospitality. Enquire by phone or WhatsApp on 0794149805.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phone.tel,
      contactType: 'reservations',
      availableLanguage: ['English', 'Swahili'],
    },
  };
  if (site.email) data.email = site.email;
  if (site.priceRange) data.priceRange = site.priceRange;
  if (site.checkInTime) data.checkinTime = site.checkInTime;
  if (site.checkOutTime) data.checkoutTime = site.checkOutTime;
  if (site.address) data.address = { '@type': 'PostalAddress', streetAddress: site.address.street, addressLocality: site.address.locality, addressRegion: site.address.region, postalCode: site.address.postalCode, addressCountry: site.address.country || 'KE' };
  if (site.geo) data.geo = { '@type': 'GeoCoordinates', ...site.geo };
  if (site.mapLinkUrl) data.hasMap = site.mapLinkUrl;
  if (site.social.length) data.sameAs = site.social.map((s) => s.url);
  const confirmedFacilities = site.facilities.filter((f) => f.confirmed);
  if (confirmedFacilities.length) data.amenityFeature = confirmedFacilities.map((f) => ({ '@type': 'LocationFeatureSpecification', name: f.name, value: true }));
  return JSON.stringify(data);
}

function head(page, assetVersion) {
  const canonical = `${site.url}/${page.file === 'index.html' ? '' : page.file}`;
  const title = page.id === 'home' ? page.title : `${page.title} | ${site.name}`;
  return `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${page.id === 'not-found' ? '<base href="/">' : ''}
  <script>document.documentElement.classList.add('js')</script>
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(page.description)}">
  ${page.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
  <meta name="theme-color" content="#123B50">
  <meta name="format-detection" content="telephone=no">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(site.name)}">
  <meta property="og:locale" content="${site.locale}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${site.url}/assets/img/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Swahili Spice Hostel — warm Swahili hospitality">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(page.description)}">
  <meta name="twitter:image" content="${site.url}/assets/img/og-image.png">

  <link rel="icon" href="favicon.ico" sizes="32x32">
  <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
  <link rel="manifest" href="site.webmanifest">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=DM+Sans:ital,opsz,wght@0,9..40,400..600;1,9..40,400&display=swap">
  <link rel="stylesheet" href="assets/css/styles.css?v=${assetVersion}">
  ${page.preload ? `<link rel="preload" as="image" href="${page.preload}" fetchpriority="high">` : ''}
  <script src="assets/js/main.js?v=${assetVersion}" defer></script>
  ${page.id === 'home' || page.id === 'contact' ? `<script type="application/ld+json">${structuredData()}</script>` : ''}
</head>`;
}

function header(page) {
  const links = NAV.map((n) => `<li><a href="${n.href}"${n.id === page.id ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('');
  return `<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header" data-header>
  <div class="container site-header__inner">
    ${logo()}
    <nav class="nav" aria-label="Main">
      <ul class="nav__list">${links}</ul>
    </nav>
    <div class="site-header__actions">
      <a class="header-phone" href="${telHref()}">${icon('phone', { size: 18 })}<span>${site.phone.display}</span></a>
      ${button({ href: 'contact.html#enquiry', label: 'Book now', variant: 'primary', className: 'btn--sm header-book' })}
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
        <span class="visually-hidden">Open menu</span>${icon('menu')}
      </button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" data-mobile-menu hidden>
  <div class="mobile-menu__top">
    ${logo({ className: 'logo--light' })}
    <button class="menu-close" type="button" data-menu-close><span class="visually-hidden">Close menu</span>${icon('close')}</button>
  </div>
  <nav aria-label="Mobile">
    <ul class="mobile-menu__list">${NAV.map((n, i) => `<li style="--i:${i}"><a href="${n.href}"${n.id === page.id ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('')}</ul>
  </nav>
  <div class="mobile-menu__actions">
    ${button({ href: 'contact.html#enquiry', label: 'Book your stay', variant: 'primary', iconName: 'calendar' })}
    ${button({ href: waHref(), label: 'WhatsApp', variant: 'light', iconName: 'whatsapp', external: true })}
    ${button({ href: telHref(), label: `Call ${site.phone.display}`, variant: 'ghost-light', iconName: 'phone' })}
  </div>
</div>`;
}

function footer() {
  const year = new Date().getFullYear();
  const locationLine = site.address
    ? esc([site.address.street, site.address.locality, site.address.region].filter(Boolean).join(', '))
    : '<span class="footer__muted">Address to be confirmed — call or WhatsApp for directions.</span>';
  return `<footer class="site-footer">
  <div class="kanga kanga--footer" aria-hidden="true"></div>
  <div class="container site-footer__grid">
    <div class="site-footer__brand">
      ${logo({ className: 'logo--light logo--lg' })}
      <p class="site-footer__tagline">Warm Swahili hospitality and a restful place to stay.</p>
      <p class="site-footer__karibu" lang="sw">Karibu sana.</p>
    </div>
    <div>
      <h2 class="site-footer__heading">Explore</h2>
      <ul class="site-footer__links">${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h2 class="site-footer__heading">Reservations</h2>
      <ul class="site-footer__contact">
        <li><a href="${telHref()}">${icon('phone', { size: 18 })}<span>${site.phone.display}</span></a></li>
        <li><a href="${waHref()}" target="_blank" rel="noopener">${icon('whatsapp', { size: 18 })}<span>WhatsApp ${site.phone.display}</span></a></li>
        ${site.email ? `<li><a href="mailto:${site.email}">${icon('mail', { size: 18 })}<span>${esc(site.email)}</span></a></li>` : ''}
        <li>${icon('pin', { size: 18 })}<span>${locationLine}</span></li>
      </ul>
    </div>
    <div>
      <h2 class="site-footer__heading">Plan your stay</h2>
      <p class="site-footer__muted">Send your dates and number of guests — we’ll reply with availability and rates.</p>
      ${button({ href: 'contact.html#enquiry', label: 'Send an enquiry', variant: 'light', className: 'btn--sm' })}
      ${site.social.length ? `<ul class="site-footer__social">${site.social.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`).join('')}</ul>` : ''}
    </div>
  </div>
  <div class="container site-footer__bottom">
    <p>&copy; ${year} ${esc(site.name)}. All rights reserved.</p>
    <p><a href="https://swahilispice.co.ke">swahilispice.co.ke</a></p>
  </div>
</footer>
<a class="wa-float" href="${waHref()}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${icon('whatsapp', { size: 28 })}<span class="wa-float__label">Book on WhatsApp</span></a>`;
}

export function renderPage(page, assetVersion) {
  return `<!doctype html>
<html lang="${site.language}">
${head(page, assetVersion)}
<body class="page-${page.id}">
${header(page)}
<main id="main" tabindex="-1">
${page.body()}
</main>
${footer()}
</body>
</html>
`;
}

export { logoMark };
