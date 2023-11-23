// Obtiene el usuario almacenado en el Local Storage
let user = localStorage.getItem("User");
let usuarioTieneData = false;

// Verifica si el usuario existe en el Local Storage
if (user) {
  let userEmail = document.getElementById('emailUser');
  userEmail.value = user;
}


//Funcion al darle click al boton "guardar cambios" se actualice el nombre y apellido, y guardar todo en el local storage
//tomar el valor de todos los inputs
//guardarlos en un objeto y stringifiar y setItem al local
document.getElementById("guardarCambios").addEventListener("click", function() {

    let nombre = document.getElementById("nombreNuevoUser").value;
    let segundoNombre = document.getElementById("segundoNombreUser").value;
    let apellido = document.getElementById("apellidoNuevoUser").value;
    let segundoApellido = document.getElementById("segundoApellidoUser").value;
    let mail = document.getElementById("emailUser").value;
    let telefono = document.getElementById("telefonoUser").value;
    let imgPerfil = document.getElementById('imgPerfil').src;

    let objetoDatosGuardados = {
      nombre: nombre,
      segundoNombre: segundoNombre,
      apellido: apellido,
      segundoApellido: segundoApellido,
      mail: mail,
      telefono: telefono,
      imgPerfil: imgPerfil,
    };

    let datosGuardados = JSON.stringify(objetoDatosGuardados)

    localStorage.setItem("datosGuardados", datosGuardados)

    // Guardar los nuevos datos en el localStorage
    //localStorage.setItem("nombreUsuario", nuevoNombre);
    //localStorage.setItem("apellidoUsuario", nuevoApellido);

    // Actualizar el nombre y apellido ingresado en los inputs
    document.getElementById("nombreUser").innerHTML = nombre;
    document.getElementById("apellidoUser").innerHTML = apellido;
});

// Comprobar si hay datos en el localStorage al cargar la página
//en esta funcion gettear el objeto y parsearlo (ponerlo en json)
//chequear si existe en el local y sisi tirarlo pa los inputs
window.addEventListener("load", function() {

    /*let nombreGuardado = localStorage.getItem("nombreUsuario");
    let apellidoGuardado = localStorage.getItem("apellidoUsuario");

    if (nombreGuardado) {
        document.getElementById("nombreUser").innerHTML = nombreGuardado;
    }
    if (apellidoGuardado) {
        document.getElementById("apellidoUser").innerHTML = apellidoGuardado;
    }*/

    let datosDelLS = localStorage.getItem("datosGuardados");
  
    if(datosDelLS){

      let datosParseados = JSON.parse(datosDelLS);

      document.getElementById("nombreNuevoUser").value = datosParseados.nombre;
      document.getElementById("segundoNombreUser").value = datosParseados.segundoNombre;
      document.getElementById("apellidoNuevoUser").value = datosParseados.apellido;
      document.getElementById("segundoApellidoUser").value = datosParseados.segundoApellido;
      document.getElementById("emailUser").value = datosParseados.mail;
      document.getElementById("telefonoUser").value = datosParseados.telefono;
      document.getElementById('imgPerfil').src = datosParseados.imgPerfil;
     
    }
});




// Función para verificar si el usuario está autenticado
//function isUserAuthenticated() {
 // return ;
//}

// Función para cargar el perfil del usuario
//function loadUserProfile() {
  // Obtener elementos HTML
  //const nombreNuevoUser = document.getElementById('nombreNuevoUser');
  //const apellidoNuevoUser = document.getElementById('apellidoNuevoUser');
  //const emailUser = document.getElementById('emailUser');

  // Verificar si el usuario está autenticado
  //if (isUserAuthenticated()) {
    
  //} else {
    // El usuario no está autenticado, redirigir al inicio de sesión
  //  window.location.href = 'login.html';
  //}
//}

// Función para guardar los cambios en el perfil
//function guardarCambios() {
  //}
// Llama a la función para cargar el perfil cuando la página se carga
//window.addEventListener('load', loadUserProfile);






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
    
      let addProfilePic = document.getElementById('addProfilePic');
     let imgPerfil = document.getElementById('imgPerfil');
      
      addProfilePic.addEventListener('change', function(iPerfil) {
        let file = iPerfil.target.files[0];
        if (file) {
          let reader = new FileReader();
          reader.onload = function(e) {
            imgPerfil.src = e.target.result;
            localStorage.setItem('imgPerfil', e.target.result);
          };
          reader.readAsDataURL(file);
    
      }});
      