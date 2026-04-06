const cards = document.querySelectorAll('.card');
let videoEl = null;

// Guardar y fijar posiciones de los headers
function getPositions() {
  cards.forEach(card => {
    const header = card.querySelector('.card-header');
    if (!header) return;
    const rect = header.getBoundingClientRect();
    header.dataset.top = rect.top + window.scrollY;
    header.dataset.left = rect.left;
  });
}

function pinHeaders() {
  cards.forEach(card => {
    const header = card.querySelector('.card-header');
    if (!header) return;
    header.style.position = 'fixed';
    header.style.top = header.dataset.top + 'px';
    header.style.left = header.dataset.left + 'px';
    header.style.zIndex = '102';
    header.style.opacity = '0.4';
    header.style.pointerEvents = 'none';
    header.style.color = '#fff';
  });
}

function unpinHeaders() {
  cards.forEach(card => {
    const header = card.querySelector('.card-header');
    if (!header) return;
    header.style.position = '';
    header.style.top = '';
    header.style.left = '';
    header.style.zIndex = '';
    header.style.opacity = '';
    header.style.pointerEvents = '';
  });
}

window.addEventListener('load', getPositions);

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const num = card.querySelector('.indice').textContent.replace(/\D/g, '');

    videoEl = document.createElement('video');
    videoEl.id = 'video-hover';
    videoEl.src = `media/edit${num}.mp4`;
    videoEl.autoplay = true;
    videoEl.muted = true;
    videoEl.loop = true;
    videoEl.playsInline = true;
    document.body.appendChild(videoEl);

    getPositions();
    pinHeaders();
    document.body.classList.add('has-hover-video');
    card.classList.add('is-active');
    cards.forEach(c => { if (c !== card) c.classList.add('is-hidden'); });
  });

  card.addEventListener('mouseleave', () => {
    if (videoEl) { videoEl.remove(); videoEl = null; }
    document.body.classList.remove('has-hover-video');
    card.classList.remove('is-active');
    cards.forEach(c => c.classList.remove('is-hidden'));
    unpinHeaders();
  });

  // ── Click en card → abre player ──────────────────────────────
  card.addEventListener('click', e => {
    e.preventDefault();
    const num = card.querySelector('.indice').textContent.replace(/\D/g, '');
    sessionStorage.setItem('videoActivo', num);
    sessionStorage.setItem('videoNombre',
      card.querySelector('.card-texto span:first-child').textContent);
    sessionStorage.setItem('videoAutor',
      card.querySelector('.card-texto span:last-child').textContent);

    // Animar el video hover subiendo antes de navegar
    if (videoEl) {
      videoEl.style.transition = 'transform 0.7s cubic-bezier(0.4,0,0.2,1)';
      videoEl.style.transform = 'translateY(-100vh)';
    }
    setTimeout(() => { window.location.href = 'templates/player.html'; }, 750);
  });
});

// Quitar hover al salir de .home
const home = document.querySelector('.home');
if (home) {
  home.addEventListener('mouseleave', () => {
    if (videoEl) { videoEl.remove(); videoEl = null; }
    document.body.classList.remove('has-hover-video');
    cards.forEach(c => {
      c.classList.remove('is-active');
      c.classList.remove('is-hidden');
    });
    unpinHeaders();
  });
}

// ── Transición indice.html → index.html ──────────────────────────
// Sin animación en indice: solo navega y pone el flag para que index.js
// anime los videos entrando desde arriba al llegar a index.html
document.querySelectorAll('a[href="index.html"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    if (videoEl) { videoEl.remove(); videoEl = null; }
    sessionStorage.setItem('transicionDesdeIndice', '1');
    window.location.href = 'index.html';
  });
});

// ── Info panel ───────────────────────────────────────────────────
const boxOculta = document.querySelector('.box-oculta');
const closeBtn = document.querySelector('.box-close');

document.querySelectorAll('.nav-right a').forEach(a => {
  if (a.textContent.trim().toLowerCase() === 'info') {
    a.addEventListener('click', e => {
      e.preventDefault();
      if (boxOculta) boxOculta.classList.add('visible');
    });
  }
});

if (closeBtn) {
  closeBtn.addEventListener('click', e => {
    e.preventDefault();
    boxOculta.classList.remove('visible');
  });
}