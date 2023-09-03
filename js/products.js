document.addEventListener("DOMContentLoaded", async () => {
  // Obtengo la categoria a base del catID de localStorage
  const catID = localStorage.getItem("catID");
  // Esto verifica si existe en el localStorage
  if (catID) {
    // Uso el link de la API y cambio el numero del catID por el llamado del catID de localStorage
    const API = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        const catName = data.catName; // Obtener el valor de "catName" del JSON
        const categoriaElement = document.getElementById("productoCat");
        categoriaElement.innerHTML = catName;
      });
    // Misma funcion que manejamos para mostrar el resultado de la api
    const response = await fetch(API);
    const json = await response.json();
    const container = document.getElementById("container");
    let products = json.products;

    // hacer una funcion para filtrar por rango de precio (LISTO)
    // hacer una funcion para mostrar los productos en el div (LISTO, EVALUAR)
    // llamador de eventos para los botones (LISTO)
    // llamador de eventos para boton "filtrar" (LISTO)
    // llamador de eventos para boton "limpiar" (LISTO)

    // Función para mostrar los productos en el contenedor (ver aún)
    function mostrarProductos() {
      container.innerHTML = "";
      for (let i = 0; i < products.length; i++) {
        let name = products[i].name;
        let description = products[i].description;
        let cost = products[i].cost;
        let currency = products[i].currency;
        let soldCount = products[i].soldCount;
        let image = products[i].image;
        let divs = document.createElement("div");
        divs.innerHTML = `
          <div class="">
            <div class="text-bg-dark me-sm-3 pt-5 px-3 pt-md-5 px-md-5">
              <div class="my-2 py-2">
                <div class="d-flex shadow justify-content-between ">
                  <div class="d-flex">
                    <img src="${image}" class="p-2" width="250px">
                    <div class="ms-3">
                      <p class="h2 fw-normal">${name} - ${currency} ${cost}</p>
                      <p>${description}</p>
                    </div>   
                  </div>   
                  <small class="me-3 mt-2"> ${soldCount} vendidos</small>
                </div>
              </div>
            </div>
          </div>
        `;
        container.appendChild(divs);
      }
    };

    //filtrar de menor a mayor precio
    document.getElementById("sortAsc").addEventListener("click", function(){
      products.sort((a, b) => a.cost - b.cost);
      mostrarProductos();

    })
    // filtrar de mayor a menor
    document.getElementById("sortDesc").addEventListener("click", function(){
      products.sort((a, b) => b.cost - a.cost);
      mostrarProductos();

    })
    // filtar por relevancia 
    document.getElementById("sortByCount").addEventListener("click", function(){
      products.sort((a, b) => b.soldCount - a.soldCount);
      mostrarProductos();

    })

    // Función para filtrar los productos según el rango de precios
    function filtrarProductos() {
      let minPrice = document.getElementById("rangeFilterCountMin").value;
      let maxPrice = document.getElementById("rangeFilterCountMax").value;
      products = products.filter((product) => product.cost >= minPrice && product.cost <= maxPrice
      );
    }; 

    // Event listener para el botón de filtrar
    let btnFiltrar = document.getElementById("rangeFilterCount");
    btnFiltrar.addEventListener("click", () => {
      filtrarProductos();
      mostrarProductos();
    });

    // Event listener para el botón de limpiar
    let btnLimpiar = document.getElementById("clearRangeFilter");
    btnLimpiar.addEventListener("click", () => {
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";
      products = json.products;
      mostrarProductos();
    });

    // Mostrar los productos por defecto
    mostrarProductos();
  }
});