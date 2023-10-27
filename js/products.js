document.addEventListener("DOMContentLoaded", async () => {
  // Obtengo la categoria a base del catID de localStorage
  const catID = localStorage.getItem("catID");
  const API = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

  // Esto verifica si existe en el localStorage
  if (catID) {
    // Uso el link de la API y cambio el numero del catID por el llamado del catID de localStorage
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        const catName = data.catName; // Obtener el valor de "catName" del JSON
        const categoriaElement = document.getElementById("productoCat");
        categoriaElement.innerHTML = catName;
      });
  }
  // Misma funcion que manejamos para mostrar el resultado de la api
  const response = await fetch(API);
  const json = await response.json();
  const container = document.getElementById("container");
  let products = json.products;
  let productsDef = json.products;

  //Variable que verifica si el tamaño de pantalla concuerda con pantallas chicas
  let xMedia = window.matchMedia("(max-width: 786px)");


  // Función para mostrar los productos en el contenedor.
  function mostrarProductos() {
    container.innerHTML = "";

    

    for (let i = 0; i < products.length; i++) {
      let name = products[i].name;
      let description = products[i].description;
      let cost = products[i].cost;
      let currency = products[i].currency;
      let soldCount = products[i].soldCount;
      let image = products[i].image;
      let productID = products[i].id;
      
      const divs = document.createElement("div");

      divs.setAttribute("class", "hideShow"); //Crea una clase a cada div para referenciar en el DOM.

      /*Función que verifica si el tamaño de pantalla actual está dentro de un rango de tamaños y 
      cambia la manera en que se ven los productos si estos se visualizan desde pantallas en ese rango.
      Se aplica el mismo formato de categorías */
      
      function checkMedia (mediaQ) {
        if (mediaQ.matches) {
          divs.innerHTML = 
          `
          <div class="card" id="${productID}" onclick="seleccionarProducto(id)">
          <img src="${image}" class="img-thumbnail" alt="${description}">
          <div class="card__content">
            <p class="card__title" id=nameDivR${i}>${name} - ${currency} ${cost}</p>
            <p class="card__description" id=descDivR${i}> ${description} </p>
            <small class="card__description"> ${soldCount} vendidos</small>
          </div>`
        } else {
          divs.innerHTML = `
      
          <div class="container-fluid cursor-active" id="${productID}" onclick="seleccionarProducto(id)">
              <div class="text-bg-dark me-sm-3 pt-5 px-3 pt-md-5 px-md-5">
                  <div class="my-2 py-2">
      
                        <div class="d-flex shadow justify-content-between ">
                          <div class="d-flex">
                            <img src="${image}" class="p-2" width="250px" height="200px">
                            <div class="ms-3">
                              <p class="h2 fw-normal" id=nameDiv${i}>${name} - ${currency} ${cost}</p> 
                              <p id=descDiv${i}>${description}</p>
                            </div>   
                          </div>   
                          <small class="me-3 mt-2"> ${soldCount} vendidos</small>
                        </div>
                  </div>
              </div>
          </div>
          `;
        }
      };

      checkMedia (xMedia);
      container.appendChild(divs);
    }

    
    
    document
      .getElementById("sortAsc")
      .addEventListener("click", filtrarPrecioAsc);

    function filtrarPrecioAsc() {
      products.sort((a, b) => a.cost - b.cost);
      mostrarProductos();
    }
    //filtrar de menor a mayor precio
    //document.getElementById("sortAsc").addEventListener("click", function(){
    //products.sort((a, b) => a.cost - b.cost);
    //mostrarProductos();

    //})
    // filtrar de mayor a menor
    document.getElementById("sortDesc").addEventListener("click", function () {
      products.sort((a, b) => b.cost - a.cost);
      mostrarProductos();
    });
    // filtar por relevancia
    document
      .getElementById("sortByCount")
      .addEventListener("click", function () {
        products.sort((a, b) => b.soldCount - a.soldCount);
        mostrarProductos();
      });

    // Función para filtrar los productos según el rango de precios
    function filtrarProductos() {
      products = productsDef;
      let minPrice = document.getElementById("rangeFilterCountMin").value;
      let maxPrice = document.getElementById("rangeFilterCountMax").value;
      products = products.filter(
        (product) => product.cost >= minPrice && product.cost <= maxPrice
      );
      console.log(products);
      filtrarPrecioAsc();
    }

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
  }
  // Mostrar los productos por defecto
  mostrarProductos();


  //Desafíate

  function searchFilter() {
    let searchbar = document.getElementById("searchProduct");
    let divsHideShow = document.getElementsByClassName("hideShow");

    searchbar.addEventListener("input", () => {
      for (let i = 0; i < products.length; i++) {
        
        let nameDiv;
        let descDiv;

        if (xMedia.matches) {
          nameDiv = document.querySelectorAll(
            "#nameDivR0, #nameDivR1, #nameDivR2, #nameDivR3, #nameDivR4"
          );
          descDiv = document.querySelectorAll(
            "#descDivR0, #descDivR1, #descDivR2, #descDivR3, #descDivR4"
          );
          
        } else {
          nameDiv = document.querySelectorAll(
            "#nameDiv0, #nameDiv1, #nameDiv2, #nameDiv3, #nameDiv4"
          );
          descDiv = document.querySelectorAll(
            "#descDiv0, #descDiv1, #descDiv2, #descDiv3, #descDiv4"
          );
          
        }
        let inputSearch = searchbar.value.toUpperCase();

        let searchObj = nameDiv[i].innerText + descDiv[i].innerText;

        if (
          searchObj.toUpperCase().indexOf(inputSearch) > -1 ) {
          divsHideShow[i].style.display = "";
        } else {
          divsHideShow[i].style.display = "none";
        }
      
      }
    });
  }
  searchFilter();

  /*1- Esta función hace referencia desde el DOM a la barra según su id y a los div agregados por su clase. 

    2- Se agrega un escuchador a la barra según el input del usuario.
    
    3- Se inicializa un loop especificando el máximo recorrido de acuerdo al largo de la variable products, que contiene cada producto.

    4- Se declaran variables que tomen mediante querySelectorAll a los párrafos <p> correspondientes al nombre y descripción del producto

    5- Se declara variable que toma el valor del input del usuario mediante el método .value y hace que se interprete en mayúsculas mediante toUpperCase()

    6- Se declara variable que recorre cada párrafo del punto 3, accede a su texto interno con método innerText y luego concatena dichos valores.

    7- Utilizando el condicional if se pasa la condicion que verifica si la descripción y el nombre del producto (con toUpperCase()) estan contenidas en la barra de busqueda.
     Para esto se utiliza el método de los string indexOf, que retorna un entero correspondiente al valor de cada palabra si esta existe y si no retorna -1. 
    
    8- Si el valor existe (es mayor a -1) entonces se ocultan los div que no contienen el valor mediante el uso de display: none. De esta forma solo se visualizan los div 
    que coinciden con el buscador.

  */   
});

function seleccionarProducto(id) {
  localStorage.setItem("id", id);
  window.location.href= 'product-info.html';
}



//FINAL MERGEADO