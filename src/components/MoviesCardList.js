import React from 'react';
import Masonry from 'react-masonry-component';

import MovieCard from './MovieCard';

const MoviesCardList = ({movies, loading, hideOverview=false, cols=3}) => {
    const moviesList = () => {
        return movies.map(movie => (
            <div className={`col-md-${cols}`} key={movie.id}>
                <MovieCard movie={movie} loading={loading} hideOverview={hideOverview}/>
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