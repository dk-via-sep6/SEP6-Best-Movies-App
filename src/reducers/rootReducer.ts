//rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import movieReducer from '../slices/movieSlice';
// Import other slice reducers...

const rootReducer = combineReducers({
  movie: movieReducer,
  // Add other slice reducers...
});

export default rootReducer;
