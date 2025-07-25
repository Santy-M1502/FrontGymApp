import { URL_BASE } from "./constantes.js";

const userButton = document.querySelector('.user');
const userAdmin = document.querySelector('.admin');
const formulario = document.querySelector('.formulario');

const cambiarClases = (e) =>{
    if (e) {
        e.preventDefault();
    }
    let who = '';
    if(userButton.classList.contains('select')) {
        userAdmin.classList.add('select');
        userButton.classList.remove('select');
        who = 'Email de Administrador';
    }else if(userAdmin.classList.contains('select')) {
        userButton.classList.add('select');
        userAdmin.classList.remove('select');
        who = 'Email de Usuario';
    }
    formulario.innerHTML = `
    <div class="inputs-box">
        <div class="inputs-inputs">
            <label for="email">${who}</label>
            <input type="text" id="email">
            <label for="contrasena">Contrasena</label>
            <input type="password" id="contrasena">
        </div>
        <div class="button-box">
            <button class="button-login">Log In</button>
        </div>
    </div>`;
    loguear();
}

const loguear = () =>{
    const buttonLogin = document.querySelector('.button-login');
    buttonLogin.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = document.querySelector('#email').value;
        const contrasena = document.querySelector('#contrasena').value;
        const rol = userButton.classList.contains('select')? 'user' : 'admin'
        if(!email || !contrasena){
            alert("Por favor, complete todos los campos")
        }else{
            try {
                const response = await fetch(`${URL_BASE}/login`,{
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({email, contrasena, rol})
                })
                if (!response.ok){
                    alert("Email o Contrasena incorrecta")
                    throw new Error("Error en el inicio de sesion");
                }
                const data = await response.json();
                localStorage.setItem('token', data.token);
                alert('Bienvenido')
                rol === 'admin' 
                ? window.location.href = '/html/adminHome.html' 
                : window.location.href = '/html/home.html';
            } catch (error) {
                console.error('Credenciales incorrectas', error)
            }}
    });
}


cambiarClases();
userButton.addEventListener('click', cambiarClases);
userAdmin.addEventListener('click', cambiarClases);