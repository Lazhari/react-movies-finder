import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Header} from 'semantic-ui-react';

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
        const hasReviews = this.props.reviews && this.props.reviews.length;
        return (
            <div>
                <MovieHeader movie={this.props.movie} genres={this.props.genres}
                             productionCompanies={this.props.productionCompanies} actors={this.props.actors}
                             trailer={this.props.trailer}/>
                <Grid>
                    <Grid.Column width={hasReviews ? 12 : 16}>
                        <Grid.Row>
                            <Header as='h2' content='Top Billed Cast' dividing/>
                            <ActorsList actors={this.props.actors}/>
                        </Grid.Row>
                        <Grid.Row>
                            <Header as='h2' content='Related Movies' dividing/>
                            <MoviesCardList movies={this.props.relatedMovies} hideOverview={true} itemsPerRow={4}/>
                        </Grid.Row>
                    </Grid.Column>
                    {
                        hasReviews ?
                            (
                                <Grid.Column width={4}>
                                    <ReviewsList reviews={this.props.reviews}/>
                                </Grid.Column>
                            ) :
                            null
                    }
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
