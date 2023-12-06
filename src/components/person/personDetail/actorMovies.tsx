import React from "react";
import { Movie } from "../../../model/movie";
import MoviesParticipated from "../../moviesParticipated/moviesParticipated";

interface ActorMovieProps {
  movies: Movie[];
}

const ActorMovies: React.FC<ActorMovieProps> = ({ movies }) => {
  return <MoviesParticipated movies={movies} />;
};

export default ActorMovies;
