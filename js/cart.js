document.addEventListener('DOMContentLoaded', ()=> {

let url = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';
// Fetch a la url para obtener los datos
fetch(url)
  .then(res => res.json())
  .then(data => mostrarData(data.articles))
  .catch(error => console.log(error))
// Muestra datos de los articulos que agrego el usuario al carrito
const mostrarData = (articles) => {
  console.log(articles);
  let body = '';
  for (let i = 0; i < articles.length; i++) {
    body += `
      <tr>
        <td> <img src="${articles[i].image}" width="150vh"> ${articles[i].name}</td>
        <td>${articles[i].currency} ${articles[i].unitCost}</td>
        <td><input type="number" min="0" max="100" oninput="Subtotal(${articles[i].unitCost}, this.value, ${i})"></td>
        <td class="subtotal">${articles[i].currency} <span id="subtotal${i}">${articles[i].unitCost}</span></td>
        
      </tr>
    `;
  }
  document.getElementById('contenidoCarrito').innerHTML = body
};

// Para multiplicar precio de cantidad de articulos que el usuario vaya a comprar
let Subtotal = (precioUnit, cantidad, indice) => {
  const subtotal = precioUnit * cantidad;
  document.getElementById(`subtotal${indice}`).textContent = subtotal;
};

});

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
