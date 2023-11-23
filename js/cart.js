// Variable de costo total establecida en 0
let costoTotal = 0;
let subTotal = 0;

// Para multiplicar precio de cantidad de articulos que el usuario vaya a comprar
//global para poder acceder a ella desde product-info.js también
let Subtotal = (precioUnit, cantidad, indice) => {
  let subtotal = precioUnit * cantidad;
  document.getElementById(`subtotal${indice}`).textContent = subtotal;

  let carrito = JSON.parse(localStorage.getItem(carritoKey));
  carrito[indice].quantity = cantidad;
  localStorage.setItem(carritoKey, JSON.stringify(carrito));
  subtotalCarrito();
  costoEnvio();
};

//Inicializamos el carrito como vacío si no existía
let carritoKey = "carrito";

if (!localStorage.getItem(carritoKey)) {
  localStorage.setItem(carritoKey, JSON.stringify([]));
}

document.addEventListener("DOMContentLoaded", async () => {
  let carritoSQL;
  let url = "http://localhost:3000/api/25801/";
  // Fetch a la url para obtener los datos
  await fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => (carritoSQL = data)) //mostrarData(data))

    .catch((error) => console.log("Fetch error:", error));

  console.log(carritoSQL);
  // Muestra datos de los articulos que agrego el usuario al carrito
  /*const mostrarData = (articles) => {
    let body = "";
    //tomar el valor de la api y agregarlo al carrito en el local storage si no estaba.
    //Esto se hace para que esté todo el carrito en un mismo lugar y que el programa reconozca a los productos
    console.log(articles);
    let carrito = JSON.parse(localStorage.getItem(carritoKey));
    //la variable está es para verificar si está agregado al carrito o no y agregarlo en caso negativo
    //let esta = -1;
    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].id == articles[0].id) {
        esta = i;
      }
    }
    if (!carrito) {
      //esto es para poner la info que viene de la API en la misma manera que lo pusimos para los productos que agrega el usuario
      carrito.push({
        quantity: 1,
        id: articles[0].id,
        name: articles[0].name,
        images: [articles[0].images],
        currency: articles[0].currency,
        cost: articles[0].cost,
      });
      localStorage.setItem(carritoKey, JSON.stringify(carrito));
    }
  };*/

  //VALIDACIONES AL DARLE BOTON "FINALIZAR COMPRA"

  document
    .getElementById("finalizaCompra")
    .addEventListener("click", function () {
      let formValidarPago = document.querySelectorAll(".needs-validation");

      document.querySelector("#btnCred").addEventListener("click", () => {
        document
          .querySelector(".contenidoPagoBanco")
          .classList.remove("needs-validation");
      });

      document.querySelector("#btnBank").addEventListener("click", () => {
        document
          .querySelector(".contenidoPagoCredito")
          .classList.remove("needs-validation");
      });

      for (let i = 0; i < formValidarPago.length; i++) {
        if (!formValidarPago[i].checkValidity()) {
          formValidarPago[i].classList.add("was-validated");
        }
      }

      const inputCantidad = document.getElementById("inputCantidad").value;
      const tipoEnvioError = document.getElementById("formaPagoError");
      const formaEnvioElements = document.querySelectorAll(
        "input[name=tipoEnvio]"
      );
      let seleccionadoEnvio = false;

      if (inputCantidad == "0") {
        document.getElementById("inputCantidad").classList.add("incompleto");
      } else {
        document.getElementById("inputCantidad").classList.remove("incompleto");
      }

      formaEnvioElements.forEach((element) => {
        if (element.checked) {
          seleccionadoEnvio = true;
        }
      });

      if (!seleccionadoEnvio) {
        tipoEnvioError.innerHTML = "Elija una opción de envío";
        tipoEnvioError.style.color = "#b21111";
      } else {
        tipoEnvioError.innerHTML = "";
      }

      function validado() {
        let valid = true;
        for (let form of formValidarPago) {
          if (!form.checkValidity()) {
            valid = false;
            break;
          }
        }
        return valid;
      }

      // VERIFICAR QUE TODAS LAS VALIDACIONES SON CORRECTAS:
      if (validado() && inputCantidad !== "0" && seleccionadoEnvio) {
        Swal.fire(
          "Compra exitosa",
          "Gracias por comprar con nosotros!",
          "success"
        );
      } else {
        Swal.fire(
          "No se ha podido completar la compra",
          "Por favor, verifique datos e intente nuevamente",
          "error"
        );
      }
    });

  dibujarCarrito();
  costoTotal = 0;
  subtotalCarrito();
  costoEnvio();
  console.log(costoTotal);

  // Evento usando queryselector para que al hacer click en cualquier tipo de envio me actualice los costes + envios
  let radiobtns = document.querySelectorAll("input[name=tipoEnvio]");
  for (const btn of radiobtns) {
    btn.addEventListener("click", () => {
      costoEnvio();
      document.getElementById("costoTotal").textContent = `USD ${costoTotal}`;
    });
  }

  //Tomé el body que antes estaba en el fetch para ponerlo en una función que dibuja en cart.html el carrito del localStorage

  function dibujarCarrito() {
    let body = "";
    //let carrito = JSON.parse(localStorage.getItem(carritoKey));

    for (let i = 0; i < carritoSQL.length; i++) {
      body += `
        <tr>
          <td> <img src="${carritoSQL[i].images}" width="150vh"> ${carritoSQL[i].name}</td>
          <td>${carritoSQL[i].currency} ${carritoSQL[i].cost}</td>
          <td><input id="inputCantidad" value="${carritoSQL[i].count}" type="number" min="0" max="100" oninput="Subtotal(${carritoSQL[i].cost}, this.value, ${i})"></td>
          <td class="subtotal">${carritoSQL[i].currency} <span id="subtotal${i}">${carritoSQL[i].cost}</span></td>
          <td><button class="btneliminar" onclick="eliminarProducto(${i})"><i class="fa-regular fa-trash-can"></i></button></td>
        </tr>
    `;
    }
    document.getElementById("contenidoCarrito").innerHTML = body;
  }

  function subtotalCarrito() {
    let dataCost = document.querySelectorAll(".cost"); //Obtengo un NodeList con los campos de costos del carrito desde el HTML
    // Función que determina el subtotal del carrito en tiempo real
    const items = JSON.parse(localStorage.getItem("carrito")); // Obtengo el carrito desde el localStorage

    let moneda;
    let subTot = 0;

    for (let item of items) {
      // Utilizando un for...of itero sobre los elementos del carrito
      moneda = item.currency;
      if (moneda !== "USD") {
        // Si la moneda del elemento no es USD hago la conversión
        subTot += (item.cost / 40) * item.quantity;
      } else {
        subTot += item.cost * item.quantity; //Multiplico costo por cantidad
      }
    }
    subTotal = subTot; //Actualizo variable global
    dataCost[0].innerHTML = `USD ${subTot}`; //Accedo al innerHTML del elemento del NodeList correspondiente a subtotal y añado el valor
  }

  function costoEnvio() {
    let dataCost = document.querySelectorAll(".cost"); //Obtengo un NodeList con los campos de costos del carrito desde el HTML
    // Función que determina el subtotal del carrito en tiempo real
    // Obtengo los botones de radio de tipo de envío.
    let pocentajeEnvio = document.querySelectorAll("input[name=tipoEnvio]");
    // Obtiengo los artículos del almacenamiento local.
    const items = JSON.parse(localStorage.getItem("carrito"));
    let costoEnvio = 0;
    // Armo una cadena if y else if para que al escoger el tipo de envio se calculen
    // El total del coste de envio
    if (pocentajeEnvio[0].checked) {
      costoEnvio = Math.round((subTotal * 5) / 100);
    } else if (pocentajeEnvio[1].checked) {
      costoEnvio = Math.round((subTotal * 7) / 100);
    } else if (pocentajeEnvio[2].checked) {
      costoEnvio = Math.round((subTotal * 15) / 100);
    } else {
      costoEnvio = 0;
    }
    // Creo un costo total donde inicialmente sea 0 y cargue los datos hasta tener
    // el coste de envio y articulos puestos
    costoTotal = 0;
    costoTotal += costoEnvio;
    costoTotal += subTotal;
    dataCost[1].innerHTML = `USD ${costoEnvio}`;
    document.getElementById("costoTotal").textContent = `USD ${costoTotal}`;
  }

  // Función para eliminar los articulos agrrgados a carrito...
  /*function eliminarProducto(indice) {
  let carrito = JSON.parse(localStorage.getItem(carritoKey)) || []; // esto es por si ni tengo datos en el local storage
  carrito.splice(indice, 1);
  localStorage.setItem(carritoKey, JSON.stringify(carrito)); 
}*/

  function eliminarProducto(indice) {
    body = "";
    let carrito = JSON.parse(localStorage.getItem(carritoKey));
    carrito.splice(indice, 1);
    localStorage.setItem(carritoKey, JSON.stringify(carrito));
    dibujarCarrito();
    subtotalCarrito();
    costoEnvio();
  }

  //Se crea una funcion para mostrar en el modal la eleccion de usuario,
  //si selecciona Transferencia bancaria se "nonea" el display de opciones de credit card, y asi al reves.
  function detallePago(option) {
    const bankTransferDetails = document.getElementById("bankTransferDetails");
    const creditCardDetails = document.getElementById("creditCardDetails");

    if (option === "bankTransfer") {
      bankTransferDetails.style.display = "block";
      creditCardDetails.style.display = "none";
      resetCreditCardDetails();
    } else if (option === "creditCard") {
      bankTransferDetails.style.display = "none";
      creditCardDetails.style.display = "block";
      resetBankTransferDetails();
    }
  }

  //Funcion para borrar datos cuando se escriba en otro medio de pago seleccionado

  function resetBankTransferDetails() {
    document.getElementById("accountNumber").value = "";
  }

  function resetCreditCardDetails() {
    document.getElementById("cardNumber").value = "";
    document.getElementById("cvv").value = "";
    document.getElementById("expiryDate").value = "";
  }
});
