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



// Cambiar mouseenter de .card a .card-media
document.querySelectorAll('.card-media').forEach(media => {
  media.addEventListener('mouseenter', () => {
    const card = media.closest('.card');
    activateCard(card);
  });

  media.addEventListener('mouseleave', (e) => {
    const to = e.relatedTarget;
    const entrando = to && to.closest('.card-media');
    if (!entrando) cleanup();
  });
});

document.addEventListener('mouseleave', () => cleanup());

// ── Animación de ENTRADA desde indice.html → index.html ──────────
// Si llegamos desde indice, los videos (.card-media) entran de arriba hacia abajo
if (sessionStorage.getItem('transicionDesdeIndice') === '1') {
  sessionStorage.removeItem('transicionDesdeIndice');
  const medias = document.querySelectorAll('.card-media');
  medias.forEach(media => {
    media.style.transform = 'translateY(-110vh)';
    media.style.opacity = '0';
    media.style.transition = 'none';
  });
  // Doble rAF para asegurar que el estado inicial se pinta antes de animar
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      medias.forEach((media, i) => {
        const delay = i * 60;
        media.style.transition =
          `transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
           opacity 0.55s ease ${delay}ms`;
        media.style.transform = 'translateY(0)';
        media.style.opacity = '';
      });
    });
  });
}

// ── Transición index.html → indice.html ──────────────────────────
// Solo los videos (.card-media) suben y desaparecen con stagger
document.querySelectorAll('a[href="indice.html"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    cleanup();
    const medias = document.querySelectorAll('.card-media');
    const total = medias.length;
    medias.forEach((media, i) => {
      const delay = i * 55;
      media.style.transition =
        `transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms,
         opacity 0.5s ease ${delay}ms`;
      media.style.transform = 'translateY(-110vh)';
      media.style.opacity = '0';
    });
    sessionStorage.setItem('transicionDesdeIndex', '1');
    setTimeout(() => { window.location.href = 'indice.html'; },
      (total - 1) * 55 + 750);
  });
});

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