// thunks/userThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { User } from "../model/user";

const apiBaseUrl = process.env.REACT_APP_SERVER_URL;

export const createUser = createAsyncThunk(
  "user/create",
  async (
    userData: { Id: string; EmailAddress: string; Username: string },
    { rejectWithValue }
  ) => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser?.getIdToken();

      if (!token) {
        throw new Error("No Firebase ID token available");
      }

      const response = await fetch(`${apiBaseUrl}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error!");
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "user/fetchById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiBaseUrl}/user/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Server responded with an error!");
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (userData: User, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser?.getIdToken();

      if (!token) {
        throw new Error("No Firebase ID token available");
      }

      const response = await fetch(`${apiBaseUrl}/user/${userData.Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error!");
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (userId: string, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser?.getIdToken();

      if (!token) {
        throw new Error("No Firebase ID token available");
      }

      const response = await fetch(`${apiBaseUrl}/user/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Server responded with an error!");
      }

      return userId; // Return the ID of the deleted user
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
