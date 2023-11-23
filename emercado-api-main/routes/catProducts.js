const { Router } = require("express");

const router = Router();

// llamado simple ya que es un solo json y usamos get
const cat = require("../cats_products/101.json");
const cat1 = require("../cats_products/102.json");
const cat2 = require("../cats_products/103.json");
const cat3 = require("../cats_products/104.json");
const cat4 = require("../cats_products/105.json");
const cat5 = require( "../cats_products/106.json");
const cat6 = require("../cats_products/107.json");
const cat7 = require("../cats_products/108.json");
const cat8 = require("../cats_products/109.json");


//routes
const categorias = {
    '101.json': cat,
    '102.json': cat1,
    '103.json': cat2,
    '104.json': cat3,
    '105.json': cat4,
    '106.json': cat5,
    '107.json': cat6,
    '108.json': cat7,
    '109.json': cat8,
  };
  
  router.get('/:catID', function(req, res) {
    const { catID } = req.params;
  
    // Verificar si la categoría existe
    if (categorias.hasOwnProperty(catID)) {
      res.send(categorias[catID]);
    } else {
      res.status(404).send('Categoría no encontrada');
    }
  });

module.exports = router;
