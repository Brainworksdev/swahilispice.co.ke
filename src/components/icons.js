// Inline SVG icon set — 24px grid, 1.5px stroke, inherits currentColor.
const paths = {
  wifi: '<path d="M2.5 9a14 14 0 0 1 19 0"/><path d="M5.5 12.5a9.5 9.5 0 0 1 13 0"/><path d="M8.6 15.9a5 5 0 0 1 6.8 0"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/>',
  bed: '<path d="M3 18.5V6"/><path d="M3 14h18v4.5"/><path d="M21 14v-2.5A2.5 2.5 0 0 0 18.5 9H11v5"/><circle cx="7" cy="11" r="1.8"/>',
  shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.3 7.5 9.5 4.4-1.2 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  lounge: '<path d="M5 11V8.5A2.5 2.5 0 0 1 7.5 6h9A2.5 2.5 0 0 1 19 8.5V11"/><path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3z"/><path d="M5 18v2M19 18v2"/>',
  dining: '<path d="M7 3v8"/><path d="M4.5 3v5a2.5 2.5 0 0 0 5 0V3"/><path d="M7 11v10"/><path d="M17 21V3c-2.2 1.2-3.5 3.6-3.5 6.5V14H17"/>',
  car: '<path d="M5 16.5V12l2-5h10l2 5v4.5"/><path d="M3.5 12h17"/><rect x="3.5" y="12" width="17" height="5" rx="1"/><path d="M6 17v2M18 17v2"/><circle cx="7.5" cy="14.5" r=".6" fill="currentColor"/><circle cx="16.5" cy="14.5" r=".6" fill="currentColor"/>',
  phone: '<path d="M8.2 3.5H5.5a2 2 0 0 0-2 2.2C4.3 13.8 10.2 19.7 18.3 20.5a2 2 0 0 0 2.2-2v-2.7a1 1 0 0 0-.7-1l-3.1-1a1 1 0 0 0-1.1.3l-1.3 1.6a12 12 0 0 1-5.3-5.3l1.6-1.3a1 1 0 0 0 .3-1.1l-1-3.1a1 1 0 0 0-1-.7z"/>',
  whatsapp: '<path d="M4.2 19.8 5.3 16A8.5 8.5 0 1 1 8.4 19z"/><path d="M9.2 8.2c.3-.5.8-.5 1-.1l.8 1.7c.1.3 0 .6-.2.8l-.5.5a6 6 0 0 0 2.6 2.6l.5-.5c.2-.2.5-.3.8-.2l1.7.8c.4.2.4.7-.1 1-1 .8-2.3.8-3.6.1a8.4 8.4 0 0 1-3.2-3.2c-.6-1.3-.6-2.6.2-3.5z" fill="currentColor" stroke="none"/>',
  pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="1.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
  users: '<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><path d="M15.5 5.7a3 3 0 0 1 0 5.6M17 14.3a5.5 5.5 0 0 1 3.5 5.2"/>',
  arrow: '<path d="M4 12h15"/><path d="m13.5 6.5 5.5 5.5-5.5 5.5"/>',
  chevronLeft: '<path d="m14.5 5.5-6.5 6.5 6.5 6.5"/>',
  chevronRight: '<path d="m9.5 5.5 6.5 6.5-6.5 6.5"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  menu: '<path d="M4 7.5h16M4 12h16M4 16.5h10"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  sparkle: '<path d="M12 3.5 13.7 10.3 20.5 12l-6.8 1.7L12 20.5l-1.7-6.8L3.5 12l6.8-1.7z"/>',
  expand: '<path d="M14.5 4H20v5.5M9.5 20H4v-5.5M20 4l-6.5 6.5M4 20l6.5-6.5"/>',
  heart: '<path d="M12 20s-7.5-4.5-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.5-7.5 10-7.5 10z"/>',
  leaf: '<path d="M5 19c0-8 5-13.5 14-14 .3 9-5.2 14-13 14z"/><path d="M5 19 13 11"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="1.5"/><path d="m4 6.5 8 6 8-6"/>',
};

export function icon(name, { size = 24, className = '', label = '' } = {}) {
  const p = paths[name];
  if (!p) throw new Error(`Unknown icon: ${name}`);
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"';
  return `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ${a11y}>${p}</svg>`;
}
