import { Typography } from "@mui/material";
import { Movie } from "../../model/movie";
import "./style.css";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { DataGrid } from "@mui/x-data-grid/DataGrid/DataGrid";
interface MovieWathclistProps {
  listName: string;
  movies: Movie[];
}
const MovieWatchlist: React.FC<MovieWathclistProps> = ({
  listName,
  movies,
}) => {
  const rows = movies.map((movie, index) => ({
    id: index, // DataGrid requires a unique 'id' field for each row
    title: movie.title,
    originalLanguage: movie.originalLanguage,
    releaseDate: movie.releaseDate,
    genres: movie.genres.join(", "), // Assuming genres is an array
    voteAverage: movie.voteAverage,
    voteCount: movie.voteCount,
  }));
  const [isGridVisible, setIsGridVisible] = useState(false);
  const toggleGridVisibility = () => {
    setIsGridVisible(!isGridVisible);
  };

  const navigate = useNavigate();

  function handleMovieClick(id: number) {
    navigate(`/movie/${id}`);
  }

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
          <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={(params: any) => handleMovieClick(params.row.id)}
            pageSizeOptions={[10, 20, 30, 100]}
          />
        </div>
      )}
    </div>
  );
};
export default MovieWatchlist;
