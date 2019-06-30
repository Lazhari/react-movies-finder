import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Card, CardImg, CardTitle, CardSubtitle, CardBody } from "reactstrap";
import MoviesCardList from "../components/MoviesCardList";
import { getPeopleProfile, getActorCreditMovies } from "../actions/actorAction";

import placeholderImage from "../Images/abstract-image.jpg";

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
    const onErrorLoadingImage = e => {
      e.target.src = placeholderImage;
    };
    return (
      <div className="row">
        <div className="col-md-3">
          <Card
            style={{ backgroundColor: "transparent", border: "none" }}
            className="actor-card"
          >
            <CardImg
              top
              src={`https://image.tmdb.org/t/p/w276_and_h350_face${profile.profile_path}`}
              alt={profile.name}
              onError={onErrorLoadingImage}
              className="actor-card__face--page"
            />
            <CardBody className="actor-card__body">
              <CardTitle className="h6 actor-card__name">
                <Link to={`/actors/${profile.id}`}>{profile.name}</Link>
              </CardTitle>
              <CardSubtitle className="h6 actor-card__info">
                <strong>Birth day:</strong> {profile.birthday}
              </CardSubtitle>
              <CardSubtitle className="h6 actor-card__info">
                <strong>Place of birth:</strong> {profile.place_of_birth}
              </CardSubtitle>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-9 actor-page-info">
          <h4 className="actor-page-info__title">Biography:</h4>
          <p className="actor-page-info__content">{profile.biography}</p>
        </div>
        <div className="col-md-12 movies-list">
          <h1 className="text-center h3 movies-list__title">Movies</h1>
          <MoviesCardList movies={movies} hideOverview={true} itemsPerRow={4} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.actorStore;
}

export default connect(
  mapStateToProps,
  { getPeopleProfile, getActorCreditMovies }
)(ActorPage);
