import React from 'react';
import {NavLink} from 'react-router-dom';
import {truncate} from 'underscore.string';
import {Card, CardBody, CardTitle, CardText, CardImg} from 'reactstrap';

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
    if (!hideOverview) {
        review = (<div className="card-text">
            {truncate(movie.overview, 120)}
        </div>);
    }
    return (
            <Card>
                <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2${movie.poster_path}`}
                         alt={movie.original_title} onError={onErrorLoadingImage}/>
                <CardBody>
                    <CardTitle><NavLink to={`/movies/${movie.id}`} className="text-black">{movie.original_title}</NavLink></CardTitle>
                    <CardText>{review}</CardText>
                    <CardText>
                    <span className="text-muted">
                        {movie.vote_average} <i className="fa fa-star text-warning"></i>
                    </span>
                        <span className="text-muted" style={{float:'right'}}>
                        <span className="badge badge-primary">{getYear(movie.release_date) || 'Unknown Released Date'}</span>
                    </span>
                    </CardText>
                </CardBody>
            </Card>
    )
};


export default MovieCard;