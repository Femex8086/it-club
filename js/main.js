/* Mary Matha IT Club – motion, navigation, carousel and modal interactions. */

document.addEventListener("DOMContentLoaded", function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // Pointer-reactive spotlight and 3D tilt keep the hero alive without extra UI.
  var hero = document.querySelector(".hero-section");
  var emblem = document.querySelector(".hero-emblem");
  if (hero && finePointer && !reduceMotion) {
    hero.addEventListener("pointermove", function (event) {
      var rect = hero.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width;
      var y = (event.clientY - rect.top) / rect.height;
      hero.style.setProperty("--pointer-x", (x * 100) + "%");
      hero.style.setProperty("--pointer-y", (y * 100) + "%");
      if (emblem) {
        emblem.style.setProperty("--rotate-x", ((0.5 - y) * 10) + "deg");
        emblem.style.setProperty("--rotate-y", ((x - 0.5) * 12) + "deg");
      }
    });
    hero.addEventListener("pointerleave", function () {
      hero.style.setProperty("--pointer-x", "50%");
      hero.style.setProperty("--pointer-y", "50%");
      if (emblem) {
        emblem.style.setProperty("--rotate-x", "0deg");
        emblem.style.setProperty("--rotate-y", "0deg");
      }
    });
  }

  // Pointer-responsive depth across all feature cards, only on fine pointers.
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".project-card, .newsletter-card, .activity-card").forEach(function (card) {
      card.classList.add("pointer-tilt");
      card.addEventListener("pointermove", function (event) {
        var rect = card.getBoundingClientRect();
        var x = (event.clientX - rect.left) / rect.width;
        var y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty("--tilt-x", ((x - 0.5) * 5) + "deg");
        card.style.setProperty("--tilt-y", ((0.5 - y) * 5) + "deg");
        card.style.setProperty("--glow-x", (x * 100) + "%");
        card.style.setProperty("--glow-y", (y * 100) + "%");
      });
      card.addEventListener("pointerleave", function () {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      });
    });
  }

  // Fade project and article cards into view as visitors scroll.
  var revealItems = document.querySelectorAll(".activity-card, .project-card, .newsletter-card, .activities-section .text-center, .contributions-section .text-center, .newsletter-section .text-center");
  if (!reduceMotion && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item, index) {
      item.classList.add("scroll-reveal");
      item.style.setProperty("--reveal-delay", ((index % 3) * 75) + "ms");
      revealObserver.observe(item);
    });
  }

  // Activity image popup
  var activityModal = document.getElementById("activityModal");
  activityModal.addEventListener("show.bs.modal", function (e) {
    var card = e.relatedTarget.closest(".activity-card");
    var img = card.querySelector(".activity-image");
    var modalImg = document.getElementById("activityModalImg");
    modalImg.src = img.getAttribute("src");
    modalImg.alt = img.getAttribute("alt") || "Activity";
  });

  // Project details popup
  var projectModal = document.getElementById("projectModal");
  projectModal.addEventListener("show.bs.modal", function (e) {
    var card = e.relatedTarget.closest(".project-card");
    var img = card.querySelector(".project-image");
    var title = card.querySelector(".project-title").textContent.trim();

    var modalImg = document.getElementById("projectModalImg");
    modalImg.src = img.getAttribute("src");
    modalImg.alt = title;

    document.getElementById("projectModalTitle").textContent = title;
    document.getElementById("projectModalDesc").textContent =
      card.querySelector(".project-desc").textContent.trim();
    document.getElementById("projectModalLink").href =
      card.querySelector(".visit-btn").getAttribute("href");
  });

  // Newsletter article popup
  var newsModal = document.getElementById("newsModal");
  newsModal.addEventListener("show.bs.modal", function (e) {
    var card = e.relatedTarget.closest(".newsletter-card");
    var img = card.querySelector(".newsletter-image");
    var title = card.querySelector(".newsletter-title").textContent.trim();

    var modalImg = document.getElementById("newsModalImg");
    modalImg.src = img.getAttribute("src");
    modalImg.alt = title;

    document.getElementById("newsModalDate").textContent =
      card.querySelector(".newsletter-date").textContent.trim();
    document.getElementById("newsModalTitle").textContent = title;
    document.getElementById("newsModalContent").textContent =
      card.querySelector(".news-full").textContent.trim();
  });

  // Highlight the current section and keep the page controls in sync.
  var links = document.querySelectorAll(".nav-links .nav-link");
  var sections = Array.prototype.map.call(links, function (a) {
    return document.querySelector(a.getAttribute("href"));
  });

  function updateActive() {
    var pos = window.scrollY + 120;
    var current = 0;
    sections.forEach(function (sec, i) {
      if (sec && sec.offsetTop <= pos) current = i;
    });
    // at the very bottom of the page, highlight the last link (About)
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
      current = links.length - 1;
    }
    links.forEach(function (a, i) {
      a.classList.toggle("active", i === current);
    });

    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    var progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    var progressBar = document.getElementById("pageProgressBar");
    if (progressBar) progressBar.style.width = progress + "%";

    var navbar = document.querySelector(".custom-navbar");
    if (navbar) navbar.classList.toggle("is-scrolled", window.scrollY > 18);

    var backToTop = document.getElementById("backToTop");
    if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.65);
  }
  window.addEventListener("scroll", updateActive, { passive: true });
  updateActive();

  var backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  var activityCarousel = document.getElementById("activityCarousel");
  if (activityCarousel) {
    var carouselInstance = bootstrap.Carousel.getOrCreateInstance(activityCarousel, {
      interval: 6500,
      pause: "hover",
      touch: true
    });
    if (!reduceMotion) carouselInstance.cycle();

    var activityPages = activityCarousel.parentElement.querySelectorAll(".activity-page[data-bs-slide-to]");
    activityCarousel.addEventListener("slid.bs.carousel", function (event) {
      activityPages.forEach(function (button, index) {
        var active = index === event.to;
        button.classList.toggle("active", active);
        if (active) button.setAttribute("aria-current", "true");
        else button.removeAttribute("aria-current");
      });
    });
  }

  // On mobile, close the menu before scrolling to the selected section.
  var menuEl = document.getElementById("main-navbar");
  links.forEach(function (a) {
    a.addEventListener("click", function (ev) {
      if (!menuEl.classList.contains("show")) return; // desktop: normal anchor jump
      ev.preventDefault();
      var target = document.querySelector(a.getAttribute("href"));
      menuEl.addEventListener("hidden.bs.offcanvas", function () {
        if (target) target.scrollIntoView();
      }, { once: true });
      bootstrap.Offcanvas.getInstance(menuEl).hide();
    });
  });
});
