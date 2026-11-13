import site from '../data/site.js';
import { icon } from '../components/icons.js';
import {
  esc, figure, button, waButton, callButton, sectionHead, roomCard, facilityItem,
  ctaBand, placeholderBlock, divider, eyebrow, waHref, telHref, showTbc,
} from '../components/ui.js';

const experience = [
  { icon: 'heart', title: 'A genuine welcome', text: 'Hospitality the Swahili way — unhurried, attentive and personal from the moment you arrive.' },
  { icon: 'leaf', title: 'Clean, calm spaces', text: 'Rooms and shared areas kept fresh and simple, so you can rest properly between plans.' },
  { icon: 'whatsapp', title: 'Easy to reach', text: `Questions before or during your stay? Call or WhatsApp us on ${site.phone.display}.` },
  { icon: 'users', title: 'Good company', text: 'Room to relax on your own or share stories with fellow travellers.' },
];

function hero() {
  return `<section class="hero">
    <div class="hero__media">${figure('hero', { eager: true })}</div>
    <div class="hero__shade" aria-hidden="true"></div>
    <div class="container hero__inner">
      <div class="hero__content">
        ${eyebrow('Karibu', 'Swahili Spice Hostel · Mombasa')}
        <h1 class="hero__title">Warm Swahili hospitality, <em>a restful place to stay.</em></h1>
        <p class="hero__lead">Comfortable, affordable accommodation in Mombasa — clean, welcoming and looked after by a team that makes every guest feel at home.</p>
        <div class="hero__actions">
          ${button({ href: 'contact.html#enquiry', label: 'Book your stay', variant: 'primary', iconName: 'calendar' })}
          ${button({ href: 'contact.html', label: 'Contact us', variant: 'ghost-light' })}
        </div>
        <a class="hero__wa" href="${waHref()}" target="_blank" rel="noopener">
          <span class="hero__wa-icon">${icon('whatsapp', { size: 22 })}</span>
          <span><strong>Quick booking on WhatsApp</strong><small>Message ${site.phone.display} for availability</small></span>
        </a>
      </div>
    </div>
  </section>`;
}

function welcome() {
  return `<section class="section welcome">
    <div class="container welcome__grid">
      <div class="welcome__media" data-reveal>
        ${figure('welcome', { className: 'media--arch', sizes: '(min-width: 900px) 40vw, 90vw' })}
        <div class="welcome__badge" aria-hidden="true">${icon('sparkle', { size: 20 })}<span lang="sw">Ukarimu</span><small>hospitality</small></div>
      </div>
      <div class="welcome__text">
        ${sectionHead({ sw: 'Karibu', en: 'Welcome', title: 'A comfortable base, <em>made warmer by the people.</em>' })}
        <div data-reveal>
          <p class="lead">Since 2019, Swahili Spice Hostel has offered affordable, well-kept accommodation in Mombasa for travellers who want comfort without the fuss — and a welcome that feels personal.</p>
          <p>Whether you are passing through or settling in for a longer stay, our aim is simple: clean rooms, a secure and relaxed atmosphere, and friendly help whenever you need it. Get in touch and we’ll help you plan your stay.</p>
          <div class="welcome__actions">
            ${button({ href: 'about.html', label: 'About Swahili Spice', variant: 'outline' })}
            ${callButton({ variant: 'text' })}
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function rooms() {
  return `<section class="section section--sand rooms-preview">
    <div class="container">
      <div class="split-head">
        ${sectionHead({ sw: 'Malazi', en: 'Accommodation', title: 'Places to rest', intro: 'Room categories, occupancy and rates are being finalised. Enquire for current availability and prices.' })}
        <div data-reveal>${button({ href: 'accommodation.html', label: 'All accommodation', variant: 'outline', iconName: 'arrow' })}</div>
      </div>
      <div class="room-grid">${site.rooms.map(roomCard).join('')}</div>
    </div>
  </section>`;
}

function facilities() {
  return `<section class="section facilities-preview">
    <div class="container">
      ${sectionHead({ sw: 'Huduma', en: 'Facilities & amenities', title: 'The essentials, <em>thoughtfully looked after.</em>', align: 'center', intro: showTbc(false) && site.facilities.some((f) => !f.confirmed) ? 'Facilities marked “To be confirmed” are being verified with the hostel.' : '' })}
      <ul class="facility-grid">${site.facilities.map(facilityItem).join('')}</ul>
      <div class="center" data-reveal>${button({ href: 'facilities.html', label: 'Explore facilities', variant: 'outline', iconName: 'arrow' })}</div>
    </div>
  </section>`;
}

function experienceSection() {
  return `<section class="section section--ocean experience">
    <div class="experience__pattern" aria-hidden="true"></div>
    <div class="container experience__grid">
      <div class="experience__intro">
        ${sectionHead({ sw: 'Ukarimu', en: 'The guest experience', title: 'Hospitality you can <em>feel</em>' })}
        <p data-reveal>Good accommodation is more than a bed. It’s being greeted warmly, finding things in order and knowing help is a message away.</p>
        <div data-reveal>${waButton({ label: 'Ask us anything', variant: 'light' })}</div>
      </div>
      <ol class="experience__list">
        ${experience.map((e, i) => `<li class="experience__item" data-reveal style="--d:${i * 80}ms">
          <span class="experience__icon">${icon(e.icon, { size: 26 })}</span>
          <div><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p></div>
        </li>`).join('')}
      </ol>
    </div>
  </section>`;
}

function galleryPreview() {
  const items = ['oldTown', 'lamu', 'dining', 'kwale', 'dish'];
  return `<section class="section gallery-preview">
    <div class="container">
      <div class="split-head">
        ${sectionHead({ sw: 'Picha', en: 'Gallery', title: 'A glimpse of your stay' })}
        <div data-reveal>${button({ href: 'gallery.html', label: 'View gallery', variant: 'outline', iconName: 'arrow' })}</div>
      </div>
      <div class="mosaic" data-reveal>
        ${items.map((k, i) => `<a class="mosaic__item mosaic__item--${i + 1}" href="gallery.html" aria-label="Open gallery: ${esc(site.images[k].alt)}">${figure(k, { sizes: i === 0 ? '(min-width: 900px) 50vw, 100vw' : '(min-width: 900px) 25vw, 50vw' })}</a>`).join('')}
      </div>
    </div>
  </section>`;
}

export function locationSection() {
  const hasMap = Boolean(site.mapEmbedUrl);
  const address = site.address
    ? `<p class="location__address">${esc([site.address.street, site.address.locality, site.address.region].filter(Boolean).join(', '))}</p>`
    : '';
  return `<section class="section location" id="location">
    <div class="container location__grid">
      <div class="location__text">
        ${sectionHead({ sw: 'Mahali', en: 'Location', title: site.address ? `Find us in <em>${esc(site.address.locality)}</em>` : 'Finding us' })}
        <div data-reveal>
          ${address}
          ${site.directionsNote ? `<p>${esc(site.directionsNote)}</p>` : ''}
          ${!site.address ? placeholderBlock({ iconName: 'pin', title: 'Address and map coming soon', text: `Our full address and map will be published here shortly. In the meantime, call or WhatsApp ${site.phone.display} and we’ll share directions.` }) : ''}
          ${site.address && !site.mapEmbedUrl ? `<p class="location__note">Call or WhatsApp us on <a href="${telHref()}">${site.phone.display}</a> and we’ll send you directions or a map pin to the hostel.</p>` : ''}
          <div class="location__actions">
            ${waButton({ label: 'Get directions on WhatsApp', message: 'Hello Swahili Spice Hostel, could you please share directions to the hostel? Thank you.' })}
            ${callButton()}
          </div>
        </div>
      </div>
      <div class="location__map" data-reveal>
        ${hasMap
          ? `<iframe src="${site.mapEmbedUrl}" title="Map showing the location of ${esc(site.name)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`
          : `<div class="map-placeholder" role="img" aria-label="Map placeholder — location to be confirmed">
              <svg viewBox="0 0 600 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect width="600" height="450" fill="#E8D8BE"/>
                <path d="M0 330c90-30 160 20 250-10s170-60 350-20v150H0z" fill="#123B50" opacity=".9"/>
                <path d="M0 360c100-25 170 15 260-8s180-50 340-15" stroke="#FAF8F3" stroke-opacity=".35" fill="none" stroke-width="2"/>
                <g stroke="#C9B48F" stroke-width="2" fill="none"><path d="M40 60h520M40 140h520M40 220h520M120 0v320M260 0v300M420 0v310"/><path d="M60 300 500 30" stroke-dasharray="6 8"/></g>
                <circle cx="300" cy="170" r="54" fill="#C66A43" opacity=".14"/>
                <path d="M300 205s-30-26-30-50a30 30 0 0 1 60 0c0 24-30 50-30 50z" fill="#C66A43"/><circle cx="300" cy="155" r="10" fill="#FAF8F3"/>
              </svg>
              <span class="map-placeholder__label">${site.address ? `${esc([site.address.locality, site.address.region].filter(Boolean).join(", "))} — map pin coming soon` : 'Map to be added once the location is confirmed'}</span>
            </div>`}
      </div>
    </div>
  </section>`;
}

function testimonials() {
  if (site.testimonials.length) {
    return `<section class="section section--sand testimonials">
      <div class="container">
        ${sectionHead({ sw: 'Maoni', en: 'Guest reviews', title: 'What our guests say', align: 'center' })}
        <div class="testimonial-grid">
          ${site.testimonials.map((t, i) => `<figure class="testimonial" data-reveal style="--d:${i * 80}ms">
            <blockquote><p>${esc(t.quote)}</p></blockquote>
            <figcaption>${esc(t.name)}${t.date ? ` · <time>${esc(t.date)}</time>` : ''}</figcaption>
          </figure>`).join('')}
        </div>
      </div>
    </section>`;
  }
  // No genuine testimonials yet — invite reviews instead of inventing them.
  return `<section class="section section--sand testimonials testimonials--empty">
    <div class="container testimonials__empty" data-reveal>
      ${eyebrow('Maoni', 'Guest reviews')}
      <p class="testimonials__quote">We only share genuine words from our guests.</p>
      <p>Stayed with us? We’d love to hear about your experience — your feedback helps us look after every guest better.</p>
      ${waButton({ label: 'Share your feedback', variant: 'outline', message: 'Hello Swahili Spice Hostel, I recently stayed with you and would like to share some feedback: ' })}
    </div>
  </section>`;
}

export default {
  id: 'home',
  file: 'index.html',
  title: 'Swahili Spice Hostel Mombasa | Comfortable, Affordable Accommodation',
  description: 'Swahili Spice Hostel in Mombasa — comfortable, affordable accommodation with warm Swahili hospitality since 2019. Book on 0794149805.',
  preload: site.images.hero.src,
  priority: '1.0',
  body: () => [hero(), welcome(), rooms(), facilities(), experienceSection(), galleryPreview(), locationSection(), testimonials(), ctaBand()].join('\n'),
};
