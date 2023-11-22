const { Router } = require("express");
const router = Router();

//routes
router.get("/", (req, res) => {
    res.send("Servidor Grupo 5");
});


/*function verificarToken(req, res, next) {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ mensaje: 'Acceso no autorizado. Token no proporcionado.' });
    }
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.usuario = decoded.username;
      next();
    } catch (error) {
      return res.status(401).json({ mensaje: 'Token no válido.' });
    }
  }*/
  
  



module.exports = router; 
