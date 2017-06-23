import React from 'react';
import { Dimmer, Card, Loader } from 'semantic-ui-react';

import MovieCard from './MovieCard';

const MoviesCardList = ({movies, loading, hideOverview=false, itemsPerRow=4}) => {
    const moviesList = () => {
        return movies.map(movie => (
            <MovieCard movie={movie} loading={loading} hideOverview={hideOverview} key={movie.id}/>
        ));
    };

    return (
        <div>
            <Dimmer active={loading}>
                <Loader />
            </Dimmer>
            <Card.Group doubling={true} stackable={true} itemsPerRow={itemsPerRow}>
                { moviesList() }
            </Card.Group>
        </div>
    )
};

export default MoviesCardList;