const { Router } = require("express");

const router = Router();

const comments = require("../products_comments/40281.json");
const comments1 = require("../products_comments/50741.json");
const comments2 = require("../products_comments/50742.json");
const comments3 = require("../products_comments/50743.json");
const comments4 = require("../products_comments/50744.json");
const comments5 = require("../products_comments/50921.json");
const comments6 = require("../products_comments/50922.json");
const comments7 = require("../products_comments/50923.json");
const comments8 = require("../products_comments/50924.json");
const comments9 = require("../products_comments/50925.json");
const comments10 = require("../products_comments/60801.json");
const comments11 = require("../products_comments/60802.json");
const comments12 = require("../products_comments/60803.json");
const comments13 = require("../products_comments/60804.json");


//routes
const categorias = {
    '40281.json': comments,
    '50741.json': comments1,
    '50742.json': comments2,
    '50743.json': comments3,
    '50744.json': comments4,
    '50921.json': comments5,
    '50922.json': comments6,
    '50923.json': comments7,
    '50924.json': comments8,
    '50925.json': comments9,
    '60801.json': comments10,
    '60802.json': comments11,
    '60803.json': comments12,
    '60804.json': comments13,
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

