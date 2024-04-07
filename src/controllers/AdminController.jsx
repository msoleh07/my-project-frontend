import { Outlet, Navigate, useLocation } from "react-router-dom";

export const AdminController = () => {
  let location = useLocation();
  let admin = JSON.parse(sessionStorage.getItem("adminInfo"));

  if (admin) return <Outlet />;
  else return <Navigate to={"/login"} state={{ from: location }} />;
};
