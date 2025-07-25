import { USER_ROUTE } from "./constantes.js";

const token = localStorage.getItem('token');

const form = document.querySelector('.formBox');

form.addEventListener('submit', async (e) => {
    try{
        e.preventDefault()
        const nombre = e.target[0].value
        const apellido = e.target[1].value
        const dni = e.target[2].value
        const telefono = e.target[3].value
        const email = e.target[4].value
        const contrasena = e.target[5].value
        const plan = e.target[6].value
        const rol = e.target[7].value

        const response = await fetch(`${USER_ROUTE}/`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({contrasena, nombre, apellido, dni, telefono, email, plan, rol})
            })
            if (!response.ok){
                alert("Email o Contrasena incorrecta")
                throw new Error("Error en el inicio de sesion");
            }
            alert('Usuario/ Admin registrado')
            window.location.href = '/html/adminRegistrar.html'
        }catch (error){
            console.log('Error en el registrado ', error)
        }
})