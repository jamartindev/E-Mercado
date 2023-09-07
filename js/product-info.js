document.addEventListener("DOMContentLoaded", async () => {
  const productInfo = document.getElementById("product-info");
  
  const productID = localStorage.getItem("id");
  console.log(productID);

  const respondeID = await getJSONData(
    PRODUCT_INFO_URL + productID + EXT_TYPE
    // Aprovecho que ya estan los datos en init y 
    // pido que me de el url de productos y el tipo de extension
  );
  let product = respondeID.data;
  console.log(product);
  // Pido los datos del json en este caso los datos de productos

  productInfo.innerHTML = `
        <div>
            <div id="name">
            <hr class="linea">
            <h1>${product.name}<h1>
            <hr class="linea">
            </div>
            <div class="info">
            <div id="imageBg" class="ImageBg">
            </div>
            <div class="image" id="image">
        </div>
            <p class="title">
            <span style="font-weight: bold;">
            Precio</span>:<br>${product.currency}:${product.cost}
            </p>
            <p class="title">
            <span style="font-weight: bold;">
            Descripción:</span><br>${product.description}
            </p>
            <p class="title">
            <span style="font-weight: bold;">
            Categoría</span>:<br>${product.category}
            </p>
            <p class="title">
            <span style="font-weight: bold;">
            Cantidad de vendidos</span>:<br>${product.soldCount}</p>
            </div>
        </div>
    `;

    // Aca me toma el id del div de imagenes creado con el innerHTML
    const imageContainer = document.getElementById("image");
    const imagenes = product.images;
    let indiceImage = 0;

    //Aca me carga cada imagen del indice
    imagenes.forEach((image, index) => {
        let img = document.createElement("img");
        img.src = image;
        img.id = `image-${index}`;
        img.classList.add("image-grid");
        imageContainer.appendChild(img);

        // Creo un evento que al hacer click me muestre el contenido interno
        // de cada producto
        img.addEventListener("click", () =>{
            indiceImage = index;
            showImage();
        });
    });
});