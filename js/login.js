//Probando 

let datos = localStorage;

/*document.addEventListener("DOMContentLoaded", function(){
    document.getElementsByClassName("nombre").addEventListener("focusout", function() {
        datos.setItem("fn", nombre.value);
  })
})
*/
       

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (document.getElementById("nombre").value && document.getElementById("psw").value) {
    window.location = "/index.html"
    localStorage.setItem("usuario", username)
  }
})


