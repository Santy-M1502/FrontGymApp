import { URL_BASE } from "./constantes.js";
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

  fetch(`${URL_BASE}/api/exercise`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ nombre, musculo, cantidad: parseInt(cantidad) })
  })
    .then(res => res.json())
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
        fetch(`${URL_BASE}/api/exercise/${item.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
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

  fetch(`${URL_BASE}/api/exercise/${idEditando}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ nombre, musculo, cantidad })
  })
    .then(res => res.json())
    .then(() => {
      filtrar();
      document.getElementById('modalEditar').classList.add('hidden');
    });
});

function filtrar() {
  const texto = document.querySelectorAll('.input')[0].value;
  const musculo = document.querySelectorAll('.input')[1].value;
  const musculoCapitalizado = musculo.charAt(0).toUpperCase() + musculo.slice(1);

  fetch(`${URL_BASE}/api/exercise?buscar=${encodeURIComponent(texto)}&musculo=${musculoCapitalizado}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      actualizarTabla(data);
    });
}

filtrar();
