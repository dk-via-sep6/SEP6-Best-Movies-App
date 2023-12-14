import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../model/person";

interface PersonState {
  currentPerson: Person | null;
  loading: boolean;
  error: string | null;
}

const initialState: PersonState = {
  currentPerson: null,
  loading: false,
  error: null,
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    fetchPersonStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPersonSuccess: (state, action: PayloadAction<Person>) => {
      state.currentPerson = action.payload;
      state.loading = false;
    },
    fetchPersonFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearPerson: (state) => {
      state.currentPerson = null;
    },
  },
});

export const {
  fetchPersonStart,
  fetchPersonSuccess,
  fetchPersonFailure,
  clearPerson,
} = personSlice.actions;
export default personSlice.reducer;
