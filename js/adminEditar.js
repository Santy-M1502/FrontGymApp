import { EXERCISE_ROUTE } from "./constantes.js";
import { fetchWithAuth } from "./fetchWithAuth.js";
const token = localStorage.getItem('token');

document.querySelector('.btn.secondary').addEventListener('click', filtrar);
document.querySelector('.btn.primary').addEventListener('click', () => {
  document.getElementById('modalAgregar').classList.remove('hidden');
});

document.querySelectorAll('.cerrar').forEach(btn =>
  btn.addEventListener('click', () => {
    document.getElementById('modalAgregar').classList.add('hidden');
    document.getElementById('modalEditar').classList.add('hidden');
  })
);

document.getElementById('confirmarAgregar').addEventListener('click', () => {
  const nombre = document.getElementById('nuevoNombre').value;
  const musculo = document.getElementById('nuevoMusculo').value;
  const cantidad = document.getElementById('nuevaCantidad').value;

  fetchWithAuth(`/${EXERCISE_ROUTE}`, {
    method: 'POST',
    body: JSON.stringify({ nombre, musculo, cantidad: parseInt(cantidad) })
  })
    .then(() => {
      filtrar();
      document.getElementById('modalAgregar').classList.add('hidden');
    });
});

let idEditando = null;

function actualizarTabla(data) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  data.forEach(item => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${item.nombre}</td>
      <td>${item.musculo}</td>
      <td>
        <button class="btn small edit">Editar</button>
        <button class="btn small delete">Eliminar</button>
      </td>
    `;

    // Botón editar
    fila.querySelector('.edit').addEventListener('click', () => {
      idEditando = item.id;
      document.getElementById('editarNombre').value = item.nombre;
      document.getElementById('editarMusculo').value = item.musculo;
      document.getElementById('editarCantidad').value = item.cantidad;
      document.getElementById('modalEditar').classList.remove('hidden');
    });

    // Botón eliminar
    fila.querySelector('.delete').addEventListener('click', () => {
      if (confirm("¿Estás seguro que querés eliminar este ejercicio?")) {
        fetchWithAuth(`${EXERCISE_ROUTE}/${item.id}`, {
          method: 'DELETE'
        }).then(() => filtrar());
      }
    });

    tbody.appendChild(fila);
  });
}

document.getElementById('confirmarEditar').addEventListener('click', () => {
  const nombre = document.getElementById('editarNombre').value;
  const musculo = document.getElementById('editarMusculo').value;
  const cantidad = parseInt(document.getElementById('editarCantidad').value);

  fetchWithAuth(`${EXERCISE_ROUTE}/${idEditando}`, {
    method: 'PUT',
    body: JSON.stringify({ nombre, musculo, cantidad })
  })
    .then(() => {
      filtrar();
      document.getElementById('modalEditar').classList.add('hidden');
    });
});

function filtrar() {
  const texto = document.querySelectorAll('.input')[0].value;
  const musculo = document.querySelectorAll('.input')[1].value;
  const musculoCapitalizado = musculo.charAt(0).toUpperCase() + musculo.slice(1);

  fetchWithAuth(`${EXERCISE_ROUTE}?buscar=${encodeURIComponent(texto)}&musculo=${musculoCapitalizado}`,)
    .then(data => {
      actualizarTabla(data);
    });
}

filtrar();
