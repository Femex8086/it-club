/* Mary Matha IT Club – small bit of JS (Bootstrap handles carousel, navbar & modals) */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Welcome popup on page load
  var welcomeEl = document.getElementById("welcomeModal");
  if (welcomeEl) {
    new bootstrap.Modal(welcomeEl).show();
  }

  // 2. Activity image popup
  var activityModal = document.getElementById("activityModal");
  activityModal.addEventListener("show.bs.modal", function (e) {
    var card = e.relatedTarget.closest(".activity-card");
    var img = card.querySelector(".activity-image");
    var modalImg = document.getElementById("activityModalImg");
    modalImg.src = img.getAttribute("src");
    modalImg.alt = img.getAttribute("alt") || "Activity";
  });

  // 3. Project details popup
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

  // 4. Newsletter article popup
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

  // 5. Highlight the nav link of the section currently in view
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
  }
  window.addEventListener("scroll", updateActive, { passive: true });
  updateActive();

  // 6. Mobile menu (slides in from the right): close it, then scroll to the section
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
