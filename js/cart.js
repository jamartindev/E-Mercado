document.addEventListener('DOMContentLoaded', () => {

    function checkLogin() {
        let user= localStorage.getItem("User");
        if (!user) {
            location.href = "login.html"
        };
    } checkLogin();

});