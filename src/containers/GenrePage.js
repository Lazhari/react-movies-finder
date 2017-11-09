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
            <div>
                <h2>{this.props.match.params.genre}</h2>
                <div className="row">
                    <div className="col-md-12">
                        <MoviesCardList movies={this.props.movies} cols={6}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <Pagination
                            activePage={this.props.page}
                            itemsCountPerPage={20}
                            totalItemsCount={this.props.totalResults}
                            pageRangeDisplayed={5}
                            innerClass="pagination"
                            itemClass="page-item"
                            linkClass="page-link"
                            disabledClass="disabled"
                            activeClass="active"
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>
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