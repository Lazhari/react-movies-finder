import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Grid, Header } from 'semantic-ui-react';

import {fetchMovie, fetchMovieVideos, fetchMovieReviews, fetchRelatedMovies, fetchMovieActors} from '../actions/movieAction';

import MovieHeader from '../components/MovieHeader';
import MoviesCardList from '../components/MoviesCardList';
import ActorsList from '../components/ActorsList';

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
        return (
            <div>
                <MovieHeader movie={this.props.movie} genres={this.props.genres}
                             productionCompanies={this.props.productionCompanies} actors={this.props.actors} trailer={this.props.trailer}/>
                <Grid>
                    <Grid.Column width={12}>
                        <Grid.Row>
                            <Header as='h2' content='Top Billed Cast'/>
                            <ActorsList actors={this.props.actors}/>
                        </Grid.Row>
                        <Grid.Row>
                            <Header as='h2' content='Related Movies'/>
                            <MoviesCardList movies={this.props.relatedMovies} hideOverview={true} itemsPerRow={4}/>
                        </Grid.Row>
                    </Grid.Column>

                    <Grid.Column width={4}>

                    </Grid.Column>
                </Grid>
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