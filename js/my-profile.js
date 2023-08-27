document.addEventListener("DOMContentLoaded", function(){
    
<<<<<<< Updated upstream
    let user = sessionStorage.getItem('User');
    let pass = sessionStorage.getItem('Pass');
    
   
    if (user === null || pass === null) {
        sessionStorage.setItem('User',"");
        sessionStorage.setItem('Pass',"");
    } else if (user === "" || pass === "") {
        window.location.href = "login.html";
    } 
=======
    function checkLogin() {
        let user= localStorage.getItem("User");
            if (!user) {
                location.href = "login.html"
            };
    } checkLogin();
>>>>>>> Stashed changes
});