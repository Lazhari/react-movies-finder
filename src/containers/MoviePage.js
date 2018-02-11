import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    fetchMovie,
    fetchMovieVideos,
    fetchMovieReviews,
    fetchRelatedMovies,
    fetchMovieActors
} from '../actions/movieAction';

import MovieHeader from '../components/MovieHeader';
import MoviesCardList from '../components/MoviesCardList';
import ActorsList from '../components/ActorsList';
import ReviewsList from '../components/ReviewsList';

class MoviePage extends Component {
    componentWillMount() {
        const {id} = this.props.match.params;
        this.props.fetchMovie(id);
        this.props.fetchMovieVideos(id);
        this.props.fetchMovieReviews(id);
        this.props.fetchRelatedMovies(id);
        this.props.fetchMovieActors(id);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            const {id} = this.props.match.params;
            this.props.fetchMovie(id);
            this.props.fetchMovieVideos(id);
            this.props.fetchMovieReviews(id);
            this.props.fetchRelatedMovies(id);
            this.props.fetchMovieActors(id);
        }
    }

    render() {
        //const hasReviews = this.props.reviews && this.props.reviews.length;
        return (
            <div className="row">
                <div className="col-md-12">
                    <MovieHeader movie={this.props.movie} genres={this.props.genres}
                                 productionCompanies={this.props.productionCompanies}
                                 trailer={this.props.trailer}/>
                </div>
                <div className="col-md-12">
                    <div className="col-md-12">
                        <h1 className="text-center h3" style={{'padding': '.6em 0px .3em 10px'}}>Top Billed Cast</h1>
                        <ActorsList actors={this.props.actors}/>
                    </div>
                    {
                        this.props.reviews.length ?
                            <div className="col-md-12">
                                <h1 className="text-center h3" style={{'padding': '.6em 0px .3em 10px'}}>Reviews</h1>
                                <ReviewsList reviews={this.props.reviews}/>
                            </div> : null
                    }
                    {
                        this.props.relatedMovies.length ?
                            <div className="col-md-12">
                                <h1 className="text-center h3" style={{'padding': '.3em 0px .3em 10px'}}>Related Movies</h1>
                                <MoviesCardList movies={this.props.relatedMovies} hideOverview={true} itemsPerRow={4}/>
                            </div> : null
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.movieStore;
}

export default connect(mapStateToProps, {
    fetchMovie,
    fetchMovieVideos,
    fetchMovieReviews,
    fetchRelatedMovies,
    fetchMovieActors
})(MoviePage);
