const axios = require("axios");

const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
require('dotenv').config();

const getAllVideogames = async ()=>{
    const api1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`);
    const api2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`);
    const api3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=20`);
    
    const apiTotal = api1.data.results.concat(api2.data.results, api3.data.results)

    const apiInfo = apiTotal.map((v)=>{
        return {
            id: v.id,
            name: v.name,
            rating: v.rating,
            released: v.released,
            image: v.background_image,
            platforms: v.platforms.map(e => e.platform.name),
            genres: v.genres.map(e => e.name)
        }
    });


    /*
    const apiInfo = await Promise.all(apiTotal)
    .then((videogame) =>{
        let gameArray = videogame.map((e) =>{
            return{
                id:,
                name:,
                rating:,

            }
        })
        return gameArray
    })
    */
    
    let gameDb = await Videogame.findAll({
        //SELECT * FROM Videogame
        include: [
            {
            model: Genre,
            attributes: ["name"],
            through: {                       //el include me sirve para no traer mi tabla intermedia también.
                attributes: [],
            },
        },
    ],
    })
   
    gameDb = await gameDb.map(videogame => { 
        videogame = JSON.parse(JSON.stringify(videogame)); // lo convierto en un objeto que pueda manejar javascript
        videogame.genres = videogame.genres.map(t => t.name);
        return videogame;
    }) 

    const apiGame = await apiInfo;
    const dbGame = await gameDb;
    const totalGames = dbGame.concat(apiGame);
    return totalGames;
};

const idApi = async (id)=>{
        const detail = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        
        if(detail){
            const gameId = await detail.data;
            const Info = {
                id: gameId.id,
                name: gameId.name,
                description: gameId.description_raw,
                rating: gameId.rating,
                genres: gameId.genres?.map((e)=>e.name),
                platforms: gameId.platforms.map((e) => e.platform.name),
                image: gameId.background_image,
                released: gameId.released,
            };
            return Info;
        }else{
            return "Not exist id"
        }
    }
   
const idDb = async (id) => {
    try{
        let gameId = await Videogame.findByPk(id, {
            include: [
                {
                    model: Genre,
                    attributes: ["name"],
                    through: {
                        attributes: [],       //el include me sirve para no traer mi tabla intermedia también.
                    }
                }
            ]
        })
        gameId = JSON.parse(JSON.stringify(gameId)); // lo convierto en un objeto que pueda manejar javascript
        gameId.genres = gameId.genres.map(t => t.name);
        return gameId;
    }catch(e){
        console.error(e);
    }
}

const gamesById = async (id) =>{
    const dbID = id.includes("-");
    if(dbID){
        const gameDb = await idDb(id);
        return gameDb;
    }else{
        const gameApi = await idApi(id)
        return gameApi
    }
}

module.exports = { getAllVideogames, gamesById}
