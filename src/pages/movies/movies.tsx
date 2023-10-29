import { Autocomplete, TextField } from "@mui/material";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/topbar";
import "../globalStyle.css";
const MoviesPage: React.FC = () => {
  return (
    <div className="pageContainer">
      <Topbar />
      <div className="pageContent">
        <Sidebar />
        <Autocomplete
          className="searchBar"
          renderInput={(params) => <TextField {...params} label="Movies" />}
          options={[
            "The Shawnshark Redepmtion",
            "Lord of the Rings",
            "Mission Impossible",
          ]}
        ></Autocomplete>
      </div>
    </div>
  );
};
export default MoviesPage;
