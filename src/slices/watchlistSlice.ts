import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Watchlist } from "../model/watchlist";

interface WatchlistState {
  watchlists: Watchlist[];
  loading: boolean;
  error: string | null;
  selectedWatchlist: Watchlist | null;
}

const initialState: WatchlistState = {
  watchlists: [],
  loading: false,
  error: null,
  selectedWatchlist: null,
};

const watchlistSlice = createSlice({
  name: "watchlists",
  initialState,
  reducers: {
    fetchWatchlistsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWatchlistSuccess(state, action: PayloadAction<Watchlist>) {
      state.selectedWatchlist = action.payload;
      state.loading = false;
    },
    fetchWatchlistsSuccess(state, action: PayloadAction<Watchlist[]>) {
      state.watchlists = action.payload;
      state.loading = false;
    },
    fetchWatchlistsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addWatchlistSuccess(state, action: PayloadAction<Watchlist>) {
      state.watchlists.push(action.payload);
      state.loading = false;
    },
    updateWatchlistSuccess(state, action: PayloadAction<Watchlist>) {
      const index = state.watchlists.findIndex(
        (wl) => wl.id === action.payload.id
      );
      if (index !== -1) {
        state.watchlists[index] = action.payload;
      }
      state.loading = false;
    },
    deleteWatchlistSuccess(state, action: PayloadAction<number>) {
      state.watchlists = state.watchlists.filter(
        (wl) => wl.id !== action.payload
      );
      state.loading = false;
    },
  },
});

export const {
  fetchWatchlistsStart,
  fetchWatchlistsSuccess,
  fetchWatchlistsFailure,
  addWatchlistSuccess,
  updateWatchlistSuccess,
  deleteWatchlistSuccess,
  fetchWatchlistSuccess,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
