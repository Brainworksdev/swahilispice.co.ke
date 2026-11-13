import site from '../data/site.js';
import { icon } from '../components/icons.js';
import { esc, pageHero, sectionHead, figure, placeholderBlock, ctaBand, waButton, callButton } from '../components/ui.js';

const values = [
  { sw: 'Ukarimu', en: 'Hospitality', icon: 'heart', text: 'Every guest is welcomed as we would welcome family — with warmth, patience and genuine care.' },
  { sw: 'Usafi', en: 'Cleanliness', icon: 'leaf', text: 'Fresh, tidy rooms and shared spaces are the foundation of a comfortable stay.' },
  { sw: 'Usalama', en: 'Peace of mind', icon: 'shield', text: 'A secure, respectful environment where guests can relax and rest easy.' },
  { sw: 'Thamani', en: 'Fair value', icon: 'sparkle', text: 'Quality accommodation at an honest, affordable price — no surprises.' },
];

function story() {
  if (site.story && site.story.length) {
    return site.story.map((p) => `<p>${esc(p)}</p>`).join('');
  }
  return placeholderBlock({
    iconName: 'sparkle',
    title: 'Our story',
    text: 'The history of Swahili Spice Hostel — when and how it began, the people behind it and what makes the place special — will be added here once provided by the hostel.',
  });
}

export default {
  id: 'about',
  file: 'about.html',
  title: 'About Us',
  description: 'Swahili Spice Hostel has welcomed guests in Mombasa since 2019 — warm Swahili hospitality and clean, comfortable, affordable rooms.',
  priority: '0.8',
  body: () => `
${pageHero({ sw: 'Kuhusu sisi', en: 'About us', title: 'Hospitality is <em>at the heart</em> of everything we do.', intro: 'Welcoming guests in Mombasa since 2019 — with the warmth of Swahili hospitality and the comfort of a well-kept, affordable stay.', image: 'oldTown' })}

<section class="section">
  <div class="container about-intro">
    <div>
      ${sectionHead({ sw: 'Falsafa yetu', en: 'Our philosophy', title: 'Simple comforts, <em>sincerely offered.</em>' })}
    </div>
    <div class="prose" data-reveal>
      <p class="lead">On the Swahili coast, hospitality is a way of life. A guest is greeted warmly, offered something to drink and made to feel at ease. That is the spirit we bring to Swahili Spice Hostel in Mombasa.</p>
      <p>We believe a good stay comes down to the essentials done well: a clean, comfortable room; a calm and secure place to come back to; and people who are glad to help. Whether you are travelling on a budget, visiting for work or exploring Mombasa and the Kenyan coast, we want you to leave rested — and looking forward to coming back.</p>
    </div>
  </div>
</section>

<section class="section section--sand">
  <div class="container">
    ${sectionHead({ sw: 'Misingi yetu', en: 'What we stand for', title: 'Four promises to every guest', align: 'center' })}
    <ul class="values">
      ${values.map((v, i) => `<li class="value" data-reveal style="--d:${i * 80}ms">
        <span class="value__icon">${icon(v.icon, { size: 26 })}</span>
        <p class="value__sw" lang="sw">${v.sw}</p>
        <h3 class="value__en">${v.en}</h3>
        <p>${v.text}</p>
      </li>`).join('')}
    </ul>
  </div>
</section>

<section class="section">
  <div class="container about-story">
    <div class="about-story__media" data-reveal>
      ${figure('passage', { sizes: '(min-width: 900px) 45vw, 90vw' })}
      ${site.foundingYear ? `<div class="about-story__since" aria-hidden="true"><span>Since</span><strong>${site.foundingYear}</strong><small>${esc(site.address ? site.address.locality : '')}</small></div>` : ''}
    </div>
    <div>
      ${sectionHead({ sw: 'Historia', en: 'Our story', title: site.foundingYear ? `Welcoming guests <em>since ${site.foundingYear}</em>` : 'The Swahili Spice story' })}
      <div class="prose" data-reveal>${story()}</div>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container commitment" data-reveal>
    <p class="commitment__quote">“Our commitment is simple: treat every guest with care, keep every space clean and safe, and make booking with us easy and honest.”</p>
    <p class="commitment__by">— The Swahili Spice team</p>
    <div class="commitment__actions">${waButton({ label: 'Talk to us on WhatsApp' })}${callButton({ variant: 'outline' })}</div>
  </div>
</section>

${ctaBand()}`,
};
