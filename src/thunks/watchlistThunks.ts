// thunks/watchlistThunks.ts
import { Dispatch } from "redux";
import {
  fetchWatchlistsStart,
  fetchWatchlistsSuccess,
  fetchWatchlistsFailure,
  addWatchlistSuccess,
  updateWatchlistSuccess,
  deleteWatchlistSuccess,
  // Import other actions as needed
} from "../slices/watchlistSlice";
import { Watchlist } from "../model/watchlist";

const serverUrl = "https://localhost:32772/api";

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

// Implement other thunks for creating, updating, and deleting watchlists
