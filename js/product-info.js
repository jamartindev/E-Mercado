document.addEventListener("DOMContentLoaded", function(){
    
    let user = sessionStorage.getItem('User');
    let pass = sessionStorage.getItem('Pass');
    
   
    if (user === null || pass === null) {
        sessionStorage.setItem('User',"");
        sessionStorage.setItem('Pass',"");
    } else if (user === "" || pass === "") {
        window.location.href = "login.html";
    } 
});