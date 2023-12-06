//rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import movieReducer from "../slices/movieSlice";
import moviesReducer from "../slices/moviesSlice";
import movieCreditsReducer from "../slices/movieCreditsSlice";
import usersReducer from "../slices/userSlice";
// Import other slice reducers...

const rootReducer = combineReducers({
  movie: movieReducer,
  movies: moviesReducer,
  movieCredits: movieCreditsReducer,
  users: usersReducer,
  // Add other slice reducers...
});

export default rootReducer;
