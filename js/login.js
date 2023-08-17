document.addEventListener('DOMContentLoaded', function() {

    
    const formLogin = document.getElementById('logForm');
    const usr = document.getElementById('uname');
    const pwd = document.getElementById('psw');
    

    formLogin.addEventListener('submit', submit);
        
        function submit (event) {
            event.preventDefault();
            event.stopPropagation();
            window.location.href = "index.html";
            sessionStorage.setItem('User', usr.value);
            sessionStorage.setItem('Pass', pwd.value);
        };
    
});