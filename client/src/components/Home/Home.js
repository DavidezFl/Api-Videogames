import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
/*//////////////////////////////////////////////////////////////////////*/
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import Paginated from "../Paginated/Paginated";
/*//////////////////////////////////////////////////////////////////////*/
import { getVideogames, getGenres, /*deleteVideogame,*/ /*putVideogame*/ } from "../../redux/action";
import "../Home/Home.css";
import "../Paginated/Paginated.css"
/*//////////////////////////////////////////////////////////////////////*/
export default function Home(){

    const dispatch = useDispatch();
    const history = useHistory();

    const allVideogames = useSelector((state)=> state.videogames);

    const [/*orden*/, setOrden ] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, /*setRecipesPerPage*/] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);

    useEffect(()=>{
        dispatch(getVideogames());
    },[dispatch]);

    useEffect(()=>{
        dispatch(getGenres());
    },[dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }

    /*function handleDelete(e, id){
        e.preventDefault();
        dispatch(deleteVideogame(id));
        alert(`The game has been deleted`);
        history.push("/Home")
    }*/

    function handleCard(e, id){
        e.preventDefault();
        history.push(`/details/${id}`)
    }

    /*function handlePut(e, id){
        e.preventDefault();
        dispatch(putVideogame(id));
        alert("Petición de change")
    }*/

        return (
            <div className="divHome">
                    <NavBar currentPage={currentPage}/>
                    <button className="btnRefresh" onClick={(e)=> handleClick(e)}>Refresh Videogames</button>
                    <SearchBar setOrden={setOrden} setCurrentPage={setCurrentPage}/>
                    
                    <div className="paginado">
                    

                    <Paginated 
                        videogamesPerPage={videogamesPerPage}
                        allVideogames={allVideogames.length}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />


                    <div>
                        {currentVideogames?.map((el)=>{
                                return(
                                <div>
                                    
                                    <Link onClick={(e) => handleCard(e, el.id)}>
                                        <Card key={el.id} name={el.name} image={el.image} genres={el.genres.join(", ")} onClick={(e) => handleCard(e, el.id)}/>
                                    </Link>

                                    {/*<button className="btnPut" onClick={(e) => handlePut(e, el.id)}>Put</button>*/}
                                    {/*<button className="btnDelete" onClick={(e)=> handleDelete(e, el.id)}>Delete</button>*/}
                                </div>
                                
                        );
                       })
                       }
                        </div>
                   </div>
            </div>
        )
};