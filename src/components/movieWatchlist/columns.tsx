import { IconButton, Typography } from "@mui/material";
import MovieRating from "../movieDetail/movieRating";
import dayjs from "dayjs";

import CloseIcon from "@mui/icons-material/Close";
import { updateWatchlist } from "../../thunks/watchlistThunks";

export const columns = (
  watchlistId: number,
  watchlists: any[],
  dispatch: Function
) => [
  { field: "title", headerName: "Title", width: 200 },
  { field: "originalLanguage", headerName: "Language", width: 100 },
  {
    field: "releaseDate",
    headerName: "Release Date",
    width: 130,
    renderCell: (params: any) => {
      return (
        <>
          <Typography variant="body2">
            {dayjs(params.value).format("DD MMM YYYY")}
          </Typography>
        </>
      );
    },
  },
  // { field: "genres", headerName: "Genres", width: 200 },
  {
    field: "voteAverage",
    headerName: "Vote Average",
    width: 200,
    renderCell: (params: any) => {
      // params.value is the value of the 'voteAverage' field
      return (
        <>
          <MovieRating rating={params.value} />
          <Typography variant="body2">{params.value}</Typography>
        </>
      );
    },
  },
  { field: "voteCount", headerName: "Vote Count", width: 130 },
  {
    field: "remove",
    headerName: "Remove",
    width: 100,
    renderCell: (params: any) => {
      const handleRemove = (watchlistId: number, movieId: number) => {
        // Get the current state of the watchlist
        const watchlist = watchlists.find((w) => w.id === watchlistId);
        if (!watchlist) return;

        // Remove the movie ID from the watchlist
        const updatedMovies = watchlist.movies.filter(
          (id: number) => id !== movieId
        );

        // Create the updated watchlist object for the request
        const updatedWatchlist = {
          ...watchlist, // spread the existing properties of the watchlist
          movies: updatedMovies, // only update the movies array
        };

        dispatch(updateWatchlist(watchlistId, updatedWatchlist));
      };
      return (
        <IconButton
          className="remove-button"
          onClick={(e) => {
            e.stopPropagation();
            handleRemove(watchlistId, params.row.id);
          }}
          aria-label="delete"
        >
          <CloseIcon />
        </IconButton>
      );
    },
  },
];
