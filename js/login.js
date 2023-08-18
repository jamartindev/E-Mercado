const formLogin = document.getElementById('logForm');
const usr = document.getElementById('uname');
    

    formLogin.addEventListener('submit', submit);
        
        function submit (event) {
            event.preventDefault();
            window.location.href = "index.html";
            localStorage.setItem('User', usr.value);
        };
    

