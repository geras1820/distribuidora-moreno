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

  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
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
        formStatus.textContent = '¡Mensaje enviado! Te contactaremos pronto.';
        contactForm.reset();
      }).catch(() => {
        formStatus.textContent = 'Ocurrió un error al enviar. Intenta de nuevo o escríbenos por WhatsApp.';
      });
    });
  }
});
