import { USER_ROUTE, EXERCISE_ROUTE } from './constantes.js';
import { fetchWithAuth } from './fetchWithAuth.js';

let todosLosUsuarios = [];
let todosLosEjercicios = [];
let mostrarUsuarios = 5;
let mostrarEjercicios = 5;

// ==================== USUARIOS ====================

async function loadUsuarios() {
  try {
    todosLosUsuarios = await fetchWithAuth(USER_ROUTE);
    renderUsuarios();
  } catch (err) {
    console.error("Error cargando usuarios:", err);
  }
}

function renderUsuarios(filtrado = todosLosUsuarios) {
  const container = document.getElementById('lista-usuarios');
  container.innerHTML = '';

  if (!filtrado || filtrado.length === 0) {
    container.innerHTML = `<p>No hay usuarios que coincidan.</p>`;
    return;
  }

  filtrado.slice(0, mostrarUsuarios).forEach(user => {
    const div = document.createElement('div');
    div.classList.add('user-card');
    div.innerHTML = `
      <div><p><strong>${user.email}</strong></p></div>
      <div><p>Rol: ${user.rol}</p></div>
      <div class="card-buttons">
        <button class="btn small edit-user" data-id="${user.id}">Editar</button>
        <button class="btn small delete-user" data-id="${user.id}">Eliminar</button>
      </div>
    `;
    container.appendChild(div);
  });

  container.querySelectorAll('.delete-user').forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      try {
        await fetchWithAuth(`${USER_ROUTE}/${id}`, { method: 'DELETE' });
        todosLosUsuarios = todosLosUsuarios.filter(u => u.id !== Number(id));
        renderUsuarios();
      } catch (err) {
        console.error("Error eliminando usuario:", err);
      }
    };
  });

  container.querySelectorAll('.edit-user').forEach(btn => {
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

// ==================== EJERCICIOS ====================

async function loadEjercicios() {
  try {
    todosLosEjercicios = await fetchWithAuth(EXERCISE_ROUTE);
    renderEjercicios();
  } catch (err) {
    console.error("Error cargando ejercicios:", err);
  }
}

function renderEjercicios(filtrado = todosLosEjercicios) {
  const container = document.getElementById('lista-ejercicios');
  container.innerHTML = '';

  if (!filtrado || filtrado.length === 0) {
    container.innerHTML = `<p>No hay ejercicios que coincidan.</p>`;
    return;
  }

  filtrado.slice(0, mostrarEjercicios).forEach(ej => {
    const div = document.createElement('div');
    div.classList.add('ejercicio-card');
    div.innerHTML = `
      <div><p><strong>${ej.nombre}</strong></p></div>
      <div><p>Músculo: ${ej.musculo}</p></div>
      <div class="card-buttons">
        <button class="btn small edit-ejercicio" onclick="window.location.href='/html/adminEditar.html?ejercicioId=${ej.id}'">Editar</button>
        <button class="btn small delete-ejercicio" data-id="${ej.id}">Eliminar</button>
      </div>
    `;
    container.appendChild(div);
  });

  container.querySelectorAll('.delete-ejercicio').forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      try {
        await fetchWithAuth(`${EXERCISE_ROUTE}/${id}`, { method: 'DELETE' });
        todosLosEjercicios = todosLosEjercicios.filter(e => e.id !== Number(id));
        renderEjercicios();
      } catch (err) {
        console.error("Error eliminando ejercicio:", err);
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

// ==================== BUSQUEDAS ====================

const searchUsers = document.querySelector(".searchUsers");
const searchExercices = document.querySelector(".searchExercices");

searchUsers.addEventListener('submit', async (e) => {
  e.preventDefault();
  const valor = e.target[0].value.trim();
  if (!valor) return renderUsuarios();

  try {
    const filtrado = await fetchWithAuth(`${USER_ROUTE}/search`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valor })
    });
    renderUsuarios(filtrado);
  } catch (err) {
    console.error("Error buscando usuarios:", err);
  }
});

searchExercices.addEventListener('submit', async (e) => {
  e.preventDefault();
  const valor = e.target[0].value.trim();
  if (!valor) return renderEjercicios();

  try {
    const filtrado = await fetchWithAuth(`${EXERCISE_ROUTE}/search`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valor })
    });
    renderEjercicios(filtrado);
  } catch (err) {
    console.error("Error buscando ejercicios:", err);
  }
});

// ==================== INICIO ====================

loadUsuarios();
loadEjercicios();
