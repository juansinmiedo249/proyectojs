import {color} from "./../view/indexView.js"
import {revertirEstilos} from "./../view/indexView.js"
import { autenticar } from "../model/get.js";


const usuario = document.querySelector("#usuario");
const name = document.querySelector("#name");
const pasword = document.querySelector("#pasword");
const cargo = document.querySelector("#cargo");
const contraseña = document.querySelector("#contraseña");
const btnRegistrar = document.querySelector("#btRegistrar");
const btnRegistrado = document.querySelector("#btRegistrado");
const btnCancelar = document.querySelector("#btCancelar");
const btnEntrar = document.querySelector("#btEntrar");
const modal = document.querySelector("#modal");
const ced = document.querySelector("#ced");

usuario.addEventListener("click", ()=>{
    color(usuario);
    revertirEstilos(contraseña);
});
contraseña.addEventListener("click",() =>{
    color(contraseña);
    revertirEstilos(usuario)
});

name.addEventListener("click",() =>{
    color(name);
    revertirEstilos(pasword);
    revertirEstilos(cargo);
    revertirEstilos(ced);
});
pasword.addEventListener("click",() =>{
    color(pasword);
    revertirEstilos(name)
    revertirEstilos(cargo);
    revertirEstilos(ced);
});
cargo.addEventListener("click",() =>{
    color(cargo);
    revertirEstilos(name);
    revertirEstilos(pasword);
    revertirEstilos(ced);
});

ced.addEventListener("click",() =>{
    color(ced);
    revertirEstilos(name);
    revertirEstilos(cargo);
    revertirEstilos(pasword);
});

btnRegistrar.addEventListener("click", ()=>{
    modal.showModal()
})

btnCancelar.addEventListener("click", () => {
    modal.close(  )
})


btnRegistrado.addEventListener("click", function () {
    // Llama a la función que maneja el envío del formulario
    enviarFormulario();
});

function enviarFormulario() {
    
    console.log("se activo lafuncion");
    const nom = name.value;
    const pasw = pasword.value;
    const carg = cargo.value;
    const cedu = ced.value;

    const nuevoEmpleado = {
        "id" : cedu,
        "nombre" : nom,
        "pasword" : pasw,
        "cargo" : carg
    }

    fetch("http://localhost:3000/empleados",{
        method : "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(nuevoEmpleado)
    })

    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud. Código de estado: ' + response.status);
        }
        return response.json();
    } )
    .then(data => {
        console.log("Empleado agregado con exito ",data);
    })

    .catch(error => {
        console.error('Error al agregar el empleado:', error);
    });
    modal.close();
}



btnEntrar.addEventListener("click", function() {
    const user = usuario.value;
    const clave = contraseña.value;

    console.log(user,clave);

   
    autenticar(user, clave);
})



/* function color(input){
    input.style.backgroundColor = "rgba(255, 255, 0, 0.489)";
    input.style.color = "white"
    
} */

