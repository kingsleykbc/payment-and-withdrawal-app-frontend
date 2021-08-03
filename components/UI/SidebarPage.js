import React from 'react';
import Sidebar from './SidebarPageComponents/Sidebar';

const SidebarPage = ({  
  children 
}) => {
  return (
    <div className="SidebarPage">
      {children}

      { /* STYLE */}
      <style jsx>{`
        .SidebarPage { display: flex; }
      `}</style>
    </div>
  );
};

export default SidebarPage;

/**
 * SIDEBAR
 */
SidebarPage.Sidebar = Sidebar;

/**
 * PAGE
 */
SidebarPage.Page = ({ children, padding }) => {
  padding = padding || "15px";

  return (
    <div className="Page">
      {children}

      { /* STYLE */}
      <style jsx>{`
        .Page {
          flex-grow: 1;
          padding: ${padding};
          width: 100%;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}