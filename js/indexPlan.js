const parametro = new URLSearchParams(window.location.search)
const tipoPlan = parametro.get('tipoPlan')

const planInfo = document.querySelector('.plan-info')

const planSemanal = document.querySelector('.semanal')
const planMensual = document.querySelector('.mensual')
const planAnual = document.querySelector('.anual')

const main = document.querySelector('.main')

const elejirPlan = (tipo) =>{
    if(tipo == 'semanal'){
        planSemanal.checked = true
        main.style.backgroundColor = 'var(--bg-dark)'
    }
    else if(tipo == 'mensual'){
        planMensual.checked = true
        main.style.backgroundColor = 'var(--secondary)'
    }
    else{
        planAnual.checked = true
        main.style.backgroundColor = 'var(--primary)'
    }
}

const mostrarPlan = (tipo) => {
  planInfo.innerHTML = '';

  const titulo = document.createElement('h2');
  titulo.textContent = `Plan ${tipo}`;
  planInfo.appendChild(titulo);

  const listaBeneficios = document.createElement('ul');
  listaBeneficios.innerHTML += `
        <li>Acceso ilimitado a todos los contenidos</li>
        <li>Rutinas personalizadas cada semana</li>
        <li>Acceso a clases grupales</li>
    `;
    document.querySelector('.precio').innerHTML = '$7500'

  if (tipo === 'mensual') {
    listaBeneficios.innerHTML += `
        <li>Seguimiento con entrenador personal</li>
        <li>Acceso exclusivo a comunidad privada</li>
        <li>Casilleros personales</li>
    `;
    document.querySelector('.precio').innerHTML = '$25000 /mes'
  }

  if (tipo === 'anual') {
    listaBeneficios.innerHTML += `
        <li>Seguimiento con entrenador personal</li>
        <li>Acceso exclusivo a comunidad privada</li>
        <li>Casilleros personales</li>
        <li>Acceso a spa, zumba y duchas</li>
        <li>Asesoramiento de nutricionista personal</li>
    `;
    document.querySelector('.precio').innerHTML = '$280000 /anual'
  }

  planInfo.appendChild(listaBeneficios);
};


document.querySelectorAll('.plan').forEach(e => {
    e.addEventListener('input', () =>{
        if(e.classList.contains('semanal')){
            mostrarPlan('semanal')
            main.style.backgroundColor = 'var(--bg-dark)'
        }
        else if(e.classList.contains('mensual')){
            mostrarPlan('mensual')
            main.style.backgroundColor = 'var(--secondary)'
        }
        else if(e.classList.contains('anual')){
            mostrarPlan('anual')
            main.style.backgroundColor = 'var(--primary)'
        }
    })
});

mostrarPlan(tipoPlan)
elejirPlan(tipoPlan)