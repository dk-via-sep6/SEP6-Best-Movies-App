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

const serverUrl = "https://localhost:32778/api";

export const fetchMovie = (movieId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchMovieStart());

    try {
      const response = await fetch(`${serverUrl}/movies/${movieId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch movie.");
      }

      const data = await response.json();
      console.log(data);
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
      });

      if (!response.ok) {
        throw new Error("Failed to fetch movie.");
      }

      const data = await response.json();
      console.log(data);
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
      });

      if (!response.ok) {
        throw new Error("Failed to fetch movie.");
      }
      const data = await response.json();
      console.log(data);
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
      const response = await fetch(`${serverUrl}/movies/search/${encodedSearchText}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      console.log(data);
      dispatch(fetchMovieSearchSuccess(data));
    } catch (error) {
      dispatch(fetchMovieSearchFailure("Network error. Please try again"));
    }
  };
};
