import { Autocomplete, TextField } from "@mui/material";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/topbar";
import "../globalStyle.css";
const ActorsPage: React.FC = () => {
  return (
    <div className="pageContainer">
      <Topbar />
      <div className="pageContent">
        <Sidebar />
        <Autocomplete
          className="searchBar"
          renderInput={(params) => <TextField {...params} label="Actors" />}
          options={["Tobey Maguire", "Robert Downey Jr.", "Tom Cruise"]}
        ></Autocomplete>
      </div>
    </div>
  );
};
export default ActorsPage;
