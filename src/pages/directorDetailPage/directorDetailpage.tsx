import React from "react";
import Carousel from "../../components/carousel/carousel";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/topbar";
import "./styles.css";
import DirectorDetail from "../../components/directorDetail/directorDetail";
const DirectorDetailPage: React.FC = () => {
  return (
    <div className="pageContainer">
      <Topbar />
      <div className="pageLayout">
        <Sidebar />
        <div className="pageContent">
          <div className="carouselContainer">
            <Carousel />
          </div>

          <DirectorDetail />
        </div>
      </div>
    </div>
  );
};

export default DirectorDetailPage;
