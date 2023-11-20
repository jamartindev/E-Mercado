const { Router } = require("express");
const router = Router();

// llamado simple ya que es un solo json y usamos get
const cart = require("../cart/buy.json");

//routes
router.get("/", (req, res) => {
    res.send(cart)
});

module.exports = router;