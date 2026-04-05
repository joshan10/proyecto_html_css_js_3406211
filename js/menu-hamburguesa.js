// ── MENÚ HAMBURGUESA PARA TODAS LAS PÁGINAS ────────────────────────

const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');
const mainVideo = document.getElementById('main-video');

// Abrir menú
menuToggle.addEventListener('click', () => {
  sideMenu.classList.add('active');
  menuToggle.style.opacity = '0';
  
  // Oscurecer video solo si existe (solo en player)
  if (mainVideo) {
    mainVideo.style.filter = 'brightness(0.3)';
  }
});

// Cerrar menú
function closeMenu() {
  sideMenu.classList.remove('active');
  menuToggle.style.opacity = '1';
  
  // Restaurar brillo del video solo si existe
  if (mainVideo) {
    mainVideo.style.filter = 'brightness(1)';
  }
}

// Botón de cerrar
const menuClose = document.getElementById('menu-close');
if (menuClose) {
  menuClose.addEventListener('click', closeMenu);
}

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
  if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    closeMenu();
  }
});

// Cerrar menú con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
  }
});

// Evitar que el menú afecte el cursor personalizado (solo en páginas que lo usan)
const customCursor = document.getElementById('cursor-custom') || document.getElementById('custom-cursor');
if (customCursor) {
  sideMenu.addEventListener('mouseenter', () => {
    document.body.style.cursor = 'default';
  });

  sideMenu.addEventListener('mouseleave', () => {
    document.body.style.cursor = 'none';
  });
}
