import { FunctionComponent } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import "./style.css";
import { useNavigate } from "react-router-dom";
const Topbar: FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="topbarContainer">
      <LogoutIcon className="topbarIcon" onClick={() => navigate("../login")} />
      <PersonIcon
        className="topbarIcon"
        onClick={() => navigate("../account")}
      />
    </div>
  );
};
export default Topbar;
