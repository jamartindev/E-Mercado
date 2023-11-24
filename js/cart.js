// Variables globales
let costoTotal = 0; //Variable Costo Total para manejar valores en varias funciones
let subTotal = 0; //Variable Sub Total para manejar valores en varias funciones
let carritoSQL; //Contiene los datos del GET request a la base de datos SQL del carrito

async function getCarrito() {
  let url = "http://localhost:3000/api/25801/";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    carritoSQL = data;
    console.log(carritoSQL);
  } catch (error) {
    console.log("Fetch error:", error);
  }
}
//setInterval(getCarrito, 2000);
setInterval(subtotalCarrito, 500);
setInterval(costoEnvio, 500);

// Para multiplicar precio de cantidad de articulos que el usuario vaya a comprar
//global para poder acceder a ella desde product-info.js también
let Subtotal = async (precioUnit, cantidad, indice) => {
  let subtotal = precioUnit * cantidad;
  document.getElementById(`subtotal${indice}`).textContent = subtotal;
  await updateCart(carritoSQL[indice], cantidad);
   setTimeout(async () => {
    await getCarrito();
  }, 500);
};


document.addEventListener("DOMContentLoaded", async () => {
  
  await getCarrito();
  dibujarCarrito();
  for (let i = 0; i < carritoSQL.length; i++) {
    Subtotal(carritoSQL[i].cost, carritoSQL[i].count, i);
  }
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

  //Tomé el body que antes estaba en el fetch para ponerlo en una función que dibuja en cart.html el carrito del localStorage
});

function dibujarCarrito() {
  let body = "";
  for (let i = 0; i < carritoSQL.length; i++) {
    body += `
      <tr>
        <td> <img src="${carritoSQL[i].images}" width="150vh"> ${carritoSQL[i].name}</td>
        <td>${carritoSQL[i].currency} ${carritoSQL[i].cost}</td>
        <td><input id="inputCantidad" value="${carritoSQL[i].count}" type="number" min="0" max="100" oninput="Subtotal(${carritoSQL[i].cost}, this.value, ${i})"></td>
        <td class="subtotal">${carritoSQL[i].currency} <span id="subtotal${i}">${carritoSQL[i].cost}</span></td>
        <td><button class="btneliminar" onclick="eliminarProducto(${carritoSQL[i].id})"><i class="fa-regular fa-trash-can"></i></button></td>
      </tr>
  `;
  }
  document.getElementById("contenidoCarrito").innerHTML = body;
}

function subtotalCarrito() {
  let dataCost = document.querySelectorAll(".cost"); //Obtengo un NodeList con los campos de costos del carrito desde el HTML
  // Función que determina el subtotal del carrito en tiempo real
  
  let moneda;
  let subTot = 0;

  for (let carrito of carritoSQL) {
    // Utilizando un for...of itero sobre los elementos del carrito
    moneda = carrito.currency;
    if (moneda !== "USD") {
      // Si la moneda del elemento no es USD hago la conversión
      subTot += (carrito.cost / 40) * carrito.count;
    } else {
      subTot += carrito.cost * carrito.count; //Multiplico costo por cantidad
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
async function eliminarProducto(productoID) {
  await deleteCart(productoID);
  await getCarrito();
  setTimeout(() => {
    dibujarCarrito();
  }, 500);
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
