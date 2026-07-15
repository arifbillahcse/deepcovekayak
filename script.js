/* Deep Cove Kayak — interactions */
(function () {
  "use strict";

  /* ---- scroll progress bar ---- */
  var bar = document.getElementById("scrollProgress");
  function onScroll() {
    var h = document.documentElement;
    var scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    bar.style.width = (scrolled * 100) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- reveal on scroll ---- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* ---- animated count-up for trust number ---- */
  var counter = document.querySelector(".count");
  if (counter) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        cio.disconnect();
        var target = +counter.dataset.target, start = 0, dur = 1600, t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          counter.textContent = Math.floor(eased * target).toLocaleString();
          if (p < 1) requestAnimationFrame(step);
          else counter.textContent = target.toLocaleString();
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    cio.observe(counter);
  }

  /* ---- form submit (demo, no backend) ---- */
  var form = document.getElementById("inquiryForm");
  var success = document.getElementById("formSuccess");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var email = document.getElementById("email");
      var phone = document.getElementById("phone");
      var consent = form.querySelector('input[name="consent"]');
      if (!email.value || !phone.value || !consent.checked) {
        var bad = !email.value ? email : (!phone.value ? phone : consent);
        bad.focus();
        (bad.closest(".field") || bad.closest(".consent-check") || bad).scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      var btn = form.querySelector(".formcard__submit");
      btn.classList.add("loading");
      setTimeout(function () {
        form.hidden = true;
        success.hidden = false;
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 1100);
    });
  }
})();
