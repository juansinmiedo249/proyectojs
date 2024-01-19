import {getPerfil} from "./../model/get.js"

const userActivo = document.querySelector("#userActivo");
const btnPerfil = document.querySelector("#perfil"); 
const formPerfil = document.querySelector("#formPerfil");
const modalPerfil = document.querySelector("#modalPerfil");
const btnActualizar = document.querySelector("#btActualizar");
const btnEliminar = document.querySelector("#btEliminar");


const usuarioLogueadoString = localStorage.getItem('usuarioLogueado');
const usuarioLogueado = JSON.parse(usuarioLogueadoString);

userActivo.textContent = usuarioLogueado.nombre;

btnActualizar.addEventListener('click', modificarEmpleado)
btnEliminar.addEventListener('click', borrarEmpleado)

btnPerfil.addEventListener("click", async()=>{
    
    try{
        const empleado = await getPerfil(usuarioLogueado.nombre);
        formPerfil.querySelector('#namePerfil').value = empleado.nombre;
        formPerfil.querySelector('#paswordPerfil').value = empleado.pasword;
        formPerfil.querySelector('#cargoPerfil').value = empleado.cargo;

        modalPerfil.showModal()
    }catch (error) {
        console.error('Error al obtener detalles del usuario:', error);
        
    }
    
})


function modificarEmpleado() {
    
    const idEmpleadoModificar = JSON.parse(localStorage.getItem('usuarioLogueado')).id;
    const nom = formPerfil.querySelector('#namePerfil').value;
    const pasw = formPerfil.querySelector('#paswordPerfil').value;
    const carg = formPerfil.querySelector('#cargoPerfil').value;
  

    const enpleadoModificado = {
        "id" : idEmpleadoModificar,
        "nombre" : nom,
        "pasword" : pasw,
        "cargo" : carg
    }

    fetch(`http://localhost:3000/empleados/${idEmpleadoModificar}`,{
        method : "PUT",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(enpleadoModificado)
    })

    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud. Código de estado: ' + response.status);
        }
        localStorage.setItem('usuarioLogueado', JSON.stringify(enpleadoModificado));
        return response.json();
        
    } )
    .then(data => {
        console.log("Empleado agregado con exito ",data);
    })

    .catch(error => {
        console.error('Error al agregar el empleado:', error);
    });
    modalPerfil.close();
}

function borrarEmpleado() {
    
    const idEmpleadoEliminar = usuarioLogueado.id
    
    /* const nom = formPerfil.querySelector('#namePerfil').value;
    const pasw = formPerfil.querySelector('#paswordPerfil').value;
    const carg = formPerfil.querySelector('#cargoPerfil').value;
   */

  /*   const enpleadoModificado = {
        
        "nombre" : nom,
        "pasword" : pasw,
        "cargo" : carg
    } */

    fetch(`http://localhost:3000/empleados/${idEmpleadoEliminar}`,{
        method : "DELETE",
        headers: {
            'Content-Type':'application/json'
        }
        /* body: JSON.stringify(enpleadoModificado) */
    })

    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud. Código de estado: ' + response.status);
        }
       
        localStorage.removeItem('usuarioLogueado');
        window.location.href = "../index.html";
    } )
    

    .catch(error => {
        console.error('Error al agregar el empleado:', error);
    });
    modalPerfil.close();
}