
  let url = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';
  fetch(url)
  .then(res => res.json())
  .then(data => mostrarData(data))
  .catch(error => console.log(error))
  const mostrarData = (data) =>{
    console.log(data)
    let body = '';
    for (let i = 0; i < data.length; i++){
      body += `
        <tr>
        <td>${data[i].articles.image} ${data[i].articles.name}</td>
        <td>${data[i].articles.currency} ${data[i].articles.unitCost}</td>
        <td>${data[i].articles.currency} ${data[i].articles.unitCost}</td>
        <td>${data[i].articles.count}</td>
        </tr>
      `;
    }
    document.getElementById('contenidoCarrito').innerHTML = body
  } 

// Esta a medio camino pero solo falta mostrar los datos como cualquier fetch
// Ya tiene una funcion de onclick que me redirije al carrito
