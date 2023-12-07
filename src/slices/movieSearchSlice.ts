import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../model/movie";

interface MovieSearchState{
    currentMovieSearch: Movie[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: MovieSearchState = {
    currentMovieSearch: [],
    loading: false,
    error: null,
  };

  const MovieSearchSlice = createSlice({
    name: "movieSearch",
    initialState,
    reducers: {
      fetchMovieSearchStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchMovieSearchSuccess: (state, action: PayloadAction<Movie[]>) => {
        state.currentMovieSearch = action.payload;
        state.loading = false;
      },
      fetchMovieSearchFailure: (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      },
      clearMovieSearch: (state) => {
        state.currentMovieSearch = [];
      },
    },
  });
  
  export const {
    fetchMovieSearchStart,
    fetchMovieSearchSuccess,
    fetchMovieSearchFailure,
    clearMovieSearch,
  } = MovieSearchSlice.actions;
  export default MovieSearchSlice.reducer;