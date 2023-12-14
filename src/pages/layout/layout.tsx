import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/topbar/topbar";
import Sidebar from "../../components/sidebar/sidebar";
import useOutsideClick from "../../hooks/useOutsideClick";
import "./style.css";

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useOutsideClick(sidebarRef, () => {
    if (isSidebarOpen) setIsSidebarOpen(false);
  });

  return (
    <div className="layout">
      <TopBar onMenuClick={toggleSidebar} />
      <div className="layout-body">
        <Sidebar isOpen={isSidebarOpen} ref={sidebarRef} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
