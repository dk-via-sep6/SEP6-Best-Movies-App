import { Typography } from "@mui/material";
import "./style.css";
import { WatchListColumns} from "./watchListColumns";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { DataGrid } from "@mui/x-data-grid/DataGrid/DataGrid";
import { Watchlist } from "../../model/watchlist";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { updateWatchlist } from "../../thunks/watchlistThunks";
import { useNavigate } from "react-router-dom";
import {  GridRowParams } from "@mui/x-data-grid";

const MovieWatchlist: React.FC<Watchlist> = ({id,name,movies, userId}) => {
  const navigate = useNavigate();
  const rows = movies.map(movie => ({
    id: movie.id,
    title: movie.title,
    originalLanguage: movie.originalLanguage,
    releaseDate: movie.releaseDate,
    genres: movie.genres.join(", "),
    voteAverage: movie.voteAverage,
    voteCount: movie.voteCount,
  }));

  const [isGridVisible, setIsGridVisible] = useState(false);
  const toggleGridVisibility = () => {
    setIsGridVisible(!isGridVisible);
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveMovie = (movieId: number) => {
    // Filter out the movie to be removed
    const updatedMovies = movies.filter((movie) => movie.id !== movieId);

    // Prepare the updated watchlist object
    const updatedWatchlist = { id, name, userId, movies: updatedMovies };

    // Dispatch the update action
    dispatch(updateWatchlist(updatedWatchlist));
  };


  const onRowClick = (params: GridRowParams) => {
    navigate(`/movie/${params.id}`);
};
  return (
    <div className="watchlist">
      <div className="watchlistHeader" onClick={toggleGridVisibility}>
        <Typography variant="h6" className="watchlistTitle">
          {name}{" "}
        </Typography>

        {isGridVisible ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
      </div>
      {isGridVisible && (
        <div className="watchlistContainer">
       
            <DataGrid
              rows={rows ?? []}
              columns={WatchListColumns(handleRemoveMovie)}
                pageSizeOptions={[10, 20, 30, 100]}
                onRowClick={onRowClick}              
              />
          
        </div>
      )}
    </div>
  );
};
export default MovieWatchlist;
