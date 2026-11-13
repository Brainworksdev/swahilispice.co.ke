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
  address: null, // e.g. { street: '', locality: '', region: '', postalCode: '', country: 'KE' }
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
  //  Placeholder illustrations are used until real photography is supplied.
  //  To use a photo: put it in src/assets/img/photos/, then set
  //  { src: 'assets/img/photos/room-1.jpg', width, height, placeholder: false }.
  //  Recommended: JPEG/WebP, 2000px on the long edge, under 350 KB.
  // -------------------------------------------------------------------------
  images: {
    hero: { src: 'assets/img/art/hero.svg', width: 1600, height: 1000, alt: 'Illustration of a Swahili arch opening onto the ocean at dusk', placeholder: true },
    welcome: { src: 'assets/img/art/courtyard.svg', width: 1000, height: 1250, alt: 'Illustration of a calm courtyard with a carved doorway', placeholder: true },
    room1: { src: 'assets/img/art/room-1.svg', width: 1200, height: 900, alt: 'Illustration of a bright guest room', placeholder: true },
    room2: { src: 'assets/img/art/room-2.svg', width: 1200, height: 900, alt: 'Illustration of a guest room with arched window', placeholder: true },
    room3: { src: 'assets/img/art/room-3.svg', width: 1200, height: 900, alt: 'Illustration of a guest room with bunk beds', placeholder: true },
    lounge: { src: 'assets/img/art/lounge.svg', width: 1200, height: 900, alt: 'Illustration of a shared lounge', placeholder: true },
    dining: { src: 'assets/img/art/dining.svg', width: 1200, height: 900, alt: 'Illustration of a dining table set with tea', placeholder: true },
    coast: { src: 'assets/img/art/coast.svg', width: 1200, height: 900, alt: 'Illustration of a dhow sailing on the coast', placeholder: true },
    door: { src: 'assets/img/art/door.svg', width: 900, height: 1200, alt: 'Illustration of a carved Swahili door', placeholder: true },
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

  // About page story — awaiting details from the business.
  story: null, // e.g. ['Paragraph one…', 'Paragraph two…']

  // -------------------------------------------------------------------------
  //  Gallery — `category` drives the filter buttons.
  // -------------------------------------------------------------------------
  gallery: [
    { image: 'hero', category: 'Surroundings', caption: 'Evening on the coast' },
    { image: 'room1', category: 'Rooms', caption: 'Guest room' },
    { image: 'lounge', category: 'Shared spaces', caption: 'Shared lounge' },
    { image: 'door', category: 'Surroundings', caption: 'Carved doorway' },
    { image: 'room2', category: 'Rooms', caption: 'Guest room' },
    { image: 'dining', category: 'Shared spaces', caption: 'Dining area' },
    { image: 'welcome', category: 'Shared spaces', caption: 'Courtyard' },
    { image: 'room3', category: 'Rooms', caption: 'Guest room' },
    { image: 'coast', category: 'Surroundings', caption: 'Dhow at sea' },
  ],
};

export default site;
