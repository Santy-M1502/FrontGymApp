import { URL_BASE } from '../js/constantes.js';

async function validarSesion() {
const res = await fetch(`${URL_BASE}/auth/validate`, {
    method: "GET",
    credentials: "include"
});

if (!res.ok) {
    window.location.href = "/html/login.html";
}
}

validarSesion();