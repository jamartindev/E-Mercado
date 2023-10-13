// Para multiplicar precio de cantidad de articulos que el usuario vaya a comprar
//global para poder acceder a ella desde product-info.js también
let Subtotal = (precioUnit, cantidad, indice) => {
  let subtotal = precioUnit * cantidad;
  document.getElementById(`subtotal${indice}`).textContent = subtotal;
};

//Inicializamos el carrito como vacío si no existía
let carritoKey = "carrito";

if (!localStorage.getItem(carritoKey)) {
  localStorage.setItem(carritoKey, JSON.stringify([]))
}

document.addEventListener("DOMContentLoaded", () => {
  let url = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';
  // Fetch a la url para obtener los datos
  fetch(url)
    .then(res => res.json())
    .then(data => mostrarData(data.articles))
    .catch(error => console.log(error))
  // Muestra datos de los articulos que agrego el usuario al carrito
  const mostrarData = (articles) => {
    let body = '';
    //tomar el valor de la api y agregarlo al carrito en el local storage si no estaba.
    //Esto se hace para que esté todo el carrito en un mismo lugar y que el programa reconozca a los productos

    let carrito = (JSON.parse(localStorage.getItem(carritoKey)));
    //la variable está es para verificar si está agregado al carrito o no y agregarlo en caso negativo
    let esta = -1;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id == articles[0].id) {
            esta = i;
        }
    }
    if (esta == -1) {
      //esto es para poner la info que viene de la API en la misma manera que lo pusimos para los productos que agrega el usuario
      carrito.push({
        quantity: 1,
        id: articles[0].id,
        name: articles[0].name,
        images: [articles[0].image],
        currency: articles[0].currency,
        cost: articles[0].unitCost
      });
    localStorage.setItem(carritoKey, JSON.stringify(carrito));
    }
    dibujarCarrito();
  };


  // button id="botonEnviar"

  //   Primero encontramos el elemento con ID=boton
  let boton = document.getElementById("botonEnviar");

  //   Agregamos EventListener para que al hacer Click,
    //     se cambie  el boton a color blue
    boton.addEventListener("click", function () {
      boton.style.color = " #f19d57cb";
      boton.disable = true
    });

    // 👇️ Cambiar color al PONERLE el mouse arriba
    boton.addEventListener("mouseover", function handleMouseOver() {
      boton.style.color = " #f19d57cb"; // Esto cambia el color del texto
    });

    // 👇️ Cambiar color al SACARLE el mouse de arriba al mismo color
    boton.addEventListener("mouseout", function handleMouseOut() {
      boton.style.color = "black"
    });

  });
  
  //Tomé el body que antes estaba en el fetch para ponerlo en una función que dibuja en cart.html el carrito del localStorage
function dibujarCarrito() {
  let carrito = JSON.parse(localStorage.getItem(carritoKey))
  let body = ""
  for (let i = 0; i < carrito.length; i++) {
    body += `
        <tr>
          <td> <img src="${carrito[i].images[0]}" width="150vh"> ${carrito[i].name}</td>
          <td>${carrito[i].currency} ${carrito[i].cost}</td>
          <td><input value="${carrito[i].quantity}" type="number" min="0" max="100" oninput="Subtotal(${carrito[i].cost}, this.value, ${i})"></td>
          <td class="subtotal">${carrito[i].currency} <span id="subtotal${i}">${carrito[i].cost}</span></td>
        </tr>
    `
  }
  document.getElementById('contenidoCarrito').innerHTML += body
}