import React, { useEffect, useState } from "react";
import "./OwnerHome.css";
import { useGetButcheryAllDataQuery } from "../../../app/butchery";

const OwnerHome = () => {
  const [todayData, setTodayData] = useState([]);
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

  const addMeatDataTodey = (data) => {
    const filteredData = data
      ? data
          .filter((addTime) => {
            const itemDate = new Date(addTime.addetTime)
              .toISOString()
              .substring(0, 10);
            return itemDate === today;
          })
          .map((i) => i?.meat?.quantity)
      : [];

    return filteredData.length ? filteredData : ["Malumot yo`q"];
  };

  const addMincedMeatDataTodey = (data) => {
    const filteredData = data
      ? data
          .filter((addTime) => {
            const itemDate = new Date(addTime.addetTime)
              .toISOString()
              .substring(0, 10);
            return itemDate === today;
          })
          .map((i) => i?.mincedMeat?.quantity)
      : [];

    return filteredData.length ? filteredData : ["Malumot yo`q"];
  };

  const addMeatKgDataTodey = (data) => {
    const filteredData = data
      ? data
          .filter((addTime) => {
            const itemDate = new Date(addTime.addetTime)
              .toISOString()
              .substring(0, 10);
            return itemDate === today;
          })
          .map((i) => i?.meatKg?.quantity)
      : [];

    return filteredData.length ? filteredData : ["Malumot yo`q"];
  };

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
          {information?.map((item, index) => (
            <ul key={index} className="information_table_list">
              <li className="information_name_header">{item?.firstname}</li>
              <div className="information_table_container">
                <li className="work_information">
                  <div className="work_data_container">
                    <span className="work_name">To'rg'amchi:</span>
                    <div className="work_information_ammount">
                      {addMeatDataTodey(item?.addMeat)?.map(
                        (quantity, index) => (
                          <span key={index}>
                            {quantity}
                            {quantity === "Malumot yo`q" ? "" : " dona"}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div className="work_total_data_container">
                    <div className="total_count_ammoun">
                      <span>Jami:</span>
                      <div className="price_list">
                        {addMeatDataTodey(item?.addMeat)?.find(
                          (d) => d === "Malumot yo`q"
                        )
                          ? 0
                          : addMeatDataTodey(item?.addMeat)?.reduce(
                              (a, b) => a + b,
                              0
                            )}
                        <div className="ammount_text">dona</div>
                      </div>
                    </div>
                    <div className="total_prices_data">
                      <span>Pull:</span>
                      <div className="price_list">
                        123456 <div className="price_text">so'm</div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="work_information">
                  <div className="work_data_container">
                    <span className="work_name">Qiyma:</span>
                    <div className="work_information_ammount">
                      {addMincedMeatDataTodey(item?.addMincedMeat)?.map(
                        (quantity, index) => (
                          <span key={index}>
                            {quantity}
                            {quantity === "Malumot yo`q" ? "" : " dona"}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div className="work_total_data_container">
                    <div className="total_count_ammoun">
                      <span>Jami:</span>
                      <div className="price_list">
                        {addMincedMeatDataTodey(item?.addMincedMeat)?.find(
                          (d) => d === "Malumot yo`q"
                        )
                          ? 0
                          : addMincedMeatDataTodey(item?.addMincedMeat)?.reduce(
                              (a, b) => a + b,
                              0
                            )}
                        <div className="ammount_text">dona</div>
                      </div>
                    </div>
                    <div className="total_prices_data">
                      <span>Pull:</span>
                      <div className="price_list">
                        123456 <div className="price_text">so'm</div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="work_information">
                  <div className="work_data_container">
                    <span className="work_name">Son go'sht:</span>
                    <div className="work_information_ammount">
                      {addMeatKgDataTodey(item?.addMeatKg)?.map(
                        (quantity, index) => (
                          <span key={index}>
                            {quantity}
                            {quantity === "Malumot yo`q" ? "" : " kg"}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div className="work_total_data_container">
                    <div className="total_count_ammoun">
                      <span>Jami:</span>
                      <div className="price_list">
                        {addMeatKgDataTodey(item?.addMeatKg)?.find(
                          (d) => d === "Malumot yo`q"
                        )
                          ? 0
                          : addMeatKgDataTodey(item?.addMeatKg)?.reduce(
                              (a, b) => a + b,
                              0
                            )}

                        <div className="ammount_text">kg</div>
                      </div>
                    </div>
                    <div className="total_prices_data">
                      <span>Pull:</span>
                      <div className="price_list">
                        123456 <div className="price_text">so'm</div>
                      </div>
                    </div>
                  </div>
                </li>
              </div>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerHome;
