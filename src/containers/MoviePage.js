import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactPlayer from 'react-player'

import {fetchMovie, fetchMovieVideos, fetchMovieReviews, fetchRelatedMovies, fetchMovieActors} from '../actions/movieAction';

import MovieHeader from '../components/MovieHeader';
import MoviesCardList from '../components/MoviesCardList';

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
        let trailer = null;
        if(this.props.trailer) {
            trailer = (<div className="col-md-6 col-md-offset-3 text-center">
                <h3>{this.props.trailer.name}</h3>
                <ReactPlayer url={`https://www.youtube.com/watch?v=${this.props.trailer.key}`} playing={false} />
            </div>)
        }
        return (
            <div>
                <MovieHeader movie={this.props.movie} genres={this.props.genres}
                             productionCompanies={this.props.productionCompanies} actors={this.props.actors}/>
                <div className="row" style={{marginTop: 10}}>
                    {trailer}
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4>Related Movies</h4>
                            </div>
                            <div className="panel-body">
                                <MoviesCardList movies={this.props.relatedMovies} hideOverview={true} cols={3}/>
                            </div>
                        </div>
                    </div>
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