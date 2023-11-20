const express = require("express");
const app = express();
const morgan = require("morgan");

//settings
app.set('port', process.env.PORT || 3000);
app.set("json spaces", 2);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json()); // for parsing application/json

//routes
app.use(require("./routes/index")); // Creo que es innecesario
app.use("/api/cats" ,require("./routes/cat")); // Hecho
app.use("/api/cats_products" ,require("./routes/catProducts")); // Hecho LEER COMENTARIOS DENTRO DE ESTE JS
app.use("/api/products" ,require("./routes/productos")); // Hecho Pero  aveces pide middlewares aveces, ver comportamiento
app.use("/api/products_comments" ,require("./routes/comments")); // Hecho

//starting the server
app.listen(3000, () => {
    console.log(`Server is running on port ${app.get('port')}`);
});
