import React from 'react';
import {CardColumns} from 'reactstrap';

import MovieCard from './MovieCard';

const MoviesCardList = ({movies, loading, hideOverview = false, itemsPerRow = 4}) => {
    const moviesList = () => {
        return movies.map(movie => (
            <MovieCard movie={movie} loading={loading} hideOverview={hideOverview} key={movie.id}/>
        ));
    };

    return (
        <CardColumns>
            { moviesList() }
        </CardColumns>
    )
};

export default MoviesCardList;