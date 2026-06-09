const API_BASE = 'http://localhost:3000';

/* =====================
   FORMULARIO DE CONTACTO
   ===================== */
const formContacto = document.getElementById('form-contacto');
const formRespuesta = document.getElementById('form-respuesta');

if (formContacto) {
  formContacto.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = {
      nombre:   formContacto.nombre.value.trim(),
      email:    formContacto.email.value.trim(),
      telefono: formContacto.telefono.value.trim(),
      mensaje:  formContacto.mensaje.value.trim(),
    };

    try {
      const res = await fetch(`${API_BASE}/api/contacto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });

      const json = await res.json();

      mostrarRespuesta(
        res.ok ? 'exito' : 'error',
        res.ok
          ? '¡Mensaje enviado! Te contactaremos pronto.'
          : json.mensaje || 'Ocurrió un error. Intenta nuevamente.'
      );

      if (res.ok) formContacto.reset();
    } catch {
      mostrarRespuesta('error', 'No se pudo conectar con el servidor.');
    }
  });
}

function mostrarRespuesta(tipo, texto) {
  formRespuesta.textContent = texto;
  formRespuesta.className = `form-respuesta ${tipo}`;
  formRespuesta.hidden = false;

  setTimeout(() => {
    formRespuesta.hidden = true;
  }, 5000);
}

/* =====================
   BOTÓN WHATSAPP
   ===================== */
async function cargarWhatsapp() {
  const btnWhatsapp = document.getElementById('btn-whatsapp');
  if (!btnWhatsapp) return;

  try {
    const res = await fetch(`${API_BASE}/api/whatsapp`);
    if (!res.ok) return;

    const { numero, mensaje } = await res.json();
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    btnWhatsapp.href = url;
  } catch {
    // Si la API no responde, el botón queda deshabilitado silenciosamente
    btnWhatsapp.style.display = 'none';
  }
}

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
  cargarWhatsapp();
  document.querySelectorAll('.carrusel').forEach(iniciarCarrusel);
  iniciarTransiciones();
  iniciarParallaxHero();
  iniciarScrollHeader();
});
