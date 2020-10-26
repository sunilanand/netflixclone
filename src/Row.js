import React, { useState, useEffect } from 'react';
import axios from './axios';

import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original";

const Row = ({title, fetchUrl, isLargeRow}) => {
    const [movies, setMovies] = useState([]);

    // A snippet of code which runs based on a specific condition
    useEffect(() => {
        // if [], run once when the row loads, and don't run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            //-- Suppose for fetchNetflixOriginals
            //---> "https://api.themoviedb.org/3" + `/discover/tv?api_key=${API_KEY}&with_networks=213`

            //console.log(request)
            setMovies(request.data.results);
            return request;

        }
        fetchData();
        
    }, [fetchUrl])//--- why fetchUrl here => This way we are telling useEffect that we are using this variable from outside the block, and the auto execution is dependent of this variable value change. Now if the value of this variable is updated, the code inside this block will execute again and update the array value.


    //console.log(movies);
    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {/* several posters */}

                {movies.map( movie => (
                    <img
                    key={movie.id}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>
            {/* container -> posters */}
        </div>
    )
}

export default Row;
