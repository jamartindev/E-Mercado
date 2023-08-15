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
    
    <div class="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
        <div class="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div class="my-3 py-3">
                    <div class="card shadow-sm">
                        <p class="display-5">${name} - ${currency} ${cost}</p>
                        <small class="lead ">${description}</small>
                        <small class="">${soldCount} vendidos</small>
                        <img src="${image}" class="bg-body-tertiary shadow-sm mx-auto"> 
                    </div>
            </div>
        </div>
    </div>
        `;
    container.appendChild(divs);
  }
});
