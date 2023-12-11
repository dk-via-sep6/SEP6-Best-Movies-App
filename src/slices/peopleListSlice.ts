import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PeopleList } from "../model/peopleList";

interface PeopleListState {
  currentPeopleList: PeopleList | null;
  loading: boolean;
  error: string | null;
}

const initialState: PeopleListState = {
  currentPeopleList: null,
  loading: false,
  error: null,
};

const peopleListSlice = createSlice({
  name: "peopleList",
  initialState,
  reducers: {
    fetchTrendingPeopleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTrendingPeopleSuccess: (state, action: PayloadAction<PeopleList>) => {
      state.currentPeopleList = action.payload;
      state.loading = false;
    },
    fetchTrendingPeopleFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearTrendingPeopleList: (state) => {
      state.currentPeopleList = null;
    },
  },
});

export const {
  fetchTrendingPeopleStart,
  fetchTrendingPeopleSuccess,
  fetchTrendingPeopleFailure,
  clearTrendingPeopleList,
} = peopleListSlice.actions;
export default peopleListSlice.reducer;
