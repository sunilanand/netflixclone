import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import axios from './axios';

import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original";

const Row = ({title, fetchUrl, isLargeRow}) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [opts, setOpts] = useState("");

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

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        }else{
            setTrailerUrl("");
            const trailerName = (movie?.name || movie?.title);
            console.log("Name>>>>>>> ", trailerName);
            movieTrailer (trailerName)
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    console.log("VVV>",urlParams.get("v"))
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    }

    //console.log(movies);
    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {/* several posters */}

                {movies.map( movie => (
                    <img
                    key={movie.id}
                    onClick={() => handleClick(movie)}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>
            {/* container -> posters */}

            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;
