import { URL_BASE, USER_ROUTE } from "./constantes.js";
import { fetchWithAuth } from "./fetchWithAuth.js";

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    const form = document.querySelector('.formBox');
    const listaUsuarios = document.getElementById('lista-usuarios');
    const modal = document.getElementById('modalEditar');
    const formEditar = document.getElementById('formEditarUsuario');
    const cerrarBtn = document.getElementById('cerrarModal');
    let usuarioEditandoId = null;
    let usuariosGlobal = [];

    // ===================== REGISTRO =====================
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const nombre = e.target[0].value;
            const apellido = e.target[1].value;
            const dni = e.target[2].value;
            const telefono = e.target[3].value;
            const email = e.target[4].value;
            const contrasena = e.target[5].value;
            const idPlan = e.target[6].value;
            const rol = e.target[7].value;

            const response = await fetchWithAuth(`${USER_ROUTE}/`, {
                method: 'POST',
                body: JSON.stringify({ contrasena, nombre, apellido, dni, telefono, email, idPlan, rol })
            });

            if (!response.ok) {
                alert("Error al registrar usuario");
                throw new Error("Error en el registro");
            }

            alert('Usuario registrado correctamente');
            form.reset();
            cargarUsuarios();

        } catch (error) {
            console.error('Error en el registrado', error);
        }
    });

    // ===================== CARGAR Y MOSTRAR USUARIOS =====================
    async function cargarUsuarios() {
        const usuarios = await fetchWithAuth(`${USER_ROUTE}`);
        usuariosGlobal = usuarios;
        listaUsuarios.innerHTML = '';
        usuarios.forEach((user, index) => {
            const div = document.createElement('div');
            div.classList.add('user-card');
            div.innerHTML = `
                <div>
                    <p><strong>${user.email}</strong></p>
                    <p>Rol: ${user.rol}</p>
                </div>
                <div>
                    <button class="btn small edit-btn" data-index="${index}">✏️</button>
                    <button class="btn small delete" data-id="${user.id}">🗑️</button>
                </div>
            `;
            listaUsuarios.appendChild(div);
        });

        document.querySelectorAll('.delete').forEach(btn => {
            btn.onclick = async () => {
                const id = btn.dataset.id;
                await fetchWithAuth(`${USER_ROUTE}/${id}`, {
                    method: 'DELETE'
                });
                cargarUsuarios();
            };
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.onclick = () => {
                const index = btn.dataset.index;
                const user = usuariosGlobal[index];
                usuarioEditandoId = user.id;

                formEditar['edit-nombre'].value = user.nombre || '';
                formEditar['edit-apellido'].value = user.apellido || '';
                formEditar['edit-dni'].value = user.dni || '';
                formEditar['edit-telefono'].value = user.telefono || '';
                formEditar['edit-email'].value = user.email || '';
                formEditar['edit-plan'].value = user.idPlan || '';
                formEditar['edit-rol'].value = user.rol || 'user';

                modal.classList.remove('hidden');
            };
        });
    }

    cargarUsuarios();

    // ===================== MODAL FUNCIONALIDAD =====================
    formEditar.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const updatedUser = {
                nombre: formEditar['edit-nombre'].value,
                apellido: formEditar['edit-apellido'].value,
                dni: formEditar['edit-dni'].value,
                telefono: formEditar['edit-telefono'].value,
                email: formEditar['edit-email'].value,
                idPlan: formEditar['edit-plan'].value,
                rol: formEditar['edit-rol'].value
            };
            const res = await fetchWithAuth(`${USER_ROUTE}/${usuarioEditandoId}`, {
                method: 'PUT',
                body: JSON.stringify(updatedUser)
            });
            
            alert('Usuario actualizado correctamente');
            modal.classList.add('hidden');
            cargarUsuarios();
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            alert('Error al guardar cambios');
        }
    });

    // ===================== CERRAR MODAL =====================
    cerrarBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.add('hidden');
        }
    });
});
