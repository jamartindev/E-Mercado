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