function addToCart(producto) {
  let carritoKey = "carrito";
  if (!localStorage.getItem(carritoKey)) {
    localStorage.setItem(carritoKey, JSON.stringify([]))
  }
  let carrito = (JSON.parse(localStorage.getItem(carritoKey)));
  carrito.push(producto);
  localStorage.setItem(carritoKey, JSON.stringify(carrito));
}
