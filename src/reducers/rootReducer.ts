//rootReducer.ts

import commentsReducer from "../slices/commentSlice";
import { combineReducers } from "@reduxjs/toolkit";
import movieReducer from "../slices/movieSlice";
import moviesReducer from "../slices/moviesSlice";
import movieCreditsReducer from "../slices/movieCreditsSlice";
import personReducer from "../slices/personSlice";
import personCreditsReducer from "../slices/personCreditsSlice";
import userReducer from "../slices/userSlice";
import ratingsReducer from "../slices/ratingSlice";
import watchlistReducer from "../slices/watchlistSlice";
const rootReducer = combineReducers({
  movie: movieReducer,
  movies: moviesReducer,
  movieCredits: movieCreditsReducer,
  comments: commentsReducer,
  person: personReducer,
  personCredits: personCreditsReducer,
  users: userReducer,
  ratings: ratingsReducer,
  watchlists: watchlistReducer,
});

export default rootReducer;
