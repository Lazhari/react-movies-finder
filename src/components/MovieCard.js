import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap';

import './styles/MovieCard.css';
import placeholderImage from '../Images/abstract-image.jpg';

const MovieCard = ({ movie, loading, hideOverview }) => {
    const getYear = (stringDate) => {
        const d = new Date(stringDate);
        return d.getFullYear();
    };
    const onErrorLoadingImage = (e) => {
        e.target.src = placeholderImage;
    };
    const imageStyle = {
        display: 'block',
        height: '50vh',
        objectFit: 'cover',
        borderRadius: 5.5,
        objectPosition: 'center'
    };
    return (
        <Card className="movie-card">
            <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
                alt={movie.original_title} onError={onErrorLoadingImage} style={imageStyle}>
            </CardImg>
            <h1 className="circle">
                {movie.vote_average.toString().split('.')[0]}
                <sup style={{
                    fontSize: 20,
                    verticalAlign: 'middle',
                    fontWeight: 100
                }}>.{movie.vote_average.toString().split('.')[1] || 0}</sup>
            </h1>
            <CardBody style={{ padding: 10 }}>
                <CardTitle className=""
                    style={{ height: 34, color: '#e9e9e9', fontWeight: 'bold', textAlign: 'left', fontSize: 16 }}>
                    <NavLink to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
                        {movie.original_title}
                    </NavLink>
                </CardTitle>
                <span style={{ color: '#ffffff', opacity: 0.8, fontSize: 14 }}>
                    {getYear(movie.release_date) || 'Unknown Released Date'}
                </span>
            </CardBody>
        </Card>
    )
};


export default MovieCard;