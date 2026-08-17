// Shared helpers for ML Algorithms Visualized pages.
(function () {
  "use strict";

  function injectHeader(title) {
    if (document.querySelector(".site-header")) return; // page supplies its own
    var header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML =
      '<a class="brand" href="index.html"><strong>ML Algorithms, Visualized</strong>' +
      '<span>' + (title || "") + '</span></a>' +
      '<nav><a class="back" href="index.html">&larr; All algorithms</a></nav>';
    document.body.insertBefore(header, document.body.firstChild);
  }

  function injectFooter() {
    var footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.textContent = "One page per algorithm · built for GitHub Pages · no external dependencies";
    document.body.appendChild(footer);
  }

  // Seeded PRNG (mulberry32) so every visualization is reproducible.
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function gaussian(rand) {
    var u = 1 - rand(), v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function svgEl(tag, attrs) {
    var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  window.MLViz = {
    injectHeader: injectHeader,
    injectFooter: injectFooter,
    mulberry32: mulberry32,
    gaussian: gaussian,
    svgEl: svgEl
  };

  document.addEventListener("DOMContentLoaded", function () {
    injectHeader(document.title.replace(/\s*\|\s*ML Algorithms.*/i, ""));
    injectFooter();
  });
})();
