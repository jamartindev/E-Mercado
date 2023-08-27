document.addEventListener("DOMContentLoaded", function(){
    
    function checkLogin() {
        let user= localStorage.getItem("User");
            if (!user) {
                location.href = "login.html"
            };
    } checkLogin();

});