import { USER_ROUTE, EXERCISE_ROUTE, PLAN_ROUTE } from './constantes.js';

const token = localStorage.getItem('token');

const userSection = document.getElementById('usuarios');
const ejercicioSection = document.getElementById('ejercicios');

let todosLosUsuarios = [];
let todosLosEjercicios = [];
let mostrarUsuarios = 5;
let mostrarEjercicios = 5;

// ==================== USUARIOS ====================

function renderUsuarios() {
  const container = document.getElementById('lista-usuarios');
  container.innerHTML = '';

  todosLosUsuarios.slice(0, mostrarUsuarios).forEach(user => {
    const div = document.createElement('div');
    div.classList.add('user-card');
    div.innerHTML = `
      <div>
        <p><strong>${user.nombre} ${user.apellido}</strong></p>
        <p>Rol: ${user.rol}</p>
      </div>
      <div>
        <button class="btn small delete" data-id="${user.id}">Eliminar</button>
      </div>
    `;
    container.appendChild(div);
  });

  // Eliminar botones previos
  document.querySelectorAll('.delete').forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      const res = await fetch(`${USER_ROUTE}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        todosLosUsuarios = todosLosUsuarios.filter(u => u.id !== Number(id));
        renderUsuarios();
      }
    };
  });
}

document.getElementById('btn-usuarios-mas').onclick = () => {
  mostrarUsuarios += 5;
  renderUsuarios();
};
document.getElementById('btn-usuarios-todos').onclick = () => {
  mostrarUsuarios = todosLosUsuarios.length;
  renderUsuarios();
};

fetch(`${USER_ROUTE}`, {
  headers: { 'Authorization': `Bearer ${token}` }
})
  .then(res => res.json())
  .then(data => {
    todosLosUsuarios = data;
    renderUsuarios();
  });

// ==================== EJERCICIOS ====================

function renderEjercicios() {
  const container = document.getElementById('lista-ejercicios');
  container.innerHTML = '';

  todosLosEjercicios.slice(0, mostrarEjercicios).forEach(ej => {
    const div = document.createElement('div');
    div.classList.add('ejercicio-card');
    div.innerHTML = `
      <div>
        <p><strong>${ej.nombre}</strong></p>
        <p>Músculo: ${ej.musculo}</p>
      </div>
      <a href="/html/adminEditar.html" class="btn small">Editar</a>
    `;
    container.appendChild(div);
  });
}

document.getElementById('btn-ejercicios-mas').onclick = () => {
  mostrarEjercicios += 5;
  renderEjercicios();
};
document.getElementById('btn-ejercicios-todos').onclick = () => {
  mostrarEjercicios = todosLosEjercicios.length;
  renderEjercicios();
};

fetch(`${EXERCISE_ROUTE}`, {
  headers: { 'Authorization': `Bearer ${token}` }
})
  .then(res => res.json())
  .then(data => {
    todosLosEjercicios = data;
    renderEjercicios();
  });
