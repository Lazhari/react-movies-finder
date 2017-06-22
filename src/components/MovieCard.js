import React from 'react';
import { NavLink } from 'react-router-dom';
import { truncate } from 'underscore.string';

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
            {truncate(movie.overview, 360)}
        </div>);
    }
    return (
        <div className="list mb-2">
            <div className="list-header">
                <NavLink className="list-header-image" to={`/movies/${movie.id}`}>
                    <img className="card-img-top" src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2${movie.poster_path}`}
                    alt={movie.original_title} onError={onErrorLoadingImage}/>
                </NavLink>
            </div>
            <div className="list-content">
                <h2><NavLink to={`/movies/${movie.id}`} className="text-black">{movie.original_title}</NavLink></h2>
                <span className="list-meta">
                    <span className="list-meta-item"><i className="glyphicon glyphicon-time"></i> {getYear(movie.release_date) || 'Unknown Released Date'}</span>
                    <a href={`/movies/${movie.id}`} className="list-meta-item"><i className="glyphicon glyphicon-star"></i> {movie.vote_average}</a>
                </span>
                <p>{review}</p>
            </div>
        </div>
    )
};


export default MovieCard;