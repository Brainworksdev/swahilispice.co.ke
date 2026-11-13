import site from '../data/site.js';
import { pageHero, sectionHead, facilityItem, figure, tbc, ctaBand, waButton, callButton, showTbc } from '../components/ui.js';

const byId = (id) => site.facilities.find((f) => f.id === id) || { confirmed: false };

export default {
  id: 'facilities',
  file: 'facilities.html',
  title: 'Facilities & Amenities',
  description: 'Facilities and amenities at Swahili Spice Hostel. Contact us on 0794149805 by phone or WhatsApp to ask about anything you need for your stay.',
  priority: '0.8',
  body: () => `
${pageHero({ sw: 'Huduma', en: 'Facilities & amenities', title: 'Everything you need, <em>nothing you don’t.</em>', intro: 'Practical comforts and relaxed shared spaces — so the only thing you need to think about is your plans for the day.', image: 'facHero' })}

<section class="section">
  <div class="container">
    ${sectionHead({ sw: 'Kwa ufupi', en: 'At a glance', title: 'Facilities & amenities', intro: showTbc(false) && site.facilities.some((f) => !f.confirmed) ? 'Items marked “To be confirmed” are being verified with the hostel. If a particular facility matters for your stay, please ask us before booking.' : 'If a particular facility matters for your stay, just ask — we’re happy to help.' })}
    <ul class="facility-grid facility-grid--page">${site.facilities.map(facilityItem).join('')}</ul>
  </div>
</section>

<section class="section section--sand">
  <div class="container feature-rows">
    <article class="feature-row">
      <div class="feature-row__media" data-reveal>${figure('lounge', { className: 'media--arch', sizes: '(min-width: 900px) 45vw, 90vw' })}</div>
      <div class="feature-row__text" data-reveal>
        <div class="feature-row__top">${tbc(byId('shared').confirmed)}</div>
        <h2 class="feature-row__title">Shared spaces to <em>slow down</em></h2>
        <p>A place to read, plan the next day, catch up on messages or simply rest after exploring. Shared areas are kept tidy and welcoming for every guest.</p>
      </div>
    </article>
    <article class="feature-row feature-row--reverse">
      <div class="feature-row__media" data-reveal>${figure('dining', { className: 'media--arch', sizes: '(min-width: 900px) 45vw, 90vw' })}</div>
      <div class="feature-row__text" data-reveal>
        <div class="feature-row__top">${tbc(byId('dining').confirmed)}</div>
        <h2 class="feature-row__title">A table for <em>chai and conversation</em></h2>
        <p>Start the day with breakfast, settle in for a home-style meal or simply enjoy a cup of spiced chai. Our dining area is a relaxed place to eat, talk and plan your next adventure on the coast.</p>
      </div>
    </article>
    <article class="feature-row">
      <div class="feature-row__media" data-reveal>${figure('entrance', { className: 'media--arch', sizes: '(min-width: 900px) 45vw, 90vw' })}</div>
      <div class="feature-row__text" data-reveal>
        <div class="feature-row__top">${tbc(byId('security').confirmed)}</div>
        <h2 class="feature-row__title">Rest easy, <em>feel at home</em></h2>
        <p>Your comfort and safety come first. The property is secured around the clock, with staff on hand day and night and secure on-site parking — so you can explore Mombasa and come back to a calm, safe place to rest.</p>
      </div>
    </article>
  </div>
</section>

<section class="section section--tight">
  <div class="container ask" data-reveal>
    <h2 class="ask__title">Need something specific for your stay?</h2>
    <p>Travelling with a group, arriving late or need help with transport? Ask us and we’ll let you know what we can arrange.</p>
    <div class="ask__actions">${waButton({ label: 'Ask on WhatsApp', message: 'Hello Swahili Spice Hostel, I have a question about your facilities: ' })}${callButton({ variant: 'outline' })}</div>
  </div>
</section>

${ctaBand()}`,
};
