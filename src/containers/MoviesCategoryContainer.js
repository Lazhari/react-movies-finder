import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Sidebar from "../components/blocks/Sidebar";

import { fetchGenre } from "../actions/moviesActions";

const MoviesCategoryContainer = ({ handleDrawerClose }) => {
  const dispatch = useDispatch();
  const { genres, genreId, loading } = useSelector(state => state.moviesStore);
  useEffect(() => {
    dispatch(fetchGenre());
  }, [dispatch]);
  return (
    <Sidebar
      genres={genres}
      loading={loading}
      genreId={genreId}
      handleDrawerClose={handleDrawerClose}
    />
  );
};

export default MoviesCategoryContainer;
