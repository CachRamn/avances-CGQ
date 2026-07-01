/* =====================
   CARRUSELES
   ===================== */
function iniciarCarrusel(el) {
  const slides = Array.from(el.querySelectorAll('.carrusel-slide'));
  const dots   = Array.from(el.querySelectorAll('.carrusel-dot'));
  const btnPrev = el.querySelector('.carrusel-prev');
  const btnNext = el.querySelector('.carrusel-next');
  let current = 0;
  let timer;

  function mostrar(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function siguiente() { mostrar(current + 1); }
  function anterior()  { mostrar(current - 1); }

  function reiniciarTimer() {
    clearInterval(timer);
    timer = setInterval(siguiente, 4000);
  }

  btnNext.addEventListener('click', () => { siguiente(); reiniciarTimer(); });
  btnPrev.addEventListener('click', () => { anterior();  reiniciarTimer(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { mostrar(i); reiniciarTimer(); });
  });

  timer = setInterval(siguiente, 4000);
}

/* =====================
   HEADER SCROLL SHADOW
   ===================== */
function iniciarScrollHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 10);
  }, { passive: true });
}

/* =====================
   PARALLAX HERO
   ===================== */
function iniciarParallaxHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    hero.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.35}px)`;
  }, { passive: true });
}

/* =====================
   TRANSICIONES ENTRE PÁGINAS
   ===================== */
function iniciarTransiciones() {
  const overlay = document.createElement('div');
  overlay.id = 'page-overlay';
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add('oculto');
    });
  });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('http') ||
      href.startsWith('tel:') ||
      href.startsWith('mailto:') ||
      link.target === '_blank'
    ) return;

    link.addEventListener('click', e => {
      e.preventDefault();
      overlay.classList.remove('oculto');
      setTimeout(() => { window.location.href = href; }, 350);
    });
  });
}

/* =====================
   INIT
   ===================== */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carrusel').forEach(iniciarCarrusel);
  iniciarTransiciones();
  iniciarParallaxHero();
  iniciarScrollHeader();
});
