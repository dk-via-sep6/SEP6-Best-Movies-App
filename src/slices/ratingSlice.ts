// slices/ratingSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Rating } from "../model/rating";

interface RatingState {
  ratings: Rating[];
  userRating: Rating | null;
  loading: boolean;
  error: string | null;
}

const initialState: RatingState = {
  ratings: [],
  userRating: null,
  loading: false,
  error: null,
};

const ratingSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    fetchRatingsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRatingsSuccess(state, action: PayloadAction<Rating[]>) {
      state.ratings = action.payload;
      state.loading = false;
    },
    fetchRatingsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    postRatingSuccess(state, action: PayloadAction<Rating>) {
      state.ratings.push(action.payload);
    },
    updateRatingSuccess(state, action: PayloadAction<Rating>) {
      const index = state.ratings.findIndex(
        (rating) => rating.id === action.payload.id
      );
      if (index !== -1) {
        state.ratings[index] = action.payload;
      }
    },
    deleteRatingSuccess(state, action: PayloadAction<number>) {
      state.ratings = state.ratings.filter(
        (rating) => rating.id !== action.payload
      );
    },
    fetchUserRatingSuccess(state, action: PayloadAction<Rating>) {
      state.userRating = action.payload; // Assuming you have a field in your state to hold this
      state.loading = false;
    },
    // Optionally, add actions for user-specific interactions with ratings
    // For example, userRatingUpdateSuccess to handle updates to the user's rating
  },
});

export const {
  fetchRatingsStart,
  fetchRatingsSuccess,
  fetchRatingsFailure,
  postRatingSuccess,
  updateRatingSuccess,
  deleteRatingSuccess,
  fetchUserRatingSuccess,
  // Export other actions as needed
} = ratingSlice.actions;

export default ratingSlice.reducer;
