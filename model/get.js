export function autenticar(user, clave){
    fetch("http://localhost:3000/empleados")
    .then(response => response.json())
    .then(empleados => {
            console.log(empleados);
            const empleadoAutenticado = empleados.find(empleados => empleados.nombre === user &&
                empleados.pasword === clave);
            
            console.log(empleadoAutenticado);
            
            if (empleadoAutenticado){
                localStorage.setItem('usuarioLogueado', JSON.stringify(empleadoAutenticado));
                window.location.href ="./html/skillGeneral.html"
            }else{
                alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
            }

            
                
            
    })
    .catch (error => {
        console.log("Error al autenticar ",error);
    })
}


export async  function getPerfil(user) {
    console.log(user);
    try {
        const response = await fetch(`http://localhost:3000/empleados?nombre=${user}`)
        
        // Verificar si la respuesta fue exitosa
        if (!response.ok){
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        //combierte en formato Json
        const data = await response.json()  
        console.log("data", data);
        // Verificar si la respuesta es un array no vacío
        if (data.length > 0) {
            // Si hay datos en el array, devolver el primer elemento 
            return data[0];
        } else {
            
            throw new Error('No se encontró el empleado con el ID especificado.');
        }
    }
    
    
    catch(error) {
        console.error('Error al obtener detalles del usuario:', error);
        throw error;
    };
}