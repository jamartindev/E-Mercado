const { Router } = require("express");

const router = Router();


// uso fs y path para que me haga la misma particion
const fs = require('fs');
const path = require('path');

// Aca creo constante para que me de todos los datos json de cada productos en el mismo llamado
// osea que van a estar todas las productos juntas pero separadas por {} e id de las productos
const files = [
    "../products/40281.json",
    "../products/50741.json",
    "../products/50742.json",
    "../products/50743.json",
    "../products/50744.json",
    "../products/50921.json",
    "../products/50922.json",
    "../products/50923.json",
    "../products/50924.json",
    "../products/50925.json",
    "../products/60801.json",
    "../products/60802.json",
    "../products/60803.json",
    "../products/60804.json",
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

module.exports = router;