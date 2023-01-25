import axios from "axios";
//para los errores de typeo

//Get
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_DETAILS = "GET_DETAILS";
export const GET_NAME_VIDEOGAME = "GET_NAME_VIDEOGAME"
/*//////////////////////////////////////////////////////////////////////*/
export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME";
//export const PUT_VIDEOGAME = "PUT_VIDEOGAME";
/*//////////////////////////////////////////////////////////////////////*/
//Filters
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_CREATED = "FILTER_CREATED";
//export const FILTER_BY_RATING = "FILTER_BY_RATING";
/*//////////////////////////////////////////////////////////////////////*/
//Order
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
/*//////////////////////////////////////////////////////////////////////*/

//action creator
//Get
export const getVideogames = () =>{
    return function(dispatch){
        axios
        .get("http://localhost:3001/videogames")
        .then(response => response.data)
        .then(data => dispatch({type:GET_VIDEOGAMES, payload: data}))
        .catch((error) => console.log(error))
    };
};

export const getGenres = () =>{
    return function(dispatch){
        axios
        .get("http://localhost:3001/genres")
        .then(response => response.data)
        .then(data => dispatch({type: GET_GENRES, payload: data}))
        .catch((error)=> console.log(error))
    }
};

export function getDetail(id){
    return async function (dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/videogames/` + id);
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function getNameVideogame(name){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/videogames?name=" + name);
            return dispatch({
                type: GET_NAME_VIDEOGAME,
                payload: json.data
            });
        }catch(error){
            console.log(error)
        };
    };
}
/*//////////////////////////////////////////////////////////////////////*/
//Post, Put, Delete
export function postVideogame(payload){
    return async function(){
        const json = axios.post("http://localhost:3001/videogames", payload);
        return json;
    };
}

/*export function putVideogame(id, payload){
    return async function(dispatch){
                var json = await axios.put(`http://localhost:3001/videogames/${id}`, payload)
                return json
    }
}*/

export function deleteVideogame(id){
        return async function(dispatch){
            var json = await axios.delete(`http://localhost:3001/videogames/${id}`)
            return dispatch({
                type: DELETE_VIDEOGAME,
                payload: json.data
            })
        }
}

/*//////////////////////////////////////////////////////////////////////*/
//Filters
export function filterByGenre(payload){
    return{
        type: FILTER_BY_GENRE,
        payload
    }
}

export function filterCreated(payload){
    return{
        type: FILTER_CREATED,
        payload
    }
}

/*export function filterByRating(payload){
    return{
        type: FILTER_BY_RATING,
        payload
    }
}*/
/*//////////////////////////////////////////////////////////////////////*/
//Order
export function orderByRating(payload){
    return{
        type: ORDER_BY_RATING,
        payload
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}