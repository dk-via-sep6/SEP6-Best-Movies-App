// MovieDetail.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import MovieRating from "./movieRating";
import ActorCast from "../actorCast/actorCast";
import DirectorCast from "../directorCast/directorCast";
import UserRating from "./userRating";
import AddMovieToWatchlist from "../addMovieToWatchlist/addToWatchlist";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchMovie, fetchMovieCredits } from "../../thunks/movieThunks";
import { fetchUserRatingForMovie } from "../../thunks/ratingThunks";
import { useAuth } from "../../context/authContext";

const MovieDetail: React.FC = () => {
  let { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const movie = useSelector((state: RootState) => state.movie.currentMovie);
  const movieLoading = useSelector((state: RootState) => state.movie.loading);
  const movieError = useSelector((state: RootState) => state.movie.error);

  const cast = useSelector((state: RootState) => state.movieCredits.cast);
  const crew = useSelector((state: RootState) => state.movieCredits.crew);
  const creditsLoading = useSelector(
    (state: RootState) => state.movieCredits.loading
  );
  const creditsError = useSelector(
    (state: RootState) => state.movieCredits.error
  );

  const currentUser = useAuth();

  useEffect(() => {
    if (id) {
      dispatch(fetchMovie(id));
      dispatch(fetchMovieCredits(id));
      if (currentUser.currentUser?.uid) {
        dispatch(fetchUserRatingForMovie(currentUser.currentUser?.uid, +id));
      }
    }
  }, [id, dispatch, currentUser]);

  if (movieLoading || creditsLoading) {
    return <div>Loading...</div>;
  }

  if (movieError || creditsError) {
    return <div>Error: {movieError || creditsError}</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="movieDetailsComponent">
      <div className="movieImageContainer">
        <img
          className="movieDetailImage"
          src={"https://image.tmdb.org/t/p/w500" + movie.posterPath}
          alt={movie.title}
        />
      </div>
      <div className="movieDetails">
        <div className="movieTextDetails">
          <Typography fontSize={"2em"}>{movie.title}</Typography>
          <Typography fontSize={"0.9em"}>
            {movie.genres.map((genre) => genre.name).join(", ")}
          </Typography>

          <Typography fontSize={"1em"}>
            Release Date: {dayjs(movie.releaseDate).format("DD MMMM YYYY")}
          </Typography>

          <div className="ratingContainer">
            <Typography fontSize={"1.2em"}>
              Best Movies Rating: {movie.voteAverage} ({movie.voteCount} votes)
            </Typography>
            <MovieRating rating={movie.voteAverage} />
            <div className="userRatingDiv">
              <UserRating movieId={movie.id} />
              <AddMovieToWatchlist movie={movie} />
            </div>
          </div>

          <Typography>{movie.overview}</Typography>
        </div>
        <div className="cast">
          <ActorCast actors={cast} />
          <DirectorCast
            directors={crew.filter((member) => member.job === "Director")}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
