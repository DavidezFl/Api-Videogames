import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
/*//////////////////////////////////////////////////////////////////////*/
import Home from "../Home/Home";
/*//////////////////////////////////////////////////////////////////////*/
import { getDetail, /*PUT_VIDEOGAME*/ } from "../../redux/action";
import { deleteVideogame } from "../../redux/action";
import "./Detail.css"

export default function Detail(props){

    const dispatch = useDispatch()
    const myGame = useSelector((state) => state.detail)
    const params = useParams()
    const history = useHistory();

    useEffect(()=>{
        dispatch(getDetail(params.id))
    }, [dispatch, params.id]);

    function handleDelete(e, id){
        e.preventDefault();
        dispatch(deleteVideogame(id));
        history.push("/Home")
    }


    return(
        <div className="divDetail">
            <Home />
            <div className="detail">
            {
                Object.keys(myGame).length > 0 ? (
                    <div className="detailDatos">
                        <div className="imgDetail"><img src={myGame.image ? myGame.image : myGame.img} alt="" width="900px" height="220px" /></div>
                        <h1>Name: {myGame.name}</h1>
                        <h2>Released: {myGame.released}</h2>
                        <h2>Rating: {myGame.rating}</h2>
                        <h2>Platforms: {myGame.platforms.join(", ")}</h2>
                        <h2>Genres: {myGame.genres.join(", ")}</h2>
                        <h2>Description: {myGame.description}</h2>
                    </div>) : 
                    (<p>Loading...</p>
                )
            }
            <Link to="/Home">
                <button className="btnDetail">Clean all</button>
            </Link>
            
           {/*<button className='put' onClick={()=> dispatch({type: PUT_VIDEOGAME , payload: myGame})}>Editar</button>*/}
            <button className="btnDeleteDetail" onClick={(e)=> handleDelete(e, myGame.id)}>Delete</button>

            </div>
        </div>
    )

}
console.log(Detail)