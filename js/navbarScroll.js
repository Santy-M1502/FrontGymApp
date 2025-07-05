// Efecto de ocultar el header al hacer scroll

let ultimoScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const scrollActual = window.pageYOffset;

  if (scrollActual > ultimoScroll && scrollActual > 100) {
    // Bajando
    header.classList.add('header-oculto');
  } else {
    // Subiendo
    header.classList.remove('header-oculto');
  }

  ultimoScroll = scrollActual;
});