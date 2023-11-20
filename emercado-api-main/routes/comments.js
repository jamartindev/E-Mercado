const { Router } = require("express");

const router = Router();


// uso fs y path para que me haga la misma particion
const fs = require('fs');
const path = require('path');

// Aca creo constante para que me de todos los datos json de cada comentario de los productos en el mismo llamado
// osea que van a estar todas loss comentarios juntos pero separadas por [{ dato }] e id de los comentarios
const files = [
    "../products_comments/40281.json",
    "../products_comments/50741.json",
    "../products_comments/50742.json",
    "../products_comments/50743.json",
    "../products_comments/50744.json",
    "../products_comments/50921.json",
    "../products_comments/50922.json",
    "../products_comments/50923.json",
    "../products_comments/50924.json",
    "../products_comments/50925.json",
    "../products_comments/60801.json",
    "../products_comments/60802.json",
    "../products_comments/60803.json",
    "../products_comments/60804.json",
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