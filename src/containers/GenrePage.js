import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { Grid } from 'semantic-ui-react';

import { fetchMoviesByGenre } from '../actions/moviesActions';

import MoviesCardList from '../components/MoviesCardList';

class GenrePage extends Component {
    componentWillMount() {
        this.props.fetchMoviesByGenre(1, this.props.match.params.id);
        console.log('Component will Mount');
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchMoviesByGenre(1, this.props.match.params.id);
        }
    }

    handlePageChange(pageNumber) {
        this.props.fetchMoviesByGenre(pageNumber, this.props.match.params.id);
    }

    render() {
        return (
            <Grid>
                <h2>{this.props.match.params.genre}</h2>
                <Grid.Row>
                    <MoviesCardList movies={this.props.movies} cols={6}/>
                </Grid.Row>
                <Grid.Row centered>
                    <Pagination
                        activePage={this.props.page}
                        itemsCountPerPage={20}
                        totalItemsCount={this.props.totalResults}
                        pageRangeDisplayed={5}
                        innerClass="ui pagination mini menu pagination-ul"
                        itemClass="item"
                        linkClass=""
                        disabledClass="disabled"
                        activeClass="active"
                        onChange={this.handlePageChange.bind(this)}
                    />
                </Grid.Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    const { movies, loading, page, totalResults }  = state.moviesStore;
    return { movies, loading, page, totalResults }
}

export default connect(mapStateToProps, { fetchMoviesByGenre })(GenrePage);