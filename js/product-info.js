document.addEventListener("DOMContentLoaded", function(){
    
    let user = localStorage.getItem('User');
    let pass = localStorage.getItem('Pass');
    
   
    if (user === null || pass === null) {
        localStorage.setItem('User',"");
        localStorage.setItem('Pass',"");
    } else if (user === "" || pass === "") {
        window.location.href = "login.html";
    } 
});