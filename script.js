// Configuración de EmailJS (https://www.emailjs.com)
// 1. Crea una cuenta gratuita y conecta tu Gmail (distribuidoramorenox@gmail.com) como "Service".
// 2. Crea un "Template" con variables {{nombre}}, {{correo}}, {{telefono}}, {{mensaje}}.
// 3. Reemplaza los 3 valores de abajo con los que te da tu cuenta de EmailJS.
const EMAILJS_PUBLIC_KEY = 'zkNFelGo-ol4IqYMr';
const EMAILJS_SERVICE_ID = 'service_fdbpp0b';
const EMAILJS_TEMPLATE_ID = 'template_vkgk46j';

document.addEventListener('DOMContentLoaded', () => {
  if (window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

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

  initScrollReveal();
  initBackToTop();

  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formStatus.className = 'form-status';
      formStatus.textContent = 'Enviando...';

      const nombre = document.getElementById('nombre').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const telefono = document.getElementById('telefono').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        nombre, correo, telefono, mensaje,
        // Variables de la plantilla "Contact Us" de EmailJS
        name: nombre,
        email: correo,
        title: 'Cotización desde la página web',
        time: new Date().toLocaleString('es-MX'),
        message: `Teléfono: ${telefono}\nCorreo: ${correo || '(no proporcionado)'}\n\n${mensaje}`,
      }).then(() => {
        formStatus.className = 'form-status success';
        formStatus.textContent = '¡Mensaje enviado! Te contactaremos pronto.';
        contactForm.reset();
      }).catch(() => {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Ocurrió un error al enviar. Intenta de nuevo o escríbenos por WhatsApp.';
      });
    });
  }
});

// Animaciones de entrada al hacer scroll
function initScrollReveal() {
  // Tarjetas que aparecen una tras otra dentro de su fila
  const staggered = '.feature, .segment, .value-card, .cap-card, .mv-card, .category-card, .tags span, .footer-col, .info-block';
  // Bloques que aparecen solos
  const singles = '.section h2, .section .lead, .section .lead-left, .section .section-tag, .section .btn-group, .slogan-content, .purpose-band .container, .contact-info > .btn';

  const targets = [];
  const add = (el, cls, delay = 0) => {
    if (el.closest('.reveal, .reveal-left, .reveal-right')) return;
    el.classList.add(cls);
    if (delay) el.style.transitionDelay = `${delay}s`;
    targets.push(el);
  };

  // Columnas de texto e imagen: entran desde su lado
  document.querySelectorAll('.two-col > *').forEach(el => {
    const box = el.getBoundingClientRect();
    add(el, box.left + box.width / 2 < window.innerWidth / 2 ? 'reveal-left' : 'reveal-right');
  });
  add(document.querySelector('.contact-form'), 'reveal-left');

  document.querySelectorAll(staggered).forEach(el => {
    const index = Array.from(el.parentElement.children).indexOf(el);
    add(el, 'reveal', Math.min(index, 6) * 0.08);
  });
  document.querySelectorAll(singles).forEach(el => add(el, 'reveal'));

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('visible');
      observer.unobserve(el);
      // Al terminar, quitar las clases para que los efectos hover sigan funcionando
      setTimeout(() => {
        el.classList.remove('reveal', 'reveal-left', 'reveal-right', 'visible');
        el.style.transitionDelay = '';
      }, 1400);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

// Botón para regresar arriba
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
