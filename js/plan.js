// Slider de imágenes

let indiceActual = 0;

const params = new URLSearchParams(window.location.search);
const plan = params.get('plan');

if (plan == "week") {
  indiceActual = 0;
}else if (plan == "month") {
 indiceActual = 1;
} else if (plan == "year") {
 indiceActual = 2;
}

const slides = document.querySelectorAll('.slide');

function mostrarSlide(indice) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('activo', i === indice);
  });
}

mostrarSlide(indiceActual)

document.querySelector('.flecha.izquierda').addEventListener('click', () => {
  indiceActual = (indiceActual - 1 + slides.length) % slides.length;
  mostrarSlide(indiceActual);
});

document.querySelector('.flecha.derecha').addEventListener('click', () => {
  indiceActual = (indiceActual + 1) % slides.length;
  mostrarSlide(indiceActual);
});