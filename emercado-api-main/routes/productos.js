const { Router } = require("express");

const router = Router();

const products = require("../products/40281.json");
const products1 = require("../products/50741.json");
const products2 = require("../products/50742.json");
const products3 = require("../products/50743.json");
const products4 = require("../products/50744.json");
const products5 = require("../products/50921.json");
const products6 = require("../products/50922.json");
const products7 = require("../products/50923.json");
const products8 = require("../products/50924.json");
const products9 = require("../products/50925.json");
const products10 = require("../products/60801.json");
const products11 = require("../products/60802.json");
const products12 = require("../products/60803.json");
const products13 = require("../products/60804.json");


//routes
const categorias = {
    '40281.json': products,
    '50741.json': products1,
    '50742.json': products2,
    '50743.json': products3,
    '50744.json': products4,
    '50921.json': products5,
    '50922.json': products6,
    '50923.json': products7,
    '50924.json': products8,
    '50925.json': products9,
    '60801.json': products10,
    '60802.json': products11,
    '60803.json': products12,
    '60804.json': products13,
  };
  
  router.get('/:id', function(req, res) {
    const { id } = req.params;
  
    // Verificar si la categoría existe
    if (categorias.hasOwnProperty(id)) {
      res.send(categorias[id]);
    } else {
      res.status(404).send('Categoría no encontrada');
    }
  });



module.exports = router;
