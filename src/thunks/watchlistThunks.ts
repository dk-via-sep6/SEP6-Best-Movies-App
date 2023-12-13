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
} from "../slices/watchlistSlice";
import { Watchlist } from "../model/watchlist";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const fetchWatchlistsByUserId = (userId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchWatchlistsStart());

    try {
      const response = await fetch(`${serverUrl}/Watchlist/user/${userId}`, {
        method: "GET",
        headers: {
          "API-Key": `${apiKey}`,
        },
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
          "API-Key": `${apiKey}`,
        },
        body: JSON.stringify(watchlistData),
      });

      if (!response.ok) {
        throw new Error("Failed to add watchlist.");
      }

      console.log(JSON.stringify(watchlistData))
      const data = (await response.json()) as Watchlist;
      dispatch(addWatchlistSuccess(data));
    } catch (error: any) {
      dispatch(fetchWatchlistsFailure(error.message));
    }
  };
};

export const updateWatchlist = (watchlistData: Watchlist) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchWatchlistsStart());

    try {
      const response = await fetch(`${serverUrl}/Watchlist`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "API-Key": `${apiKey}`,
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
        headers: {
          "API-Key": `${apiKey}`,
        },
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

export const fetchWatchlistById = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchWatchlistsStart());

    try {
      const response = await fetch(`${serverUrl}/Watchlist/${id}`, {
        method: "GET",
        headers: {
          "API-Key": `${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch watchlist.");
      }

      const data = (await response.json()) as Watchlist;
      dispatch(fetchWatchlistSuccess(data)); 
    } catch (error: any) {
      dispatch(fetchWatchlistsFailure(error.message));
    }
  };
};
