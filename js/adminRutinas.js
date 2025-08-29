import { fetchWithAuth } from './fetchWithAuth.js';
import { ROUTINE_ROUTE, EXERCISE_ROUTE } from './constantes.js';

const listaUsuarios = document.getElementById("lista-usuarios");
const modalRutina = document.getElementById("modalRutina");
const modalAgregar = document.getElementById("modalAgregarRutina");
const cerrarModal = document.getElementById("cerrarModal");
const cerrarModalAgregar = document.getElementById("cerrarModalAgregar");

const formRutina = document.getElementById("formRutina");
const formAgregarRutina = document.getElementById("formAgregarRutina");
const selectEjercicio = document.getElementById("selectEjercicio");

let rutinas = [];
let ejercicios = [];
let rutinaSeleccionada = null;

// 📌 Cargar rutinas existentes
async function cargarRutinas() {
  try {
    rutinas = await fetchWithAuth(ROUTINE_ROUTE);
    renderRutinas();
  } catch (err) {
    console.error("Error cargando rutinas:", err);
  }
}

// 📌 Cargar ejercicios para el select
async function cargarEjercicios() {
  try {
    ejercicios = await fetchWithAuth(EXERCISE_ROUTE);
    selectEjercicio.innerHTML = ejercicios
      .map(e => `<option value="${e.id}">${e.nombre} - ${e.musculo}</option>`)
      .join("");
  } catch (err) {
    console.error("Error cargando ejercicios:", err);
  }
}

// 📌 Renderizar rutinas
function renderRutinas() {
  listaUsuarios.innerHTML = rutinas.map(r => `
    <div class="user-card">
      <p><b>Rutina ID:</b> ${r.id}</p>
      <p><b>Ejercicio:</b> ${r.Exercise?.nombre || 'Sin ejercicio'}</p>
      <p><b>Series:</b> ${r.series}</p>
      <p><b>Día:</b> ${r.dia}</p>
      <div class="card-buttons">
        <button class="btn small" onclick="editarRutina(${r.id})">Editar</button>
        <button class="btn small secondary" onclick="abrirModalAgregar()">Agregar</button>
      </div>
    </div>
  `).join("");
}

// 📌 Abrir modal para editar rutina
window.editarRutina = (id) => {
  rutinaSeleccionada = rutinas.find(r => r.id === id);
  if (!rutinaSeleccionada) return;

  document.getElementById("camposRutina").innerHTML = `
    <div class="formBox">
      <label>Series:</label>
      <input type="number" name="series" value="${rutinaSeleccionada.series}" min="0">
    </div>
    <div class="formBox">
      <label>Día:</label>
      <input type="text" name="dia" value="${rutinaSeleccionada.dia}">
    </div>
  `;

  modalRutina.classList.remove("hidden");
};

// 📌 Guardar cambios en rutina
formRutina.onsubmit = async (e) => {
  e.preventDefault();
  if (!rutinaSeleccionada) return;

  const formData = new FormData(formRutina);
  const rutinaEditada = Object.fromEntries(formData.entries());

  try {
    await fetchWithAuth(`${ROUTINE_ROUTE}/${rutinaSeleccionada.id}`, {
      method: "PUT",
      body: JSON.stringify(rutinaEditada)
    });
    modalRutina.classList.add("hidden");
    await cargarRutinas();
  } catch (err) {
    console.error("Error editando rutina:", err);
  }
};

// 📌 Abrir modal para agregar
window.abrirModalAgregar = () => {
  modalAgregar.classList.remove("hidden");
};

// 📌 Agregar nueva rutina
formAgregarRutina.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(formAgregarRutina);
  const nuevaRutina = Object.fromEntries(formData.entries());

  try {
    await fetchWithAuth(ROUTINE_ROUTE, {
      method: "POST",
      body: JSON.stringify(nuevaRutina)
    });
    modalAgregar.classList.add("hidden");
    formAgregarRutina.reset();
    await cargarRutinas();
  } catch (err) {
    console.error("Error agregando rutina:", err);
  }
};

// 📌 Cerrar modales
cerrarModal.onclick = () => modalRutina.classList.add("hidden");
cerrarModalAgregar.onclick = () => modalAgregar.classList.add("hidden");

// Inicialización
await cargarEjercicios();
await cargarRutinas();
