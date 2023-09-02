document.addEventListener("DOMContentLoaded", function(){
    
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