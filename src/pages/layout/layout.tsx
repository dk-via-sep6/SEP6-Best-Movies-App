// layout.tsx
import React, { useState, useRef } from "react";
import TopBar from "../../components/topbar/topbar";
import Sidebar from "../../components/sidebar/sidebar";
import useOutsideClick from "../../hooks/useOutsideClick"; // Import the hook
import "./style.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
