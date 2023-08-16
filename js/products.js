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
        <div class="text-bg-dark me-sm-3 pt-5 px-3 pt-md-5 px-md-5 text-center ">
            <div class="my-2 py-2">

                  <div class="card shadow-sm"><small class="text-end"> ${soldCount} vendidos</small>
                    <p class="display-6">${name} - ${currency} ${cost}</p>
                    <img src="${image}" class="bg-body-secondary shadow-sm mx-auto" width="50%" height="50%">
                    <p>${description}</p>    
                  </div>
            </div>
        </div>
    </div>
        `;
    container.appendChild(divs);
  }
});
