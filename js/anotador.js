const tabla = document.getElementById('tabla-anotaciones');
const btnAgregar = document.querySelector('.agregar-btn');
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
        ${item.Exercise ? item.Exercise.nombre : item.exerciseId}
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

btnAgregar.addEventListener('click', async () => {
  const userId = prompt('ID Usuario:');
  const exerciseId = prompt('ID Ejercicio:');
  const notes = prompt('Notas:');

  if (!userId || !exerciseId) return alert('Datos incompletos');

  await fetch(HISTORY_ROUTE, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
     },
    credentials: 'include',
    body: JSON.stringify({ userId, exerciseId, notes })
  });

  cargarAnotaciones();
});

tabla.addEventListener('click', async (e) => {
  if (e.target.classList.contains('eliminar')) {
    const id = e.target.dataset.id;
    await fetch(`/api/history/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    cargarAnotaciones();
  }

  if (e.target.classList.contains('editar')) {
    const id = e.target.dataset.id;
    const notes = prompt('Nueva nota:');
    if (notes !== null) {
      await fetch(`${HISTORY_ROUTE}/${id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` },
        credentials: 'include',
        body: JSON.stringify({ notes })
      });
      cargarAnotaciones();
    }
  }
});

cargarAnotaciones();
