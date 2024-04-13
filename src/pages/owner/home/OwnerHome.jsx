import React, { useEffect, useState } from "react";
import "./OwnerHome.css";
import { useGetButcheryAllDataQuery } from "../../../app/butchery";

const OwnerHome = () => {
  const getData = (e) => {
    e.preventDefault();
    // e.target.reset();
    let data = new FormData(e.target);
    let value = Object.fromEntries(data);
    console.log(value);
  };

  const allButcheryData = useGetButcheryAllDataQuery();
  const [information, setInformation] = useState([]);

  useEffect(() => {
    const findUser = allButcheryData?.data?.innerData;
    setInformation(findUser?.length > 0 ? findUser : []);
  }, [allButcheryData?.data]);

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;

  console.log(information);

  return (
    <div className="owner_home_page">
      <div className="owner_home_header">
        <h1>Bugungi malumotlar</h1>
        <form onSubmit={getData}>
          <input type="date" name="data" required />
          <button>Qidirish</button>
        </form>
      </div>
      <div className="owner_worcer_informatin_container">
        <div className="worker_information_header">
          <h2>Go'shxona malumotlari</h2>
        </div>
        <div className="formation_container">
          <ul className="information_table_list">
            <li className="information_name_header">Muhammadsoleh</li>
            <div className="information_table_container">
              <li className="work_information">
                <div className="work_data_container">
                  <span className="work_name">To'rg'amchi:</span>
                  <div className="work_information_ammount">
                    <span>000</span>
                    <span>000</span>
                    <span>000</span>
                    <span>000</span>
                    <span>000</span>
                  </div>
                </div>
                <div className="work_total_data_container">
                  <div className="total_count_ammoun">
                    <span>Jami:</span>
                    <p>123456 dona</p>
                  </div>
                  <div className="total_prices_data">
                    <span>Pull:</span>
                    <p>123456 so'm</p>
                  </div>
                </div>
              </li>
              <li className="work_information">
                <div className="work_data_container">
                  <span className="work_name">Qiyma:</span>
                  <div className="work_information_ammount">
                    <span>000</span>
                    <span>000</span>
                    <span>000</span>
                    <span>000</span>
                    <span>000</span>
                  </div>
                </div>
                <div className="work_total_data_container">
                  <div className="total_count_ammoun">
                    <span>Jami:</span>
                    <p>123456 dona</p>
                  </div>
                  <div className="total_prices_data">
                    <span>Pull:</span>
                    <p>123456 so'm</p>
                  </div>
                </div>
              </li>
              <li className="work_information">
                <div className="work_data_container">
                  <span className="work_name">Son go'sht:</span>
                  <div className="work_information_ammount">
                    <span>000</span>
                    <span>000</span>
                    <span>000</span>
                    <span>000</span>
                    <span>000</span>
                  </div>
                </div>
                <div className="work_total_data_container">
                  <div className="total_count_ammoun">
                    <span>Jami:</span>
                    <p>123456 dona</p>
                  </div>
                  <div className="total_prices_data">
                    <span>Pull:</span>
                    <p>123456 so'm</p>
                  </div>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OwnerHome;
