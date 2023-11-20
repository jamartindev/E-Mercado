const { Router } = require("express");
const router = Router();
// llamado simple ya que es un solo json y usamos get
const cat = require("../cats/cat.json");

//routes
router.get("/", (req, res) => {
    res.json(cat)
})

module.exports = router;