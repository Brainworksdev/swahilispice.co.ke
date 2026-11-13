/* Swahili Spice Hostel — site behaviour (no dependencies) */
(function () {
  'use strict';

  var doc = document.documentElement;
  doc.classList.add('js');

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* ---------------- Header ---------------- */
  function initHeader() {
    var header = document.querySelector('[data-header]');
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
      ticking = false;
    }
    update();
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  /* ---------------- Mobile menu ---------------- */
  function initMenu() {
    var toggle = document.querySelector('[data-menu-toggle]');
    var menu = document.querySelector('[data-mobile-menu]');
    if (!toggle || !menu) return;
    var closeBtn = menu.querySelector('[data-menu-close]');
    var lastFocus = null;

    function focusables() {
      return Array.prototype.slice.call(menu.querySelectorAll('a[href], button:not([disabled])'));
    }
    function open() {
      lastFocus = document.activeElement;
      menu.hidden = false;
      // allow the browser to paint before transitioning
      window.requestAnimationFrame(function () { menu.classList.add('is-open'); });
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      closeBtn && closeBtn.focus();
      document.addEventListener('keydown', onKey);
    }
    function close() {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      document.removeEventListener('keydown', onKey);
      window.setTimeout(function () { menu.hidden = true; }, reduceMotion ? 0 : 300);
      if (lastFocus) lastFocus.focus();
    }
    function onKey(e) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Tab') {
        var f = focusables();
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    toggle.addEventListener('click', open);
    closeBtn && closeBtn.addEventListener('click', close);
    menu.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (link && link.getAttribute('href').charAt(0) !== '#') close();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 960 && !menu.hidden) close();
    });
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Gallery: filter + lightbox ---------------- */
  function initGallery() {
    var grid = document.querySelector('[data-gallery]');
    if (!grid) return;
    var items = Array.prototype.slice.call(grid.querySelectorAll('.gallery-grid__item'));
    var filters = document.querySelectorAll('[data-filter]');

    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filter');
        filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        items.forEach(function (item) {
          var show = cat === 'All' || item.getAttribute('data-category') === cat;
          item.classList.toggle('is-hidden', !show);
          if (show) item.classList.add('is-visible');
        });
      });
    });

    var box = document.querySelector('[data-lightbox]');
    if (!box) return;
    var img = box.querySelector('[data-lightbox-img]');
    var text = box.querySelector('[data-lightbox-text]');
    var count = box.querySelector('[data-lightbox-count]');
    var current = 0, visible = [], opener = null, touchX = null;

    function visibleButtons() {
      return items.filter(function (i) { return !i.classList.contains('is-hidden'); })
        .map(function (i) { return i.querySelector('[data-lightbox-src]'); });
    }
    function show(index) {
      current = (index + visible.length) % visible.length;
      var btn = visible[current];
      img.classList.add('is-loading');
      img.onload = function () { img.classList.remove('is-loading'); };
      img.src = btn.getAttribute('data-lightbox-src');
      img.alt = btn.getAttribute('data-lightbox-alt');
      img.width = Number(btn.getAttribute('data-lightbox-w'));
      img.height = Number(btn.getAttribute('data-lightbox-h'));
      text.textContent = btn.getAttribute('data-lightbox-caption');
      count.textContent = (current + 1) + ' / ' + visible.length;
    }
    function open(btn) {
      opener = btn;
      visible = visibleButtons();
      box.hidden = false;
      document.body.classList.add('lightbox-open');
      show(visible.indexOf(btn));
      window.requestAnimationFrame(function () { box.classList.add('is-open'); });
      box.querySelector('[data-lightbox-close]').focus();
      document.addEventListener('keydown', onKey);
    }
    function close() {
      box.classList.remove('is-open');
      document.body.classList.remove('lightbox-open');
      document.removeEventListener('keydown', onKey);
      window.setTimeout(function () { box.hidden = true; }, reduceMotion ? 0 : 250);
      if (opener) opener.focus();
    }
    function onKey(e) {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') show(current + 1);
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'Tab') {
        var f = Array.prototype.slice.call(box.querySelectorAll('button'));
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    grid.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-lightbox-src]');
      if (btn) open(btn);
    });
    box.querySelector('[data-lightbox-close]').addEventListener('click', close);
    box.querySelector('[data-lightbox-prev]').addEventListener('click', function () { show(current - 1); });
    box.querySelector('[data-lightbox-next]').addEventListener('click', function () { show(current + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    box.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      touchX = null;
    }, { passive: true });
  }

  /* ---------------- Booking enquiry form ---------------- */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function isoDate(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parseDate(v) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || '');
    return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
  }
  function prettyDate(v) {
    var d = parseDate(v);
    if (!d) return v;
    try { return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }); }
    catch (e) { return v; }
  }

  function initForm() {
    var form = document.querySelector('[data-enquiry-form]');
    if (!form) return;

    var startedAt = Date.now();
    var endpoint = form.getAttribute('data-endpoint');
    var waNumber = form.getAttribute('data-wa');
    var status = form.querySelector('[data-form-status]');
    var success = form.querySelector('[data-form-success]');
    var successWa = form.querySelector('[data-success-wa]');
    var successText = form.querySelector('[data-success-text]');
    var f = {
      name: form.querySelector('#name'),
      phone: form.querySelector('#phone'),
      checkin: form.querySelector('#checkin'),
      checkout: form.querySelector('#checkout'),
      guests: form.querySelector('#guests'),
      room: form.querySelector('#room'),
      message: form.querySelector('#message'),
      website: form.querySelector('#website'),
    };

    var today = new Date(); today.setHours(0, 0, 0, 0);
    f.checkin.min = isoDate(today);
    var tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
    f.checkout.min = isoDate(tomorrow);

    // Preselect room from ?room= (links on the accommodation page)
    var roomParam = new URLSearchParams(window.location.search).get('room');
    if (roomParam && f.room) {
      Array.prototype.forEach.call(f.room.options, function (o) {
        if (o.getAttribute('data-room-id') === roomParam) f.room.value = o.value;
      });
    }

    f.checkin.addEventListener('change', function () {
      var ci = parseDate(f.checkin.value);
      if (ci) {
        var next = new Date(ci); next.setDate(ci.getDate() + 1);
        f.checkout.min = isoDate(next);
        var co = parseDate(f.checkout.value);
        if (co && co <= ci) f.checkout.value = '';
      }
    });

    var validators = {
      name: function (v) {
        v = v.trim();
        if (!v) return 'Please enter your name.';
        if (v.length < 2) return 'Please enter your full name.';
        if (!/^[\p{L}][\p{L}\s.'’-]*$/u.test(v)) return 'Please use letters only.';
        return '';
      },
      phone: function (v) {
        var p = v.replace(/[\s()-]/g, '');
        if (!p) return 'Please enter a phone number so we can reply.';
        if (!/^(?:(?:\+?254|0)[17]\d{8}|\+\d{8,15})$/.test(p)) return 'Please enter a valid phone number, e.g. 0712 345 678 or +44 7700 900123.';
        return '';
      },
      checkin: function (v) {
        var d = parseDate(v);
        if (!d) return 'Please choose your check-in date.';
        if (d < today) return 'Check-in can’t be in the past.';
        return '';
      },
      checkout: function (v) {
        var d = parseDate(v);
        if (!d) return 'Please choose your check-out date.';
        var ci = parseDate(f.checkin.value);
        if (ci && d <= ci) return 'Check-out must be after check-in.';
        return '';
      },
      guests: function (v) {
        var n = Number(v);
        if (!v) return 'Please enter the number of guests.';
        if (!Number.isInteger(n) || n < 1) return 'Please enter at least 1 guest.';
        if (n > 30) return 'For groups larger than 30, please call us directly.';
        return '';
      },
      message: function (v) { return v.length > 1000 ? 'Please keep your message under 1,000 characters.' : ''; },
    };

    function setError(key, msg) {
      var input = f[key];
      var wrap = input.closest('.field');
      var err = form.querySelector('#' + key + '-error');
      wrap.classList.toggle('is-invalid', Boolean(msg));
      wrap.classList.toggle('is-valid', !msg && input.value !== '');
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) err.textContent = msg;
    }
    function check(key) {
      var msg = validators[key](f[key].value);
      setError(key, msg);
      return !msg;
    }

    Object.keys(validators).forEach(function (key) {
      f[key].addEventListener('blur', function () { if (f[key].value !== '' || key !== 'message') check(key); });
      f[key].addEventListener('input', function () {
        if (f[key].closest('.field').classList.contains('is-invalid')) check(key);
      });
    });
    f.checkin.addEventListener('change', function () { if (f.checkout.value) check('checkout'); });

    function buildMessage() {
      var ci = parseDate(f.checkin.value), co = parseDate(f.checkout.value);
      var nights = Math.round((co - ci) / 86400000);
      var lines = [
        "Hello Swahili Spice Hostel, I'd like to make a booking enquiry.",
        '',
        'Name: ' + f.name.value.trim(),
        'Phone: ' + f.phone.value.trim(),
        'Check-in: ' + prettyDate(f.checkin.value),
        'Check-out: ' + prettyDate(f.checkout.value) + ' (' + nights + (nights === 1 ? ' night)' : ' nights)'),
        'Guests: ' + f.guests.value,
      ];
      if (f.room && f.room.value) lines.push('Room preference: ' + f.room.value);
      if (f.message.value.trim()) lines.push('Message: ' + f.message.value.trim());
      lines.push('', 'Please let me know your availability and rates. Thank you.');
      return lines.join('\n');
    }

    function setStatus(msg, isError) {
      status.textContent = msg;
      status.classList.toggle('form-status--error', Boolean(isError));
    }
    function showSuccess(text) {
      if (text) successText.innerHTML = text;
      success.hidden = false;
      success.focus();
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      setStatus('');

      // Spam protection: honeypot + minimum completion time
      if (f.website.value) { showSuccess(); return; }
      if (Date.now() - startedAt < 3000) {
        setStatus('Please take a moment to check your details, then submit again.', true);
        return;
      }

      var keys = Object.keys(validators);
      var firstInvalid = null;
      keys.forEach(function (k) { if (!check(k) && !firstInvalid) firstInvalid = f[k]; });
      if (firstInvalid) {
        setStatus('Please correct the highlighted fields.', true);
        firstInvalid.focus();
        return;
      }

      var message = buildMessage();
      var waUrl = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(message);
      successWa.href = waUrl;

      if (!endpoint) {
        // Open WhatsApp directly within the user gesture so it isn't blocked.
        window.open(waUrl, '_blank', 'noopener');
        showSuccess();
        return;
      }

      form.classList.add('is-loading');
      form.setAttribute('aria-busy', 'true');
      var payload = {
        name: f.name.value.trim(), phone: f.phone.value.trim(), checkin: f.checkin.value, checkout: f.checkout.value,
        guests: f.guests.value, room: f.room ? f.room.value : '', message: f.message.value.trim(), _subject: 'Booking enquiry — Swahili Spice Hostel',
      };
      fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) })
        .then(function (res) { if (!res.ok) throw new Error('HTTP ' + res.status); })
        .then(function () {
          showSuccess('Thank you, ' + f.name.value.trim().split(' ')[0].replace(/[<>&]/g, '') + '. We’ve received your enquiry and will reply to you with availability and rates as soon as possible.');
        })
        .catch(function () {
          setStatus('Sorry, we couldn’t send your enquiry just now. Please try again, or send it on WhatsApp instead.', true);
          showSuccess('We couldn’t send the form, but your enquiry is ready to send on WhatsApp. Tap the button below.');
        })
        .then(function () { form.classList.remove('is-loading'); form.removeAttribute('aria-busy'); });
    });

    form.querySelector('[data-form-reset]').addEventListener('click', function () {
      form.reset();
      f.guests.value = '1';
      Object.keys(validators).forEach(function (k) {
        var wrap = f[k].closest('.field');
        wrap.classList.remove('is-invalid', 'is-valid');
        f[k].removeAttribute('aria-invalid');
      });
      success.hidden = true;
      setStatus('');
      startedAt = Date.now();
      f.name.focus();
    });
  }

  ready(function () {
    initHeader();
    initMenu();
    initReveal();
    initGallery();
    initForm();
  });
})();
