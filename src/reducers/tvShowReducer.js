import {} from "../actions/actionsType";

const defaultState = {
  loading: false,
  tvShow: {}
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};
