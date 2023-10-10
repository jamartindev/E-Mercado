function addToCart(producto) {
  if (!localStorage.getItem("carrito")) {
    localStorage.setItem("carrito", JSON.stringify([]))
  }
  let carrito = (JSON.parse(localStorage.getItem("carrito")));
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
