//Para que se vea el email en el usuario 
let user = localStorage.getItem("User");
let userEmail = document.getElementById('emailUser');
userEmail.value = user; 

//Funcion al darle click al boton "guardar cambios" se actualice el nombre y apellido
document.getElementById("guardarCambios").addEventListener("click", function() {
    const nuevoNombre = document.getElementById("nombreNuevoUser").value;
    const nuevoApellido = document.getElementById("apellidoNuevoUser").value;

    // Guardar los nuevos datos en el localStorage
    localStorage.setItem("nombreUsuario", nuevoNombre);
    localStorage.setItem("apellidoUsuario", nuevoApellido);

    // Actualizar el nombre y apellido ingresado en los inputs
    document.getElementById("nombreUser").textContent = nuevoNombre;
    document.getElementById("apellidoUser").textContent = nuevoApellido;
});

// Comprobar si hay datos en el localStorage al cargar la página
window.addEventListener("load", function() {
    const nombreGuardado = localStorage.getItem("nombreUsuario");
    const apellidoGuardado = localStorage.getItem("apellidoUsuario");

    if (nombreGuardado) {
        document.getElementById("nombreUser").textContent = nombreGuardado;
    }
    if (apellidoGuardado) {
        document.getElementById("apellidoUser").textContent = apellidoGuardado;
    }
});


// Para cambiar el borde de las cajas de Perfil

document.addEventListener("DOMContentLoaded", function() {
    const cajasTexto = document.querySelectorAll(".inputDatosUser");
  
    cajasTexto.forEach(caja => {
      caja.addEventListener("click", function () {
        // Restablecer el borde de todas las cajas de texto
        cajasTexto.forEach(c => c.classList.remove("active"));
        // Establecer el borde de la caja de texto clicada
        caja.classList.add("active");
      });
    });
  
    // Cuando se haga clic en cualquier lugar del documento, se restablece el borde de la caja de texto activa
    document.addEventListener("click", function (event) {
      if (!event.target.classList.contains("inputDatosUser")) {
        cajasTexto.forEach(c => c.classList.remove("active"));
      }
    });
  });