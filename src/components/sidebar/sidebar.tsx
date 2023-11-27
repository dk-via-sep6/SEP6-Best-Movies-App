// sidebar.tsx
import React, { forwardRef } from "react"; // Import forwardRef
import { Card, List, ListItem } from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router";

interface SidebarProps {
  isOpen: boolean;
}
// Update the component to use forwardRef
const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ isOpen }, ref) => {
  const navigate = useNavigate();

  return (
    // Attach the ref to the div element that you want to reference
    <div
      className={`sidebarContainer ${isOpen ? "sidebarOpen" : ""}`}
      ref={ref}
    >
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
});

export default Sidebar;
