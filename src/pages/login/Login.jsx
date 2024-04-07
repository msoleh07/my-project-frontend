import React, { memo } from "react";
import "./Login.css";
import loginImg from "../../assets/loginIcon.png";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useState } from "react";
import { toast, ToastContainer, Zoom } from "react-toastify";
import { useLogInMutation } from "../../app/login";
import BtnLoader from "../../components/btnLoader/BtnLoader";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [logIn] = useLogInMutation();
  const [clickEye, setClickEye] = useState(false);
  const [addClass, setAddClass] = useState("owner");
  const [route, setRoute] = useState("api/owner/login");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const btnData = [
    { title: "Boshliq", route: "api/owner/login", role: "owner" },
    { title: "Shashlikchi", route: "api/workerUser/login", role: "worker" },
    { title: "Go'shxona", route: "api/butcheryUser/login", role: "butchery" },
  ];

  const addRole = ({ role, route }) => {
    setAddClass(role);
    setRoute(route);
  };

  const add = async (e) => {
    e.preventDefault();
    let userData = new FormData(e.target);
    let value = Object.fromEntries(userData);

    setLoader(true);

    try {
      const res = await logIn({ value, url: route });
      if (res?.data?.status === "successfuly") {
        sessionStorage.setItem(
          "adminInfo",
          JSON.stringify(res?.data?.innerdata)
        );
        setLoader(false);
        e.target.reset();
        navigate("/");
        return;
      } else if (res?.error?.data?.error === "Invalid username or password") {
        toast.error(`Bunday  foydalanuvchi nomi va kod mavjud emas`, {
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
    <div className="login_page">
      <div className="container">
        <div className="login_container">
          <ToastContainer />
          <div className="login_header">
            {btnData?.map((i, inx) => (
              <button
                onClick={() => addRole({ role: i?.role, route: i?.route })}
                className={addClass === i?.role ? "active" : ""}
                key={inx}
              >
                {i?.title}
              </button>
            ))}
          </div>
          <form onSubmit={add} className="login_form">
            <div className="form_img">
              <img src={loginImg} alt="" />
            </div>
            <div className="form_inputs_container">
              <div className="form_inputs">
                <label>Foydalanuvchi nomi</label>
                <input name="username" type="text" />
              </div>
              <div className="form_inputs">
                <label>Kod</label>
                <div className="input_password">
                  <input
                    name="password"
                    type={clickEye ? "text" : "password"}
                  />
                  <span onClick={() => setClickEye(!clickEye)}>
                    {clickEye ? <GoEye /> : <GoEyeClosed />}
                  </span>
                </div>
              </div>
            </div>
            <button disabled={loader}>
              {loader ? <BtnLoader /> : "Kirish"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
