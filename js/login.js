document.addEventListener('DOMContentLoaded', () => {

const formLogin = document.getElementById('logForm');
const usr = document.getElementById('uname');
    
    //Este fragmento escucha cuando el usuario envia datos del formulario y llama a la funcion submit.
    formLogin.addEventListener('submit', submit);
        
        function submit (event) {
            event.preventDefault();
            window.location.href = "index.html";
            localStorage.setItem('User', usr.value);
        };
        /*Esta función previene el funcionamiento por defecto del form que es redireccionar al action page y 
        en su lugar redirecciona mediante window.location.href a la pantalla de inicio. 
        Al mismo tiempo ingresa la key User con el valor ingresado por el usuario al local storage */
    
});
    

