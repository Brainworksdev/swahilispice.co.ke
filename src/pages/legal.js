import { readFileSync } from 'node:fs';
import site from '../data/site.js';
import { esc, eyebrow, telHref, waHref } from '../components/ui.js';

const LAST_UPDATED = '13 November 2026';
const phone = `<a href="${telHref()}">${site.phone.display}</a>`;
const whatsapp = `<a href="${waHref()}" target="_blank" rel="noopener">WhatsApp ${site.phone.display}</a>`;
const location = site.address ? [site.address.locality, site.address.region, 'Kenya'].filter(Boolean).join(', ') : 'Kenya';

const slug = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** Shared legal page layout: slim hero, sticky contents list, readable article. */
function legalPage({ sw, en, title, intro, sections }) {
  return `
<section class="page-hero page-hero--slim">
  <div class="page-hero__pattern" aria-hidden="true"></div>
  <div class="container page-hero__inner">
    <div class="page-hero__text">
      ${eyebrow(sw, en)}
      <h1 class="page-hero__title">${title}</h1>
      <p class="page-hero__intro">${intro}</p>
    </div>
  </div>
</section>
<section class="section legal">
  <div class="container legal__grid">
    <nav class="legal__toc" aria-label="On this page">
      <p class="legal__toc-title">On this page</p>
      <ol>${sections.map((s) => `<li><a href="#${slug(s.h)}">${s.h}</a></li>`).join('')}</ol>
      <p class="legal__updated">Last updated: ${LAST_UPDATED}</p>
    </nav>
    <article class="legal__body">
      ${sections.map((s, i) => `<section id="${slug(s.h)}"><h2><span>${String(i + 1).padStart(2, '0')}</span>${s.h}</h2>${s.body}</section>`).join('')}
    </article>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ PRIVACY */

const privacySections = () => [
  {
    h: 'Who we are',
    body: `<p>This website, <strong>swahilispice.co.ke</strong>, is operated by ${esc(site.name)}, ${esc(location)} (“we”, “us”, “our”). We are the data controller for the personal data described in this policy.</p>
    <p>We respect your privacy and handle personal data in line with the <strong>Data Protection Act, 2019</strong> of Kenya. If you have any questions about this policy, contact us on ${phone} or ${whatsapp}.</p>`,
  },
  {
    h: 'Information we collect',
    body: `<p>We only collect the personal data we need to respond to you and look after your stay:</p>
    <ul>
      <li><strong>Booking enquiries:</strong> your name, phone number, check-in and check-out dates, number of guests, room preference and any message you choose to include.</li>
      <li><strong>Calls and WhatsApp messages:</strong> your phone number, name and whatever you share with us in the conversation.</li>
      <li><strong>When you stay with us:</strong> details needed to register and manage your stay, which may include identification details where the law requires them.</li>
      <li><strong>Technical data:</strong> when you visit the website, our hosting provider and font provider automatically receive standard technical information such as your IP address, browser type and the pages requested. We don’t use this to identify you.</li>
    </ul>
    <p>We do not knowingly collect information from children. A parent or guardian should make enquiries on a child’s behalf.</p>`,
  },
  {
    h: 'How our enquiry form works',
    body: site.formEndpoint
      ? `<p>When you submit the booking enquiry form, your details are sent securely to our form-handling provider, which forwards them to us so we can reply. The form doesn’t store your details in your browser.</p>`
      : `<p>Our booking enquiry form checks your details in your browser and then opens <strong>WhatsApp</strong> with your enquiry ready to send. <strong>Nothing is sent to us or stored on our website</strong> until you press send in WhatsApp yourself.</p>
         <p>Once you send it, your message is delivered through WhatsApp, a service provided by Meta Platforms. WhatsApp’s own <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener">privacy policy</a> applies to how it handles your messages.</p>`,
  },
  {
    h: 'How we use your information',
    body: `<p>We use your personal data to:</p>
    <ul>
      <li>reply to your enquiry and share availability and rates;</li>
      <li>confirm, manage and provide your reservation and stay;</li>
      <li>contact you about your booking, for example to share directions or arrival details;</li>
      <li>keep records we are required to keep by law, and protect the safety and security of our guests and premises;</li>
      <li>respond to feedback you choose to share with us.</li>
    </ul>
    <p>We rely on your <strong>consent</strong> when you contact us, on the need to take steps to <strong>perform a contract</strong> (your booking), on <strong>legal obligations</strong>, and on our <strong>legitimate interest</strong> in running a safe, well-managed hostel.</p>
    <p>We will <strong>not sell</strong> your personal data, and we will not send you marketing messages unless you have asked us to.</p>`,
  },
  {
    h: 'Cookies and analytics',
    body: `<p>This website <strong>does not use cookies</strong>, advertising trackers or analytics tools, and it doesn’t store personal data in your browser.</p>
    <p>To display our typefaces, your browser loads fonts from <strong>Google Fonts</strong>, and Google receives your IP address as part of that request. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google’s privacy policy</a>.${site.mapEmbedUrl ? ' Our location map is provided by Google Maps, which may set its own cookies when the map loads.' : ''}</p>`,
  },
  {
    h: 'Sharing your information',
    body: `<p>We only share personal data when we need to:</p>
    <ul>
      <li>with service providers that help us run the website and communicate with you, such as our web host${site.formEndpoint ? ', our form-handling provider' : ''} and WhatsApp;</li>
      <li>with authorities where the law requires us to;</li>
      <li>to protect the rights, safety or property of our guests, staff or business.</li>
    </ul>
    <p>Some of these providers may process data outside Kenya. Where they do, we rely on providers that apply appropriate safeguards to protect it.</p>`,
  },
  {
    h: 'How long we keep it',
    body: `<p>We keep enquiry and booking information only for as long as we need it to deal with your enquiry or stay, and afterwards for as long as the law or legitimate record-keeping requires. When we no longer need it, we delete it or make it anonymous.</p>`,
  },
  {
    h: 'Keeping it secure',
    body: `<p>We take reasonable technical and organisational steps to protect your personal data against loss, misuse and unauthorised access. Our website is served over a secure (HTTPS) connection. No method of transmission over the internet is completely secure, so please avoid sending sensitive information, such as payment card details, by message.</p>`,
  },
  {
    h: 'Your rights',
    body: `<p>Under the Data Protection Act, 2019, you have the right to:</p>
    <ul>
      <li>be told how your personal data is used;</li>
      <li>access the personal data we hold about you;</li>
      <li>ask us to correct inaccurate or misleading data;</li>
      <li>ask us to delete data that is no longer needed or was unlawfully processed;</li>
      <li>object to us processing your data;</li>
      <li>ask for your data in a portable format, where this applies.</li>
    </ul>
    <p>To use any of these rights, contact us on ${phone} or ${whatsapp}. We may need to confirm your identity before acting on a request.</p>
    <p>If you are not satisfied with our response, you can complain to the <strong>Office of the Data Protection Commissioner</strong> (<a href="https://www.odpc.go.ke" target="_blank" rel="noopener">odpc.go.ke</a>).</p>`,
  },
  {
    h: 'Changes to this policy',
    body: `<p>We may update this policy from time to time. The latest version will always be on this page, with the date it was last updated.</p>`,
  },
];

/* -------------------------------------------------------------------- TERMS */

const termsSections = () => [
  {
    h: 'About these terms',
    body: `<p>These terms apply to your use of <strong>swahilispice.co.ke</strong> and to booking enquiries made with ${esc(site.name)}, ${esc(location)}. By using this website or sending us an enquiry, you agree to these terms. If you do not agree, please do not use the website.</p>`,
  },
  {
    h: 'Enquiries are not reservations',
    body: `<p>Sending a booking enquiry through our form, WhatsApp, phone or any other channel <strong>does not confirm a reservation</strong>. A reservation is confirmed only when our team has replied to confirm availability, the rate and the details of your stay, and any conditions we tell you about at that point (such as a deposit) have been met.</p>
    <p>We will do our best to reply promptly, but we can’t guarantee availability until we have confirmed it with you.</p>`,
  },
  {
    h: 'Rates, payment and cancellations',
    body: `<p>Rates depend on the dates, room type and number of guests, and may change. The rate that applies to your stay is the one we confirm when we confirm your reservation.</p>
    <p>Payment methods, any deposit, and the cancellation, amendment and refund conditions for your booking will be <strong>explained to you before your reservation is confirmed</strong>. Please make sure you understand them before you agree to the booking.</p>`,
  },
  {
    h: 'Your stay',
    body: `<p>Guests are asked to:</p>
    <ul>
      <li>provide accurate details when booking and checking in, including identification where required by law;</li>
      <li>follow the house rules shared with you at booking or on arrival;</li>
      <li>treat staff, other guests and the property with respect;</li>
      <li>take reasonable care of their own belongings.</li>
    </ul>
    <p>We may decline or end a stay where a guest’s behaviour puts the safety, security or comfort of others at risk, or where the law requires it.</p>`,
  },
  {
    h: 'Website information and images',
    body: `<p>We work to keep the information on this website accurate and up to date, but details such as facilities, room types and availability may change. If a particular detail matters to you, please confirm it with us before booking.</p>
    <p><strong>Photographs on this website are illustrative</strong> and show the wider Swahili coast and East African hospitality. They are not photographs of Swahili Spice Hostel’s actual rooms, facilities or premises unless we clearly say so. See our <a href="credits.html">photo credits</a>.</p>`,
  },
  {
    h: 'Intellectual property',
    body: `<p>The Swahili Spice Hostel name, logo, written content and website design belong to us. You may view and share pages for personal, non-commercial use, but you may not copy or reuse our content or branding without our permission. Third-party photographs are used under their own licences (see <a href="credits.html">photo credits</a>).</p>`,
  },
  {
    h: 'Third-party services and links',
    body: `<p>This website links to services we don’t control, such as WhatsApp and Google. Your use of those services is governed by their own terms and privacy policies, and we are not responsible for their content or availability.</p>`,
  },
  {
    h: 'Liability',
    body: `<p>We provide this website “as is”. To the extent permitted by law, we are not liable for any loss arising from your use of the website or from relying on its content, or for temporary unavailability of the website. Nothing in these terms limits any rights you have under Kenyan consumer protection law, or any liability that cannot legally be excluded.</p>`,
  },
  {
    h: 'Governing law',
    body: `<p>These terms are governed by the <strong>laws of Kenya</strong>, and any dispute will be subject to the jurisdiction of the Kenyan courts. We always prefer to resolve any concern directly first, so please talk to us.</p>`,
  },
  {
    h: 'Changes and contact',
    body: `<p>We may update these terms from time to time. The version on this page applies from the “last updated” date shown. For any questions, contact us on ${phone} or ${whatsapp}.</p>`,
  },
];

/* ------------------------------------------------------------------ CREDITS */

function creditsSections() {
  const credits = JSON.parse(readFileSync(new URL('../assets/images/credits.json', import.meta.url), 'utf8'));
  const rows = Object.values(credits).map((c) => `<li class="credit">
      <img src="${c.files[Math.min(...Object.keys(c.files).map(Number))].file}" alt="" width="160" height="${Math.round((160 * c.height) / c.width)}" loading="lazy" decoding="async">
      <div><p class="credit__alt">${esc(c.alt)}</p>
      <p class="credit__by">Photo by <a href="${esc(c.photographerUrl)}" target="_blank" rel="noopener">${esc(c.photographer)}</a> on <a href="${esc(c.pageUrl)}" target="_blank" rel="noopener">Pexels</a></p></div>
    </li>`).join('');
  return [
    {
      h: 'About our photographs',
      body: `<p>The photographs on this website are <strong>illustrative images</strong> of Kenya’s Swahili coast and East African hospitality. They are <strong>not photographs of Swahili Spice Hostel’s actual rooms, facilities or premises</strong>. We will replace them with photographs of the hostel in due course.</p>
      <p>All images are used under the <a href="https://www.pexels.com/license/" target="_blank" rel="noopener">Pexels License</a>, which allows free commercial use. We credit each photographer below with thanks.</p>`,
    },
    { h: 'Photo credits', body: `<ul class="credits">${rows}</ul>` },
  ];
}

const base = { priority: '0.3' };

export const privacy = {
  ...base,
  id: 'privacy',
  file: 'privacy.html',
  title: 'Privacy Policy',
  description: 'How Swahili Spice Hostel collects, uses and protects your personal data, in line with Kenya’s Data Protection Act, 2019.',
  body: () => legalPage({ sw: 'Faragha', en: 'Privacy', title: 'Privacy Policy', intro: 'How we collect, use and protect your personal information when you visit our website or enquire about a stay.', sections: privacySections() }),
};

export const terms = {
  ...base,
  id: 'terms',
  file: 'terms.html',
  title: 'Terms & Conditions',
  description: 'Terms for using the Swahili Spice Hostel website and making booking enquiries. Enquiries are confirmed only once our team replies.',
  body: () => legalPage({ sw: 'Masharti', en: 'Terms', title: 'Terms &amp; Conditions', intro: 'The terms that apply when you use our website or send us a booking enquiry.', sections: termsSections() }),
};

export const credits = {
  ...base,
  id: 'credits',
  file: 'credits.html',
  title: 'Photo Credits',
  description: 'Photo credits and licences for the illustrative photography used on the Swahili Spice Hostel website.',
  body: () => legalPage({ sw: 'Picha', en: 'Photo credits', title: 'Photo credits', intro: 'The photographers behind the images on this website.', sections: creditsSections() }),
};
