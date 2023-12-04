// MovieDetail.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import MovieRating from "./movieRating";
import ActorCast from "../actorCast/actorCast";
import DirectorCast from "../directorCast/directorCast";
import { placeholderDirectors } from "../../pages/directors/placeholderDirectors";
import UserRating from "./userRating";
import { placeholderActors } from "../../pages/actors/placeholderActors";
import AddMovieToWatchlist from "../addMovieToWatchlist/addToWatchlist";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchMovie } from '../../thunks/movieThunks';

const MovieDetail: React.FC = () => {
  let { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const movie = useSelector((state: RootState) => state.movie.currentMovie);
  const loading = useSelector((state: RootState) => state.movie.loading);
  const error = useSelector((state: RootState) => state.movie.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovie(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Error message
  }

  if (!movie) {
    return <div>Movie not found</div>; // Movie not found message
  }

  return (
    <div className="movieDetailsComponent">
      <div className="movieImageContainer">
        <img
          className="movieDetailImage"
          src={"https://image.tmdb.org/t/p/w500"+movie.posterPath}
          alt={movie.title}
        />
      </div>
      <div className="movieDetails">
        <div className="movieTextDetails">
          <Typography fontSize={"2em"}>{movie.title}</Typography>
      {/*     <Typography fontSize={"0.9em"}>{movie.genres.join(", ")}</Typography> */}
          <Typography fontSize={"1em"}>
            Release Date: {dayjs(movie.releaseDate).format("DD MMMM YYYY")}
          </Typography>

          <div className="ratingContainer">
            <Typography fontSize={"1.2em"}>
              Best Movies Rating: {movie.voteAverage} ({movie.voteCount} votes)
            </Typography>
            <MovieRating rating={movie.voteAverage} />
            <div className="userRatingDiv">
              <UserRating rating={null} />
              <AddMovieToWatchlist movieId={movie.id} />
            </div>
          </div>

          <Typography>{movie.overview}</Typography>
        </div>
        <div className="cast">
          <ActorCast actors={placeholderActors} />
          <DirectorCast directors={placeholderDirectors} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;