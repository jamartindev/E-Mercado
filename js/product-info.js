let product

document.addEventListener("DOMContentLoaded", async () => {

    // Constante que me toma el id de cada producto
    const productID = localStorage.getItem("id");
    console.log(productID);
    const productInfo = document.getElementById("product-info");
    const respondeID = await getJSONData(
        PRODUCT_INFO_URL + productID + EXT_TYPE
        // Usando los datos en init llamo las url de otro script 
        // pido que me de el url de productos y el tipo de extension
    );

    //Parte 1 del punto 1, entrega 4
    //agrega el html de los productos relacionados 
    let relatedProduct = ` 
    <div class="container-fluid">
        <h3 class='titulosP mt-5 mb-5'> Productos relacionados </h3>
    </div>
    <div id="relacionados" class="container-fluid">`
    for (let i=0; i<respondeID.data.relatedProducts.length; i++) {
        let eachRelatedProduct = `
        <div class="divSuggestedElement" dataID="${respondeID.data.relatedProducts[i].id}">
            <img src="${respondeID.data.relatedProducts[i].image}" width="150"  dataID="${respondeID.data.relatedProducts[i].id}">
            <p class="mt-3" dataID="${respondeID.data.relatedProducts[i].id}"> ${respondeID.data.relatedProducts[i].name} </p>
        </div>
        `
        relatedProduct += eachRelatedProduct
    }
    relatedProduct += `</div>`



    // En esta funcion pido los datos para poner la informacion del contenido
    function getProductDetails() {
    
        product = respondeID.data;
            // Pido los datos del json en este caso los datos de productos

        // Armo esta funcion para mostrar el contenido en el html usando el div del html product-info
        productInfo.innerHTML = `
            <div id="name">
            <hr class="linea">
            <h1 class="titulosP">${product.name}<h1>
            <hr class="linea">
            </div>
        
            <div id="infoDivs" class="row"> 
                <div id="imageBg" class="ImageBg">
                </div>
                <div class="image" id="image">
                </div>

                <div id="informacion">
            
                <span style="font-weight: bold;">
                </span> ${product.description}
                </p>
                <p class="title">
                <span style="font-weight: bold;">
                Categoría</span><br> ${product.category}
                </p>
                <p class="title">
                <span style="font-weight: bold;">
                Cantidad de vendidos</span><br> ${product.soldCount}</p>
                <p class="title" id="precioProducto">
                <p id="precioProducto" class="title">
                
                ${product.currency}:${product.cost}
            </p>
            <div class="botonCarrito">
            <button class="btnCarro" id="btnCarro">
            Añadir al carrito
                <i class="fa-solid fa-cart-arrow-down fa-lg"></i>
            </button>
                </div>
            </div>
            </div>
        </div>
        <div>
            ${relatedProduct}
        </div>
        `
        productoCargado (); 
          
        // Me toma el id del div de imagenes creado con el innerHTML
        // para llamar las imagenes como el resto del contenido
        const imageContainer = document.getElementById("image");
        const imagenes = product.images;
        

        //Me carga cada imagen del indice
        // Hago una funcion forEach donde me muestra un indice creando elementos img con todas las imagenes y una clase
        imagenes.forEach((image, index) => {
            let indiceImage = 0;
            let img = document.createElement("img");
            img.src = image;
            img.id = `image-${index}`;
            img.classList.add("image-grid");
            imageContainer.appendChild(img);

            // Evento que al hacer click me muestre el contenido interno
            // de cada producto
            img.addEventListener("click", () =>{
                indiceImage = index;
                showImage();
            });
        });

    }; getProductDetails();


    //Continua punto 1 de la entrega 4 
    //luego de agregado al dom el productsRelated, agregar los escuhcadores para que guarde el id y redirija a su propia cosa
    for (let element of document.getElementsByClassName("divSuggestedElement")) {
        element.addEventListener("click", showNewProduct);
    }

    function showNewProduct (event) {
        let element = event.currentTarget;
        let dataID = element.getAttribute("dataID"); 
        localStorage.setItem("id", dataID);
        let newProductID = localStorage.getItem("id");
        getJSONData(PRODUCT_INFO_URL + newProductID + EXT_TYPE);
        window.location.reload();
        (document).ready(function(){
            $('html, body').scrollTop(0);
        
            $(window).on('load', function() {
            setTimeout(function(){
                $('html, body').scrollTop(0);
            }, 0);
         });
        });
    };

    //DESAFIATE
    let responseComments = await getJSONData(PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE);
    let comments;

    /*Función que verifica la existencia en localStorage de los comentarios de un producto según su ID.
    Si los comentarios no existen en localStorage utiliza lo obtenido de la API directamente.

    En caso de que exista al haberse seteado más abajo, va a utilizar el mismo como valor del array comments.
    De esta forma se pueden seguir viendo los nuevos comentarios al seguir navegando, sin necesidad de hacer un POST request.*/
    
    function getComments() {
        let verifyComment = localStorage.getItem(`cmnts${productID}`);
        if (!verifyComment) {
            comments = responseComments.data;
            console.log(comments);
        } else if (verifyComment) {
            comments = JSON.parse(verifyComment);
        };
    }; getComments();
    

    //PUNTO 3 Y 4
    let commentDivs = document.createElement("div");
        productInfo.appendChild(commentDivs);

        /*Inicializo variable contador para acceder al comentario en el array 
        y para deshabilitar botón segun cantidad de comentarios*/
        let counter = 0;

    // Función que anexa los comentarios y puntuaciones en pantalla según valores del array comentarios. 
    function appendComments() {

        //Variable con array vacío que va a contener el template con los comentarios a anexar
        let carouselComments = [];

        commentDivs.innerHTML += "<h3 class='titulosP mt-5'> Comentarios </h3>"

        for (let i = 0; i < comments.length; i++) {
            let estrellas = `<div class="rating">`;
            for (let j = 0; j < comments[i].score; j++) {
                estrellas += `<i class="bi bi-star-fill star"></i>`
            }
            let estrellasVacias = 5 - comments[i].score;
            for ( let k = 0; k < estrellasVacias; k++) {
                estrellas += `<i class="bi bi-star star"></i>`
            }
            estrellas += "</div> "

            //Encierro el template dentro de una funcion anónima y pusheo cada uno al array creado.
            carouselComments.push(() =>    
                `
                <div id="comentariosGenerales" class="container-fluid">
                    <div class="mx-auto" style="display: flex; flex-direction: row; width: 50vh; align-items: flex-end">
                        <img src="img/img_perfil.png" alt="" class="profile pb-4    ">
                        <div class="bubble left">
                            <div id=user${i} class='fw-bold fs-5 d-block d-md-flex'>
                                ${comments[i].user}
                                <div id=score${i} class='ps-md-4'> 
                                    ${estrellas}
                                </div>
                            </div>
                            <div id=dateTime${i} class='small'>
                                ${comments[i].dateTime}
                            </div>
                            <div id=descr${i} class='fst-italic'>
                                ${comments[i].description}
                            </div>
                        </div>
                        
                    </div>
                </div>
                `
            );
            
        };
        
        //Divs para encerrar el carrusel y botones
        let otroDiv = document.createElement("div");
        let botonDiv = document.createElement("div");

        //Anexo carrusel al html
        productInfo.appendChild(otroDiv);
        productInfo.appendChild(botonDiv);

        //Anexo botones al div botones
        botonDiv.innerHTML += `<div class="container-fluid"> <div class="mx-auto"> <input type="button" id="carouselComments2" class="btnComentarios" value="Prev"> 
        <input type="button" id="carouselComments" class="btnComentarios" value="Next"> </div> </div>`;

        let btnCarouselPrev = botonDiv.querySelector("#carouselComments2");
        let btnCarouselNext = botonDiv.querySelector("#carouselComments");
        //Tomo a los botones y les asigno escuchadores
        btnCarouselNext.addEventListener("click", nextComment);
        btnCarouselPrev.addEventListener("click", prevComment);

        //Función que desactiva botones según contador
        function disableButtons() {
            if (counter <= 0) {
                btnCarouselPrev.disabled = true;
            } else {
                btnCarouselPrev.disabled = false;
            };

            if (counter === (comments.length-1)) {
                btnCarouselNext.disabled = true;
            } else {
                btnCarouselNext.disabled = false;
            };
        } disableButtons();
        
        /*Función que muestra comentarios accediendo al array segun el valor del contador 
        y llamando a cada función anónima*/
        function displayComments(){
            otroDiv.innerHTML = carouselComments[counter]();
        } displayComments();

        //Funciones que hacen los llamados a las funciones anteriores y aumentan o reducen valor del contador
        function nextComment() {
            counter++;
            disableButtons();
            displayComments();
        };

        function prevComment() {
            counter--;
            disableButtons();
            displayComments();
        };
            
    }; appendComments();

    

    //Se crea la caja de comentarios y se anexa al div principal.
    function commentBox() {
        let commentsBox = document.createElement("div");
        productInfo.appendChild(commentsBox);
        commentsBox.innerHTML = `
        
        <div id="tuComentario" class="container-fluid" style="padding: 30px">
            <h3 class='titulosP mt-5 mb-4'> Escribe tu comentario </h3>
                <div  id="comentarioPersonal" class="mx-auto" style="display: inline-flex;
                    flex-direction: row;
                        align-content: flex-end;
                        align-items: flex-end;">
                        
                            <div class="comentariosBubble">
                                <label class='mt-2'> Tu opinión </label>
                                    <input type='text' id="commentUser">
                                    <textarea id="txtComment" name="comentarios" placeholder="Escribe aquí tu comentario"></textarea>
                                    <label> Tu puntuación</label>
                                    <div class="rating">
                                    <button id='userScore1' class="bi bi-star-fill star" value='1 Estrella'></button>
                                    <button id='userScore2' class="bi bi-star-fill star" value='2 Estrellas'></button>
                                    <button id='userScore3' class="bi bi-star-fill star" value='3 Estrellas'></button>
                                    <button id='userScore4' class="bi bi-star-fill star" value='4 Estrellas'></button>
                                    <button id='userScore5' class="bi bi-star-fill star" value='5 Estrellas'></button>
                                    </div>
                                    
                                    
                                    <p id="showScore" class="m-0"></p>
                                    <div class="botonComentarios ">
                                        <button id="commentBtn" class="btnComentarios">Enviar </button>
                                    </div>
                            </div>
                       
                </div>
        </div>

        `

    }; commentBox();
    
    //TERMINA PUNTO 3 Y 4

    //DESAFIATE
    //Funcion que obtiene diversos datos para inicializar la carga del nuevo comentario.
    function getNewComment() {

        let userN = document.getElementById('commentUser');
        let rangeScore = document.querySelectorAll('#userScore1, #userScore2, #userScore3, #userScore4, #userScore5');  // Refs a los inputs del usuario 
        let showUserScore = document.getElementById('showScore'); 
        let userCmnt = document.getElementById('txtComment');

        let user = localStorage.getItem("User"); //Tomo el ID del usuario desde el localStorage
        
        let currentDate = new Date().toJSON().slice(0, 10); //Func fecha con func de strings slice para quitar las partes que no queremos mostrar.
        let currentHour = new Date().getHours();    //Funcionalidades de fecha que toman día, hora, min, sec.
        let currentMinute = new Date().getMinutes();
        let currentSeconds = new Date().getSeconds();

        userN.value = user;  
        userN.disabled = true; // En lugar de que usuario ingrese nombre para comentar, se ingresa su id desde el localStorage y se deshabilita el campo.
        
        for (let i = 0 ; i < rangeScore.length; i++) {
            rangeScore[i].addEventListener('click', () =>{ //Asigna a las estrellas un evento de escucha para la calificación del producto. 
            showUserScore.innerText = rangeScore[i].value; //Muestra en pantalla el valor mientras se elige
            });
        };

        //Func que crea nuevo comment. Pushea a un array y permite guardar el comentario de cada producto mientras se navega.
        function pushNewComment() {
            //Crea un objeto dinámico de acuerdo a los distintos valores que se obtengan.
            let newComment = {
                "product": Number(productID),
                "score": Number(showUserScore.innerText.slice(0, 2)),
                "description": userCmnt.value,
                "user": userN.value,
                "dateTime": `${currentDate}  ${currentHour}:${currentMinute}:${currentSeconds}`
            };

            //Blanqueo div para actualizar comentarios
            commentDivs.innerHTML = ``;

            //Push al array con los comentarios
            comments.push(newComment);

            //Seteo en localStorage cada objeto según su ID. Como solo maneja strings, le doy stringify.
            localStorage.setItem(`cmnts${productID}`, JSON.stringify(comments));

            //LLamo a la función de los comentarios otra vez.
            appendComments();

        userCmnt.value = ""
        location.reload(true);

        };
        document.getElementById('commentBtn').addEventListener('click', pushNewComment);
    }; getNewComment();


   
  

});


//Función para agregar en un arreglo al localStorage los datos del producto
//Chequea: si no existe en el localStorage el "carrito", lo crea como un arreglo vacío, 
//luego pushea el producto que se le de de parámetro al arreglo y lo guarda en el localStorage
//Si el producto estaba agregado al carrito, quantity (en el html es cantidad), se suma 1 en vez de agregar otro elemento html al navegador

let carritoKey = "carrito";

function addToCart(producto) {
    if (!localStorage.getItem(carritoKey)) {
        localStorage.setItem(carritoKey, JSON.stringify([]))
    }
    
    let carrito = (JSON.parse(localStorage.getItem(carritoKey)));
    let esta = -1;

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id == producto.id) {
            esta = i;
        }
    }
    if (esta > -1) {
        carrito[esta].quantity += 1
    } else {
        producto.quantity = 1
        carrito.push(producto);
    }
    localStorage.setItem(carritoKey, JSON.stringify(carrito));
}

// esta función es para escuchar el botón y llamar a la función addToCart, redirige a cart.html

function productoCargado () {
    document.getElementById("btnCarro").addEventListener("click", () => {
        addToCart(product)
        window.location = "cart.html"
    })
}