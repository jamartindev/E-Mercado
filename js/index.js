document.addEventListener("DOMContentLoaded", function(){
    
    let user = localStorage.getItem('User');
    let pass = localStorage.getItem('Pass');
    
   
    if (user === null || pass === null) {
        localStorage.setItem('User',"");
        localStorage.setItem('Pass',"");
    } else if (user === "" || pass === "") {
        window.location.href = "login.html";
        
    } else {
        document.getElementById("spaceUser").innerHTML=user;
    }
   

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
});

