const tabla = document.getElementById("tabla-rutina");
const userId = localStorage.getItem("userId") || 1;

const token = localStorage.getItem("token");

async function cargarRutina() {
  try {
    const res = await fetch(`http://localhost:3000/api/rutina/usuario/${userId}`,{
         headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) throw new Error("Error al cargar la rutina");

    const ejercicios = await res.json();
    tabla.innerHTML = "";
    ejercicios.forEach(rutina => {
      const ej = rutina.Exercise;
      const row = `
        <tr>
          <td>${ej.nombre}</td>
          <td>${rutina.series}</td>
          <td>${ej.musculo}</td>
          <td>${rutina.dia == undefined ? "no especificado" : rutina.dia}</td>
        </tr>
      `;
      tabla.innerHTML += row;
    });
  } catch (error) {
    tabla.innerHTML = `<tr><td colspan="3">No se pudo cargar la rutina</td></tr>`;
    console.error(error);
  }
}

cargarRutina();
