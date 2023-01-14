
const { Videogame, Genre } = require("../db");
const { getAllVideogames, gamesById } = require("./getApiDb")


const getVideogames = async (req, res)=>{
    const {name} = req.query;
    try{
        const allVideogames = await getAllVideogames();
        if(name){
            let gameName = await allVideogames.filter((el)=> el.name.toLowerCase().includes(name.toLowerCase()));
            gameName.length
            ? res.status(200).send(gameName)
            : res.status(404).send("Game no exist");
        }else{
            res.status(200).send(allVideogames)
        }
    }catch(err){
        console.log(err);
    }
};

const getVideogamesById = async (req, res) =>{
    const { id } = req.params;
    let idGame = await gamesById(id);
    try{
        idGame
        ? res.status(200).send(idGame)
        : res.status(404).send("ID no exist");
    }catch(err){
        console.log(err);
    }
};

/*const getPlatforms = async (req, res, next) =>{
    try{
        const all = await getApiVideogames();
        const allPlatforms = [];
        all.map((g) => g.platforms.map((p)=>{
            if(!allPlatforms.includes(p)){
                allPlatforms.push(p);
            }
        }));

        allPlatforms.length
        ? res.status(200).json(allPlatforms)
        : res.status(404).send("Error");
    }catch (e){
        next(e);
    }
};*/

const createVideogame = async (req, res, next) =>{
    const { name, description, released, genres, rating, platforms, image, createInDb } = req.body;

    try{
    let gameCreated = await Videogame.create({ name, description, released, rating, platforms, image, createInDb});

    let genreDb = await Genre.findAll({
        where: { name: genres }
    });

    gameCreated.addGenre(genreDb)
    res.send("Game created")

}catch(e){
    next(e);
}
};

const deleteVideogame = async (req, res, next) =>{

    const { id } = req.params

    try{
        const deleteVideogame = await Videogame.findByPk(id,{
            include:{
                model: Genre,
                attributes: ["name"],
                through:{
                    attributes:[]
                }
            }
        })
        if(deleteVideogame){
            await deleteVideogame.destroy();
            return res.send("Videogame deleted");
        }
        else{
            res.status(404).send("Videogame no exist");
        }
    }catch(error){
        next(error)
    }

};
/*
const putVideogame = async (req, res) =>{
    const { id } = req.params;

    let {
        name,
        description,
        released,
        genres,
        rating,
        platforms,
        createInDb
    } = req.body;

        try{
            let videogame = await Videogame.findByPk(id, {
                where:{
                    id: id
                },
                include:{
                    model: Genre,
                    attributes: ["name"],
                    through:{
                        attributes:[]
                    }
                }
            })
            await videogame.update({
                name,
                description,
                released,
                rating,
                genres,
                platforms,
                id,
                createInDb
            })
            let genDb = await Genre.findAll({
                where:{
                    name:genres
                }
            })
            videogame.addGenre(genDb)
            res.status(200).send("Updated")

        }catch(e){
           console.log(e)
        }
    }
*/
module.exports = { getVideogames, getVideogamesById, createVideogame, deleteVideogame, /*putVideogame*/};