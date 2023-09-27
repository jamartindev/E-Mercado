// Busco los botones y llamo sus id para vincularlos con la funcion del modo oscuro
let btnDark = document.getElementById('btn-dark');
let btnIcon = document.getElementById('btnIcon');

// Armo funcion que cambia si esta en un estilo claro o oscuro
// Donde cambia el icono del sol y la luna para marcarlos
// Tambien me cambia el estilo a oscuro o claro del CSS
btnDark.onclick = function () {
  document.body.classList.toggle('dark-theme');
  if(document.body.classList.contains("dark-theme")){
    btnIcon.src = "img/theme_light.svg";
  } else {
    btnIcon.src = "img/theme_dark.svg";
  }
}