import { Autocomplete, Pagination, TextField } from "@mui/material";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/topbar";
import "../style.css";
import Carousel from "../../components/carousel/carousel";
import DirectorGrid from "../../components/directorGrid/directorGrid";
import { placeholderDirectors } from "./placeholderDirectors";
const DirectorsPage: React.FC = () => {
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
              <TextField {...params} label="Directors" />
            )}
            options={["Quentin Tarantino", "Michael Bay", "Christopher Nolan"]}
          ></Autocomplete>
          <div className="gridContainer">
            <DirectorGrid directors={placeholderDirectors} />
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DirectorsPage;
