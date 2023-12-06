//moviesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../model/movie";

interface MoviesState {
  currentMovies: Movie[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  currentMovies: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    fetchNowPlayingMoviesStart: (state) => {
      state.loading = true;
    },
    fetchNowPlayingMoviesSuccess: (state, action: PayloadAction<Movie[]>) => {
      state.currentMovies = action.payload;
      state.loading = false;
    },
    fetchNowPlayingMoviesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearMovie: (state) => {
      state.currentMovies = null;
    },
  },
});

export const {
  fetchNowPlayingMoviesStart,
  fetchNowPlayingMoviesSuccess,
  fetchNowPlayingMoviesFailure,
} = moviesSlice.actions;
export default moviesSlice.reducer;
