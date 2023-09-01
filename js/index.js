document.addEventListener("DOMContentLoaded", function(){


>>>>>>> origin/ponerNombreUser

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
    function checkLogin() {
        let user= localStorage.getItem("User");
            if (!user) {
                location.href = "login.html"
            };
    } checkLogin();

    

});



