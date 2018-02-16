import React , {Component} from 'react';

class ActorPage extends Component {
    componentDidUpdate(prevProps, prevState) {
        console.log('Hello');
        console.log(prevProps);
        if (prevProps.match.params.id !== this.props.match.params.id) {

        }
    }
    render() {
        return (
            <div className="jumbotron">
                <h1 className="text-center page-title">Top Series {this.props.match.params.id}</h1>
                <p>This is a template showcasing the optional theme stylesheet included in Bootstrap. Use it as a starting point to create something more unique by building on or modifying it.</p>
            </div>
        )
    }
}

export default ActorPage;