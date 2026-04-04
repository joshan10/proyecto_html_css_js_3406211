const cards = document.querySelectorAll('.card');
let bgVideo = null;
let activeCard = null;

function activateCard(card) {
  if (activeCard === card) return;
  cleanup();

  activeCard = card;
  const srcVideo = card.querySelector('video');
  srcVideo.pause();

  bgVideo = document.createElement('video');
  bgVideo.id = 'video-bg';
  bgVideo.src = srcVideo.src;
  bgVideo.autoplay = true;
  bgVideo.muted = true;
  bgVideo.loop = true;
  bgVideo.playsInline = true;
  document.body.appendChild(bgVideo);

  document.body.classList.add('hovering');
  card.classList.add('active');
}

function cleanup() {
  if (activeCard) {
    const v = activeCard.querySelector('video');
    v.play();
    activeCard.classList.remove('active');
    activeCard = null;
  }
  if (bgVideo) {
    bgVideo.remove();
    bgVideo = null;
  }
  document.body.classList.remove('hovering');
}



cards.forEach(card => {
  card.addEventListener('mouseenter', () => activateCard(card));
  card.addEventListener('mouseleave', (e) => {
    // Verificar que el cursor no entró a otra card
    const to = e.relatedTarget;
    const entrando = to && to.closest('.card');
    if (!entrando) cleanup();
  });
});

document.addEventListener('mouseleave', () => cleanup());

// ── Transición index.html → indice.html ──────────────────────────
const linkIndice = document.querySelector('a[href="indice.html"]');
if (linkIndice) {
  linkIndice.addEventListener('click', e => {
    e.preventDefault();
    cards.forEach((card, i) => {
      const delay = i * 60;
      card.style.transition =
        `transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms,
         opacity 0.5s ease ${delay}ms`;
      card.style.transform = 'translateY(-100vh)';
      card.style.opacity = '0';
      const header = card.querySelector('.card-header');
      if (header) {
        header.style.transition =
          `height 0.4s ease ${delay}ms, opacity 0.4s ease ${delay}ms`;
        header.style.overflow = 'hidden';
        header.style.height = '0';
        header.style.opacity = '0';
      }
    });
    setTimeout(() => { window.location.href = 'indice.html'; },
      (cards.length - 1) * 60 + 750);
  });
}

// ── Click en video → abre player ────────────────────────────────
document.querySelectorAll('.card-media').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const card = link.closest('.card');
    const num = card.querySelector('.indice').textContent.replace(/\D/g, '');
    sessionStorage.setItem('videoActivo', num);
    sessionStorage.setItem('videoNombre',
      card.querySelector('.card-texto span:first-child').textContent);
    sessionStorage.setItem('videoAutor',
      card.querySelector('.card-texto span:last-child').textContent);

    if (bgVideo) {
      bgVideo.style.transition = 'transform 0.7s cubic-bezier(0.4,0,0.2,1)';
      bgVideo.style.transform = 'translateY(-100vh)';
    }
    setTimeout(() => { window.location.href = 'templates/player.html'; }, 750);
  });
});

// ── Info panel ───────────────────────────────────────────────────
const boxOculta = document.querySelector('.box-oculta');
const closeBtn = document.querySelector('.box-oculta nav a:last-child');

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