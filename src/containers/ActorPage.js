import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, CardImg, CardTitle, CardSubtitle, CardBody } from 'reactstrap';
import MoviesCardList from '../components/MoviesCardList';
import {
    getPeopleProfile,
    getActorCreditMovies
} from '../actions/actorAction';

import placeholderImage from '../Images/abstract-image.jpg';

class ActorPage extends Component {
    componentWillMount() {
        const { id } = this.props.match.params;
        this.props.getPeopleProfile(id);
        this.props.getActorCreditMovies(id);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.getPeopleProfile(this.props.match.params.id);
        }
    }
    render() {
        const { profile, movies } = this.props;
        const onErrorLoadingImage = (e) => {
            e.target.src = placeholderImage;
        };
        const imageStyle = {
            display: 'block',
            //clipPath: 'polygon(0 0, 100% 0%, 100% 90%, 0 100%)',
            objectFit: 'cover',
            objectPosition: 'center'
        };
        return (
            <div className="row">
                <div className="col-md-3">
                    <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
                        <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w276_and_h350_face${profile.profile_path}`}
                            alt={profile.name} onError={onErrorLoadingImage} style={imageStyle} />
                        <CardBody style={{ paddingRight: 0, paddingLeft: 0 }}>
                            <CardTitle className="h6" style={{ fontSize: 14, height: 30 }}>
                                <Link to={`/actors/${profile.id}`}>{profile.name}</Link>
                            </CardTitle>
                            <CardSubtitle style={{ fontSize: 12, paddingTop: 0, marginTop: 5 }}>
                                <strong>Birth day:</strong> {profile.birthday}
                            </CardSubtitle>
                            <CardSubtitle style={{ fontSize: 12, paddingTop: 0, marginTop: 5 }}>
                                <strong>Place of birth:</strong> {profile.place_of_birth}
                            </CardSubtitle>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-md-9">
                    <p>
                        {profile.biography}
                    </p>
                </div>
                <div className="col-md-12">
                    <h1 className="text-center h3" style={{ 'padding': '.3em 0px .3em 10px' }}>Movies</h1>
                    <MoviesCardList movies={movies} hideOverview={true} itemsPerRow={4} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.actorStore;
}

export default connect(mapStateToProps, { getPeopleProfile, getActorCreditMovies })(ActorPage);