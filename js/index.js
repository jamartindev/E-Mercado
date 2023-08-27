document.addEventListener("DOMContentLoaded", function(){
    
    let user = sessionStorage.getItem('User');
    let pass = sessionStorage.getItem('Pass');
    
   
    if (user === null || pass === null) {
        sessionStorage.setItem('User',"");
        sessionStorage.setItem('Pass',"");
    } else if (user === "" || pass === "") {
        window.location.href = "login.html";
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

<<<<<<< Updated upstream
});



=======

    function checkLogin() {
        let user= localStorage.getItem("User");
            if (!user) {
                location.href = "login.html"
            };
    } checkLogin();

});

>>>>>>> Stashed changes


