import React from 'react';
import ActorsList from './ActorsList';
import Labels from './Labels'
const MovieHeader = ({ movie, genres, productionCompanies, actors }) => {
    const headerStyle = {
        backgroundImage: `linear-gradient(rgba(3, 3, 3, 0.75), rgba(0, 0, 5, 0.85)), url(https://image.tmdb.org/t/p/w1400_and_h450_bestv2${movie.backdrop_path})`,
        backgroundSize: 'cover',
        padding: 5,
    };
    const getYear = (stringDate) => {
        const d = new Date(stringDate);
        return d.getFullYear();
    };
    return(
        <div className="" style={headerStyle}>
            <div className="row">
                <div className="col-md-10 col-md-offset-1">
                    <div className="media">
                        <div className="media-left">
                            <a href={movie.homepage} target="blank">
                                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} width={'260px'} className=""/>
                            </a>
                        </div>
                        <div className="media-body">
                            <div className="row" style={{color: '#fff'}}>
                                <div className="col-md-12">
                                    <h1>
                                        {movie.original_title} <small>({getYear(movie.release_date)})</small>
                                        <strong className="pull-right text-danger">{movie.vote_average} <i className="glyphicon glyphicon-star"></i></strong>
                                    </h1>
                                    <Labels labels={genres}/>
                                    <h4>Overview:</h4>
                                    <p>{movie.overview}</p>
                                    <h4>Production Companies</h4>
                                    <Labels labels={productionCompanies}/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <ActorsList actors={actors}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MovieHeader;