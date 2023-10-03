
let carrito = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
console.log(carrito)

fetch(carrito)
.then((response) => response.json())
.then((data) => {
  console.log(data)
});

// Esta a medio camino pero solo falta mostrar los datos como cualquier fetch
// Ya tiene una funcion de onclick que me redirije al carrito
