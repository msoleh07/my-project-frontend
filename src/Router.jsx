import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/login/Login";
import { AdminController } from "./controllers/AdminController";
import Layout from "./layout/Layout";
import Logout from "./pages/logout/Logout";
import AddData from "./pages/butchery/addData/AddData";
import Database from "./pages/butchery/database/Database";
import AddAdminCreate from "./pages/owner/addAdminCreate/AddAdminCreate";
import OwnLayout from "./pages/owner/ownDatabase/layout/OwnLayout";
import MeatData from "./components/meatData/MeatData";
import PriceData from "./components/priceData/PriceData";
import TradeMoney from "./components/tradeMoney/TradeMoney";
import WorkerSalary from "./components/workerSalary/WorkerSalary";
import GivenMeat from "./components/givenMeat/GivenMeat";
import Workers from "./components/workers/Workers";
import Loader from "./components/loader/Loader";
import OwnLoader from "./components/ownLoader/OwnLoader";
import SkeletonPage from "./components/skeleton/Skeleton";
import Home from "./pages/butchery/home/Home";
import WorkerHome from "./pages/worker/home/WorkerHome";
import OwnerHome from "./pages/owner/home/OwnerHome";

const Router = () => {
  let location = useLocation();
  const [first, setFirst] = useState("");

  useEffect(() => {
    const adminInfo = JSON.parse(sessionStorage.getItem("adminInfo"));
    if (adminInfo && adminInfo.role) {
      setFirst(adminInfo.role);
    } else {
      setFirst("guest");
    }
  }, [location.pathname]);
  return (
    <div className="router">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AdminController />}>
          <Route path="/" element={<Layout />}>
            {first === "owner" && <Route path="/" element={<OwnerHome />} />}
            {first === "worker" && <Route path="/" element={<WorkerHome />} />}
            {first === "butchery" && <Route path="/" element={<Home />} />}
            <Route path="/own/about" element={<h1>own about</h1>} />
            <Route path="/own/addAdmin" element={<AddAdminCreate />} />
            <Route element={<OwnLayout />}>
              <Route path="/own/database" element={<PriceData />} />
              <Route path="/own/database/meatData" element={<MeatData />} />
              <Route path="/own/database/tradeMoney" element={<TradeMoney />} />
              <Route
                path="/own/database/workerSalary"
                element={<WorkerSalary />}
              />
              <Route path="/own/database/givenMeat" element={<GivenMeat />} />
              <Route path="/own/database/workers" element={<Workers />} />
              <Route path="/own/database/loader" element={<OwnLoader />} />
              {/* <Route
            path="/own/database/loaderparttwo"
            element={<SkeletonPage />}
          /> */}
            </Route>
            <Route path="/worker/about" element={<h1>worker about</h1>} />
            <Route path="/butchery/database" element={<Database />} />
            <Route path="/butchery/addData" element={<AddData />} />

            <Route path="/logout" element={<Logout />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default Router;
