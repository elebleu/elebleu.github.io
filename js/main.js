document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");

      document.querySelectorAll(".faq-item.is-open").forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove("is-open");
          openItem.querySelector(".faq-answer").style.maxHeight = null;
          openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        }
      });

      if (isOpen) {
        item.classList.remove("is-open");
        answer.style.maxHeight = null;
        question.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("is-open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Testimonial read more / read less
  document.querySelectorAll(".testimonial-toggle").forEach(function (btn) {
    var quote = btn.previousElementSibling;
    if (!quote) return;

    btn.addEventListener("click", function () {
      var expanded = quote.classList.toggle("is-expanded");
      btn.textContent = expanded ? "Read Less" : "Read More";
    });
  });

  // Tilt cards: 3D tilt that follows the cursor
  var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion) {
    document.querySelectorAll(".offer-cards .card, .tilt-cards .card, .tilt-cards .faq-item").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var xPct = (e.clientX - rect.left) / rect.width - 0.5;
        var yPct = (e.clientY - rect.top) / rect.height - 0.5;
        var rotateY = xPct * 14;
        var rotateX = yPct * -14;
        card.style.transform = "perspective(900px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
      });
    });
  }
});
