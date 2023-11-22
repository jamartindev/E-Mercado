const express = require("express");
const app = express();
const morgan = require("morgan");
// habilito cors y uso jwt, junsto con la clave secreta y el body parser para tranformar los datos
const cors = require("cors");
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const SECRET_KEY = "clavesecreta"

//settings
app.set('port', process.env.PORT || 3000);
app.set("json spaces", 2);

// middlewares
// cors para hacer peticiones de diferentes metodos
app.use(cors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json()); // for parsing application/json


//routes
app.use(require("./emercado-api-main/routes/index")); // Creo que es innecesario
app.use("/api/cats" ,require("./emercado-api-main/routes/cat")); // Hecho
app.use("/api/cart" ,require("./emercado-api-main/routes/cart")); // Hecho
app.use("/api/cats_products" ,require("./emercado-api-main/routes/catProducts")); // Hecho LEER COMENTARIOS DENTRO DE ESTE JS
app.use("/api/products" ,require("./emercado-api-main/routes/productos")); // Hecho Pero  aveces pide middlewares aveces, ver comportamiento
app.use("/api/products_comments" ,require("./emercado-api-main/routes/comments")); // Hecho
app.use("/api/publish" ,require("./emercado-api-main/routes/sell")); // Hecho
app.use("/api/25801" ,require("./emercado-api-main/routes/usercart")); // Hecho
 

// armo un array donde me tome los usuarios
let arrayUsers = [];


// Obtengo el arreglo de usuarios
app.get("/login", (req, res) =>{
    res.json(arrayUsers)
})

// metodo post que pedia y pass es admin y user admin, probablemente falte algo pero deberia de ser algo asi
// pero el server haciendo npm run dev te lo abre y funciona, pero no se que faltaria
app.post("/login", (req, res) => {
   
    const {username, password} = req.body;
    if(username === "admin" && password === "admin"){
        const token = jwt.sign({username}, SECRET_KEY )
        res.status(200).json({token})
    }else{
        res.status(401).json({menssege:"Usuario y/o contrase;a incorrecto"})
    }
});




//starting the server
app.listen(3000, () => {
    console.log(`Server is running on port ${app.get('port')}`);
});
