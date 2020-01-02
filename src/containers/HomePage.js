import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import InfiniteScroll from "react-infinite-scroller";

import { fetchMovies } from "../actions/moviesActions";

import MoviesCardList from "../components/MoviesCardList";

class HomePage extends Component {
  componentWillMount() {
    // this.props.fetchMovies();
  }

  handlePageChange(pageNumber) {
    console.log(pageNumber);
    this.props.fetchMovies(pageNumber);
  }

  loadMore(page) {
    console.log(page);
    return true;
  }

  render() {
    return (
      <div>
        <h1 className="text-center page-title">Popular Movies</h1>
        <div className="row">
          <InfiniteScroll
            pageStart={0}
            hasMore={true}
            loadMore={this.handlePageChange.bind(this)}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
          >
            <MoviesCardList movies={this.props.movies} cols={6} />
          </InfiniteScroll>

          {this.props.movies && this.props.movies.length ? (
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
          ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { movies, loading, page, totalResults } = state.moviesStore;
  return { movies, loading, page, totalResults };
}

export default connect(
  mapStateToProps,
  { fetchMovies }
)(HomePage);
