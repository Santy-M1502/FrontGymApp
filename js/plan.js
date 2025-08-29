import { URL_BASE, PAGO_ROUTE } from './constantes.js'
import { fetchWithAuth } from './fetchWithAuth.js';

const params = new URLSearchParams(window.location.search);
const plan = params.get('plan');

let indiceActual = 0;

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
  console.log(indiceActual)
});
const planes = ["semanal", "mensual", "anual"]

async function cambiar() {
  try {
      const res = await fetchWithAuth(`${URL_BASE}${PAGO_ROUTE}/crear-preferencia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipoPlan : planes[indiceActual] })
      });
    
      const data = await res.json();
  
      window.location.href = data.init_point;
    } catch (error) {
      console.error(error);
      alert('Error al iniciar el pago');
    }
  }
