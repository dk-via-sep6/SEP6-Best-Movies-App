// MovieDetail.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../../model/movie";
import { placeholderMovies } from "../../pages/movies/placeholderMovies";
import "./styles.css";
import { Typography } from "@mui/material";
import CommentSection from "../commentSection/commentSection";
import dayjs from "dayjs";
import MovieRating from "./movieRating";
const MovieDetail: React.FC = () => {
  let { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    // In a real app, you would fetch the details from a backend service.
    // Here we are finding the movie in the placeholder data based on the ID.
    const movieDetail = placeholderMovies.find((m) => m.id.toString() === id);
    setMovie(movieDetail ?? null);
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>; // Or some loading component
  }

  return (
    <div className="movieDetailsComponent">
      <img
        className="movieDetailImage"
        src={movie.posterPath}
        alt={movie.title}
      />
      <div className="movieTextDetails">
        <Typography fontSize={"2em"}>{movie.title}</Typography>
        <Typography fontSize={"1.1em"}>
          Release Date: {dayjs(movie.releaseDate).format("DD MMMM YYYY")}
        </Typography>
        <div className="ratingContainer">
          <Typography fontSize={"1.2em"}>
            Rating: {movie.voteAverage} ({movie.voteCount} votes)
          </Typography>
          <MovieRating rating={movie.voteAverage} />
        </div>

        <Typography>{movie.overview}</Typography>
      </div>
    </div>
  );
};

export default MovieDetail;
