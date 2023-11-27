// movies.tsx
import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Pagination,
  Grid,
  Container,
} from "@mui/material";
import Carousel from "../../components/carousel/carousel";
import MovieGrid from "../../components/movieGrid/movieGrid";
import { placeholderMovies } from "./placeholderMovies";

const ITEMS_PER_PAGE = 12; // Adjust as needed

const MoviesPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(placeholderMovies.length / ITEMS_PER_PAGE);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const moviesToShow = placeholderMovies.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Carousel />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Search Movies" />
            )}
            options={placeholderMovies.map((movie) => movie.title)}
          />
        </Grid>
        <Grid item xs={12}>
          <MovieGrid movies={moviesToShow} />
        </Grid>
        <Grid item xs={12}>
          <Pagination
            className="paginationBar"
            count={pageCount}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MoviesPage;
