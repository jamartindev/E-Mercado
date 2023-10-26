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
    
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id == articles[i].id) {
          
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
    let carrito = JSON.parse(localStorage.getItem(carritoKey)) || []; 
    let body = "";
    for (let i = 0; i < carrito.length; i++) {
      body += `
          <tr>
            <td> <img src="${carrito[i].images[0]}" width="150vh"> ${carrito[i].name}</td>
            <td>${carrito[i].currency} ${carrito[i].cost}</td>
            <td><input id="inputCantidad" value="${carrito[i].quantity}" type="number" min="0" max="100" oninput="Subtotal(${carrito[i].cost}, this.value, ${i})"></td>
            <td class="subtotal">${carrito[i].currency} <span id="subtotal${i}">${carrito[i].cost * carrito[i].quantity}</span></td>
            <td><button class="btneliminar" onclick="eliminarProducto(${i})"><i class="fa-regular fa-trash-can"></i></button></td>
          </tr>
      `;
    }
  
    document.getElementById('contenidoCarrito').innerHTML = body; 
  }
  
  // Función para eliminar los articulos agrrgados a carrito...
  function eliminarProducto(indice) {
    let carrito = JSON.parse(localStorage.getItem(carritoKey)) || []; // esto es por si ni tengo datos en el local storage
    carrito.splice(indice, 1);
    localStorage.setItem(carritoKey, JSON.stringify(carrito)); 
    dibujarCarrito();
    
  }
  
  dibujarCarrito();

//Se crea una funcion para mostrar en el modal la eleccion de usuario, 
//si selecciona Transferencia bancaria se "nonea" el display de opciones de credit card, y asi al reves.
function detallePago(option) {
  const bankTransferDetails = document.getElementById('bankTransferDetails');
  const creditCardDetails = document.getElementById('creditCardDetails');

  if (option === 'bankTransfer') {
    bankTransferDetails.style.display = 'block';
    creditCardDetails.style.display = 'none';
    resetCreditCardDetails();
  } else if (option === 'creditCard') {
    bankTransferDetails.style.display = 'none';
    creditCardDetails.style.display = 'block';
    resetBankTransferDetails();
  }
} 

//Funcion para borrar datos cuando se escriba en otro medio de pago seleccionado 

function resetBankTransferDetails() {
  document.getElementById('accountNumber').value = '';
}

function resetCreditCardDetails() {
  document.getElementById('cardNumber').value = '';
  document.getElementById('cvv').value = '';
  document.getElementById('expiryDate').value = '';
}

//VALIDACIONES AL DARLE BOTON "FINALIZAR COMPRA"


document.getElementById("finalizaCompra").addEventListener("click", function () {

  const calleInput = document.getElementById("inputCalleEnvio").value;
  const calleError = document.getElementById("calleEnvio");
  const numeroInput = document.getElementById("inputNumeroEnvio").value;
  const esquinaInput = document.getElementById("inputEsquinaEnvio").value;
  const numError = document.getElementById("numeroEnvio");
  const esquinaError = document.getElementById("esquinaEnvio");
  const inputCantidad = document.getElementById("inputCantidad").value;
  const tipoEnvioError = document.getElementById("formaPagoError");
  const formaEnvioElements = document.querySelectorAll("input[name=card]");
  let seleccionadoEnvio = false;
  const modoPago = document.querySelectorAll("input[name=paymentMethod");
  let seleccionadoPago = false;
  const errorModoPago = document.getElementById("errorMetodoPago");
  const accountNumber = document.getElementById("accountNumber").value;
  const cardNumber = document.getElementById("cardNumber").value;
  const cvv = document.getElementById("cvv").value;
  const expiryDate = document.getElementById("expiryDate").value;

  if (calleInput.trim() === "") {
      calleError.innerHTML = "Ingresa una calle";
      calleError.style.color ="#b21111"
      document.getElementById("inputCalleEnvio").classList.add("incompleto");
  } else {
      calleError.innerHTML = "";
      document.getElementById("inputCalleEnvio").classList.remove("incompleto");
  }

  if(numeroInput==""){
    numError.innerHTML= "Ingresa un número";
    numError.style.color ="#b21111"
    document.getElementById("inputNumeroEnvio").classList.add("incompleto");
  } else {
    numError.innerHTML = "";
      document.getElementById("inputNumeroEnvio").classList.remove("incompleto");
  }

  if(esquinaInput==""){
    esquinaError.innerHTML= "Ingresa una esquina";
    esquinaError.style.color ="#b21111"
    document.getElementById("inputEsquinaEnvio").classList.add("incompleto");
  } else {
    esquinaError.innerHTML = "";
      document.getElementById("inputEsquinaEnvio").classList.remove("incompleto");
  }

  if(inputCantidad=="0"){
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
    tipoEnvioError.style.color = "#b21111"
  } else {
    tipoEnvioError.innerHTML = "";
  }

  modoPago.forEach((element) => {
    if (element.checked) {
      seleccionadoPago = true;
    }
  });

  if (!seleccionadoPago) {
    errorModoPago.innerHTML = "Elija un método de pago";
    errorModoPago.style.color = "#b21111"
  } else {
    errorModoPago.innerHTML = "";
  }
  
  if (accountNumber === "" && cardNumber === "" && cvv === "" && expiryDate === "") {
    errorModoPago.innerHTML = "Elija un método de pago";
    errorModoPago.style.color = "#b21111"
  } else {
    errorModoPago.innerHTML = "";
  }
// VERIFICAR QUE TODAS LAS VALIDACIONES SON CORRECTAS:
  if (
    calleInput.trim() !== "" &&
    numeroInput !== "" &&
    esquinaInput !== "" &&
    inputCantidad !== "0" &&
    seleccionadoEnvio &&
    seleccionadoPago &&
    (accountNumber !== "" || cardNumber !== "" || cvv !== "" || expiryDate !== "")
  ) {
    Swal.fire(
      'Compra exitosa',
      'Gracias por comprar con nosotros!',
      'success'
    )
  }
  
  

  
  

  


})
