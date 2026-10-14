(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Project slugs (URL <-> key) ---------- */
  var SLUGS = {
    p3: 'linear', p10: 'bronze', p4: 'courtyard', p2: 'sage', p1: 'levanto',
    p6: 'munters', p7: 'ember', p8: 'noir', p9: 'travertine', p5: 'graphite'
  };
  var KEYS = {};
  Object.keys(SLUGS).forEach(function (k) { KEYS[SLUGS[k]] = k; });

  var PAGES = ['home', 'projects', 'studio', 'contact', 'legal'];
  var TITLES = {
    home: 'Nataly Andruson - Architecture & Interior Design',
    projects: 'Projects - Nataly Andruson',
    studio: 'Studio - Nataly Andruson',
    contact: 'Contact - Nataly Andruson',
    legal: 'Legal Notice & Accessibility - Nataly Andruson'
  };
  var LEGAL_TARGETS = {
    accessibility: 'legal-accessibility', privacy: 'legal-privacy', terms: 'legal-terms'
  };

  var currentPage = null;

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
  var observer;
  function initReveal() {
    if (observer) observer.disconnect();
    if (!('IntersectionObserver' in window)) {
      $$('.page.active .reveal').forEach(function (el) { el.classList.add('in'); });
      return;
    }
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.01, rootMargin: '0px 0px 200px 0px' });
    $$('.page.active .reveal').forEach(function (el) { observer.observe(el); });
    clearTimeout(window.__revealFallback);
    window.__revealFallback = setTimeout(function () {
      $$('.page.active .reveal').forEach(function (el) { el.classList.add('in'); });
    }, 2200);
  }

  /* ---------- Router (hash based: #/projects/bronze) ---------- */
  function parseHash() {
    var h = location.hash || '';
    if (h.indexOf('#/') !== 0) return { page: 'home' };
    var parts = h.slice(2).split('/').filter(Boolean);
    var page = parts[0] || 'home';
    if (PAGES.indexOf(page) === -1) page = 'home';
    return { page: page, sub: parts[1] || null };
  }

  function setActiveProject(key) {
    $$('.editorial-project').forEach(function (el) {
      el.classList.toggle('active-project', el.id === 'project-' + key);
    });
    $$('.proj-tab').forEach(function (btn) {
      var on = btn.dataset.project === key;
      btn.classList.toggle('active', on);
      if (on) btn.setAttribute('aria-current', 'true'); else btn.removeAttribute('aria-current');
    });
  }

  function render(opts) {
    opts = opts || {};
    var r = parseHash();
    var samePage = r.page === currentPage;

    $$('.page').forEach(function (p) { p.classList.remove('active'); });
    $('#page-' + r.page).classList.add('active');
    $$('.nav-link, .mobile-menu-link').forEach(function (l) {
      var on = l.getAttribute('data-page') === r.page;
      l.classList.toggle('active', on);
      if (on) l.setAttribute('aria-current', 'page'); else l.removeAttribute('aria-current');
    });
    closeMenus();
    closeLightbox(true);

    var title = TITLES[r.page];
    var scrollTarget = null;

    if (r.page === 'projects') {
      var key = (r.sub && KEYS[r.sub]) || 'p3';
      setActiveProject(key);
      var tab = $('.proj-tab[data-project="' + key + '"]');
      if (r.sub && tab) title = tab.textContent + ' - Nataly Andruson';
      if (samePage && opts.fromTab) scrollTarget = $('#proj-tabbar');
    }
    if (r.page === 'legal' && r.sub && LEGAL_TARGETS[r.sub]) {
      scrollTarget = document.getElementById(LEGAL_TARGETS[r.sub]);
    }
    document.title = title;
    currentPage = r.page;
    initReveal();

    var behavior = reduceMotion ? 'auto' : 'smooth';
    if (scrollTarget) {
      requestAnimationFrame(function () { scrollTarget.scrollIntoView({ behavior: behavior, block: 'start' }); });
    } else {
      window.scrollTo({ top: 0, behavior: samePage ? behavior : 'auto' });
    }

    // Move focus to the new page heading so screen-reader users hear the change
    if (!opts.initial && !opts.fromTab) {
      var h = (scrollTarget && scrollTarget.tagName === 'H2') ? scrollTarget : $('#page-' + r.page + ' h1');
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
    }
  }

  function navigate(hash, opts) {
    opts = opts || {};
    if (location.hash === hash) { render(opts); return; }
    if (opts.replace) {
      history.replaceState(null, '', hash);
      render(opts);
    } else {
      pendingOpts = opts;
      location.hash = hash;
    }
  }
  var pendingOpts = null;
  window.addEventListener('hashchange', function () {
    var o = pendingOpts || {}; pendingOpts = null;
    render(o);
  });

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
    if (!lb.classList.contains('open')) return;
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

  /* ---------- Single delegated click handler (no inline JS -> strict CSP) ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-go],[data-action],[data-project],[data-lb]');
    if (!el) return;

    if (el.dataset.lb) {
      openLightbox(el.dataset.lb, parseInt(el.dataset.i, 10) || 0, el);
      return;
    }
    if (el.classList.contains('proj-tab')) {
      e.preventDefault();
      navigate('#/projects/' + SLUGS[el.dataset.project], { replace: currentPage === 'projects', fromTab: true });
      return;
    }
    if (el.dataset.go) {
      var href = el.getAttribute('href');
      if (href && href.indexOf('#/') === 0) {
        e.preventDefault();
        navigate(href);
      }
      return;
    }
    switch (el.dataset.action) {
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

  /* ---------- Custom cursor + hero parallax (desktop, motion allowed) ---------- */
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (fine && !reduceMotion) {
    var dot = $('#cursor-dot'), ring = $('#cursor-ring');
    var mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      document.body.classList.add('has-cursor');
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
      var t = e.target.closest('a,button,.b-item,.proj-tab,.ed-cover,.ed-gallery-item');
      ring.classList.toggle('cursor-hover', !!t);
    }, { passive: true });
    window.addEventListener('click', function () { document.body.classList.remove('has-cursor'); }, { passive: true });
    (function tick() {
      rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(tick);
    })();
  }
  if (!reduceMotion) {
    var heroMarkInner = $('#hero-mark-inner'), heroEl = $('.hero');
    var parallax = function () {
      if (!heroMarkInner || !heroEl || currentPage !== 'home') return;
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

  /* ---------- Boot ---------- */
  render({ initial: true });
})();
