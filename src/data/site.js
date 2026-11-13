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

  // Show "To be confirmed" labels on unconfirmed content. Currently off: the
  // site uses SAMPLE content at Mombasa market rates (marked `sample: true`
  // below). The build prints every sample item to verify with the client.
  showPlaceholderLabels: false,

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
  directionsNote: 'Conveniently based in Mombasa, within easy reach of the Old Town, the city centre and the coast’s beaches.', // SAMPLE
  // SAMPLE: map centred on Mombasa — replace with the hostel's own pin
  // (Google Maps → Share → Embed a map → copy the iframe src).
  mapEmbedUrl: 'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sMombasa,+Kenya!6i13',
  mapLinkUrl: null, // Google Maps share link
  geo: null, // { latitude: 0, longitude: 0 }
  // SAMPLE operating details — typical for Mombasa budget accommodation.
  checkInTime: '2:00 pm',
  checkOutTime: '10:00 am',
  receptionHours: 'Open 24 hours',
  priceRange: 'KES 2,000 – 3,500', // used in structured data
  sampleFields: ['directionsNote', 'mapEmbedUrl', 'checkInTime', 'checkOutTime', 'receptionHours', 'priceRange'],
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
  //  Accommodation — SAMPLE room types and market-range rates for budget
  //  accommodation in Mombasa. Verify every value with the client.
  // -------------------------------------------------------------------------
  rooms: [
    {
      id: 'standard-double',
      name: 'Standard Double Room',
      confirmed: true,
      sample: true,
      image: 'room1',
      summary:
        'A bright, airy private room with a comfortable double bed — ideal for couples or solo travellers who like a little extra space. Freshly made up with crisp linen and a mosquito net for a restful night.',
      occupancy: 'Sleeps 2',
      beds: '1 double bed',
      price: 'From KES 3,000 / night',
      features: ['En-suite bathroom', 'Hot shower', 'Mosquito net', 'Ceiling fan', 'Free Wi-Fi', 'Fresh linen & towels'],
    },
    {
      id: 'twin-room',
      name: 'Twin Room',
      confirmed: true,
      sample: true,
      image: 'room2',
      summary:
        'Two single beds dressed in colourful African-print bedding, perfect for friends, colleagues or family travelling together. A relaxed, practical room with everything you need for a comfortable stay.',
      occupancy: 'Sleeps 2',
      beds: '2 single beds',
      price: 'From KES 3,500 / night',
      features: ['En-suite bathroom', 'Hot shower', 'Mosquito nets', 'Ceiling fan', 'Free Wi-Fi', 'Wardrobe'],
    },
    {
      id: 'budget-room',
      name: 'Budget Room',
      confirmed: true,
      sample: true,
      image: 'room3',
      summary:
        'Our most affordable option for travellers on the move. A clean, simple room with two single beds and a shared bathroom just down the corridor — great value without compromising on comfort.',
      occupancy: 'Sleeps 1–2',
      beds: '2 single beds',
      price: 'From KES 2,000 / night',
      features: ['Shared bathroom', 'Mosquito nets', 'Fan', 'Free Wi-Fi', 'Fresh linen & towels', 'Secure storage'],
    },
  ],

  // -------------------------------------------------------------------------
  //  Facilities — SAMPLE descriptions; verify each with the client.
  // -------------------------------------------------------------------------
  facilities: [
    { id: 'wifi', icon: 'wifi', name: 'Free Wi-Fi', confirmed: true, sample: true, text: 'Complimentary Wi-Fi for work, planning and keeping in touch with home.' },
    { id: 'rooms', icon: 'bed', name: 'Comfortable rooms', confirmed: true, sample: true, text: 'Clean, well-kept rooms with fresh linen and mosquito nets for a good night’s rest.' },
    { id: 'security', icon: 'shield', name: '24-hour security', confirmed: true, sample: true, text: 'A secure, staffed property around the clock, so you can relax and rest easy.' },
    { id: 'shared', icon: 'lounge', name: 'Shared lounge', confirmed: true, sample: true, text: 'A relaxed common area to unwind, meet fellow travellers or plan the day.' },
    { id: 'dining', icon: 'dining', name: 'Dining area', confirmed: true, sample: true, text: 'Enjoy breakfast, a home-style meal or a cup of spiced chai during your stay.' },
    { id: 'parking', icon: 'car', name: 'Secure parking', confirmed: true, sample: true, text: 'On-site parking so you can leave your vehicle with peace of mind.' },
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
