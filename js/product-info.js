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
    let comments = responseComments.data;
        console.log(comments);
    

    function appendComments() {
        let commentDivs = document.createElement("div");
        productInfo.appendChild(commentDivs);
        
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
                    <img src="img/profile-circle-icon-512x512-zxne30hp.png" alt="" class="profile">
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
            
            

            function commentBox() {
                let commentsBox = document.createElement("div");
                productInfo.appendChild(commentsBox);
                commentsBox.innerHTML = `
                
                <br><input type='text' id="commentUser"><br>
                <br><textarea name="comentarios" id="txtComment" cols="30" rows="10"></textarea><br><br>
                <input type="range" id="userScore" min="0" max="5"><br><br>
                <p id="showScore"></p><br>
                <button type="button" id="commentBtn">Añadir comentario</button>
                `
            }; commentBox();
            
                function getNewComment() {
                    let userN = document.getElementById('commentUser');
                    let rangeScore = document.getElementById('userScore');
                    let showUserScore = document.getElementById('showScore');
                    let user = localStorage.getItem("User");
                    let userCmnt = document.getElementById('txtComment');
                    let currentDate = new Date().toJSON().slice(0, 10);
                    let currentHour = new Date().getHours();
                    let currentMinute = new Date().getMinutes();
                    let currentSeconds = new Date().getSeconds();
            
                    userN.value = user;
                    userN.disabled = true;
                    rangeScore.addEventListener('input', () =>{
                    showUserScore.innerText = rangeScore.value;
                    });
            
                    function pushNewComment() {
                    
                        let newComment = {
                            "product": productID,
                            "score": rangeScore.value,
                            "description": userCmnt.value,
                            "user": userN.value,
                            "dateTime": `${currentDate}  ${currentHour}:${currentMinute}:${currentSeconds}`
                        };
                        
                        let newCommentDiv = document.createElement("div");
                        commentDivs.appendChild(newCommentDiv)
                        newCommentDiv.innerHTML = `
                        <br>
                        <div>
                            <div>
                            ${newComment.product}
                            </div>
                            <div>
                            ${newComment.score}
                            </div>
                            <div>
                            ${newComment.description}
                            </div>
                            <div>
                            ${newComment.user}
                            </div>
                            <div>
                            ${newComment.dateTime}
                            </div>
                        </div>
                        <br>
                    `
                    userCmnt.value = ""

                    };
                    document.getElementById('commentBtn').addEventListener('click', pushNewComment);
                }; getNewComment();

    }; appendComments();
});
