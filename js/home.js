// Animación de líneas en el fondo

function agregarLineasAnimadas(idSeccion, cantidad = 10) {
  const seccion = document.getElementById(idSeccion);
  const ancho = seccion.offsetWidth;

  for (let i = 0; i < cantidad; i++) {
    const linea = document.createElement('div');
    linea.classList.add('linea-fondo');

    const left = Math.random() * ancho;
    linea.style.left = `${left}px`;

    linea.style.animationDelay = `${Math.random() * 5}s`;
    linea.style.animationDuration = `${3 + Math.random() * 5}s`;

    seccion.appendChild(linea);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  agregarLineasAnimadas('start', 15);
});

// Slider de imágenes

let indiceActual = 0;
const slides = document.querySelectorAll('.slide');

function mostrarSlide(indice) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('activo', i === indice);
  });
}

document.querySelector('.flecha.izquierda').addEventListener('click', () => {
  indiceActual = (indiceActual - 1 + slides.length) % slides.length;
  mostrarSlide(indiceActual);
});

document.querySelector('.flecha.derecha').addEventListener('click', () => {
  indiceActual = (indiceActual + 1) % slides.length;
  mostrarSlide(indiceActual);
});

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
