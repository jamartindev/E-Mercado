// Obtén el ID de la categoría y el ID del producto
const idCategoria = localStorage.getItem('catID');
const idProducto = idCategoria;

// Realiza una solicitud de fetch para obtener el JSON de la categoría y los productos
fetch(`https://japceibal.github.io/emercado-api/cats_products/${idCategoria}.json`)

  .then(response => response.json())
  .then(data => {
    // Encuentra el producto con el ID correspondiente
    const producto = data.products.find(products => products.id === idProducto);
    console.log(data)
    if (producto) {
      // Aquí puedes acceder a la información específica del producto
      console.log(producto);

      // Actualiza el HTML con la información del producto
      const productInfo = document.getElementById('product-info');
      productInfo.innerHTML = `
        <h2>${producto.name}</h2>
        <p>${producto.description}</p>
        <img src="${producto.image}">
      `;
    } else {
      console.log('No se encontró el producto con el ID especificado');
    }
  })
  .catch(error => {
    console.error('Error al obtener los detalles del producto:', error);
  });

  // Si te fijas entrando primero a alguna categoria del producto
  // y luego en la url cambias de product.html a product-info.html
  // te sale en que categoria estas y guarda el localStorage 
  // lo que todavia no pude es mostrar los archivos de cada un articulo
  // no se si es porque me falta tener el acceso a hacer click a cada uno
  // pero debe de haber otra forma de conseguirlos