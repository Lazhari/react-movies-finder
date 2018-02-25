import React, { Component } from 'react';
import Rating from 'react-rating';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactPlayer from 'react-player';
import Labels from './Labels';
import ActorsList from './ActorsList';
import playIcon from '../ic-play.svg'

class MovieHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    render() {
        const { movie, genres, productionCompanies, trailer, actors } = this.props;
        const headerStyle = {
            backgroundImage: `linear-gradient(rgba(3, 3, 3, 0.30), rgba(0, 0, 5, 0.30)), url(https://image.tmdb.org/t/p/w1400_and_h450_bestv2${movie.backdrop_path})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
            lineHeight: '320px',
            height: 320,
            borderRadius: 10,
            color: '#fff',
            marginBottom: 20
            //clipPath: 'polygon(1% 0, 100% 0, 99% 100%, 0% 100%)'
        };
        const headerImage = {
            borderRadius: 5,
            width: '100%'
        };
        const getYear = (stringDate) => {
            const d = new Date(stringDate);
            return d.getFullYear();
        };
        return (
            <div className="row">
                <div className="col-md-12 text-center" style={headerStyle}>
                    <img src={playIcon} onClick={this.toggle} />
                    {
                        trailer.key ? <Modal isOpen={true} size="lg" isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalBody>
                                <ReactPlayer url={`https://www.youtube.com/watch?v=${trailer.key}`} playing width="100%" />
                            </ModalBody>
                        </Modal> : null
                    }
                </div>
                <div className="col-md-3">
                    <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} className="img-responsive" style={headerImage} />
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 style={{ fontSize: 18, color: '#e9e9e9' }}>
                                {movie.original_title}
                            </h1>
                            <h4 style={{ fontSize: 18, color: '#e9e9e9' }}>
                                {getYear(movie.release_date)}
                            </h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <p style={{ color: '#c53364' }}>
                                {movie.vote_average} {' '}
                                <Rating initialRating={movie.vote_average} emptySymbol="fa fa-star-o"
                                    fullSymbol="fa fa-star" stop={10} step={2} />

                                <Labels labels={genres} />
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h6 style={{ fontSize: 18, color: '#e9e9e9' }}>Overview</h6>
                            <p style={{ color: '#e9e9e9', fontWeight: 100, fontSize: 14 }}>
                                {movie.overview}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h1 style={{ fontSize: 18, color: '#e9e9e9' }}>Top Billed Cast</h1>
                            <ActorsList actors={actors} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default MovieHeader;