const axios = require("axios");
const { Genre } = require("../db");

const {API_KEY} = process.env;
require('dotenv').config();

const getGenre = async (req, res) =>{
    const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const apiGenres = response.data.results.map(el => el.name);

    apiGenres.map(element =>{
        Genre.findOrCreate({        //Busco y si no está lo creo
            where: { name: element } // Guardo
        })
    });
    const allGenres = await Genre.findAll()
    res.send(allGenres)
};


module.exports = getGenre;