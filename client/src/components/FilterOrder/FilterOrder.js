import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
/*//////////////////////////////////////////////////////////////////////*/
import "./FilterOrder.css"
import { getGenres, orderByRating, orderByName, filterByGenre, filterCreated } from "../../redux/action";

export default function FilterOrder({setCurrentPage, setOrden}){

    const dispatch = useDispatch();
    const allGenres = useSelector((state) => state.genres)

    
    useEffect(()=>{
        dispatch(getGenres())
    },[dispatch])


    function handleSortByRating(e){
        e.preventDefault()
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1)                       
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSortByName(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterGenres(e){
        e.preventDefault()
        dispatch(filterByGenre(e.target.value))
        setCurrentPage(1)                           //seteo ( para que no se bug al cambiar de un genre a otro al cambiar de pag.)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    
    /*function handleFilterByRating(e){
        dispatch(filterByRating(e.target.value))
    }*/
    
    return(
                <div className="selects">
                        <select onChange={(e) => handleFilterGenres(e)} defaultValue="default" className="selectGenre">
                            <option value="default" disabled='disabled'>Genres</option>
                            <option value="All">All genres</option>
                            {allGenres?.map((el)=>{
                                return(
                                    <option value={el.name} key={el.id}>{el.name}</option>
                                )
                            })}
                        </select>
                        <select onChange={(e)=>handleFilterCreated(e)} defaultValue="default" className="selectGame">
                            <option value="default" disabled='disabled'>Videogames</option>
                            <option value="all">All videogames</option>
                            <option value="created">All Created</option>
                            <option value="api">All Existent API</option>
                        </select>

                        <select onChange={(e) => handleSortByRating(e)} defaultValue="default" className="selectRating">
                            <option value='default' disabled='disabled'>Order by Rating</option>
                            <option value="allRating">Without Ordering</option>
                            <option value="menormayor">Lowest rating to highest </option>
                            <option value="mayormenor">Highest rating to lowest</option>
                        </select>
                        
                        <select onChange={(e)=>handleSortByName(e)} defaultValue="default" className="selectName">
                            <option value='default' disabled='disabled'> Order by Name</option>
                            <option value="allOrder">Without Ordering</option>
                            <option value="asc">Ascendent</option>
                            <option value="desc">Descendent</option>                         
                        </select>


                     </div>
    )
}