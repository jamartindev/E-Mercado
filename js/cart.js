// Variable de costo total establecida en 0
let costoTotal = 0;

// Para multiplicar precio de cantidad de articulos que el usuario vaya a comprar
//global para poder acceder a ella desde product-info.js también
let Subtotal = (precioUnit, cantidad, indice) => {
  let subtotal = precioUnit * cantidad;
  document.getElementById(`subtotal${indice}`).textContent = subtotal;

  let carrito = JSON.parse(localStorage.getItem(carritoKey));
  carrito[indice].quantity = cantidad;
  localStorage.setItem(carritoKey, JSON.stringify(carrito))
  
};

//Inicializamos el carrito como vacío si no existía
let carritoKey = "carrito";

if (!localStorage.getItem(carritoKey)) {
  localStorage.setItem(carritoKey, JSON.stringify([]));
}

document.addEventListener("DOMContentLoaded", () => {
  // Muestra datos de los articulos que agrego el usuario al carrito
  const mostrarData = (articles) => {
    let body = "";
    //tomar el valor de la api y agregarlo al carrito en el local storage si no estaba.
    //Esto se hace para que esté todo el carrito en un mismo lugar y que el programa reconozca a los productos

    let carrito = JSON.parse(localStorage.getItem(carritoKey));
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
        cost: articles[0].unitCost,
      });
      localStorage.setItem(carritoKey, JSON.stringify(carrito));
    }
    dibujarCarrito();
    costoTotal = 0;
    subtotalCarrito();
    costoEnvio();
    console.log(costoTotal)
    document.getElementById("costoTotal").textContent = costoTotal
  };

  let url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
  // Fetch a la url para obtener los datos
  fetch(url)
    .then((res) => res.json())
    .then((data) => mostrarData(data.articles))
    .catch((error) => console.log(error));
  // button id="botonEnviar"

  //   Primero encontramos el elemento con ID=boton
  let boton = document.getElementById("botonEnviar");

  //   Agregamos EventListener para que al hacer Click,
  //     se cambie  el boton a color blue
  boton.addEventListener("click", function () {
    boton.style.color = " #f19d57cb";
    boton.disable = true;
  });

  // 👇️ Cambiar color al PONERLE el mouse arriba
  boton.addEventListener("mouseover", function handleMouseOver() {
    boton.style.color = " #f19d57cb"; // Esto cambia el color del texto
  });

  // 👇️ Cambiar color al SACARLE el mouse de arriba al mismo color
  boton.addEventListener("mouseout", function handleMouseOut() {
    boton.style.color = "black";
  });

  // Evento usando queryselector para que al hacer click en cualquier tipo de envio me actualice los costes + envios
  let radiobtns = document.querySelectorAll('input[name=tipoEnvio]');
  for (const btn of radiobtns) {
      btn.addEventListener("click", () => { 
          costoTotal = 0;
          subtotalCarrito();
          costoEnvio();
          document.getElementById("costoTotal").textContent = costoTotal
      })
  }

});
//Tomé el body que antes estaba en el fetch para ponerlo en una función que dibuja en cart.html el carrito del localStorage
function dibujarCarrito() {
  let carrito = JSON.parse(localStorage.getItem(carritoKey));
  let body = "";
  for (let i = 0; i < carrito.length; i++) {
    body += `
        <tr>
          <td> <img src="${carrito[i].images[0]}" width="150vh"> ${carrito[i].name}</td>
          <td>${carrito[i].currency} ${carrito[i].cost}</td>
          <td><input value="${carrito[i].quantity}" type="number" min="0" max="100" oninput="Subtotal(${carrito[i].cost}, this.value, ${i})"></td>
          <td class="subtotal">${carrito[i].currency} <span id="subtotal${i}">${carrito[i].cost}</span></td>
        </tr>
    `;
  }
  document.getElementById("contenidoCarrito").innerHTML += body;
}
// Punto 1 entrega 6 Subtotal
function subtotalCarrito() {
  const items = JSON.parse(localStorage.getItem("carrito"));
  let dataCost = document.querySelectorAll(".cost");
  let moneda;
  let subTot = 0;
  for (let item of items) {
    moneda = item.currency;
    if (moneda !== "USD") {
      subTot += ((item.cost / 40) * item.quantity);
    } else {
      subTot += (item.cost * item.quantity);
    }
  }
  costoTotal += subTot;
  dataCost[0].innerHTML = `USD ${subTot}`;
}

function costoEnvio() {
  // Obtengo los botones de radio de tipo de envío.
  let pocentajeEnvio = document.querySelectorAll('input[name=tipoEnvio]');
  // Obtiengo los artículos del almacenamiento local.
  const items = JSON.parse(localStorage.getItem("carrito"));
  // Creo una variable llamando al queryselector para mostrar el costo de envio
  let dataCost = document.querySelectorAll(".cost");
  // Creo una variable llamada moneda y subtotal para armar un for of
  let moneda;
  let subTot = 0;
  for (let item of items) {
    moneda = item.currency;
    if (moneda !== "USD") {
      subTot += ((item.cost / 40) * item.quantity);
    } else {
      subTot += (item.cost * item.quantity);
    }
  }
  // Armo una cadena if y else if para que al escoger el tipo de envio se calculen
  // El total del coste de envio
  if (pocentajeEnvio[0].checked) {
    subTot = (subTot*5)/100;
} else if (pocentajeEnvio[1].checked) {
  subTot = (subTot*7)/100;
} else if (pocentajeEnvio[2].checked) {
  subTot = (subTot*15)/100;
} 
  else {
    subTot = 0;
  }
  // Creo un costo total donde inicialmente sea 0 y cargue los datos hasta tener
  // el coste de envio y articulos puestos
  costoTotal += subTot;
  dataCost[1].innerHTML = `USD ${subTot}`;
}

