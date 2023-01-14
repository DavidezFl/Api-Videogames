import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../NavBar/NavBar.css";

export default function NavBar(){

    const location = useLocation();
    const [url, setUrl] = useState("");

    useEffect(()=>{
        setUrl(location.pathname);

    }, [location])

        return(
            <div className="imgNav">
            <nav>
                <Link to = "/"><button className="underline">LandingPage</button></Link>
                <Link to = "/Home"><button className={`underline ${url === "/Home" ? "is-active" : ""}`}>Home</button></Link>
                <Link to = "/CreateGame"><button className={`underline ${url === "/CreateGame" ? "is-active" : ""}`}>Create Game</button></Link>
            </nav>
            </div>
        )


}