// personCreditsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CastRoles } from "../model/castRoles";
import { CrewRoles } from "../model/crewRoles";

interface PersonCreditsState {
  cast: CastRoles[];
  crew: CrewRoles[];
  loading: boolean;
  error: string | null;
}

const initialState: PersonCreditsState = {
  cast: [],
  crew: [],
  loading: false,
  error: null,
};

const PersonCreditsSlice = createSlice({
  name: "personCredits",
  initialState,
  reducers: {
    fetchPersonCreditsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPersonCreditsSuccess: (
      state,
      action: PayloadAction<{ cast: CastRoles[]; crew: CrewRoles[] }>
    ) => {
      state.cast = action.payload.cast;
      state.crew = action.payload.crew;
      console.log("Slice ---> "+ state.crew + " "+ state.cast)
      state.loading = false;
    },
    fetchPersonCreditsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearPersonCredits: (state) => {
      state.cast = [];
      state.crew = [];
    },
  },
});

export const {
  fetchPersonCreditsStart,
  fetchPersonCreditsSuccess,
  fetchPersonCreditsFailure,
  clearPersonCredits,
} = PersonCreditsSlice.actions;
export default PersonCreditsSlice.reducer;