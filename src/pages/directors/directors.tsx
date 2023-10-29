import { Autocomplete, TextField } from "@mui/material";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/topbar";
import "../globalStyle.css";
const DirectorsPage: React.FC = () => {
  return (
    <div className="pageContainer">
      <Topbar />
      <div className="pageContent">
        <Sidebar />
        <Autocomplete
          className="searchBar"
          renderInput={(params) => <TextField {...params} label="Directors" />}
          options={["Quentin Tarantino", "Michael Bay", "Christopher Nolan"]}
        ></Autocomplete>
      </div>
    </div>
  );
};
export default DirectorsPage;
