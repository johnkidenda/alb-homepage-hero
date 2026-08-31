(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setOpen(false);
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("click", function (event) {
    if (!nav.classList.contains("is-open")) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    setOpen(false);
  });
})();

(function () {
  var root = document.querySelector("[data-hero-flip]");
  if (!root) return;

  var slides = root.querySelectorAll(".hero-slide");
  var copies = document.querySelectorAll("[data-hero-copy]");
  if (slides.length < 2) return;

  function show(i) {
    slides.forEach(function (slide, n) {
      slide.classList.toggle("is-active", n === i);
    });
    copies.forEach(function (copy, n) {
      var on = n === i;
      copy.classList.toggle("is-active", on);
      copy.setAttribute("aria-hidden", on ? "false" : "true");
      if ("inert" in copy) copy.inert = !on;
    });
  }

  show(0);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var index = 0;
  var timer = null;
  var intervalMs = 7000;

  function next() {
    index = (index + 1) % slides.length;
    show(index);
  }

  function start() {
    if (timer || document.visibilityState === "hidden") return;
    timer = setInterval(next, intervalMs);
  }

  function stop() {
    if (!timer) return;
    clearInterval(timer);
    timer = null;
  }

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") stop();
    else start();
  });

  start();
})();
