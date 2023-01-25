import React from "react";
import "./SearchBar.css";
//Hooks a usar
import { useState } from "react";
import { useDispatch } from "react-redux";
/*//////////////////////////////////////////////////////////////////////*/
import FilterOrder from "../FilterOrder/FilterOrder";
//Actions a usar
import {  getNameVideogame } from "../../redux/action";


export default function SearchBar({setCurrentPage, setOrden}){
    const dispatch = useDispatch();

    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault(); //para que no se rompa.(bug)
        setName(e.target.value);//seteo
        console.log(name);
    }

    function handleSubmit(e){
        if(name.length){
            e.preventDefault();
            dispatch(getNameVideogame(name));
            setCurrentPage(1);
        }else{
            alert("Please enter a name")
        }
    }

    return (
            <div>
                    
            <FilterOrder setCurrentPage={setCurrentPage} setOrden={setOrden}/>

            <div className="todo">
                <input 
                    className="searchInput"
                    type = "text"
                    placeholder="Search videogame"
                    onChange={(e)=>handleInputChange(e)}
                 />
                    <button className="btnSearch" type="submit" onClick={(e)=>handleSubmit(e)}>Search</button>
            </div>
    </div>
    )
}