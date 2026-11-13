import site from '../data/site.js';
import { icon } from '../components/icons.js';
import { esc, pageHero, sectionHead, waHref, telHref } from '../components/ui.js';
import { locationSection } from './home.js';

function contactCards() {
  return `<div class="contact-cards">
    <a class="contact-card contact-card--call" href="${telHref()}">
      <span class="contact-card__icon">${icon('phone', { size: 26 })}</span>
      <span class="contact-card__label">Call reservations</span>
      <span class="contact-card__value">${site.phone.display}</span>
      <span class="contact-card__hint">Tap to call</span>
    </a>
    <a class="contact-card contact-card--wa" href="${waHref()}" target="_blank" rel="noopener">
      <span class="contact-card__icon">${icon('whatsapp', { size: 26 })}</span>
      <span class="contact-card__label">WhatsApp</span>
      <span class="contact-card__value">${site.phone.display}</span>
      <span class="contact-card__hint">Opens a pre-written enquiry</span>
    </a>
    ${site.email ? `<a class="contact-card" href="mailto:${site.email}"><span class="contact-card__icon">${icon('mail', { size: 26 })}</span><span class="contact-card__label">Email</span><span class="contact-card__value">${esc(site.email)}</span></a>` : ''}
  </div>`;
}

function field({ id, label, type = 'text', required = true, attrs = '', hint = '', full = false }) {
  return `<div class="field${full ? ' field--full' : ''}">
    <label for="${id}">${label}${required ? ' <span class="req" aria-hidden="true">*</span>' : ' <span class="opt">(optional)</span>'}</label>
    <input id="${id}" name="${id}" type="${type}" ${required ? 'required aria-required="true"' : ''} ${attrs} aria-describedby="${id}-error${hint ? ` ${id}-hint` : ''}">
    ${hint ? `<p class="field__hint" id="${id}-hint">${hint}</p>` : ''}
    <p class="field__error" id="${id}-error" aria-live="polite"></p>
  </div>`;
}

function form() {
  const roomOptions = site.rooms.map((r) => `<option value="${esc(r.name)}" data-room-id="${r.id}">${esc(r.name)}</option>`).join('');
  return `<form class="enquiry" id="enquiry-form" novalidate data-enquiry-form data-endpoint="${site.formEndpoint || ''}" data-wa="${site.phone.whatsapp}">
    <div class="enquiry__head">
      <h2 class="enquiry__title">Booking enquiry</h2>
      <p class="enquiry__intro">Share your dates and we’ll reply with availability and rates. <strong>Submitting this form is an enquiry, not a confirmed reservation.</strong></p>
    </div>
    <div class="enquiry__grid">
      ${field({ id: 'name', label: 'Full name', attrs: 'autocomplete="name" maxlength="80"', full: true })}
      ${field({ id: 'phone', label: 'Phone number', type: 'tel', attrs: 'autocomplete="tel" inputmode="tel" maxlength="20" placeholder="e.g. 07XX XXX XXX"', hint: 'Kenyan or international number — we’ll reply here.', full: true })}
      ${field({ id: 'checkin', label: 'Check-in date', type: 'date' })}
      ${field({ id: 'checkout', label: 'Check-out date', type: 'date' })}
      ${field({ id: 'guests', label: 'Number of guests', type: 'number', attrs: 'min="1" max="30" step="1" inputmode="numeric" value="1"' })}
      <div class="field">
        <label for="room">Room preference <span class="opt">(optional)</span></label>
        <select id="room" name="room"><option value="">No preference / not sure</option>${roomOptions}</select>
      </div>
      <div class="field field--full">
        <label for="message">Additional message <span class="opt">(optional)</span></label>
        <textarea id="message" name="message" rows="4" maxlength="1000" aria-describedby="message-error" placeholder="Arrival time, special requests or questions"></textarea>
        <p class="field__error" id="message-error" aria-live="polite"></p>
      </div>
      <div class="hp" aria-hidden="true">
        <label for="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabindex="-1" autocomplete="off">
      </div>
    </div>
    <div class="enquiry__footer">
      <button class="btn btn--primary btn--lg enquiry__submit" type="submit" data-submit>
        <span class="btn__spinner" aria-hidden="true"></span>
        ${icon('whatsapp', { size: 20 })}<span data-submit-label>${site.formEndpoint ? 'Send enquiry' : 'Send enquiry via WhatsApp'}</span>
      </button>
      <p class="enquiry__small">${site.formEndpoint ? 'We’ll respond as soon as possible.' : 'Your details open in WhatsApp, ready to send to our team.'} Prefer to talk? Call <a href="${telHref()}">${site.phone.display}</a>.</p>
      <p class="enquiry__small">By sending an enquiry you agree to our <a href="privacy.html">Privacy Policy</a> and <a href="terms.html">Terms &amp; Conditions</a>.</p>
    </div>
    <p class="form-status" role="status" aria-live="polite" data-form-status></p>
    <noscript><p class="form-status form-status--error">This form needs JavaScript. Please call or WhatsApp us on <a href="${telHref()}">${site.phone.display}</a>.</p></noscript>
    <div class="enquiry__success" data-form-success hidden tabindex="-1">
      <span class="enquiry__success-icon">${icon('check', { size: 30 })}</span>
      <h3>Thank you — your enquiry is ready</h3>
      <p data-success-text>We’ve opened WhatsApp with your enquiry. Please press <strong>send</strong> in WhatsApp so it reaches our team.</p>
      <p class="muted small">Your reservation is confirmed only once our team replies with availability and the rate.</p>
      <div class="enquiry__success-actions">
        <a class="btn btn--whatsapp" href="${waHref()}" target="_blank" rel="noopener" data-success-wa>${icon('whatsapp', { size: 20 })}<span>Open WhatsApp again</span></a>
        <button class="btn btn--text" type="button" data-form-reset>Start a new enquiry</button>
      </div>
    </div>
  </form>`;
}

function details() {
  const item = (ic, label, value) => `<li><span class="info__icon">${icon(ic, { size: 22 })}</span><div><p class="info__label">${label}</p><p class="info__value">${value}</p></div></li>`;
  const tbcSpan = '<span class="spec__tbc">To be confirmed</span>';
  return `<ul class="info-list info-list--compact">
    ${item('pin', 'Address', site.address ? esc([site.address.street, site.address.locality, site.address.region].filter(Boolean).join(', ')) : tbcSpan)}
    ${item('clock', 'Reception hours', site.receptionHours ? esc(site.receptionHours) : tbcSpan)}
    ${item('calendar', 'Check-in / check-out', site.checkInTime && site.checkOutTime ? `${esc(site.checkInTime)} / ${esc(site.checkOutTime)}` : tbcSpan)}
  </ul>`;
}

export default {
  id: 'contact',
  file: 'contact.html',
  title: 'Contact & Reservations',
  description: 'Book your stay at Swahili Spice Hostel, Mombasa. Call or WhatsApp 0794149805, or send a booking enquiry with your dates and number of guests.',
  priority: '0.9',
  body: () => `
${pageHero({ sw: 'Wasiliana nasi', en: 'Contact & reservations', title: 'Let’s plan <em>your stay.</em>', intro: `The fastest way to book is to call or WhatsApp us on ${site.phone.display}. Or send your dates below and we’ll get back to you.` })}

<section class="section contact" id="enquiry">
  <div class="container contact__grid">
    <aside class="contact__aside">
      ${sectionHead({ sw: 'Hifadhi', en: 'Reservations', title: 'Talk to us directly' })}
      <div data-reveal>
        ${contactCards()}
        ${details()}
        <div class="contact__note">
          ${icon('sparkle', { size: 20 })}
          <p>Enquiries are answered by our team. A reservation is only confirmed once we reply with your booking details.</p>
        </div>
      </div>
    </aside>
    <div class="contact__form" data-reveal>${form()}</div>
  </div>
</section>

${locationSection()}`,
};
