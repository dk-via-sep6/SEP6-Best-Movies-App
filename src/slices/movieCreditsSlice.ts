// movieCreditsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CastMember } from '../model/castMember';
import { CrewMember } from '../model/crewMember';

interface MovieCreditsState {
  cast: CastMember[];
  crew: CrewMember[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieCreditsState = {
  cast: [],
  crew: [],
  loading: false,
  error: null,
};

const movieCreditsSlice = createSlice({
  name: 'movieCredits',
  initialState,
  reducers: {
    fetchCreditsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCreditsSuccess: (state, action: PayloadAction<{cast: CastMember[], crew: CrewMember[]}>) => {
      state.cast = action.payload.cast;
      state.crew = action.payload.crew;
      state.loading = false;
    },
    fetchCreditsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearCredits: (state) => {
      state.cast = [];
      state.crew = [];
    },
  },
});

export const { fetchCreditsStart, fetchCreditsSuccess, fetchCreditsFailure, clearCredits } = movieCreditsSlice.actions;
export default movieCreditsSlice.reducer;
