/* ============================================================
   GALERÍA — Centro Geriátrico Querétaro
   Datos, filtros por categoría y lightbox tipo álbum.
   Independiente de main.js
   ============================================================ */
(function () {
  'use strict';

  /* ---------- CATEGORÍAS ---------- */
  const CATEGORIAS = [
    { id: 'todas',         nombre: 'Todas' },
    { id: 'instalaciones', nombre: 'Instalaciones' },
    { id: 'actividades',   nombre: 'Actividades' },
    { id: 'terapias',      nombre: 'Terapias' },
    { id: 'medica',        nombre: 'Atención médica' },
    { id: 'convivencia',   nombre: 'Convivencia' }
  ];

  /* ---------- FOTOS ----------
     img: ruta de la foto, o null si es marcador de posición.
     span: tamaño en el mosaico ('2x2' | '2x1' | '1x2' | null=1x1)
     sugerencia: qué foto colocar (solo placeholders)            */
  const FOTOS = [
    // ---- INSTALACIONES ----
    {
      cat: 'instalaciones',
      titulo: 'Jardín y áreas verdes',
      img: 'img/carrousel/residencia-2.webp',
      span: '2x2',
      desc: 'Un amplio jardín con pasto, banca a la sombra y árboles donde nuestros residentes toman el sol, conviven y descansan al aire libre con total seguridad.'
    },
    {
      cat: 'instalaciones',
      titulo: 'Habitación compartida',
      img: 'img/carrousel/residencia-3.jpeg',
      span: null,
      desc: 'Habitaciones luminosas con camas de hospital, baño adaptado y detalles cálidos que hacen que cada persona se sienta como en casa.'
    },
    {
      cat: 'instalaciones',
      titulo: 'Sala de estar',
      img: 'img/carrousel/residencia-4.jpeg',
      span: '2x1',
      desc: 'Espacios comunes amplios para la convivencia, la sobremesa y las actividades grupales, con buena iluminación natural.'
    },
    {
      cat: 'instalaciones',
      titulo: 'Patio cubierto y accesos',
      img: 'img/carrousel/residencia-1.webp',
      span: null,
      desc: 'Patio techado y accesos amplios, sin escalones, pensados para sillas de ruedas y andaderas. Movilidad cómoda y segura en todo momento.'
    },
    {
      cat: 'instalaciones',
      titulo: 'Fachada y recepción',
      img: null,
      span: null,
      sugerencia: 'Foto de la entrada principal / recepción del centro'
    },
    {
      cat: 'instalaciones',
      titulo: 'Comedor',
      img: null,
      span: null,
      sugerencia: 'Foto del comedor con las mesas montadas'
    },

    // ---- ACTIVIDADES ----
    {
      cat: 'actividades',
      titulo: 'Juego de básquet adaptado',
      img: 'img/carrousel/actividades-1.webp',
      span: '1x2',
      desc: 'Actividades deportivas adaptadas a cada capacidad: el juego de encestar fortalece el movimiento, la coordinación y el ánimo de nuestros residentes.'
    },
    {
      cat: 'actividades',
      titulo: 'Juegos de puntería',
      img: 'img/carrousel/actividades-2.webp',
      span: null,
      desc: 'Dinámicas lúdicas como el "tiro con dardo" que estimulan la concentración y la motricidad fina mientras se pasa un rato divertido.'
    },
    {
      cat: 'actividades',
      titulo: 'Pintura y manualidades',
      img: null,
      span: null,
      sugerencia: 'Foto de residentes pintando o haciendo manualidades'
    },
    {
      cat: 'actividades',
      titulo: 'Música y canto',
      img: null,
      span: null,
      sugerencia: 'Foto de una sesión de música, canto o baile'
    },

    // ---- TERAPIAS ----
    {
      cat: 'terapias',
      titulo: 'Terapia física',
      img: null,
      span: '2x1',
      sugerencia: 'Foto de una sesión de rehabilitación / fisioterapia'
    },
    {
      cat: 'terapias',
      titulo: 'Estimulación cognitiva',
      img: null,
      span: null,
      sugerencia: 'Foto de ejercicios de memoria o estimulación cognitiva'
    },

    // ---- ATENCIÓN MÉDICA ----
    {
      cat: 'medica',
      titulo: 'Consulta médica',
      img: null,
      span: null,
      sugerencia: 'Foto de una consulta o valoración médica'
    },
    {
      cat: 'medica',
      titulo: 'Cuidado de enfermería',
      img: null,
      span: null,
      sugerencia: 'Foto del personal de enfermería atendiendo a un residente'
    },

    // ---- CONVIVENCIA ----
    {
      cat: 'convivencia',
      titulo: 'Espectáculos y eventos',
      img: 'img/carrousel/actividades-3.webp',
      span: '1x2',
      desc: 'Llevamos la cultura al centro: shows de charrería, música en vivo y eventos especiales que llenan de alegría las tardes de nuestros residentes.'
    },
    {
      cat: 'convivencia',
      titulo: 'Fiestas temáticas',
      img: 'img/carrousel/actividades-4.webp',
      span: null,
      desc: 'Celebraciones con decoración, flores y disfraces. Cada festejo es una oportunidad para sonreír, recordar y compartir en comunidad.'
    },
    {
      cat: 'convivencia',
      titulo: 'Convivencia y festejos',
      img: 'img/carrousel/actividad.jpg',
      span: null,
      desc: 'El corazón del centro es la convivencia diaria: la compañía, las risas compartidas y el acompañamiento cálido en cada momento.'
    },
    {
      cat: 'convivencia',
      titulo: 'Visita familiar',
      img: null,
      span: null,
      sugerencia: 'Foto de un residente con su familia de visita'
    }
  ];

  /* ---------- ICONOS ---------- */
  const ICON_ZOOM =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>';
  const ICON_CAM =
    '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>';

  /* ---------- ESTADO ---------- */
  let filtroActual = 'todas';
  let visibles = [];        // índices de FOTOS visibles según el filtro
  let posLightbox = 0;      // posición dentro de "visibles"
  let ultimoFoco = null;    // elemento que tenía el foco antes de abrir

  const grid       = document.getElementById('galeria-grid');
  const filtrosBox = document.getElementById('galeria-filtros');
  const lightbox   = document.getElementById('lightbox');

  if (!grid || !filtrosBox || !lightbox) return;

  /* ---------- RENDER: FILTROS ---------- */
  function contar(catId) {
    return catId === 'todas'
      ? FOTOS.length
      : FOTOS.filter(f => f.cat === catId).length;
  }

  CATEGORIAS.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filtro-btn' + (cat.id === 'todas' ? ' active' : '');
    btn.type = 'button';
    btn.dataset.cat = cat.id;
    btn.setAttribute('aria-pressed', cat.id === 'todas' ? 'true' : 'false');
    btn.innerHTML = `${cat.nombre} <span class="filtro-num">${contar(cat.id)}</span>`;
    btn.addEventListener('click', () => aplicarFiltro(cat.id));
    filtrosBox.appendChild(btn);
  });

  /* ---------- RENDER: MOSAICO ---------- */
  FOTOS.forEach((foto, i) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'galeria-item';
    if (foto.span) item.classList.add('span-' + foto.span);
    item.dataset.cat = foto.cat;
    item.dataset.idx = i;
    item.style.setProperty('--i', Math.min(i, 8));

    const nombreCat = nombreCategoria(foto.cat);

    if (foto.img) {
      item.setAttribute('aria-label', `Ampliar foto: ${foto.titulo}`);
      item.innerHTML = `
        <img src="${foto.img}" alt="${foto.titulo} — Centro Geriátrico Querétaro" loading="lazy">
        <span class="item-zoom">${ICON_ZOOM}</span>
        <span class="item-overlay">
          <span class="item-cat">${nombreCat}</span>
          <span class="item-titulo">${foto.titulo}</span>
        </span>`;
      item.addEventListener('click', () => abrirLightbox(i));
    } else {
      item.classList.add('es-placeholder');
      item.setAttribute('aria-label', `Espacio reservado: ${foto.titulo}. ${foto.sugerencia || ''}`);
      item.innerHTML = `
        <span class="ph-inner">
          <span class="ph-icon">${ICON_CAM}</span>
          <span class="ph-cat">${nombreCat}</span>
          <span class="ph-titulo">${foto.titulo}</span>
          <span class="ph-nota">${foto.sugerencia || 'Foto por agregar'}</span>
        </span>`;
      item.addEventListener('click', () => abrirLightbox(i));
    }

    grid.appendChild(item);
  });

  const items = Array.from(grid.querySelectorAll('.galeria-item'));

  function nombreCategoria(id) {
    const c = CATEGORIAS.find(x => x.id === id);
    return c ? c.nombre : '';
  }

  /* ---------- FILTRADO ---------- */
  function aplicarFiltro(catId) {
    filtroActual = catId;

    filtrosBox.querySelectorAll('.filtro-btn').forEach(b => {
      const activo = b.dataset.cat === catId;
      b.classList.toggle('active', activo);
      b.setAttribute('aria-pressed', activo ? 'true' : 'false');
    });

    visibles = [];
    items.forEach((el, i) => {
      const muestra = catId === 'todas' || FOTOS[i].cat === catId;
      el.classList.toggle('filtrado-oculto', !muestra);
      if (muestra) visibles.push(i);
    });
  }

  /* ---------- LIGHTBOX ---------- */
  // Construir el esqueleto del lightbox
  lightbox.innerHTML = `
    <div class="lightbox-top">
      <span class="lightbox-contador" id="lb-contador"></span>
      <button class="lightbox-cerrar" id="lb-cerrar" type="button" aria-label="Cerrar galería">&times;</button>
    </div>
    <div class="lightbox-cuerpo">
      <button class="lightbox-nav" id="lb-prev" type="button" aria-label="Foto anterior">&#8249;</button>
      <div class="lightbox-escena">
        <div class="lightbox-figura" id="lb-figura"></div>
        <div class="lightbox-caption" id="lb-caption"></div>
      </div>
      <button class="lightbox-nav" id="lb-next" type="button" aria-label="Foto siguiente">&#8250;</button>
    </div>
    <div class="lightbox-miniaturas" id="lb-miniaturas" role="tablist" aria-label="Miniaturas"></div>
  `;
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Álbum de fotografías');

  const lbFigura     = lightbox.querySelector('#lb-figura');
  const lbCaption    = lightbox.querySelector('#lb-caption');
  const lbContador   = lightbox.querySelector('#lb-contador');
  const lbMiniaturas = lightbox.querySelector('#lb-miniaturas');

  function construirMiniaturas() {
    lbMiniaturas.innerHTML = '';
    visibles.forEach((fIdx, pos) => {
      const foto = FOTOS[fIdx];
      const mini = document.createElement('button');
      mini.type = 'button';
      mini.className = 'mini' + (foto.img ? '' : ' es-ph');
      mini.setAttribute('aria-label', foto.titulo);
      mini.innerHTML = foto.img
        ? `<img src="${foto.img}" alt="" loading="lazy">`
        : ICON_ZOOM;
      mini.addEventListener('click', () => mostrarEnLightbox(pos));
      lbMiniaturas.appendChild(mini);
    });
  }

  function abrirLightbox(fotoIdx) {
    // Asegura que "visibles" esté calculado con el filtro actual
    if (!visibles.length) aplicarFiltro(filtroActual);
    const pos = visibles.indexOf(fotoIdx);
    if (pos === -1) return;

    ultimoFoco = document.activeElement;
    construirMiniaturas();
    mostrarEnLightbox(pos);

    lightbox.classList.add('abierto');
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('#lb-cerrar').focus();
  }

  function mostrarEnLightbox(pos) {
    posLightbox = (pos + visibles.length) % visibles.length;
    const foto = FOTOS[visibles[posLightbox]];
    const nombreCat = nombreCategoria(foto.cat);

    if (foto.img) {
      lbFigura.innerHTML =
        `<img class="lightbox-img" src="${foto.img}" alt="${foto.titulo} — Centro Geriátrico Querétaro">`;
      lbCaption.innerHTML = `
        <span class="cap-cat">${nombreCat}</span>
        <h3>${foto.titulo}</h3>
        <p>${foto.desc || ''}</p>`;
    } else {
      lbFigura.innerHTML = `
        <div class="lightbox-ph">
          ${ICON_CAM}
          <span style="font-weight:700">${foto.titulo}</span>
        </div>`;
      lbCaption.innerHTML = `
        <span class="cap-cat">${nombreCat}</span>
        <h3>${foto.titulo}</h3>
        <p>${foto.sugerencia ? 'Espacio reservado — ' + foto.sugerencia + '.' : 'Fotografía por agregar.'}</p>`;
    }

    lbContador.textContent = `${posLightbox + 1} / ${visibles.length}`;

    lbMiniaturas.querySelectorAll('.mini').forEach((m, i) => {
      m.classList.toggle('activa', i === posLightbox);
    });
  }

  function cerrarLightbox() {
    lightbox.classList.remove('abierto');
    document.body.style.overflow = '';
    if (ultimoFoco && typeof ultimoFoco.focus === 'function') ultimoFoco.focus();
  }

  function siguiente() { mostrarEnLightbox(posLightbox + 1); }
  function anterior()  { mostrarEnLightbox(posLightbox - 1); }

  lightbox.querySelector('#lb-cerrar').addEventListener('click', cerrarLightbox);
  lightbox.querySelector('#lb-next').addEventListener('click', siguiente);
  lightbox.querySelector('#lb-prev').addEventListener('click', anterior);

  // Cerrar al hacer clic fuera de la escena
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-cuerpo') ||
        e.target.classList.contains('lightbox-escena')) {
      cerrarLightbox();
    }
  });

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('abierto')) return;
    if (e.key === 'Escape')      cerrarLightbox();
    else if (e.key === 'ArrowRight') siguiente();
    else if (e.key === 'ArrowLeft')  anterior();
  });

  /* ---------- INIT ---------- */
  aplicarFiltro('todas');
})();
