//sidebar.tsx
import React, { forwardRef } from "react"; 
import { Card, List, ListItem } from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ isOpen }, ref) => {
  const navigate = useNavigate();

  return (
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
            onClick={() => navigate("../people")}
          >
            People
          </ListItem>
        </List>
      </Card>
    </div>
  );
});

export default Sidebar;
