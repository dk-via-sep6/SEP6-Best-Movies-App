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

import {
  fetchPersonSearchFailure,
  fetchPersonSearchStart,
  fetchPersonSearchSuccess,
} from "../slices/personSearchSlice";

import {
  fetchTrendingPeopleFailure,
  fetchTrendingPeopleStart,
  fetchTrendingPeopleSuccess,
} from "../slices/peopleListSlice";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const apiKey = process.env.REACT_APP_API_KEY;
export const fetchPerson = (personId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchPersonStart());

    try {
      const response = await fetch(`${serverUrl}/person/${personId}`, {
        method: "GET",
        headers: {
          "API-Key": `${apiKey}`,
        },
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
          headers: {
            "API-Key": `${apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch person");
      }

      const data = await response.json();
      console.log(data);
      dispatch(
        fetchPersonCreditsSuccess({
          cast: data.castRoles,
          crew: data.crewRoles,
        })
      );
    } catch (error) {
      dispatch(fetchPersonCreditsFailure("Network error. Please try again"));
    }
  };
};

export const fetchPersonSearchResults = (searchText: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchPersonSearchStart());

    try {
      const response = await fetch(`${serverUrl}/person/search/${searchText}`, {
        method: "GET",
        headers: {
          "API-Key": `${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      console.log(data);
      dispatch(fetchPersonSearchSuccess(data));
    } catch (error) {
      dispatch(fetchPersonSearchFailure("Network error. Please try again"));
    }
  };
};

export const fetchTrendingPeople = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchTrendingPeopleStart());

    try {
      const response = await fetch(`${serverUrl}/person/trending`, {
        method: "GET",
        headers: { "API-Key": `${apiKey}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      console.log(data);
      dispatch(fetchTrendingPeopleSuccess(data));
    } catch (error) {
      dispatch(fetchTrendingPeopleFailure("Network error. Please try again"));
    }
  };
};
