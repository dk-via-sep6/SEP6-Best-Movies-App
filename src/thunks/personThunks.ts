//personThunks.ts
import { Dispatch } from "redux";
import {
  fetchPersonStart,
  fetchPersonSuccess,
  fetchPersonFailure,
} from "../slices/personSlice";

import {
  fetchPersonCreditsStart,
  fetchPersonCreditsSuccess,
  fetchPersonCreditsFailure,
} from "../slices/personCreditsSlice";

const serverUrl = "https://localhost:32778/api";

export const fetchPerson = (personId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchPersonStart());

    try {
      const response = await fetch(`${serverUrl}/person/${personId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch person");
      }

      const data = await response.json();
      console.log(data);
      dispatch(fetchPersonSuccess(data));
    } catch (error) {
      dispatch(fetchPersonFailure("Network error. Please try again"));
    }
  };
};

export const fetchPersonCredits = (personId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchPersonCreditsStart());

    try {
      const response = await fetch(
        `${serverUrl}/person/credits/movie/${personId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch person");
      }

      const data = await response.json();
      console.log(data);
      dispatch(fetchPersonCreditsSuccess(data));
    } catch (error) {
      dispatch(fetchPersonCreditsFailure("Network error. Please try again"));
    }
  };
};
