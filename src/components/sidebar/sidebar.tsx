import { Card, List, ListItem } from "@mui/material";
import { FunctionComponent } from "react";
import "./style.css";
const Sidebar: FunctionComponent = () => {
  return (
    <div className="sidebarContainer">
      <Card className="sidebarCard">
        <List>
          <ListItem className="sidebarItem">Movies</ListItem>
          <ListItem className="sidebarItem">Actors</ListItem>
          <ListItem className="sidebarItem">Directors</ListItem>
        </List>
      </Card>
    </div>
  );
};
export default Sidebar;
