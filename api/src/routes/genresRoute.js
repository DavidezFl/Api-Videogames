const { Router } = require("express");
//importamos controllers
const getGenre = require("../controllers/genresController");
require('dotenv').config();
const genreRouter = Router();

genreRouter.get("/", getGenre);

module.exports = genreRouter;