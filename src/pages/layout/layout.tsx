//layout.tsx
import React, { useState, ReactNode } from 'react';
import TopBar from '../../components/topbar/topbar';
import Sidebar from '../../components/sidebar/sidebar';
import './style.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
      <div className="layout">
        <TopBar onMenuClick={toggleSidebar} />
        <div className="layout-body">
        <Sidebar isOpen={isSidebarOpen} />
          <main className="main-content">{children}</main>
        </div>
      </div>
    );
  };
  

export default Layout;
