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
        who = 'Numero de Administrador';
    }else if(userAdmin.classList.contains('select')) {
        userButton.classList.add('select');
        userAdmin.classList.remove('select');
        who = 'Nombre de Usuario';
    }
    formulario.innerHTML = `
    <div class="inputs-box">
        <div class="inputs-inputs">
            <label for="nombre">${who}</label>
            <input type="text" id="nombre">
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
    buttonLogin.addEventListener('click', (e) => {
        e.preventDefault();
        const nombre = document.querySelector('#nombre').value;
        const contrasena = document.querySelector('#contrasena').value;
        if (nombre && contrasena) {
            window.location.href = `./home.html`
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });
}


cambiarClases();
userButton.addEventListener('click', cambiarClases);
userAdmin.addEventListener('click', cambiarClases);