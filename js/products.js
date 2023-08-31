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

    // Función para ordenar los productos según el botón seleccionado
    const sortProducts = (option) => {
      switch (option) {
        case "sortAsc":
          products.sort((a, b) => a.cost - b.cost);
          break;
        case "sortDesc":
          products.sort((a, b) => b.cost - a.cost);
          break;
        case "sortByCount":
          products.sort((a, b) => b.soldCount - a.soldCount);
          break;
        default:
          break;
      }
    };

    // Función para filtrar los productos según el rango de precios
    const filterProducts = () => {
      const minPrice = document.getElementById("rangeFilterCountMin").value;
      const maxPrice = document.getElementById("rangeFilterCountMax").value;
      products = products.filter(
        (product) => product.cost >= minPrice && product.cost <= maxPrice
      );
    };

    // Función para mostrar los productos en el contenedor
    const displayProducts = () => {
      container.innerHTML = "";
      for (let i = 0; i < products.length; i++) {
        let name = products[i].name;
        let description = products[i].description;
        let cost = products[i].cost;
        let currency = products[i].currency;
        let soldCount = products[i].soldCount;
        let image = products[i].image;
        const divs = document.createElement("div");
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

    // Event listener para los botones de ordenar
    const sortButtons = document.querySelectorAll('[name="options"]');
    sortButtons.forEach((button) => {
      button.addEventListener("change", (event) => {
        sortProducts(event.target.id);
        displayProducts();
      });
    });

    // Event listener para el botón de filtrar
    const filterButton = document.getElementById("rangeFilterCount");
    filterButton.addEventListener("click", () => {
      filterProducts();
      displayProducts();
    });

    // Event listener para el botón de limpiar
    const clearButton = document.getElementById("clearRangeFilter");
    clearButton.addEventListener("click", () => {
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";
      products = json.products;
      displayProducts();
    });

    // Mostrar los productos por defecto
    displayProducts();
  }
});