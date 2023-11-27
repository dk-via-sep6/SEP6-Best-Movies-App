import React from "react";
import MovieDetail from "../../components/movieDetail/movieDetail";
import Carousel from "../../components/carousel/carousel";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/topbar";
import "./styles.css";
import CommentSection from "../../components/commentSection/commentSection";
const MovieDetailPage: React.FC = () => {
  // Fetch the movie details using the id or retrieve it from your state management
  // ...

  return (
    <div className="pageContainer">
      
      <div className="pageLayout">
 
        <div className="pageContent">
          <div className="carouselContainer">
            <Carousel />
          </div>

          <div className="movieDetailContainer">
            <MovieDetail />
            <div className="commentSectionContainer">
              <CommentSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
