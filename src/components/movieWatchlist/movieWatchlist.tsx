import { Typography, CircularProgress } from "@mui/material";
import { Movie } from "../../model/movie";
import "./style.css";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { DataGrid } from "@mui/x-data-grid/DataGrid/DataGrid";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useAppDispatch } from "../../hooks/useAppDispatch";
interface MovieWathclistProps {
  listName: string;
  movies: Movie[];
  watchlistId: number;
  onMovieRemove: (watchlistId: number, movieId: number) => void;
}
const MovieWatchlist: React.FC<MovieWathclistProps> = ({
  listName,
  movies,
  watchlistId,
  onMovieRemove,
}) => {
  console.log(movies, " movies");
  const rows = movies?.map((movie, index) => ({
    id: movie.id, // Use the actual movie ID
    title: movie.title,
    originalLanguage: movie.originalLanguage,
    releaseDate: movie.releaseDate,
    // genres: movie.genres.join(", "),
    voteAverage: movie.voteAverage,
    voteCount: movie.voteCount,
  }));

  const loading = useSelector((state: RootState) => state.movies.loading);
  const [isGridVisible, setIsGridVisible] = useState(false);
  const toggleGridVisibility = () => {
    setIsGridVisible(!isGridVisible);
  };
  const dispatch = useAppDispatch();
  const watchlists = useSelector(
    (state: RootState) => state.watchlists.watchlists
  );
  const navigate = useNavigate();

  const handleMovieClick = (
    params: any,
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
    const isRemoveButton = (event.target as HTMLElement).closest(
      ".remove-button"
    );

    if (isRemoveButton) {
      // Call the callback when a movie is removed
      onMovieRemove(watchlistId, params.row.id);
    } else {
      navigate(`/movie/${params.row.id}`);
    }
  };
  return (
    <div className="watchlist">
      <div className="watchlistHeader" onClick={toggleGridVisibility}>
        <Typography variant="h6" className="watchlistTitle">
          {listName}{" "}
        </Typography>

        {isGridVisible ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
      </div>
      {isGridVisible && (
        <div className="watchlistContainer">
          {loading ? (
            <div className="loadingContainer">
              <CircularProgress />
            </div>
          ) : (
            <DataGrid
              rows={rows ?? []}
              columns={columns(watchlistId, watchlists, dispatch)}
              onRowClick={handleMovieClick}
              pageSizeOptions={[10, 20, 30, 100]}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default MovieWatchlist;
