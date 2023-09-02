document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    //Función que verifica mediante getItem si la key llamada User existe. De no existir redirige al usuario a la pestaña de login mediante location.href.

    let user= localStorage.getItem("User");

    function checkLogin() {
        if (!user) {
                location.href = "login.html"
            };
    } checkLogin();

    //Llamar al espacio donde se colocara el nombre y colocar la variable usuario para que se visualice.
     function userName() {
        document.getElementById("spaceUser").innerHTML=user;
    } userName();

    //Al hacer click se elimina al usuario del localStorage y se redirige al login.
    document.getElementById('salir').addEventListener('click', cerrarSesion);
    
    function cerrarSesion(event) {
        event.preventDefault();
        localStorage.removeItem('User');
        location.href="login.html"
    };

});



