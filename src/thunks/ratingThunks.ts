// thunks/ratingThunks.js
import { Dispatch } from "redux";
import {
  fetchRatingsStart,
  fetchRatingsSuccess,
  fetchRatingsFailure,
  postRatingSuccess,
  updateRatingSuccess,
  deleteRatingSuccess,
  fetchUserRatingSuccess,
} from "../slices/ratingSlice";
import { Rating } from "../model/rating";

const serverUrl = "https://localhost:32772/api";

export const fetchRatingsByMovieId = (movieId: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchRatingsStart());

    try {
      const response = await fetch(`${serverUrl}/Ratings/movie/${movieId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ratings.");
      }

      const data = await response.json();
      dispatch(fetchRatingsSuccess(data));
    } catch (error: any) {
      dispatch(fetchRatingsFailure(error.message));
    }
  };
};

export const postRating = (ratingData: Rating) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchRatingsStart());

    try {
      const response = await fetch(`${serverUrl}/Ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingData),
      });

      if (!response.ok) {
        throw new Error("Failed to post rating.");
      }

      const data = await response.json();
      dispatch(postRatingSuccess(data));
    } catch (error: any) {
      dispatch(fetchRatingsFailure(error.message));
    }
  };
};

export const updateRating = (id: number, ratingData: Rating) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchRatingsStart());

    try {
      const response = await fetch(`${serverUrl}/Ratings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingData),
      });

      if (!response.ok) {
        throw new Error("Failed to update rating.");
      }

      const data = await response.json();
      dispatch(updateRatingSuccess(data));
    } catch (error: any) {
      dispatch(fetchRatingsFailure(error.message));
    }
  };
};

export const deleteRating = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchRatingsStart());

    try {
      const response = await fetch(`${serverUrl}/Ratings/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete rating.");
      }

      dispatch(deleteRatingSuccess(id));
    } catch (error: any) {
      dispatch(fetchRatingsFailure(error.message));
    }
  };
};

// Add any additional thunks as needed
export const fetchUserRatingForMovie = (userId: string, movieId: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchRatingsStart());

    try {
      const response = await fetch(
        `${serverUrl}/Ratings/user/${userId}/movie/${movieId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user rating.");
      }

      const data = await response.json();
      dispatch(fetchUserRatingSuccess(data));
    } catch (error: any) {
      dispatch(fetchRatingsFailure(error.message));
    }
  };
};
