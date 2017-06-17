import React, { Component } from 'react';

class GenrePage extends Component {
    render() {
        const { params } = this.props.match;
        return (
            <div className="jumbotron">
                <h1>{params.genre}, {params.id}</h1>
                <p>This is a template showcasing the optional theme stylesheet included in Bootstrap. Use it as a starting point to create something more unique by building on or modifying it.</p>
            </div>
        )
    }
}

export default GenrePage;