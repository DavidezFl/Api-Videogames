import React from "react";
import { Link } from "react-router-dom";
import "../LandingPage/LandingPage.css"

function LandingPage (){
    return (
            <div className="landingPage">
                    <span><h1 className="welcome">Welcome to Videogames</h1></span>
                    <Link to = "/Home"><button className="btnHome">Home</button></Link>
            </div>
    )
}

export default LandingPage;