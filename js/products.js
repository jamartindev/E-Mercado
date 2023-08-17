const API = "https://japceibal.github.io/emercado-api/cats_products/101.json";

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(API);
  const json = await response.json();
  const container = document.getElementById("container");

  let products = json.products;
  for (let i = 0; i < products.length; i++) {
    console.log(products[i]);
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
});
