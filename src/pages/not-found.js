import { button, waButton } from '../components/ui.js';
import { logoMark } from '../components/ui.js';

export default {
  id: 'not-found',
  file: '404.html',
  title: 'Page not found',
  description: 'The page you were looking for could not be found. Return to the Swahili Spice Hostel homepage or contact us on 0794149805.',
  noindex: true,
  sitemap: false,
  body: () => `
<section class="page-hero page-hero--404">
  <div class="page-hero__pattern" aria-hidden="true"></div>
  <div class="container not-found">
    ${logoMark({ size: 72, className: 'not-found__mark' })}
    <p class="eyebrow"><span class="eyebrow__sw" lang="sw">Samahani</span><span class="eyebrow__en">Sorry</span></p>
    <h1 class="page-hero__title">We couldn’t find that page.</h1>
    <p class="page-hero__intro">It may have moved, or the link may be incorrect. Let’s get you back on track.</p>
    <div class="hero__actions">
      ${button({ href: 'index.html', label: 'Back to home', variant: 'primary' })}
      ${waButton({ label: 'WhatsApp us', variant: 'light' })}
    </div>
  </div>
</section>`,
};
