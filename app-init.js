/* Runs before the page renders: enables reveal animations and forwards old #/ links to the new clean URLs. */
(function () {
  document.documentElement.classList.add('js');
  var h = location.hash || '';
  if (h.indexOf('#/') !== 0) return;
  var p = h.slice(2).split('/').filter(Boolean);
  var old = { linear: 'the-linear-apartment', bronze: 'the-bronze-house', courtyard: 'the-courtyard-villa', sage: 'the-sage-house', levanto: 'the-levanto-house', munters: 'munters-office', ember: 'the-ember-loft', noir: 'the-noir-apartment', travertine: 'the-travertine-apartment', graphite: 'the-graphite-apartment' };
  var dest = '/';
  if (p[0] === 'projects') dest = '/projects/' + (old[p[1]] || 'the-linear-apartment');
  else if (p[0] === 'studio') dest = '/studio';
  else if (p[0] === 'contact') dest = '/contact';
  else if (p[0] === 'legal') dest = '/legal' + (p[1] ? '#legal-' + p[1] : '');
  location.replace(dest);
})();
