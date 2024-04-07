import React from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="loyaut_page">
      <div className="container">
        <div className="loyaut_container">
          <main className="loyaut_outlet">
            <Outlet />
          </main>
          <div className="loyaut_sidebar">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
