import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { Grid } from 'semantic-ui-react';

import { fetchMovies } from '../actions/moviesActions';

import MoviesCardList from '../components/MoviesCardList';

class HomePage extends Component {
    componentWillMount() {
        this.props.fetchMovies();
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.fetchMovies(pageNumber);
    }

    render() {
        return (
            <Grid>
                <h2>Upcoming Movies</h2>
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

export default connect(mapStateToProps, { fetchMovies })(HomePage);