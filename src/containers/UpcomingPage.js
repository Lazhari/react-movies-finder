import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';

import { fetchMovies } from '../actions/moviesActions';

import MoviesCardList from '../components/MoviesCardList';

class UpcomingPage extends Component {
    componentWillMount() {
        this.props.fetchMovies(1, 'upcoming');
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.props.fetchMovies(pageNumber, 'upcoming');
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <h2>Upcoming Movies</h2>
                </div>
                <div className="col-md-6">
                    <span className="pull-right">
                        <Pagination
                            activePage={this.props.page}
                            itemsCountPerPage={20}
                            totalItemsCount={this.props.totalResults}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </span>
                </div>
                <div className="col-md-12">
                    <MoviesCardList movies={this.props.movies} cols={6}/>
                </div>
                <div className="col-md-12 text-center">
                    <Pagination
                        activePage={this.props.page}
                        itemsCountPerPage={20}
                        totalItemsCount={this.props.totalResults}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { movies, loading, page, totalResults }  = state.moviesStore;
    return { movies, loading, page, totalResults }
}

export default connect(mapStateToProps, { fetchMovies })(UpcomingPage);