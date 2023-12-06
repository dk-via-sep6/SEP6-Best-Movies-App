//movieSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../model/movie";

interface MovieState {
  currentMovie: Movie | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  currentMovie: null,
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    fetchMovieStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMovieSuccess: (state, action: PayloadAction<Movie>) => {
      state.currentMovie = action.payload;
      state.loading = false;
    },
    fetchMovieFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearMovie: (state) => {
      state.currentMovie = null;
    },
  },
});

export const {
  fetchMovieStart,
  fetchMovieSuccess,
  fetchMovieFailure,
  clearMovie,
} = movieSlice.actions;
export default movieSlice.reducer;
