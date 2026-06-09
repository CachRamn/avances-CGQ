(function () {
  'use strict';

  /* =====================
     STAT COUNTER — nosotros
     Numeric stats count up from 0 when the section
     scrolls into view. "24/7" is left as-is.
     ===================== */
  function animateCount(el) {
    const text = el.textContent.trim();
    const match = text.match(/^(\d+)(.*)$/);
    if (!match) return;

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const DURATION = 1100;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    el.textContent = '0' + suffix;
    requestAnimationFrame(tick);
  }

  const nosotrosSection = document.querySelector('.nosotros');
  if (nosotrosSection) {
    const countEls = Array.from(
      nosotrosSection.querySelectorAll('.nosotros-stat strong')
    ).filter(el => /^\d/.test(el.textContent.trim()));

    const statObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            countEls.forEach(animateCount);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.45 }
    );

    statObserver.observe(nosotrosSection);
  }

  /* =====================
     SERVICE CARDS STAGGER
     Adds .cards-animate to the grid when it enters view,
     triggering CSS animation-delay stagger via --card-i.
     ===================== */
  const cardsGrid = document.querySelector('.servicios .cards');
  if (cardsGrid) {
    Array.from(cardsGrid.querySelectorAll('.card')).forEach((card, i) => {
      card.style.setProperty('--card-i', i);
    });

    const cardsObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            cardsGrid.classList.add('cards-animate');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsObserver.observe(cardsGrid);
  }
})();
