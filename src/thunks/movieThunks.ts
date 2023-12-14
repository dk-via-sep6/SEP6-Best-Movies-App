//movieThunks.ts
import { Dispatch } from "redux";
import {
  fetchMovieFailure,
  fetchMovieStart,
  fetchMovieSuccess,
} from "../slices/movieSlice";
import {
  fetchNowPlayingMoviesFailure,
  fetchNowPlayingMoviesStart,
  fetchNowPlayingMoviesSuccess,
} from "../slices/moviesSlice";
import {
  fetchMovieCreditsFailure,
  fetchMovieCreditsStart,
  fetchMovieCreditsSuccess,
} from "../slices/movieCreditsSlice";
import {
  fetchMovieSearchStart,
  fetchMovieSearchSuccess,
  fetchMovieSearchFailure,
} from "../slices/movieSearchSlice";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const fetchMovie = (movieId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchMovieStart());

    try {
      const response = await fetch(`${serverUrl}/movies/${movieId}`, {
        method: "GET",
        headers: {
          "API-Key": `${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch movie.");
      }

      const data = await response.json();
      dispatch(fetchMovieSuccess(data));
    } catch (error) {
      dispatch(fetchMovieFailure("Network error. Please try again"));
    }
  };
};

export const fetchNowPlayingMovies = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchNowPlayingMoviesStart());

    try {
      const response = await fetch(`${serverUrl}/movies/nowplaying`, {
        method: "GET",
        headers: {
          "API-Key": `${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch movie.");
      }

      const data = await response.json();
      dispatch(fetchNowPlayingMoviesSuccess(data));
    } catch (error) {
      dispatch(fetchNowPlayingMoviesFailure("Network error. Please try again"));
    }
  };
};

export const fetchMovieCredits = (movieId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchMovieCreditsStart());

    try {
      const response = await fetch(`${serverUrl}/movies/credits/${movieId}`, {
        method: "GET",
        headers: {
          "API-Key": `${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch movie.");
      }
      const data = await response.json();
      dispatch(
        fetchMovieCreditsSuccess({
          cast: data.castMembers,
          crew: data.crewMembers,
        })
      );
    } catch (error) {
      dispatch(fetchMovieCreditsFailure("Network error. Please try again"));
    }
  };
};

export const fetchMovieSearchResults = (searchText: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchMovieSearchStart());
    try {
      const encodedSearchText = encodeURIComponent(searchText);
      const response = await fetch(
        `${serverUrl}/movies/search/${encodedSearchText}`,
        {
          method: "GET",
          headers: {
            "API-Key": `${apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      dispatch(fetchMovieSearchSuccess(data));
    } catch (error) {
      dispatch(fetchMovieSearchFailure("Network error. Please try again"));
    }
  };
};
