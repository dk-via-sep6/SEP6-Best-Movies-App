// MoviesGrid.tsx
import React from "react";
import Grid from "@mui/material/Grid";
import MovieCard from "./movieCard";
import { Movie } from "../../model/movie";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

// Assuming you have a movie model

interface MoviesGridProps {
  movies: Movie[]; // An array of movie objects
}

const MoviesGrid: React.FC<MoviesGridProps> = ({ movies }) => {
  const navigate = useNavigate();
  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };
  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
          <div onClick={() => handleMovieClick(movie.id)}>
            <MovieCard
              title={movie.title}
              imageUrl={movie.posterPath}
              rating={movie.voteAverage}
              year={dayjs(movie.releaseDate).format("YYYY")}
              voteCount={movie.voteCount}
            />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default MoviesGrid;
