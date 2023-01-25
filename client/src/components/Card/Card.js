import React from "react";
import "./Card.css"

export default function Card({name, image, id, genres}){
    return(
        <div className="cards">
            <h3>{name}</h3>
            <img className="imgCard" src={image} alt={"WithOut IMG"} width="230px" />
            <h5>{genres}</h5>
        </div>
    )
}

//.map(el=>el.name + "\n")