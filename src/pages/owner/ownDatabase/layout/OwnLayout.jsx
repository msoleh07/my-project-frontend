import React from "react";
import "./Layout.css";
import { Link, Outlet, useLocation } from "react-router-dom";

const OwnLayout = () => {
  let { pathname } = useLocation();
  let linlTitle = [
    {
      title: "Narxlar",
      path: "/own/database",
    },
    {
      title: "Sotilgan shashliklar",
      path: "/own/database/meatData",
    },
    {
      title: "Savdo puli",
      path: "/own/database/tradeMoney",
    },
    {
      title: "Ishchilar maoshi",
      path: "/own/database/workerSalary",
    },
    {
      title: "Berilgan shashliklar",
      path: "/own/database/givenMeat",
    },
    {
      title: "Ishchilar",
      path: "/own/database/workers",
    },
    // {
    //   title: "Loader",
    //   path: "/own/database/loaderparttwo",
    // },
  ];
  return (
    <div className="own_layout_page ">
      <header className="own_layout_header">
        {linlTitle?.map((link, inx) => (
          <Link
            key={inx}
            to={link?.path}
            className={pathname === link?.path ? "active" : ""}
          >
            {link?.title}
          </Link>
        ))}
      </header>
      <main className="own_loyaout_main">
        <Outlet />
      </main>
    </div>
  );
};

export default OwnLayout;
