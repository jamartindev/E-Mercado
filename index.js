const express = require("express");
const app = express();
const morgan = require("morgan");
const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "cart",
  connectionLimit: 5,
});

/*const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');}*/

// app.use(bodyParser.json()); // Middleware para manejar datos JSON en las solicitudes

//settings
app.set('port', process.env.PORT || 3000);
app.set("json spaces", 2);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json()); // for parsing application/json

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
  

//routes
app.use(require("./emercado-api-main/routes/index")); // Creo que es innecesario
app.use("/api/cats" ,require("./emercado-api-main/routes/cat")); // Hecho
app.use("/api/cart" ,require("./emercado-api-main/routes/cart")); // Hecho
app.use("/api/cats_products" ,require("./emercado-api-main/routes/catProducts")); // Hecho LEER COMENTARIOS DENTRO DE ESTE JS
app.use("/api/products" ,require("./emercado-api-main/routes/productos")); // Hecho Pero  aveces pide middlewares aveces, ver comportamiento
app.use("/api/products_comments" ,require("./emercado-api-main/routes/comments")); // Hecho
app.use("/api/publish" ,require("./emercado-api-main/routes/sell")); // Hecho
app.use("/api/25801" ,require("./emercado-api-main/routes/usercart")(pool)); // Hecho

//starting the server
app.listen(3000, () => {
    console.log(`Server is running on port ${app.get('port')}`);
});
