<<<<<<< Updated upstream
document.addEventListener("DOMContentLoaded", function(){
    
    let user = sessionStorage.getItem('User');
    let pass = sessionStorage.getItem('Pass');
    
   
    if (user === null || pass === null) {
        sessionStorage.setItem('User',"");
        sessionStorage.setItem('Pass',"");
    } else if (user === "" || pass === "") {
        window.location.href = "login.html";
    } 
=======
document.addEventListener('DOMContentLoaded', () => {

    function checkLogin() {
        let user= localStorage.getItem("User");
        if (!user) {
            location.href = "login.html"
        };
    } checkLogin();

>>>>>>> Stashed changes
});