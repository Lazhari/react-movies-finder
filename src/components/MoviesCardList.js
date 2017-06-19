import React from 'react';
import Masonry from 'react-masonry-component';

import MovieCard from './MovieCard';

const MoviesCardList = ({movies, loading}) => {
    const moviesList = () => {
        return movies.map(movie => (
            <div className="col-md-3" key={movie.id}>
                <MovieCard movie={movie} loading={loading}/>
            </div>
        ));
    };

    return (
        <div className="row">
            <Masonry updateOnEachImageLoad={true}>
                { moviesList() }
            </Masonry>
        </div>
    )
};

export default MoviesCardList;