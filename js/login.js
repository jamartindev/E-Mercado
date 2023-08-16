//Probando 

let datos = localStorage;

document.addEventListener("DOMContentLoaded", function(){
    document.getElementsByClassName("nombre").addEventListener("focusout", function() {
        datos.setItem("fn", nombre.value);
  })
})
       

