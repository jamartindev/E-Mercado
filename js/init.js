const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";// =>
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json"; // ->
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json"; // =>
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else{
          throw Error(response.statusText);
      };
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

async function addToCart(producto) {
  /*if (!localStorage.getItem(carritoKey)) {
      localStorage.setItem(carritoKey, JSON.stringify([]))
  }
  
  let carrito = (JSON.parse(localStorage.getItem(carritoKey)));*/
  let esta = -1;

  const getCarrito = await getJSONData('http://localhost:3000/api/25801/');
  const articlesCarrito = getCarrito.data;
  console.log(articlesCarrito);
  let addItem = 0;
  for (let i = 0; i < articlesCarrito.length; i++) {
      if (articlesCarrito[i].id == producto.id) {
          esta = i;
          addItem = articlesCarrito[esta].count
          addItem++
      }
  }
  if (esta > -1) {
    await updateCart(producto, addItem);
    await redirectToCart();
  } else {
      await fetch('http://localhost:3000/api/25801/', {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify({
          id: producto.id,
          name: producto.name,
          count: 1,
          cost: producto.cost,
          currency: producto.currency,
          images: producto.images[0]
      })
    })
    .then(response => console.log(response.json()))
    await redirectToCart();
  }

  
    //.then(data => {/*console.log(`Se ha actualizado el carrito: ${data}`)*/
         
          
        
  //localStorage.setItem(carritoKey, JSON.stringify(carrito));
}

async function updateCart(produc, quantity) {
  fetch(`http://localhost:3000/api/25801/${produc.id}/`, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'PUT',
      body: JSON.stringify({
          id: produc.id,
          name: produc.name,
          count: quantity,
          cost: produc.cost,
          currency: produc.currency,
          images: produc.images[0]
      })
    })
    .then(response => console.log(response))
    .catch((error) => console.log('Fetch error:', error));
}

async function redirectToCart() {
  setTimeout(() => {
    window.location = "cart.html";
  }, 500);
}