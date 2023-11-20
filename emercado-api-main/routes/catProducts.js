const { Router } = require("express");

const router = Router();


// uso fs y path para que me haga la misma particion
const fs = require('fs');
const path = require('path');

// Aca creo constante para que me de todos los datos json de cada producto en el mismo llamado
// osea que van a estar todas los productos juntos pero separadas por [{ dato }] e id de los productos
const files = [
    "../cats_products/101.json",
    "../cats_products/102.json",
    "../cats_products/103.json",
    "../cats_products/104.json",
    "../cats_products/105.json",
    "../cats_products/106.json",
    "../cats_products/107.json",
    "../cats_products/108.json",
    "../cats_products/109.json",
];

const contents = [];

for (const file of files) {
 const content = fs.readFileSync(path.join(__dirname, file));
 contents.push(JSON.parse(content));
}


//routes
// es una peticion get para que me arme el llamado
router.get("/", (req, res) => {
    res.json(contents)
})

// aca se exportan
module.exports = router;