// thunks/watchlistThunks.ts
import { Dispatch } from "redux";
import {
  fetchWatchlistsStart,
  fetchWatchlistsSuccess,
  fetchWatchlistsFailure,
  addWatchlistSuccess,
  updateWatchlistSuccess,
  deleteWatchlistSuccess,
  fetchWatchlistSuccess,
  // Import other actions as needed
} from "../slices/watchlistSlice";
import { Watchlist } from "../model/watchlist";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const fetchWatchlistsByUserId = (userId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchWatchlistsStart());

    try {
      const response = await fetch(`${serverUrl}/Watchlist/user/${userId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch watchlists.");
      }

      const data = (await response.json()) as Watchlist[];
      dispatch(fetchWatchlistsSuccess(data));
    } catch (error: any) {
      dispatch(fetchWatchlistsFailure(error.message));
    }
  };
};

export const addWatchlist = (watchlistData: Watchlist) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchWatchlistsStart());

    try {
      const response = await fetch(`${serverUrl}/Watchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(watchlistData),
      });

      if (!response.ok) {
        throw new Error("Failed to add watchlist.");
      }

      const data = (await response.json()) as Watchlist;
      dispatch(addWatchlistSuccess(data));
    } catch (error: any) {
      dispatch(fetchWatchlistsFailure(error.message));
    }
  };
};
export const updateWatchlist = (id: number, watchlistData: Watchlist) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchWatchlistsStart());

    try {
      const response = await fetch(`${serverUrl}/Watchlist/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(watchlistData),
      });

      if (!response.ok) {
        throw new Error("Failed to update watchlist.");
      }

      const data = (await response.json()) as Watchlist;
      dispatch(updateWatchlistSuccess(data));
    } catch (error: any) {
      dispatch(fetchWatchlistsFailure(error.message));
    }
  };
};

export const deleteWatchlist = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchWatchlistsStart());

    try {
      const response = await fetch(`${serverUrl}/Watchlist/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete watchlist.");
      }

      dispatch(deleteWatchlistSuccess(id));
    } catch (error: any) {
      dispatch(fetchWatchlistsFailure(error.message));
    }
  };
};
// ... other imports

// This function fetches a single watchlist by its ID
export const fetchWatchlistById = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchWatchlistsStart());

    try {
      const response = await fetch(`${serverUrl}/Watchlist/${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch watchlist.");
      }

      const data = (await response.json()) as Watchlist;
      // Assuming you have a suitable action in your watchlist slice to handle fetching a single watchlist
      dispatch(fetchWatchlistSuccess(data)); // Replace with your actual action for success
    } catch (error: any) {
      dispatch(fetchWatchlistsFailure(error.message));
    }
  };
};

// ... other thunks

// Implement other thunks for creating, updating, and deleting watchlists
