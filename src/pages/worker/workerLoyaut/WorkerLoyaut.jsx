import React, { memo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./WorkerLoyaut.css";

const WorkerLoyaut = () => {
  let { pathname } = useLocation();
  let linlTitle = [
    {
      title: "Hisob kitob",
      path: "/worker/about",
    },
    {
      title: "Hisob kitob 2",
      path: "/worker/about/two",
    },
  ];
  return (
    <div className="worker_loyaut">
      <header className="worker_layout_header">
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
      <main className="worker_layout_main">
        <Outlet />
      </main>
    </div>
  );
};

export default memo(WorkerLoyaut);
