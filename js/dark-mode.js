document.addEventListener('DOMContentLoaded', ()=> {

  // Busco los botones y llamo sus id para vincularlos con la funcion del modo oscuro
  let btnDark = document.getElementById('btn-dark');
  let btnIcon = document.getElementById('btnIcon');
  let logoDark = document.querySelectorAll('#megatron');
  
  // Armo funcion que cambia si esta en un estilo claro o oscuro
  // Donde cambia el icono del sol y la luna para marcarlos
  // Tambien me cambia el estilo a oscuro o claro del CSS
  // Verificar si hay una preferencia guardada en el almacenamiento local
  const themePreference = localStorage.getItem("themePreference");
  if (themePreference) {
    document.body.classList.add(themePreference);
  } else {
    // Si no hay preferencia guardada, verificar la configuración del sistema
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: light)").matches;
    if (prefersDarkMode) {
      document.body.classList.add("dark-theme");
    }
  }
  
  // Cambiar el tema y guardar la preferencia en el almacenamiento local
  btnDark.onclick = function () {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
      changeIcon();
      localStorage.setItem("themePreference", "dark-theme");
    } else {
      localStorage.removeItem("themePreference");
      changeIcon();
    }
  };
  
  //Función que cambia ícono de sol/luna en cada página según el tema elegido
  function changeIcon() {
    if (document.body.classList.contains("dark-theme")) {
      btnIcon.src = "img/sun.png";
      logoDark[0].className = "megatron-light";
    } else {
      btnIcon.src = "img/night-mode.png";
      logoDark[0].className = "megatron";
    }
  };
  
  window.addEventListener('load', changeIcon);
  
  });