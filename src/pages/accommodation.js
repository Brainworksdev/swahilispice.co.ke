import site from '../data/site.js';
import { icon } from '../components/icons.js';
import {
  esc, pageHero, sectionHead, figure, tbc, roomSpecs, button, waButton, waHref, roomWaMessage, ctaBand, placeholderBlock, showTbc,
} from '../components/ui.js';

function roomFeature(room) {
  if (room.features.length) {
    return `<ul class="checklist">${room.features.map((f) => `<li>${icon('check', { size: 18 })}${esc(f)}</li>`).join('')}</ul>`;
  }
  return `<p class="muted small">In-room facilities to be confirmed.</p>`;
}

function roomSection(room, i) {
  return `<article class="room" id="${room.id}">
    <div class="room__media${i % 2 ? ' room__media--right' : ''}" data-reveal>${figure(room.image, { sizes: '(min-width: 900px) 55vw, 100vw' })}</div>
    <div class="room__body" data-reveal>
      <div class="room__top"><span class="room__num">0${i + 1}</span>${tbc(room.confirmed, 'Details to be confirmed')}</div>
      <h2 class="room__title">${esc(room.name)}</h2>
      <p class="room__summary">${esc(room.summary)}</p>
      ${roomSpecs(room)}
      <h3 class="room__subhead">In the room</h3>
      ${roomFeature(room)}
      <div class="room__actions">
        ${button({ href: `contact.html?room=${encodeURIComponent(room.id)}#enquiry`, label: 'Enquire about this room', variant: 'primary', iconName: 'calendar' })}
        <a class="btn btn--outline" href="${waHref(roomWaMessage(room))}" target="_blank" rel="noopener">${icon('whatsapp', { size: 20 })}<span>WhatsApp</span></a>
      </div>
    </div>
  </article>`;
}

function stayInfo() {
  const row = (label, value, ic) => `<li><span class="info__icon">${icon(ic, { size: 22 })}</span><div><p class="info__label">${label}</p><p class="info__value">${value ? esc(value) : '<span class="spec__tbc">To be confirmed</span>'}</p></div></li>`;
  return `<ul class="info-list">
    ${row('Check-in', site.checkInTime, 'clock')}
    ${row('Check-out', site.checkOutTime, 'clock')}
    ${row('Reception', site.receptionHours, 'users')}
    <li><span class="info__icon">${icon('phone', { size: 22 })}</span><div><p class="info__label">Reservations</p><p class="info__value"><a href="tel:${site.phone.tel}">${site.phone.display}</a></p></div></li>
  </ul>`;
}

export default {
  id: 'accommodation',
  file: 'accommodation.html',
  title: 'Accommodation',
  description: 'Explore accommodation at Swahili Spice Hostel. Enquire for room availability and current rates by phone or WhatsApp on 0794149805.',
  priority: '0.9',
  body: () => `
${pageHero({ sw: 'Malazi', en: 'Accommodation', title: 'Rooms for a <em>restful</em> stay.', intro: 'Clean, comfortable and affordable — send us your dates and we’ll confirm availability and current rates.', image: 'room2' })}

${showTbc(false) && site.rooms.some((r) => !r.confirmed)
  ? `<div class="container notice-wrap">${placeholderBlock({ iconName: 'bed', title: 'Room categories and rates are being finalised', text: 'The room names, descriptions, occupancy and prices below are placeholders and will be updated with confirmed details. For accurate availability and rates today, please contact us directly.', actions: waButton({ label: 'Ask for current rates', message: 'Hello Swahili Spice Hostel, could you please share your current room types and rates? Thank you.' }) })}</div>`
  : ''}

<section class="section rooms">
  <div class="container rooms__list">
    ${site.rooms.map(roomSection).join('')}
  </div>
</section>

<section class="section section--sand">
  <div class="container stay-info">
    <div>
      ${sectionHead({ sw: 'Taarifa', en: 'Good to know', title: 'Before you arrive' })}
      <p data-reveal>Rates and availability change with the season. A reservation is confirmed only once our team has replied to your enquiry with the details of your stay.</p>
    </div>
    <div data-reveal>${stayInfo()}</div>
  </div>
</section>

<section class="section section--tight">
  <div class="container how" data-reveal>
    ${sectionHead({ sw: 'Jinsi ya kuweka nafasi', en: 'How booking works', title: 'Three simple steps', align: 'center' })}
    <ol class="steps">
      <li><span class="steps__n">1</span><h3>Send an enquiry</h3><p>Use the booking form, WhatsApp or call us with your dates and number of guests.</p></li>
      <li><span class="steps__n">2</span><h3>We confirm the details</h3><p>Our team replies with availability, the rate and anything you need to know.</p></li>
      <li><span class="steps__n">3</span><h3>Your stay is reserved</h3><p>Once you’ve agreed the details with us, your reservation is confirmed.</p></li>
    </ol>
  </div>
</section>

${ctaBand()}`,
};
