import { fetchWithAuth } from './fetchWithAuth.js';
import { ROUTINE_ROUTE } from './constantes.js';

const tabla = document.getElementById("tabla-rutina");
const userId = localStorage.getItem("userId") || 1;


async function cargarRutina() {
  try {
    const rutina = await fetchWithAuth(`${ROUTINE_ROUTE}/${userId}`, {});
    tabla.innerHTML = "";
    console.log(rutina);

    const ej = rutina.Exercise;

    const row = `
      <tr>
        <td>${ej.nombre}</td>
        <td>${rutina.series}</td>
        <td>${ej.musculo}</td>
        <td>${rutina.dia ?? "no especificado"}</td>
      </tr>
    `;
    tabla.innerHTML += row;

  } catch (error) {
    tabla.innerHTML = `<tr><td colspan="4">No se pudo cargar la rutina</td></tr>`;
    console.error(error);
  }
}

cargarRutina();
