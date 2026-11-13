import site from '../data/site.js';
import { icon } from '../components/icons.js';
import { esc, pageHero, ctaBand } from '../components/ui.js';

function grid() {
  const cats = ['All', ...new Set(site.gallery.map((g) => g.category))];
  const anyPlaceholder = site.showPlaceholderLabels && site.gallery.some((g) => site.images[g.image].placeholder);
  return `<section class="section gallery">
    <div class="container">
      <div class="gallery__bar">
        <div class="filters" role="group" aria-label="Filter photos">
          ${cats.map((c, i) => `<button type="button" class="filter" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join('')}
        </div>
        ${anyPlaceholder ? '<p class="gallery__note">Illustrations shown are placeholders until hostel photography is added.</p>' : ''}
      </div>
      <ul class="gallery-grid" data-gallery>
        ${site.gallery.map((g, i) => {
          const img = site.images[g.image];
          const orient = img.height > img.width ? 'tall' : 'wide';
          return `<li class="gallery-grid__item gallery-grid__item--${orient}" data-category="${esc(g.category)}" data-reveal style="--d:${(i % 3) * 60}ms">
            <button type="button" class="gallery-grid__btn" data-lightbox-src="${img.src}" data-lightbox-caption="${esc(g.caption)}" data-lightbox-alt="${esc(img.alt)}" data-lightbox-w="${img.width}" data-lightbox-h="${img.height}">
              <img src="${img.src}" width="${img.width}" height="${img.height}" alt="${esc(img.alt)}" loading="${i < 3 ? 'eager' : 'lazy'}" decoding="async">
              <span class="gallery-grid__cap"><span>${esc(g.caption)}</span>${icon('expand', { size: 18 })}</span>
              <span class="visually-hidden">Open larger image</span>
            </button>
          </li>`;
        }).join('')}
      </ul>
    </div>
  </section>
  <div class="lightbox" data-lightbox hidden role="dialog" aria-modal="true" aria-label="Image viewer">
    <button class="lightbox__close" type="button" data-lightbox-close><span class="visually-hidden">Close</span>${icon('close', { size: 28 })}</button>
    <button class="lightbox__nav lightbox__nav--prev" type="button" data-lightbox-prev><span class="visually-hidden">Previous image</span>${icon('chevronLeft', { size: 32 })}</button>
    <figure class="lightbox__figure">
      <img class="lightbox__img" alt="" data-lightbox-img>
      <figcaption class="lightbox__caption"><span data-lightbox-text></span><span class="lightbox__count" data-lightbox-count></span></figcaption>
    </figure>
    <button class="lightbox__nav lightbox__nav--next" type="button" data-lightbox-next><span class="visually-hidden">Next image</span>${icon('chevronRight', { size: 32 })}</button>
  </div>`;
}

export default {
  id: 'gallery',
  file: 'gallery.html',
  title: 'Gallery',
  description: 'Take a look around Swahili Spice Hostel — rooms, shared spaces and surroundings. Book your stay on 0794149805.',
  priority: '0.7',
  body: () => `
${pageHero({ sw: 'Picha', en: 'Gallery', title: 'Take a look <em>around.</em>', intro: 'A glimpse of the rooms, shared spaces and coastal character that make up Swahili Spice.' })}
${grid()}
${ctaBand({ title: 'Like what you see?' })}`,
};
