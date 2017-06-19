import React, { Component } from 'react';

class MoviePage extends Component {
	render() {
		return (
			<div className="jumbotron">
				<h1>Movie Page, {this.props.match.params.id}</h1>
				<p>This is a template showcasing the optional theme stylesheet included in Bootstrap. Use it as a starting point to create something more unique by building on or modifying it.</p>
			</div>
		)
	}
}

export default MoviePage;