import { combineReducers } from "@reduxjs/toolkit";
import movieReducer from "../slices/movieSlice";
import moviesReducer from "../slices/moviesSlice";
import movieCreditsReducer from "../slices/movieCreditsSlice";
import personReducer from "../slices/personSlice";
import personCreditsReducer from "../slices/personCreditsSlice";
import userReducer from "../slices/userSlice";
import personSearchReducer from "../slices/personSearchSlice";
import movieSearchReducer from "../slices/movieSearchSlice";
import commentsReducer from "../slices/commentSlice";
import ratingsReducer from "../slices/ratingSlice";
import watchlistReducer from "../slices/watchlistSlice";
import peopleListSlice from "../slices/peopleListSlice";

const rootReducer = combineReducers({
  movie: movieReducer,
  movies: moviesReducer,
  movieCredits: movieCreditsReducer,
  comments: commentsReducer,
  person: personReducer,
  personCredits: personCreditsReducer,
  users: userReducer,
  personSearch: personSearchReducer,
  movieSearch: movieSearchReducer,
  ratings: ratingsReducer,
  watchlists: watchlistReducer,
  peopleList: peopleListSlice,
});

export default rootReducer;
