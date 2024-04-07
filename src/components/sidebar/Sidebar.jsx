import React, { memo } from "react";
import "./Sidebar.css";
import { sidabarData } from "../../static/sidebarData";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  let { role } = JSON.parse(sessionStorage.getItem("adminInfo"));
  return (
    <div className="sidebar_page">
      {sidabarData[role]?.map((i, inx) => (
        <NavLink key={inx} to={i?.link} className="sidebar_link">
          <div className="link_icon">{i?.icon}</div>
          <span className="link_title">{i?.title}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default memo(Sidebar);
