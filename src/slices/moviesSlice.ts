//moviesSlice.ts
import {createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Movie } from '../model/movie';


const initialState = {
    movies: [],
    loading: false,
    error: null,
  };

  const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
      fetchNowPlayingMoviesStart: (state) => {
        state.loading = true;
      },
      fetchNowPlayingMoviesSuccess: (state, action) => {
        state.movies = action.payload;
        state.loading = false;
      },
      fetchNowPlayingMoviesFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
      },
    },
  });
  
  export const { fetchNowPlayingMoviesStart, fetchNowPlayingMoviesSuccess, fetchNowPlayingMoviesFailure } = moviesSlice.actions;
  export default moviesSlice.reducer;