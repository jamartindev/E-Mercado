const { Router } = require("express");
const router = Router();
const verificarToken = require("./index");

// llamado simple ya que es un solo json y usamos get
const cart = require("../cart/buy.json");

//routes
router.get("/", (req, res) => {
    res.send(cart)
});

router.use('/cart', verificarToken);

//ruta cart
router.get('/cart', (req, res) => {
  
  res.json({ mensaje: 'Acceso autorizado a /cart', usuario: req.usuario });
});




module.exports = router;
