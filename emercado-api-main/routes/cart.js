const { Router } = require("express");
const router = Router();

// llamado simple ya que es un solo json y usamos get
const cart = require("../cart/buy.json");

//routes
router.get("/", (req, res) => {
    res.send(cart)
});

/*const {verificarToken} = require("./index").verificarToken; 
const jwt = require('jsonwebtoken'); 
const SECRET_KEY = "clavesecreta"; 

// Middleware de autorización
router.use(verificarToken);

// Funciones de manejo específicas para /api/cart
router.get('/', (req, res) => {
  // Acceso autorizado, la información del usuario está disponible en req.usuario
  res.json({ mensaje: 'Acceso autorizado a /api/cart', usuario: req.usuario });
});*/



module.exports = router;
