import React from 'react';

import Labels from './Labels';

const MovieHeader = ({movie, genres, productionCompanies, trailer}) => {
    const headerStyle = {
        backgroundImage: `linear-gradient(rgba(3, 3, 3, 0.55), rgba(0, 0, 5, 0.65)), url(https://image.tmdb.org/t/p/w1400_and_h450_bestv2${movie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 5,
        color: '#fff',
        //clipPath: 'polygon(1% 0, 100% 0, 99% 100%, 0% 100%)'
    };
    const headerImage = {
        backgroundImage:  `url('https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}')`,
        height: '50vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        //clipPath: 'polygon(1% 0, 100% 0, 99% 100%, 0% 100%)'
    };
    const getYear = (stringDate) => {
        const d = new Date(stringDate);
        return d.getFullYear();
    };
    return (
        <div className="row" style={headerStyle}>
            <div className="col-md-4" style={headerImage}>

            </div>
            <div className="col-md-8">
                <h1>
                    {movie.original_title}
                    <small>({getYear(movie.release_date)})</small>
                </h1>
                <Labels labels={genres}/>
                <h2>
                    User Score {movie.vote_average}
                </h2>
                <p>
                    {movie.overview}
                </p>
                <h3>
                    Production Companies
                </h3>
                <Labels labels={productionCompanies}/>
            </div>
        </div>
    )
};

export default MovieHeader;