# Swahili Spice Hostel — swahilispice.co.ke

The website for Swahili Spice Hostel. It is a static site with no runtime dependencies, built by a small Node script with no npm packages.

## Quick start

```bash
npm run build     # builds the production site into dist/
npm run serve     # preview dist/ at http://localhost:4173
npm run dev       # build + preview
```

You need Node 18 or newer. There is nothing to `npm install`.

## Updating content

Almost every business detail lives in **`src/data/site.js`**: contact details, address, map, rooms, rates, facilities, testimonials, the About story and images. Edit that file, then run `npm run build`.

- **Unconfirmed content.** Items with `confirmed: false`, and fields set to `null`, appear on the site as clearly labelled "To be confirmed" placeholders. Each build prints a checklist of everything still waiting for confirmation.
- **Rooms.** Replace the placeholder categories with the real room types, occupancy, beds, rate (e.g. `'From KES 2,500 per night'`) and features, then set `confirmed: true`.
- **Facilities.** Set `confirmed: true` once a facility is verified, and remove any the hostel doesn't offer. Only confirmed facilities go into the structured data.
- **Address and map.** Fill in `address`, `mapEmbedUrl` (Google Maps → Share → Embed a map → copy the `src` value), `mapLinkUrl` and `geo`. The map, footer and structured data update automatically.
- **Testimonials.** Add genuine guest reviews only, with the guest's permission. Until then, the homepage invites guests to send feedback.
- **Placeholder labels.** When everything is confirmed, set `showPlaceholderLabels: false`.

### Photography

The site currently uses **illustrative stock photography** of Kenya's Swahili coast and East African hospitality. The photos come from Pexels and are licensed for commercial use. They're stored in `src/assets/images/` as responsive WebP files. They are **not** photos of the hostel. Every image is listed with its photographer and licence in [IMAGE-CREDITS.md](IMAGE-CREDITS.md) and on the `/credits.html` page.

- To change the stock selection, edit the `PHOTOS` list in `scripts/fetch-photos.js` and run `node scripts/fetch-photos.js`. It downloads optimised WebP files at two sizes and regenerates the credits register.
- To use a **genuine hostel photo**, export it as WebP at 640px and 1280px wide (e.g. `hostel-room-1-640.webp` and `hostel-room-1-1280.webp`, ideally under 250 KB each). Put both files in `src/assets/images/`, then change the matching entry in `site.images`:
  `room1: own('hostel-room-1', 1280, 960, 'Twin room with two single beds'),`

### Booking enquiry form

By default, the form validates the guest's details and then opens WhatsApp (`wa.me/254794149805`) with the enquiry already written. The guest presses *send* in WhatsApp. No backend is needed. Spam protection is a honeypot field plus a minimum time to fill in the form.

To also receive enquiries by email, create a form endpoint (for example [Formspree](https://formspree.io)) and set `formEndpoint` in `site.js`. The form then posts JSON to that endpoint and shows a loading state. If the post fails, it falls back to WhatsApp.

The site never tells a guest their reservation is confirmed. It always says the team will reply to confirm.

## Project structure

```
src/
  data/site.js          ← all business content
  components/           ← layout (head/header/footer), UI components, icons
  pages/                ← one module per page (legal.js = privacy, terms, photo credits)
  assets/css|js         ← styles and behaviour
  assets/images/        ← photography (WebP) + credits.json licence data
  assets/img/           ← logo, favicons, Open Graph image
  static/               ← copied to the site root (favicon.ico, .htaccess)
scripts/
  fetch-photos.js       ← downloads stock photos as WebP and writes IMAGE-CREDITS.md
  brand-assets.js       ← regenerates favicon, app icons, logo.png (needs Chrome/Edge)
  og-image.js           ← link-preview image for WhatsApp/Facebook/X (`npm run og`; re-run after changing rates)
build.js                ← renders pages, sitemap.xml, robots.txt, site.webmanifest
serve.js                ← local preview server (development only)
```

## SEO

Each page has its own title, meta description, canonical URL, Open Graph and Twitter tags. The build also produces `sitemap.xml` and `robots.txt`. The homepage and contact page include `Hostel` structured data (schema.org); the address, geo, price range and amenities fields are only added once they are filled in.

## Deployment

Upload the **contents of `dist/`** to the web root of swahilispice.co.ke. It works on any static host: cPanel/Apache (the included `.htaccess` sets up the 404 page, caching, compression and security headers), Netlify, Cloudflare Pages, Vercel and others. On non-Apache hosts, set `404.html` as the not-found page.

Brand mark: a Swahili pointed arch framing a spice star above the sea, drawn in `logoMark()` in `src/components/ui.js`.
