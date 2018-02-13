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
        //clipPath: 'polygon(0 0, 100% 0%, 100% 90%, 0 100%)',
        objectFit: 'cover',
        borderRadius: 5.5,
        objectPosition: 'center'
    };
    const truncatedOverview = (<span>{truncate(movie.overview, 115)} <NavLink to={`/movies/${movie.id}`}>Read more</NavLink></span>);
    return (
        <Card style={{backgroundColor: 'rgba(0,0,0,0)', border: 'none'}}>
            <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
                     alt={movie.original_title} onError={onErrorLoadingImage} style={imageStyle}/>
            <CardBody style={{padding: 10}}>
                <CardTitle className="" style={{height: 34, color: '#e9e9e9',fontWeight: 'bold', textAlign: 'left', fontSize: 16}}>
                    <NavLink to={`/movies/${movie.id}`} style={{textDecoration: 'none'}}>
                        {movie.original_title}
                    </NavLink>
                </CardTitle>
                <span style={{color: '#ffffff', opacity: 0.8, fontSize: 14}}>
                        {getYear(movie.release_date) || 'Unknown Released Date'}
                </span>
            </CardBody>
        </Card>
    )
};


export default MovieCard;