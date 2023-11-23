// MoviesGrid.tsx
import React from "react";
import Grid from "@mui/material/Grid";
import MovieCard from "./movieCard";
import { Movie } from "../../model/movie";

// Assuming you have a movie model

interface MoviesGridProps {
  movies: Movie[]; // An array of movie objects
}

const MoviesGrid: React.FC<MoviesGridProps> = ({ movies }) => {
  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
          <MovieCard
            title={movie.title}
            imageUrl={movie.posterPath}
            rating={movie.voteAverage}
            year={movie.releaseDate} // ...other properties
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MoviesGrid;
