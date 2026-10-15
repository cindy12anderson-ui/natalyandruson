(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Hero: staggered lazy load + pause ---------- */
  (function initHero() {
    var slides = $$('.hero-slide img[data-src]');
    if (!slides.length || reduceMotion) return;
    slides.forEach(function (img, i) {
      setTimeout(function () {
        if (img.dataset.srcset) { img.srcset = img.dataset.srcset; img.removeAttribute('data-srcset'); }
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }, (i + 1) * 10000 - 1500);
    });
  })();

  function toggleHeroPause(btn) {
    var hero = $('.hero');
    var paused = hero.classList.toggle('paused');
    btn.setAttribute('aria-pressed', String(paused));
    btn.querySelector('span').textContent = paused ? 'Play' : 'Pause';
    btn.querySelector('svg').innerHTML = paused
      ? '<path d="M3 1.5v9l7.5-4.5z"/>'
      : '<rect x="2" y="1.5" width="2.4" height="9"/><rect x="7.6" y="1.5" width="2.4" height="9"/>';
  }

  /* ---------- Menus ---------- */
  function closeMenus() {
    $('#mobile-menu').classList.remove('open');
    $('#hamburger-toggle').setAttribute('aria-expanded', 'false');
    $('#a11y-panel').classList.remove('open');
    $('#a11y-toggle').setAttribute('aria-expanded', 'false');
  }
  function toggleMobileMenu() {
    var open = $('#mobile-menu').classList.toggle('open');
    $('#hamburger-toggle').setAttribute('aria-expanded', String(open));
    $('#hamburger-toggle').setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    $('#a11y-panel').classList.remove('open');
  }
  function toggleA11y() {
    var open = $('#a11y-panel').classList.toggle('open');
    $('#a11y-toggle').setAttribute('aria-expanded', String(open));
    $('#mobile-menu').classList.remove('open');
    if (open) { var first = $('#a11y-panel button[data-action="font"]'); if (first) first.focus(); }
    else { $('#a11y-toggle').focus(); }
  }

  /* ---------- Accessibility settings ---------- */
  var fsLevel = 0;
  function setFontSize(dir) {
    fsLevel = dir === 0 ? 0 : Math.max(-1, Math.min(2, fsLevel + dir));
    var root = document.documentElement;
    root.classList.remove('fs-1', 'fs-2', 'fs--1');
    if (fsLevel === 1) root.classList.add('fs-1');
    if (fsLevel === 2) root.classList.add('fs-2');
    if (fsLevel === -1) root.classList.add('fs--1');
  }
  function toggleContrast() {
    var on = document.documentElement.classList.toggle('high-contrast');
    var btn = $('#contrast-btn');
    btn.textContent = on ? 'On' : 'Off';
    btn.setAttribute('aria-pressed', String(on));
  }

  /* ---------- Reveal on scroll ---------- */
  (function initReveal() {
    var els = $$('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.01, rootMargin: '0px 0px 200px 0px' });
    els.forEach(function (el) { io.observe(el); });
    setTimeout(function () { els.forEach(function (el) { el.classList.add('in'); }); }, 2200);
  })();

  /* ---------- Lightbox ---------- */
  var lbGallery = [], lbIndex = 0, lbReturnFocus = null;
  var lb = $('#lightbox');

  function openLightbox(galleryId, index, trigger) {
    lbGallery = $$('img[data-gallery="' + galleryId + '"]').map(function (img) {
      return { src: img.dataset.full || img.currentSrc || img.src, alt: img.dataset.alt || img.alt || '' };
    });
    lbIndex = index;
    lbReturnFocus = trigger || document.activeElement;
    showLbImage();
    lb.hidden = false;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    $('.lb-close').focus();
  }
  function closeLightbox(silent) {
    if (!lb || !lb.classList.contains('open')) return;
    lb.classList.remove('open');
    lb.hidden = true;
    document.body.style.overflow = '';
    if (!silent && lbReturnFocus) lbReturnFocus.focus();
  }
  function lbNav(dir) {
    if (!lbGallery.length) return;
    lbIndex = (lbIndex + dir + lbGallery.length) % lbGallery.length;
    showLbImage();
  }
  function showLbImage() {
    var item = lbGallery[lbIndex];
    if (!item) return;
    var imgEl = $('#lb-img');
    imgEl.src = item.src;
    imgEl.alt = item.alt;
    $('#lb-counter').textContent = (lbIndex + 1) + ' / ' + lbGallery.length;
  }
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });

  // Swipe on touch screens
  (function () {
    var x0 = null;
    lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) lbNav(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });
  })();

  document.addEventListener('keydown', function (e) {
    if (lb.classList.contains('open')) {
      if (e.key === 'Escape') { closeLightbox(); return; }
      if (e.key === 'ArrowLeft') lbNav(-1);
      if (e.key === 'ArrowRight') lbNav(1);
      if (e.key === 'Tab') {
        var f = $$('button', lb);
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      return;
    }
    if (e.key === 'Escape') {
      if ($('#a11y-panel').classList.contains('open')) toggleA11y();
      else if ($('#mobile-menu').classList.contains('open')) { toggleMobileMenu(); $('#hamburger-toggle').focus(); }
    }
  });

  /* ---------- Start a Project: open mail app + copy address as fallback ---------- */
  var EMAIL = 'natalyandruson@gmail.com';
  var toastTimer;
  function showToast(msg) {
    var t = $('#toast'); if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 4200);
  }
  function mailCta() {
    closeMenus();
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(EMAIL).then(function () {
        showToast('Opening your email app. Address copied: ' + EMAIL);
      }, function () { showToast('Email the studio at ' + EMAIL); });
    } else {
      showToast('Email the studio at ' + EMAIL);
    }
  }

  /* ---------- Single delegated click handler (no inline JS -> strict CSP) ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action],[data-lb]');
    if (!el) return;

    if (el.dataset.lb) {
      openLightbox(el.dataset.lb, parseInt(el.dataset.i, 10) || 0, el);
      return;
    }
    switch (el.dataset.action) {
      case 'mail-cta': mailCta(); break;
      case 'menu': toggleMobileMenu(); break;
      case 'a11y': toggleA11y(); break;
      case 'font': setFontSize(parseInt(el.dataset.dir, 10)); break;
      case 'contrast': toggleContrast(); break;
      case 'hero-pause': toggleHeroPause(el); break;
      case 'lb-close': closeLightbox(); break;
      case 'lb-prev': lbNav(-1); break;
      case 'lb-next': lbNav(1); break;
    }
  });

  // Skip link: move focus without polluting the URL
  var skip = $('.skip-link');
  if (skip) skip.addEventListener('click', function (e) {
    e.preventDefault();
    var h = $('.page.active h1') || $('#main');
    h.setAttribute('tabindex', '-1');
    h.focus();
  });

  /* ---------- Hero parallax (motion allowed) ---------- */
  if (!reduceMotion) {
    var heroMarkInner = $('#hero-mark-inner'), heroEl = $('.hero');
    var parallax = function () {
      if (!heroMarkInner || !heroEl || false) return;
      var h = heroEl.offsetHeight || window.innerHeight;
      var y = window.scrollY || window.pageYOffset;
      if (y < h) {
        heroMarkInner.style.transform = 'translateY(' + Math.round(y * 0.22) + 'px)';
        heroMarkInner.style.opacity = String(Math.max(0, 1 - y / (h * 0.75)));
      }
    };
    window.addEventListener('scroll', parallax, { passive: true });
    parallax();
  }

})();
