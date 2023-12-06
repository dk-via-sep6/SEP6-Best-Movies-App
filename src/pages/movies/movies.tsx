import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Autocomplete,
  TextField,
  Pagination,
  Grid,
  Container,
} from "@mui/material";
import Carousel from "../../components/carousel/carousel";
import MovieGrid from "../../components/movieGrid/movieGrid";
import { fetchNowPlayingMovies } from "../../thunks/movieThunks"; 
import { AppDispatch, RootState } from '../../store'; 

const ITEMS_PER_PAGE = 12; // Adjust as needed

const MoviesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentMovies, loading, error } = useSelector((state: RootState) => state.movies);
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil((currentMovies?.length ?? 0) / ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(fetchNowPlayingMovies());
  }, [dispatch]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const moviesToShow = currentMovies ? currentMovies.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  ) : [];

  // Optional: Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Carousel movies={moviesToShow}/>
        </Grid>
       <Grid item xs={12}>
          {/* <Autocomplete
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Search Movies" />
            )}
            options={placeholderMovies.map((movie) => movie.title)}
          /> */}
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
