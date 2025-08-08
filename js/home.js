import { USER_ROUTE } from './constantes.js';

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
  verificarDias();
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

async function verificarDias() {
  const token = localStorage.getItem('token');
  const start = document.getElementById('start');

  try {
    const res = await fetch(`${USER_ROUTE}/dias-restantes`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!res.ok) {
      const text = await res.text();  // para ver qué devuelve el servidor realmente
      console.error('Error en la respuesta:', text);
      start.innerHTML = '<p>Error al obtener días restantes.</p>';
      return;
    }

    const data = await res.json();

    if (!data.expirado) {
      start.innerHTML = `
        <div class="start-container">
          <h2>Te quedan</h2>
          <h3><strong>${data.diasRestantes}</strong> días</h3>
          <p>antes de que termine tu plan</p>
        </div>
      `;
    } else {
      start.innerHTML = `
        <div class="start-container">
          <h2>Tu plan ha expirado</h2>
          <p>Renueva tu suscripción para seguir disfrutando de nuestros servicios.</p>
          <button class="renovar-btn">Renovar planes</button>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error en verificarDias:', error);
    start.innerHTML = '<p>Error al cargar los días restantes.</p>';
  }
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('button-week')) {
    window.location.href = 'http://localhost:5501/html/plan.html?plan=week';
  }
  else if (event.target.classList.contains('button-month')) {
    window.location.href = 'http://localhost:5501/html/plan.html?plan=month';
  }
  else if (event.target.classList.contains('button-year')) {
    window.location.href = 'http://localhost:5501/html/plan.html?plan=year';
  }
});

document.addEventListener('DOMContentLoaded', verificarDias);