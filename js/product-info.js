document.addEventListener("DOMContentLoaded", async () => {
  
    const productID = localStorage.getItem("id");
    console.log(productID);
    const productInfo = document.getElementById("product-info");
    const respondeID = await getJSONData(
        PRODUCT_INFO_URL + productID + EXT_TYPE
        // Aprovecho que ya estan los datos en init y 
        // pido que me de el url de productos y el tipo de extension
    );

    function getProductDetails() {
    
        let product = respondeID.data;
            // Pido los datos del json en este caso los datos de productos


        productInfo.innerHTML = `
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
            <div id="informacion">
            
            <p class="title">
            <span style="font-weight: bold;">
            Descripción:</span> ${product.description}
            </p>
            <p class="title">
            <span style="font-weight: bold;">
            Categoría</span>: ${product.category}
            </p>
            <p class="title">
            <span style="font-weight: bold;">
            Cantidad de vendidos</span>: ${product.soldCount}</p>
            <p class="title" id="precioProducto">
 
            ${product.currency}:${product.cost}
            </p>
        <div class="botonCarrito">
            <button class="btnCarro">
                <i class="fa-solid fa-cart-arrow-down fa-lg"></i>
            </button>
        </div>
            </div>
            </div>
        </div>
        `
        // Aca me toma el id del div de imagenes creado con el innerHTML
        const imageContainer = document.getElementById("image");
        const imagenes = product.images;
        

        //Aca me carga cada imagen del indice
        imagenes.forEach((image, index) => {
            let indiceImage = 0;
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

    }; getProductDetails();

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
    

    
    let commentDivs = document.createElement("div");
        productInfo.appendChild(commentDivs);

    // Función que anexa los comentarios y puntuaciones en pantalla según valores del array comentarios. 
    function appendComments() {
        
        commentDivs.innerHTML += "<h3 class='mt-5'> Comentarios </h3>"
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
            commentDivs.innerHTML +=  
            ` 
            <div class="comentariosGenerales" >
                <div class="containerBubble" style="display: inline-flex; flex-direction: row; align-content: flex-end;
                    align-items: flex-end;">
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
                
                `;
            };
            
    }; appendComments();

    //Se crea la caja de comentarios y se anexa al div principal.
    function commentBox() {
        let commentsBox = document.createElement("div");
        productInfo.appendChild(commentsBox);
        commentsBox.innerHTML = `
        
        <div class="tuComentario" style="padding: 30px">
            <h3 class='mt-4 mb-4'> Escribe tu comentario </h3>
                <div class="containerBubble" style="display: inline-flex;
                    flex-direction: row;
                        align-content: flex-end;
                        align-items: flex-end;">
                        <div class="bubble left">
                            <div class="comentariosBubble">
                                <label class='mt-2'> Tu opinión </label>
                                    <input type='text' id="commentUser">
                                    <textarea id="txtComment" name="comentarios" placeholder="Escribe aquí tu comentario"></textarea>
                                    <label> Tu puntuación</label>
                                    <input type="range" id="userScore" min="0" max="5">
                                    <p id="showScore" class="m-0"></p>
                                    <div class="botonComentarios m-0">
                                        <button id="commentBtn" class="btnComentarios">Enviar </button>
                                    </div>
                            </div>
                        </div>
                </div>
        </div>

        `

    }; commentBox();

    //Funcion que obtiene diversos datos para inicializar la carga del nuevo comentario.
    function getNewComment() {

        let userN = document.getElementById('commentUser');
        let rangeScore = document.getElementById('userScore');  // Refs a los inputs del usuario 
        let showUserScore = document.getElementById('showScore'); 
        let userCmnt = document.getElementById('txtComment');

        let user = localStorage.getItem("User"); //Tomo el ID del usuario desde el localStorage
        
        let currentDate = new Date().toJSON().slice(0, 10); //Func fecha con func de strings slice para quitar las partes que no queremos mostrar.
        let currentHour = new Date().getHours();    //Funcionalidades de fecha que toman día, hora, min, sec.
        let currentMinute = new Date().getMinutes();
        let currentSeconds = new Date().getSeconds();

        userN.value = user;  
        userN.disabled = true; // En lugar de que usuario ingrese nombre para comentar, se ingresa su id desde el localStorage y se deshabilita el campo.
        rangeScore.addEventListener('input', () =>{ //Asigna a un range un evento de escucha según input para la calificación del producto. 
        showUserScore.innerText = rangeScore.value; //Muestra en pantalla el valor mientras se elige
        });

        //Func que crea nuevo comment. Pushea a un array y permite guardar el comentario de cada producto mientras se navega.
        function pushNewComment() {
            
            //Crea un objeto dinámico de acuerdo a los distintos valores que se obtengan.
            let newComment = {
                "product": Number(productID),
                "score": Number(rangeScore.value),
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

        };
        document.getElementById('commentBtn').addEventListener('click', pushNewComment);
    }; getNewComment();
});


//Cacho que arranqué para probar lo mismo con menos código

/*let newCommentDiv = document.createElement("div");
            commentDivs.appendChild(newCommentDiv)
            newCommentDiv.innerHTML = `
            <div class="comentariosGenerales"
                <div class="containerBubble" style="display: inline-flex; flex-direction: row; align-content: flex-end; align-items: flex-end;">
                    <img src="img/img_perfil.png" alt="" class="profile pb-4">
                    <div class="bubble left">
                        <div class='fw-bold fs-5 d-block d-md-flex'>
                            ${newComment.user}
                            <div class='ps-md-4'> 
                                ${newComment.score}
                            </div>
                        </div>
                            <div class='small'>
                                ${newComment.dateTime}
                            </div>
                            <div class='fst-italic'>
                                ${newComment.description}
                            </div>
                </div>
            </div>
        `*/