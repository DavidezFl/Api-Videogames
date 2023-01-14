import React from "react";

import "../Paginated/Paginated.css";

export default function Paginated({videogamesPerPage, allVideogames, setCurrentPage, currentPage}){
    const pageNumbers = [];

    for (let i= 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) { // math.ceil reondea para arriba.
        pageNumbers.push(i);
    }

    const onPreviousPage = () =>{
        setCurrentPage(currentPage - 1)
    }

    const onNextPage = () =>{
        setCurrentPage(currentPage + 1)
    }

    const onSpecificPage = (n) =>{
        setCurrentPage(n)
    }

    return(
        <nav className="NavAll">
            
            <ul className="paginate">
            <button className={`pagination-previous ${currentPage === 1 ? "is-disabled" : ""}`} onClick={onPreviousPage}>Previous</button>
                {pageNumbers.map((number)=>(
                    <li className="number" key={number}>
                    <button className={`${number === currentPage ? "is-current" : "no-current"}`} onClick={() => onSpecificPage(number)}>{number}</button>
                    </li>
                )
                )}
            <button className={`pagination-next ${ currentPage >= pageNumbers.length ? "is-disabled" : ""}`} onClick={onNextPage}>Next</button>
               
            </ul>
        </nav>
    )

}




