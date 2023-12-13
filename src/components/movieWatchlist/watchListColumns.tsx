import { IconButton, Typography } from "@mui/material";
import MovieRating from "../movieDetail/movieRating";
import dayjs from "dayjs";
import { GridRenderCellParams } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";

export const WatchListColumns = (handleRemoveMovie: (movieId: number) => void) => [
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
  renderCell: (params: GridRenderCellParams) => {
      return (
          <IconButton
              className="remove-button"
              onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveMovie(params.row.id);
              }}
              aria-label="delete"
          >
              <CloseIcon />
          </IconButton>
      );
    },
  },
];
