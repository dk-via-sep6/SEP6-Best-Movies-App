import React, { useState } from "react";
import { Autocomplete, TextField, Pagination } from "@mui/material";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/topbar";
import "../style.css";
import Carousel from "../../components/carousel/carousel";
import MovieGrid from "../../components/movieGrid/movieGrid";
import { placeholderMovies } from "./placeholderMovies";
import "./styles.css";
const ITEMS_PER_PAGE = 12; // for example, adjust as needed

const MoviesPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(placeholderMovies.length / ITEMS_PER_PAGE);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const moviesToShow = placeholderMovies.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="pageContainer">
    
      <div className="pageLayout">
     
        <div className="pageContent">
          <div className="carouselContainer">
            <Carousel />
          </div>
          <Autocomplete
            className="searchBar"
            renderInput={(params) => (
              <TextField {...params} label="Search Movies" />
            )}
            options={placeholderMovies.map((movie) => movie.title)} // assuming you want to search by title
          />
          <div className="gridContainer">
            <MovieGrid movies={moviesToShow} />
            <Pagination
              className="paginationBar" // add this class to your CSS for styling
              count={pageCount}
              page={page}
              onChange={handleChangePage}
              color="primary" // or whatever color you prefer
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
