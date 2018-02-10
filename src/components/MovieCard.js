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
    const imageStyle = {
        display: 'block',
        height: '40vh',
        clipPath: 'polygon(0 0, 100% 0%, 100% 90%, 0 100%)',
        objectFit: 'cover',
        objectPosition: 'center'
    };
    const truncatedOverview = (<span>{truncate(movie.overview, 115)} <NavLink to={`/movies/${movie.id}`}>Read more</NavLink></span>);
    return (
        <Card>
            <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
                     alt={movie.original_title} onError={onErrorLoadingImage} style={imageStyle}/>
            <CardBody>
                <CardTitle className="text-black text-center h6" style={{height: 40}}>
                    <NavLink to={`/movies/${movie.id}`} style={{color: '#494c62', textDecoration: 'none'}}>
                        {movie.original_title}
                    </NavLink>
                </CardTitle>
                <CardText className="card-text text-justify" style={{fontSize: 12,height: 55}}>
                    {
                        (movie.overview && movie.overview.length > 115) ?
                            truncatedOverview :
                            movie.overview
                    }
                </CardText>
            </CardBody>
            <CardText className="card-footer bg-white">
                <span className="text-muted">
                    {movie.vote_average} <i className="fa fa-star text-warning"></i>
                </span>
                <span className="text-muted" style={{float: 'right'}}>
                        <span
                            className="badge badge-primary">{getYear(movie.release_date) || 'Unknown Released Date'}</span>
                    </span>
            </CardText>
        </Card>
    )
};


export default MovieCard;