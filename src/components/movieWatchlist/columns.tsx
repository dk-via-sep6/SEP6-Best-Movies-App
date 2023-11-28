import { IconButton, Typography } from "@mui/material";
import MovieRating from "../movieDetail/movieRating";
import dayjs from "dayjs";

import CloseIcon from "@mui/icons-material/Close";
const handleRemove = (id: number) => {
  // Implement the logic to remove the movie with the given id from the list
  // This might involve updating the state or making an API call
  alert(`Remove movie with id ${id}`);
};

export const columns = [
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
  { field: "genres", headerName: "Genres", width: 200 },
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
      return (
        <IconButton onClick={() => handleRemove(params.id)} aria-label="delete">
          <CloseIcon />
        </IconButton>
      );
    },
  },
];
