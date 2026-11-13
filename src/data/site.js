/**
 * ---------------------------------------------------------------------------
 *  SWAHILI SPICE HOSTEL — SITE CONTENT
 * ---------------------------------------------------------------------------
 *  This is the single place to update business details, rooms, facilities,
 *  photos and reviews. After editing, run `npm run build`.
 *
 *  Accuracy rules:
 *   - Anything with `confirmed: false` is shown with a "To be confirmed"
 *     label on the website. Set it to `true` only once the business has
 *     verified the detail.
 *   - Values set to `null` are treated as "not yet provided" and the site
 *     falls back to a clearly labelled placeholder or hides the element.
 *   - Only add genuine guest testimonials (with the guest's permission).
 *
 *  The build prints a checklist of every unconfirmed item.
 * ---------------------------------------------------------------------------
 */
import { readFileSync } from 'node:fs';

const credits = JSON.parse(readFileSync(new URL('../assets/images/credits.json', import.meta.url), 'utf8'));

const site = {
  name: 'Swahili Spice Hostel',
  shortName: 'Swahili Spice',
  url: 'https://swahilispice.co.ke',
  locale: 'en_KE',
  language: 'en',

  // Show "To be confirmed" labels on unverified content. Keep `true` until
  // every item in the build checklist has been confirmed.
  showPlaceholderLabels: true,

  // Primary contact — must remain 0794149805 across the site.
  phone: {
    display: '0794149805',
    tel: '+254794149805',
    whatsapp: '254794149805',
  },

  whatsappMessage:
    "Hello Swahili Spice Hostel, I'd like to enquire about accommodation. Could you please share your availability and rates? Thank you.",

  // Not yet provided by the business — leave null until confirmed.
  email: null,
  // Confirmed: Mombasa. Add the street / building name when available.
  address: { street: null, locality: 'Mombasa', region: null, postalCode: null, country: 'KE' },
  foundingYear: 2019, // confirmed
  directionsNote: null, // e.g. 'Five minutes' walk from …'
  mapEmbedUrl: null, // Google Maps "Embed a map" iframe src
  mapLinkUrl: null, // Google Maps share link
  geo: null, // { latitude: 0, longitude: 0 }
  checkInTime: null, // e.g. '14:00'
  checkOutTime: null, // e.g. '10:00'
  receptionHours: null, // e.g. 'Open 24 hours'
  priceRange: null, // e.g. 'KES 1,500 – 4,500' (used in structured data)
  social: [], // e.g. [{ name: 'Instagram', url: 'https://instagram.com/…' }]

  // Optional form endpoint (e.g. Formspree). When null, enquiries are sent
  // through WhatsApp with the details pre-filled.
  formEndpoint: null,

  // -------------------------------------------------------------------------
  //  Images
  //  Currently ILLUSTRATIVE stock photography (Pexels, see IMAGE-CREDITS.md),
  //  They do not show the hostel.
  //
  //  To use a genuine hostel photo instead, save WebP files to
  //  src/assets/images/ (e.g. hostel-room-1-640.webp and -1280.webp) and set:
  //    room1: own('hostel-room-1', 1280, 960, 'Describe the photo'),
  // -------------------------------------------------------------------------
  images: {
    hero: stock('mombasa-dhow-sunrise'),
    welcome: stock('swahili-carved-door'),
    room1: stock('bedroom-mosquito-net'),
    room2: stock('twin-bedroom-african-print'),
    room3: stock('twin-bedroom-mosquito-nets'),
    accHero: stock('bedroom-african-decor'),
    lounge: stock('swahili-dining-room'),
    facHero: stock('arched-lounge'),
    dining: stock('chai-tea'),
    dish: stock('kenyan-dish'),
    entrance: stock('swahili-inlaid-entrance'),
    oldTown: stock('mombasa-old-town'),
    lamu: stock('lamu-alleyway'),
    passage: stock('stone-town-passage'),
    coast: stock('watamu-beach'),
    kwale: stock('kwale-beachfront'),
  },

  // -------------------------------------------------------------------------
  //  Accommodation — categories, occupancy and rates are NOT yet confirmed.
  //  Replace names/descriptions with the hostel's actual room types.
  // -------------------------------------------------------------------------
  rooms: [
    {
      id: 'room-category-one',
      name: 'Room Category One',
      confirmed: false,
      image: 'room1',
      summary:
        'Placeholder description — replace with this room’s actual layout, bed configuration and outlook once confirmed by the hostel.',
      occupancy: null, // e.g. 'Sleeps 2'
      beds: null, // e.g. '1 double bed'
      price: null, // e.g. 'From KES 2,500 per night'
      features: [], // e.g. ['Private bathroom', 'Fan', 'Mosquito net']
    },
    {
      id: 'room-category-two',
      name: 'Room Category Two',
      confirmed: false,
      image: 'room2',
      summary:
        'Placeholder description — replace with this room’s actual layout, bed configuration and outlook once confirmed by the hostel.',
      occupancy: null,
      beds: null,
      price: null,
      features: [],
    },
    {
      id: 'room-category-three',
      name: 'Room Category Three',
      confirmed: false,
      image: 'room3',
      summary:
        'Placeholder description — replace with this room’s actual layout, bed configuration and outlook once confirmed by the hostel.',
      occupancy: null,
      beds: null,
      price: null,
      features: [],
    },
  ],

  // -------------------------------------------------------------------------
  //  Facilities — listed from the website brief, awaiting confirmation.
  // -------------------------------------------------------------------------
  facilities: [
    { id: 'wifi', icon: 'wifi', name: 'Wi-Fi', confirmed: false, text: 'Stay connected for work, planning and keeping in touch.' },
    { id: 'rooms', icon: 'bed', name: 'Comfortable accommodation', confirmed: false, text: 'Clean, well-kept rooms prepared for a good night’s rest.' },
    { id: 'security', icon: 'shield', name: 'Secure environment', confirmed: false, text: 'A safe, attentive setting so you can relax and rest easy.' },
    { id: 'shared', icon: 'lounge', name: 'Shared spaces', confirmed: false, text: 'Somewhere to unwind, meet fellow travellers or plan the day.' },
    { id: 'dining', icon: 'dining', name: 'Dining facilities', confirmed: false, text: 'A place to enjoy a meal or a cup of chai during your stay.' },
    { id: 'parking', icon: 'car', name: 'Parking', confirmed: false, text: 'Space to leave your vehicle while you stay.' },
  ],

  // -------------------------------------------------------------------------
  //  Testimonials — add GENUINE reviews only, with the guest's permission.
  //  e.g. { quote: '…', name: 'First name, City', date: '2026-10' }
  // -------------------------------------------------------------------------
  testimonials: [],

  // About page story — based on confirmed facts: Mombasa, opened 2019.
  story: [
    'Swahili Spice Hostel opened its doors in Mombasa in 2019 with a simple idea: that every traveller deserves a clean, comfortable and affordable place to stay — and a welcome that feels genuine.',
    'Our name brings together two things we care about. “Swahili” speaks to the tradition of ukarimu — the generous, unhurried hospitality the Swahili coast is known for. “Spice” is the warmth and character we add to every stay, so it feels like more than just a room for the night.',
    'Mombasa has welcomed travellers for centuries — traders, sailors and visitors drawn by its harbour, its Old Town and the Indian Ocean. We are proud to carry that tradition forward. Our guests include people passing through, visiting family, working in the city or exploring the coast, and since 2019 our aim has stayed the same for all of them: rest well, feel safe and be looked after.',
    'We are proud to be part of the Mombasa community, and we look forward to welcoming you.',
  ],

  // -------------------------------------------------------------------------
  //  Gallery — `category` drives the filter buttons. Photos are illustrative.
  // -------------------------------------------------------------------------
  gallery: [
    { image: 'hero', category: 'Swahili coast', caption: 'Dhow at sunrise, Mombasa' },
    { image: 'room1', category: 'Rooms', caption: 'Guest room style' },
    { image: 'lounge', category: 'Shared spaces', caption: 'Dining & shared space' },
    { image: 'welcome', category: 'Swahili coast', caption: 'Carved Swahili door' },
    { image: 'room2', category: 'Rooms', caption: 'Twin room style' },
    { image: 'oldTown', category: 'Swahili coast', caption: 'Old Town, Mombasa' },
    { image: 'dining', category: 'Food & drink', caption: 'Spiced chai' },
    { image: 'room3', category: 'Rooms', caption: 'Twin room with nets' },
    { image: 'lamu', category: 'Swahili coast', caption: 'Lamu alleyway' },
    { image: 'dish', category: 'Food & drink', caption: 'Kenyan cuisine' },
    { image: 'facHero', category: 'Shared spaces', caption: 'Lounge style' },
    { image: 'coast', category: 'Swahili coast', caption: 'Watamu beach' },
  ],
};

/* ---- image helpers (photo metadata comes from scripts/fetch-photos.js) ---- */
function stock(name) {
  const c = credits[name];
  if (!c) throw new Error(`Photo "${name}" missing from src/assets/images/credits.json — run node scripts/fetch-photos.js`);
  const sizes = Object.keys(c.files).map(Number).sort((a, b) => a - b);
  const large = c.files[sizes[sizes.length - 1]];
  return {
    src: large.file,
    srcset: sizes.map((w) => `${c.files[w].file} ${w}w`).join(', '),
    width: sizes[sizes.length - 1],
    height: large.height,
    alt: c.alt,
    illustrative: true, // stock photo — not the actual hostel
    credit: { photographer: c.photographer, url: c.pageUrl },
  };
}

// For genuine hostel photos saved as <name>-640.webp and <name>-1280.webp.
// eslint-disable-next-line no-unused-vars
function own(name, width, height, alt) {
  return {
    src: `assets/images/${name}-1280.webp`,
    srcset: `assets/images/${name}-640.webp 640w, assets/images/${name}-1280.webp 1280w`,
    width, height, alt, illustrative: false,
  };
}

export default site;
