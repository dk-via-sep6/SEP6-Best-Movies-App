import React from "react";
import Carousel from "../../components/carousel/carousel";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/topbar";
import "./styles.css";
import ActorDetails from "../../components/actorDetail/actorDetail";
const ActorDetailPage: React.FC = () => {
  return (
    <div className="pageContainer">

      <div className="pageLayout">
  
        <div className="pageContent">
          <div className="carouselContainer">
            <Carousel />
          </div>

          <ActorDetails />
        </div>
      </div>
    </div>
  );
};

export default ActorDetailPage;
