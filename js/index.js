document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("autos")) {
    document.getElementById("autos").addEventListener("click", function () {
      localStorage.setItem("catID", 101);
      window.location = "products.html";
    });
  }
  if (document.getElementById("juguetes")) {
    document.getElementById("juguetes").addEventListener("click", function () {
      localStorage.setItem("catID", 102);
      window.location = "products.html";
    });
  }
  if (document.getElementById("muebles")) {
    document.getElementById("muebles").addEventListener("click", function () {
      localStorage.setItem("catID", 103);
      window.location = "products.html";
    });
  }

  //Función que verifica mediante getItem si la key llamada User existe. De no existir redirige al usuario a la pestaña de login mediante location.href.

  let user = localStorage.getItem("User");

  function checkLogin() {
    if (!user) {
      location.href = "login.html";
    }
  }
  checkLogin();

  //Llamar al espacio donde se colocara el nombre y colocar la variable usuario para que se visualice.
  function userName() {
    document.getElementById("spaceUser").innerHTML = user;
  }
  userName();

  //Al hacer click se elimina al usuario del localStorage y se redirige al login.
  document.getElementById("salir").addEventListener("click", cerrarSesion);

  function cerrarSesion(event) {
    event.preventDefault();
    localStorage.removeItem("User");
    localStorage.removeItem("themePreference");
    location.href = "login.html";
  }


});

//funcion para botones volver atras
function goBack() {
  // Vuelve a la página anterior
  window.history.back();
}

