import React from "react";
import MovieDetail from "../../components/movieDetail/movieDetail";
import Carousel from "../../components/carousel/carousel";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/topbar";

const MovieDetailPage: React.FC = () => {
  // Fetch the movie details using the id or retrieve it from your state management
  // ...

  return (
    <div className="pageContainer">
      <Topbar />
      <div className="pageLayout">
        <Sidebar />
        <div className="pageContent">
          <div className="carouselContainer">
            <Carousel />
          </div>

          <div>
            <MovieDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
