document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  // En móvil, permitir tocar para abrir/cerrar submenús
  document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 720) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  // Cerrar menú móvil al elegir un enlace
  document.querySelectorAll('.main-nav a:not(.has-dropdown > a)').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });

  document.getElementById('year').textContent = new Date().getFullYear();
});
