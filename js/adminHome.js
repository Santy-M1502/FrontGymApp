import { USER_ROUTE, EXERCISE_ROUTE } from './constantes.js';

const token = localStorage.getItem('token');

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
        <p><strong>${user.email}</strong></p>
      </div>
      <div>
        <p>Rol: ${user.rol}</p>
      </div>
      <div class="card-buttons">
        <button class="btn small edit-user" data-id="${user.id}">Editar</button>
        <button class="btn small delete-user" data-id="${user.id}">Eliminar</button>
      </div>
    `;
    container.appendChild(div);
  });

  document.querySelectorAll('.delete-user').forEach(btn => {
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

  document.querySelectorAll('.edit-user').forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      window.location.href = `/html/adminRegistrar.html?userId=${id}`;
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

fetch(USER_ROUTE, {
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
      </div>
      <div>
        <p>Músculo: ${ej.musculo}</p>
      </div>
      <div class="card-buttons">
        <button href="/html/adminEditar.html?ejercicioId=${ej.id}" class="btn small edit-ejercicio">Editar</button>
        <button class="btn small delete-ejercicio" data-id="${ej.id}">Eliminar</button>
      </div>
    `;
    container.appendChild(div);
  });

  document.querySelectorAll('.delete-ejercicio').forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      const res = await fetch(`${EXERCISE_ROUTE}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        todosLosEjercicios = todosLosEjercicios.filter(e => e.id !== Number(id));
        renderEjercicios();
      }
    };
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

fetch(EXERCISE_ROUTE, {
  headers: { 'Authorization': `Bearer ${token}` }
})
  .then(res => res.json())
  .then(data => {
    todosLosEjercicios = data;
    renderEjercicios();
  });
