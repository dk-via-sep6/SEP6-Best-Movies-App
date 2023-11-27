import { Autocomplete, Pagination, TextField } from "@mui/material";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/topbar";
import "../style.css";
import Carousel from "../../components/carousel/carousel";
import ActorGrid from "../../components/actorGrid/actorGrid";
import { placeholderActors } from "./placeholderActors";
const ActorsPage: React.FC = () => {
  return (
    <div className="pageContainer">
      <Topbar />
      <div className="pageLayout">
        <Sidebar />
        <div className="pageContent">
          <div className="carouselContainer">
            <Carousel />
          </div>

          <Autocomplete
            className="searchBar"
            renderInput={(params) => <TextField {...params} label="Actors" />}
            options={placeholderActors.map((actor) => actor.name)} // assuming you want to search by title
          ></Autocomplete>
          <div className="gridContainer">
            <ActorGrid actors={placeholderActors} />
            <Pagination></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActorsPage;
