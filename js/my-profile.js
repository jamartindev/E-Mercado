//Para que se vea el email en el usuario 
let user = localStorage.getItem("User");
let userEmail = document.getElementById('emailUser');
user.value = userEmail; 

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
  function validarPerfil(){
    let userPrimerNombre = document.getElementById("nombreNuevoUser").value;
    let userSegundoNombre = document.getElementById("segundoNombreUser").value;
    let userPrimerApellido = document.getElementById("apellidoNuevoUser").value;
    let userSegundoApellido = document.getElementById("segundoApellidoUser").value;
    let userEmail = document.getElementById("emailUser").value;
    let userTelefono = document.getElementById("telefonoUser").value;
    
    
    if(
        userPrimerNombre.trim() === "" ||
        userPrimerApellido.trim() === "" ||
        userEmail.trim() === ""
        ){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se permiten campos vacios!',
            });
            return false;
        }
        if (!validarEmail(userEmail)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El Email debe de ser valido',
            });
            return false;
        }
        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: '¡Tu registro ha sido exitoso!',
        });
        
        let datosUsuario = {
            userPrimerNombre,
            userPrimerApellido,
            userEmail
        };
        localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
        console.log("enviado!");
        console.log(datosUsuario)
        return true;
      }
      function validarEmail(email) {
        // Expresión regular para validar el formato del email
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      }
    