const { Router } = require('express');
// Importar todos los routers;
const videogameRouter = require("./videogamesRoute");
const genresRouter = require("./genresRoute");

const router = Router();

// Configurar los routers
router.use("/videogames", videogameRouter);
router.use("/genres", genresRouter);

module.exports = router;
