const { Router } = require("express");
const router = Router();

// llamado simple ya que es un solo json y usamos get
const user_cart = require("../user_cart/25801.json");

//routes
router.get("/", (req, res) => {
    res.send(user_cart)
})

module.exports = router;

// si en el require de ../user_cart/ quiero llamar al archivo json como hago?
// Importamos el módulo 'fs' y 'util' de Node.js
