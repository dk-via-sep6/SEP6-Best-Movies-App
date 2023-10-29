import { Autocomplete, TextField } from "@mui/material";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/topbar";
import "../globalStyle.css";
import Carousel from "../../components/carousel/carousel";
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
            options={["Tobey Maguire", "Robert Downey Jr.", "Tom Cruise"]}
          ></Autocomplete>
        </div>
      </div>
    </div>
  );
};
export default ActorsPage;
