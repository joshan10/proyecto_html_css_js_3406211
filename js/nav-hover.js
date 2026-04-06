// ── Animación de underline en links del nav ──────────────────────
// Detecta la página actual y marca el link activo.
// Los demás links tienen animación: entra desde izquierda, sale a la derecha.

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-right ul li a');

  // Detectar la página actual por el nombre del archivo
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    // Marcar el link de la página actual como activo
    if (href === currentPage) {
      link.classList.add('nav-active');
      return; // no añadir hover al link activo
    }

    // Hover: línea entra desde la izquierda
    link.addEventListener('mouseenter', () => {
      link.classList.remove('nav-leaving');
      link.classList.add('nav-entering');
    });

    // Mouse fuera: línea sale hacia la derecha
    link.addEventListener('mouseleave', () => {
      link.classList.remove('nav-entering');
      link.classList.add('nav-leaving');
    });

    // Limpiar la clase tras terminar la animación de salida
    link.addEventListener('transitionend', (e) => {
      if (e.propertyName !== 'transform') return;
      if (link.classList.contains('nav-leaving')) {
        // Deshabilitar transición un frame antes del reset para evitar rebote
        link.classList.add('nav-no-transition');
        link.classList.remove('nav-leaving');
        requestAnimationFrame(() => {
          link.classList.remove('nav-no-transition');
        });
      }
    });
  });
});
