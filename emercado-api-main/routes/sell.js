const { Router } = require("express");
const router = Router();
// llamado simple ya que es un solo json y usamos get
const sell = require("../sell/publish.json");

//routes
router.get("/", (req, res) => {
    res.send(sell)
});

module.exports = router;