import React from 'react';
import { NavLink } from 'react-router-dom';
import { truncate } from 'underscore.string';
import { Card, Image, Icon } from 'semantic-ui-react';

import './styles/MovieCard.css';
import placeholderImage from '../Images/abstract-image.jpg';

const MovieCard = ({movie, loading, hideOverview}) => {
    const getYear = (stringDate) => {
        const d = new Date(stringDate);
        return d.getFullYear();
    };
    const onErrorLoadingImage = (e) => {
        e.target.src = placeholderImage;
    };
    let review = null;
    if(!hideOverview) {
        review = (<div className="card-text">
            {truncate(movie.overview, 120)}
        </div>);
    }
    return (
        <Card raised>
            <Image src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2${movie.poster_path}`} onError={onErrorLoadingImage}/>
            <Card.Content>
                <Card.Header>
                    <NavLink to={`/movies/${movie.id}`} className="text-black">{movie.original_title}</NavLink>
                </Card.Header>
                <Card.Meta>
                        <span className='date'>
                          Released in {getYear(movie.release_date) || 'Unknown Released Date'}
                        </span>
                </Card.Meta>
                <Card.Description>
                    {review}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    {movie.vote_average}
                    <Icon name='star' color="yellow"/>
                </a>
            </Card.Content>
        </Card>
    )
};


export default MovieCard;