const { Router } = require("express");
const router = Router();

//routes
router.get("/", (req, res) => {
    res.send("Servidor Grupo 5");
});



module.exports = router; 

