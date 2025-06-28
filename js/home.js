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

const verificarDias = () =>{
  const start = document.getElementById('start');
  let texto = ''
  if(true){
    texto = `
    <div class="start-container">
        <h2>Te quedan</h2>
        <h3><strong>20</strong> dias</h3>
        <p>antes de que termine tu plan</p>
    </div>
    `
  }
  else{
      texto = `
      <div class="start-container">
          <h2>Tu plan ha expirado</h2>
          <p>Renueva tu suscripción para seguir disfrutando de nuestros servicios.</p>
          <button class="renovar-btn">Renovar planes</button>
      </div>
      `
  }
  start.innerHTML = texto;
}