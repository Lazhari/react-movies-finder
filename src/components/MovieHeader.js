import React from 'react';

import Labels from './Labels';

const MovieHeader = ({movie, genres, productionCompanies, trailer}) => {
    const headerStyle = {
        backgroundImage: `linear-gradient(rgba(3, 3, 3, 0.75), rgba(0, 0, 5, 0.85)), url(https://image.tmdb.org/t/p/w1400_and_h450_bestv2${movie.backdrop_path})`,
        backgroundSize: 'cover',
        padding: 5,
        color: '#fff'
    };
    const getYear = (stringDate) => {
        const d = new Date(stringDate);
        return d.getFullYear();
    };
    return (
        <div className="row">
            <div className="col-md-12">
                <div class="jumbotron" style={headerStyle}>
                    <div className="row">
                        <div className="col-md-4">
                            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt=""/>
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
                </div>
            </div>
        </div>
    )
};

export default MovieHeader;