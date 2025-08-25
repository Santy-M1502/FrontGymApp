import { URL_BASE } from "./constantes.js";

const formulario = document.querySelector(".formulario");

formulario.innerHTML = `
<div class="inputs-box">
    <div class="inputs-inputs">
        <label for="email">Email</label>
        <input type="email" id="email" required>
        <label for="contrasena">Contraseña</label>
        <input type="password" id="contrasena" required>
    </div>
    <div class="button-box">
        <button class="button-login">Log In</button>
    </div>
</div>
`;

const loguear = () => {
  const buttonLogin = document.querySelector(".button-login");
  buttonLogin.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const contrasena = document.querySelector("#contrasena").value;

    if (!email || !contrasena) return alert("Complete todos los campos");

    try {
      const res = await fetch(`${URL_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasena }),
        credentials: "include"
      });

      if (!res.ok) {
        const err = await res.json();
        return alert(err.msg || "Error de login");
      }

      const data = await res.json();

      // Guardamos solo info de usuario para UI/redirección
      localStorage.setItem("userRol", data.user.rol);
      localStorage.setItem("userName", data.user.nombre);

      window.location.href =
        data.user.rol === "admin"
          ? "/html/adminHome.html"
          : "/html/home.html";

    } catch (error) {
      console.error("Error login", error);
      alert("Error al iniciar sesión");
    }
  });
};

loguear();
