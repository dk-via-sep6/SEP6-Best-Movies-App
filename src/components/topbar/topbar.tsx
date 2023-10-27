import { FunctionComponent } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import "./style.css";
const Topbar: FunctionComponent = () => {
  return (
    <div className="topbarContainer">
      <LogoutIcon />
      <PersonIcon />
    </div>
  );
};
export default Topbar;
