const { Router } = require("express");
//importamos controllers
const { getVideogames, getVideogamesById, createVideogame, deleteVideogame, /*putVideogame*/ } = require("../controllers/videogamesController");

const videogameRouter = Router();

const validate = (req, res, next) =>{
    const { name, description, platforms } = req.body;
    if(!name) return res.status(400).json({ error: "missing name"});
    if(!description) return res.status(400).json({ error: "missing description"});
    if(!platforms) return res.status(400).json({ error: "missing platforms"});
    next();
};

videogameRouter.get("/", getVideogames);

videogameRouter.get("/:id", getVideogamesById);

videogameRouter.post("/", validate, createVideogame);

videogameRouter.delete("/:id", deleteVideogame);

//videogameRouter.put("/:id", putVideogame);

module.exports = videogameRouter;