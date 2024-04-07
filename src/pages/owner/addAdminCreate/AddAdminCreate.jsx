import React, { useState } from "react";
import "./AddAdminCreate.css";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useSignUpMutation } from "../../../app/login";
import { toast, ToastContainer, Zoom } from "react-toastify";
import BtnLoader from "../../../components/btnLoader/BtnLoader";

const AddAdminCreate = () => {
  const [signUp] = useSignUpMutation();
  const [clickEye, setClickEye] = useState(false);
  const [loader, setLoader] = useState(false);
  const [url, setUrl] = useState({
    url: "/api/workerUser",
    role: "worker",
  });

  const adminAdd = async (e) => {
    e.preventDefault();
    let user = new FormData(e.target);
    let userData = Object.fromEntries(user);
    userData.role = url.role;
    setLoader(true);
    try {
      const res = await signUp({ userData, url: url.url });
      if (res?.data?.status === "successfuly") {
        toast.success(`Foydalanuvchi muofaqqiyatli yaatildi`, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          transition: Zoom,
        });
        setLoader(false);
        e.target.reset();
        return;
      } else if (res?.error?.data?.error === "Username  already exists") {
        toast.error(`Bunday  foydalanuvchi oldin yaatilgan`, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          transition: Zoom,
        });
        setLoader(false);
        e.target.reset();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin_register_page">
      <ToastContainer />
      <header className="admin_register_header">
        <h1>Ishchi qo'shish</h1>
        <div className="admin_create_header_btn">
          <button
            className={url.url === "/api/workerUser" ? "active" : ""}
            onClick={
              () => setUrl({ url: "/api/workerUser", role: "worker" }) // Role hossasini yangilash
            }
          >
            Shashlikchi qo'shish
          </button>
          <button
            className={url.url === "/api/butcheryUser" ? "active" : ""}
            onClick={
              () => setUrl({ url: "/api/butcheryUser", role: "butchery" }) // Role hossasini yangilash
            }
          >
            Zakatovkachi qo'shish
          </button>
        </div>
      </header>
      <form onSubmit={adminAdd} className="admin_register_form">
        <div className="admin_register_form_inputs">
          <label>Ism</label>
          <input required name="firstname" type="text" />
        </div>
        <div className="admin_register_form_inputs">
          <label>Familiya</label>
          <input required name="lastname" type="text" />
        </div>
        <div className="admin_register_form_inputs">
          <label>Foydalanuvchi nomi</label>
          <input required name="username" type="text" />
        </div>
        <div className="admin_register_form_inputs">
          <label>Kod</label>
          <div className="admin_register_input_password">
            <input
              required
              name="password"
              type={clickEye ? "text" : "password"}
            />
            <span onClick={() => setClickEye(!clickEye)}>
              {clickEye ? <GoEye /> : <GoEyeClosed />}
            </span>
          </div>
        </div>
        <div className="admin_register_form_btn">
          <button disabled={loader}>
            {loader ? <BtnLoader /> : "Qo'shish"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdminCreate;
