import React from 'react';
import { Link } from 'react-router-dom';
import { truncate } from 'underscore.string';

import './styles/MovieCard.css';
import placeholderImage from '../Images/abstract-image.jpg';

const MovieCard = ({movie, loading, hideOverview}) => {
    const onErrorLoadingImage = (e) => {
        e.target.src = placeholderImage;
    };
    let review = null;
    if(!hideOverview) {
        review = (<div className="card-text">
            {truncate(movie.overview, 50)}
        </div>);
    }
    return (
        <div className="card">
            <img className="card-img-top" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                 alt={movie.original_title} onError={onErrorLoadingImage}/>
            <div className="card-block">
                <h4 className="card-title mt-3"><Link to={`/movies/${movie.id}`}>{movie.original_title}</Link></h4>
                {review}
            </div>
            <div className="card-footer">
                <small>{movie.release_date || 'Unknown Released Date'}</small>
                <strong className="pull-right text-danger">{movie.vote_average} <i className="glyphicon glyphicon-star"></i></strong>
            </div>
        </div>
    )
};


export default MovieCard;