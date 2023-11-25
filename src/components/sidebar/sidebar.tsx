import { Card, List, ListItem } from "@mui/material";
import { FunctionComponent } from "react";
import "./style.css";
import { useNavigate } from "react-router";
import logo from "../../assets/images/best_movie_32x32.png";

const Sidebar: FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebarContainer">
      <div className="sidebarLogoContainer">
        <img
          className="sidebarLogo"
          src={logo}
          alt="logo"
          onClick={() => navigate("../movies")}
        />
      </div>
      <Card className="sidebarCard">
        <List className="side">
          <ListItem
            className="sidebarItem"
            onClick={() => navigate("../movies")}
          >
            Movies
          </ListItem>
          <ListItem
            className="sidebarItem"
            onClick={() => navigate("../actors")}
          >
            Actors
          </ListItem>
          <ListItem
            className="sidebarItem"
            onClick={() => navigate("../directors")}
          >
            Directors
          </ListItem>
        </List>
      </Card>
    </div>
  );
};
export default Sidebar;
