import React from 'react';
import {CardColumns} from 'reactstrap';

import MovieCard from './MovieCard';

const MoviesCardList = ({movies, loading, hideOverview = false, itemsPerRow = 4}) => {
    const moviesList = () => {
        return movies.map(movie => (
            <div className="col-lg-3 col-sm-4 col-md-4 " style={{paddingBottom: 10}}>
                <MovieCard movie={movie} loading={loading} hideOverview={hideOverview} key={movie.id}/>
            </div>
        ));
    };

    return (
        <div className="row align-items-start">
            { moviesList() }
        </div>
    )
};

export default MoviesCardList;