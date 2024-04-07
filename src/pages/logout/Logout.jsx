import React, { memo, useState } from "react";
import "./Logout.css";
import { Zoom, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [loader, setLoader] = useState(false);
  let navigate = useNavigate();

  const deleteAcount = () => {
    toast.warn("Sizga bu akkauntni o'chirishga ruxsat yoq", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: true,
      transition: Zoom,
    });
  };

  const logOut = async () => {
    let clientConfirm = window.confirm("Akkauntdan chiqishga rozimisiz");
    if (clientConfirm) {
      sessionStorage.clear();
      return navigate("/login");
    }
  };

  return (
    <div className="logout_page">
      <ToastContainer />
      <div className="logout_header">
        <h1>Tizimdan chiqishga rozimisiz</h1>
      </div>

      <div className="logout_card">
        <button onClick={deleteAcount}>Akkauntni o'chirish</button>
        <button onClick={logOut}>Akkauntdan chiqish</button>
      </div>
    </div>
  );
};

export default memo(Logout);
