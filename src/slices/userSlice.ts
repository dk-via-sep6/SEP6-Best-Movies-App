import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../thunks/userThunks";

interface UserState {
  loading: boolean;
  data: any | null;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  data: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserById.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createUser.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.data)) {
          state.data = state.data.map((user) =>
            user.id === action.payload.id ? action.payload : user
          );
        } else if (state.data?.id === action.payload.id) {
          state.data = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.data)) {
          state.data = state.data.filter((user) => user.id !== action.payload);
        } else if (state.data?.id === action.payload) {
          state.data = null;
        }
      })
      .addCase(deleteUser.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
