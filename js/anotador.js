// anotador.js
import { HISTORY_ROUTE, EXERCISE_ROUTE } from './constantes.js';
import { fetchWithAuth } from './fetchWithAuth.js';

const tabla = document.getElementById('tabla-anotaciones');
const btnAgregar = document.querySelector('.agregar-btn');
const modalAgregar = document.getElementById('modal-agregar');
const btnCancelar = document.getElementById('btn-cancelar');
const btnGuardar = document.getElementById('btn-guardar');
const selectEjercicio = document.getElementById('select-ejercicio');
const inputSeries = document.getElementById('input-series');
const modalTitle = document.getElementById('modal-title');

let editId = null; // id de la anotación que se está editando

// -----------------------------
// Función para cargar anotaciones
// -----------------------------
async function cargarAnotaciones() {
  try {
    const data = await fetchWithAuth(`${HISTORY_ROUTE}`, {
      credentials: 'include'
    });

    tabla.innerHTML = '';
    data.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.Exercise ? item.Exercise.nombre : item.userId}</td>
        <td>${item.series || ''}</td>
        <td>${item.date ? new Date(item.date).toLocaleString() : ''}</td>
        <td>
          <button class="editar" data-id="${item.id}">Editar</button>
          <button class="eliminar" data-id="${item.id}">Eliminar</button>
        </td>
      `;
      tabla.appendChild(tr);
    });
  } catch (error) {
    console.error('Error al cargar anotaciones:', error);
  }
}

// -----------------------------
// Función para cargar ejercicios en el select
// -----------------------------
async function cargarEjercicios() {
  try {
    const ejercicios = await fetchWithAuth(`${EXERCISE_ROUTE}`, {});

    selectEjercicio.innerHTML = '<option value="">Selecciona un ejercicio</option>';
    ejercicios.forEach(ej => {
      const option = document.createElement('option');
      option.value = ej.id;
      option.textContent = `${ej.nombre} x${ej.cantidad} (${ej.musculo})`;
      selectEjercicio.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar ejercicios:', error);
  }
}

// -----------------------------
// Abrir modal para agregar
// -----------------------------
btnAgregar.addEventListener('click', () => {
  editId = null;
  selectEjercicio.value = '';
  inputSeries.value = '';
  modalTitle.textContent = 'Agregar Anotación';
  modalAgregar.classList.add('show');
});

// -----------------------------
// Cerrar modal
// -----------------------------
btnCancelar.addEventListener('click', () => modalAgregar.classList.remove('show'));

window.addEventListener('click', (e) => {
  if (e.target === modalAgregar) modalAgregar.classList.remove('show');
});

// -----------------------------
// Guardar o editar anotación
// -----------------------------
btnGuardar.addEventListener('click', async () => {
  const exerciseId = selectEjercicio.value;
  const series = Number(inputSeries.value);

  if (!exerciseId || !series) {
    alert('Por favor completa todos los campos.');
    return;
  }

  try {
    if (editId) {
      // EDITAR
      await fetchWithAuth(`${HISTORY_ROUTE}/${editId}`, {
        method: 'PUT',
        body: JSON.stringify({ exerciseId, series })
      });
      editId = null;
    } else {
      // AGREGAR
      await fetchWithAuth(`${HISTORY_ROUTE}`, {
        method: 'POST',
        body: JSON.stringify({ exerciseId, series })
      });
    }
    modalAgregar.classList.remove('show');
    cargarAnotaciones();
  } catch (error) {
    console.error('Error al guardar anotación:', error);
  }
});

// -----------------------------
// Editar y eliminar desde la tabla
// -----------------------------
tabla.addEventListener('click', async (e) => {
  const id = e.target.dataset.id;

  if (e.target.classList.contains('editar')) {
    editId = id;
    try {
      const item = await fetchWithAuth(`${HISTORY_ROUTE}/${id}`, {});
      selectEjercicio.value = item.exerciseId;
      inputSeries.value = item.series;
      modalTitle.textContent = 'Editar Anotación';
      modalAgregar.classList.add('show');
    } catch (error) {
      console.error('Error al cargar anotación:', error);
    }
  }

  if (e.target.classList.contains('eliminar')) {
    if (!confirm('¿Seguro querés eliminar esta anotación?')) return;
    try {
      await fetchWithAuth(`${HISTORY_ROUTE}/${id}`, {});
      cargarAnotaciones();
    } catch (error) {
      console.error('Error al eliminar anotación:', error);
    }
  }
});

// -----------------------------
// Inicialización
// -----------------------------
cargarEjercicios();
cargarAnotaciones();
