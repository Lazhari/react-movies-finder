import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';

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
            <div className="row">
                <div className="col-md-6">
                    <h2>{this.props.match.params.genre} Movies</h2>
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
                    <MoviesCardList movies={this.props.movies}/>
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

export default connect(mapStateToProps, { fetchMoviesByGenre })(GenrePage);