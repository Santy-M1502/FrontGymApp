const tabla = document.getElementById('tabla-anotaciones');
const btnAgregar = document.querySelector('.agregar-btn');
const modalAgregar = document.getElementById('modal-agregar');
const btnCancelar = document.getElementById('btn-cancelar');
const btnGuardar = document.getElementById('btn-guardar');
const selectEjercicio = document.getElementById('select-ejercicio');
const inputNotas = document.getElementById('input-notas')
import { HISTORY_ROUTE } from './constantes.js';

const token = localStorage.getItem('token');

async function cargarAnotaciones() {
  const res = await fetch(HISTORY_ROUTE, { 
    credentials: 'include',
    headers: {
        'Authorization': `Bearer ${token}`
    }
    });

  const data = await res.json();

  if (!res.ok) {
    console.error('Error al cargar anotaciones:', data);
    return;
  }

  tabla.innerHTML = '';
  data.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td style="padding: 0.75rem;">
        ${item.User ? `${item.Exercise.nombre}` : item.userId}
        </td>
        <td style="padding: 0.75rem;">
        ${item.notes || ''}
        </td>
        <td style="padding: 0.75rem;">
        ${item.Cantidad ? item.Exercise.cantidad : item.exerciseId}
        </td>
        <td style="padding: 0.75rem;">
        ${item.date ? item.date : null}
        </td>
        <td style="padding: 0.75rem;">
        <button class="editar" data-id="${item.id}" style="margin-right: 0.5rem; background-color: var(--secondary); border: none; padding: 0.3rem 0.6rem; border-radius: 4px; cursor: pointer;">Editar</button>
        <button class="eliminar" data-id="${item.id}" style="background-color: crimson; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 4px; cursor: pointer;">Eliminar</button>
        </td>
    `;
    tabla.appendChild(tr);
    });
}

btnAgregar.addEventListener('click', () => {
  selectEjercicio.value = '';
  inputNotas.value = '';
  modalAgregar.style.display = 'block';
});

btnCancelar.addEventListener('click', () => {
  modalAgregar.style.display = 'none';
});

btnGuardar.addEventListener('click', async () => {
  const exerciseId = selectEjercicio.value;
  const notes = inputNotas.value;

  if (!exerciseId) {
    alert('Por favor selecciona un ejercicio.');
    return;
  }

  const userId = localStorage.getItem('userId') || prompt('ID Usuario:'); 

  if (!userId) {
    alert('ID Usuario requerido');
    return;
  }

  await fetch(HISTORY_ROUTE, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    credentials: 'include',
    body: JSON.stringify({ userId, exerciseId, notes })
  });

  modalAgregar.style.display = 'none';
  cargarAnotaciones();
});

window.addEventListener('click', (e) => {
  if (e.target === modalAgregar) {
    modalAgregar.style.display = 'none';
  }
});

cargarAnotaciones();
