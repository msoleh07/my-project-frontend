import React, { memo, useEffect, useState } from "react";
import "./WorkerAbout.css";
import { useGetButcheryAllDataQuery } from "../../../app/butchery";

const WorkerAbout = () => {
  const allButcheryData = useGetButcheryAllDataQuery();
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;
  const [todayData, setTodayData] = useState(today);
  const [butcheryAllInfo, setButcheryAllInfo] = useState([]);
  const [openForm, setOpenForm] = useState([]);
  useEffect(() => {
    setButcheryAllInfo(allButcheryData?.data?.innerData || []);
  }, [allButcheryData?.data]);

  const getData = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    let value = Object.fromEntries(data);
    setTodayData(value?.data);
    e.target.reset();
  };

  const handleClickMeat = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    let value = Object.fromEntries(data);
    const meatDataArray = value?.addMeat?.split("\n").map(Number);
    console.log(meatDataArray);
  };

  const handleClickMincedMeat = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    let value = Object.fromEntries(data);
    const meatDataArray = value?.meatData?.split("\n").map(Number);
    console.log(meatDataArray);
  };

  // form function
  const toggleForm = (id) => {
    if (!openForm?.includes(id)) {
      setOpenForm((prevState) => [...prevState, id]);
    } else {
      setOpenForm((prevState) => prevState?.filter((item) => item !== id));
    }
  };

  return (
    <div className="worker_about">
      <header className="worker_about_header">
        <h2>Bugungi hisob kitob</h2>
        <hr />
        <form onSubmit={getData}>
          <input type="date" name="data" required />
          <button>Qidirish</button>
        </form>
      </header>
      <hr />
      <div className="worker_info_container">
        <div className="worker_info_header">
          <h2>Bugungi malumotlar</h2>
          <hr />
          <span>
            <big>Sana:</big> <b>{todayData}</b>
          </span>
        </div>
        <hr />
        <div className="worker_data_ul_container">
          <header className="worker_data_header">
            <h2>Torg'amchi</h2>
          </header>
          <ul className="worker_full_data_ul_container">
            <li>
              <big>Jami:</big>
              <span>
                0000 <div className="worker_text">dona</div>
              </span>
            </li>

            <li>
              <big>Opshi summa:</big>
              <span>
                0000 <div className="worker_text">so'm</div>
              </span>
            </li>

            <li>
              <big>Sana:</big>
              <span>{todayData}</span>
            </li>
          </ul>
        </div>
        <hr />
        <div className="worker_data_ul_container">
          <header className="worker_data_header">
            <h2>Qiyma</h2>
          </header>
          <ul className="worker_full_data_ul_container">
            <li>
              <big>Jami:</big>
              <span>
                0000 <div className="worker_text">dona</div>
              </span>
            </li>

            <li>
              <big>Opshi summa:</big>
              <span>
                0000 <div className="worker_text">so'm</div>
              </span>
            </li>

            <li>
              <big>Sana:</big>
              <span>{todayData}</span>
            </li>
          </ul>
        </div>
        <hr />
        <div className="worker_data_ul_container">
          <header className="worker_data_header">
            <h2>Torg'amchi ast</h2>
          </header>
          <ul className="worker_full_data_ul_container">
            <li>
              <big>Jami:</big>
              <span>
                0000 <div className="worker_text">dona</div>
              </span>
            </li>

            <li>
              <big>Opshi summa:</big>
              <span>
                0000 <div className="worker_text">so'm</div>
              </span>
            </li>

            <li>
              <big>Sana:</big>
              <span>{todayData}</span>
            </li>
            <form onSubmit={handleClickMeat}>
              <textarea
                name="addMeat"
                required
                placeholder="To'rgamchi ast"
              ></textarea>
              <button>Jo'natish</button>
            </form>
          </ul>
        </div>
        <hr />
        <div className="worker_data_ul_container">
          <header className="worker_data_header">
            <h2>Qiyma ast</h2>
          </header>
          <ul className="worker_full_data_ul_container">
            <li>
              <big>Jami:</big>
              <span>
                0000 <div className="worker_text">dona</div>
              </span>
            </li>

            <li>
              <big>Opshi summa:</big>
              <span>
                0000 <div className="worker_text">so'm</div>
              </span>
            </li>

            <li>
              <big>Sana:</big>
              <span>{todayData}</span>
            </li>
            <form onSubmit={handleClickMincedMeat}>
              <textarea name="addMincedMeat" placeholder="Qiyma ast"></textarea>
              <button>Jo'natish</button>
            </form>
          </ul>
        </div>
        <hr />
        <div className="worker_data_ul_container">
          <header className="worker_data_header">
            <h2>Rasxo'tlar</h2>
          </header>
          <div className="worker_info_data_container">
            {butcheryAllInfo?.length > 0
              ? butcheryAllInfo?.map((item, inx) => (
                  <div key={inx} className="worker_info_add_btn">
                    <button onClick={() => toggleForm(item?._id)}>
                      {item?.firstname}
                    </button>
                    <form
                      style={{
                        display: openForm?.includes(item._id) ? "grid" : "none",
                      }}
                    >
                      <input type="text" placeholder="Nomi" />
                      <input type="number" name="data" placeholder="Summa" />
                    </form>

                    <hr />
                  </div>
                ))
              : "malumot topilmadi"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(WorkerAbout);
