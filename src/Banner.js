import React, {useState, useEffect} from 'react';
import axios from './axios';
import requests from "./requests";

import "./Banner.css";

const base_url = "https://image.tmdb.org/t/p/original";
const Banner = () => {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get (requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length-1)
                ]
            );
        }
        fetchData();
    }, []);

    console.log(movie);
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    return (
        <header className="banner"
            style={{
                backgroundImage: `url(${base_url}${movie?.backdrop_path})`
            }}
        >
            <div className="banner__contents">
                {/* <<< Background Image >>> */}
                {/* title */}
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                {/* div > 2 button */}
                <div className="banner__buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>
                {/* description */}
                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner
