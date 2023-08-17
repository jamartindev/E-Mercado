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

    let usuario = localStorage.getItem('uname');
    if(usuario =="" || usuario==null){
        document.getElementById('uname').innerHTML=usuario;
    } else {
    document.getElementById('salir').addEventListener('click', function (){
        localStorage.removeItem('uname');
        location.href="login.html"
       
    });
    }
});


