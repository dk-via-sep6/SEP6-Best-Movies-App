import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersonInfo } from "../model/personInfo";

interface PersonSearchState {
  currentPersonSearch: PersonInfo[];
  loading: boolean;
  error: string | null;
}

const initialState: PersonSearchState = {
  currentPersonSearch: [],
  loading: false,
  error: null,
};

const PersonSearchSlice = createSlice({
  name: "personSearch",
  initialState,
  reducers: {
    fetchPersonSearchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPersonSearchSuccess: (state, action: PayloadAction<PersonInfo[]>) => {
      state.currentPersonSearch = action.payload;
      state.loading = false;
    },
    fetchPersonSearchFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearPersonSearch: (state) => {
      state.currentPersonSearch = [];
    },
  },
});

export const {
  fetchPersonSearchStart,
  fetchPersonSearchSuccess,
  fetchPersonSearchFailure,
  clearPersonSearch,
} = PersonSearchSlice.actions;
export default PersonSearchSlice.reducer;
