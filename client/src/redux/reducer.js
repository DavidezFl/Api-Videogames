
import { GET_VIDEOGAMES, GET_GENRES, GET_DETAILS, GET_NAME_VIDEOGAME, FILTER_CREATED, FILTER_BY_GENRE, /*FILTER_BY_RATING,*/ ORDER_BY_NAME, ORDER_BY_RATING, DELETE_VIDEOGAME, /*PUT_VIDEOGAME*/ } from "./action";

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: [],

}

const rootReducer = (state = initialState, action)=>{
    switch (action.type){
        //Gets
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            };
        
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload,
            };

        case GET_DETAILS:
            return{
                ...state,
                detail: action.payload,
            };
        
        case GET_NAME_VIDEOGAME:
            return{
                ...state,
                videogames: action.payload
            };    
        //Post, Put, Delete
        case "POST_VIDEOGAME":
            return{
                ...state,
            };
        
        case DELETE_VIDEOGAME:
            return{
                ...state,
            };   
        
        /*
        case PUT_VIDEOGAME:
            return{
                ...state,
            }*/

        //Filters
        case FILTER_BY_GENRE:
            let filtered = [...state.videogames];
            let allGames = state.allVideogames;

            if(action.payload === "All"){ filtered = allGames
            }else{filtered = allGames.filter(v => v.genres.includes(action.payload))
            }
            if(!filtered.length){
               alert("There are no games of that genre.")
               return state
            }
             return {
                ...state,
                videogames: filtered
             };

        case FILTER_CREATED:
            let filtered2 = [...state.videogames];
            let allGames2 = state.allVideogames;

            if(action.payload === "all") filtered2 = allGames2
            else if (action.payload === "created") filtered2 = allGames2.filter(el=>el.createInDb)
            else filtered2 = allGames2.filter(el=> !el.createInDb);
            if(!filtered2.length){
                alert("There are no games created")
                return state
            }
            return{
                ...state,
                videogames: filtered2
            };

        /*   
        case FILTER_BY_RATING:
            let filterRating = action.payload;
        if(action.payload === "mayortres"){
            const filterRating = state.videogames.filter(v => v.rating > 3)
            return{
                ...state,
                videogames: filterRating
            }
        }
        if(action.payload === "menortres"){
            const filterRating = state.videogames.filter(v => v.rating < 3)
            return{
                ...state,
                videogames: filterRating
            }
        }
        return{
            ...state,
            videogames: filterRating
        };*/
        //Orders
        case ORDER_BY_RATING:
            let orderRating = [...state.videogames]
            let allGames3 = state.allVideogames;

            if(action.payload === "allRating") orderRating = allGames3;
            else{
            orderRating = orderRating.sort((a,b)=>{
                if(a.rating < b.rating){
                    return action.payload === "menormayor" ? -1 : 1
                }
                if(a.rating > b.rating){
                    return action.payload === "menormayor" ? 1 : -1
                }
                return 0
            })}
            return{
                ...state,
                videogames: orderRating
            };
            
        case ORDER_BY_NAME:
            let sortedArr = [...state.videogames]
            let allgames4 = state.allVideogames

            if(action.payload === "allOrder") sortedArr = allgames4
            else{
            sortedArr = sortedArr.sort((a,b) =>{
                if(a.name.toLowerCase() < b.name.toLowerCase()){
                    return action.payload === "asc" ? -1 : 1
                }
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return action.payload === "asc" ? 1 : -1
                }
                return 0
            })}
             return {
                ...state,
                videogames: sortedArr
             };
        
        default:
            return { ...state };
    }
};

export default rootReducer;