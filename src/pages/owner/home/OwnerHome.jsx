import React, { useEffect, useState } from "react";
import "./OwnerHome.css";
import { useGetButcheryAllDataQuery } from "../../../app/butchery";
import { useGetAllWorkerQuery } from "../../../app/worker";
import Loader from "../../../components/loader/Loader";

const OwnerHome = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;
  const [todayData, setTodayData] = useState(today);
  const getData = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    let value = Object.fromEntries(data);
    setTodayData(value?.data);
    e.target.reset();
  };

  const allButcheryData = useGetButcheryAllDataQuery();
  const getAllWorker = useGetAllWorkerQuery();
  const [information, setInformation] = useState([]);
  const [workerInformation, setWorkerInformation] = useState([]);

  useEffect(() => {
    const findUser = allButcheryData?.data?.innerData;
    setInformation(findUser?.length > 0 ? findUser : []);
  }, [allButcheryData?.data]);

  useEffect(() => {
    const findWorker = getAllWorker?.data?.innerData;
    setWorkerInformation(findWorker?.length > 0 ? findWorker : []);
  }, [getAllWorker?.data]);

  // console.log(workerInformation);
  const addMeatDataTodey = (data) => {
    const filteredData = data
      ? data
          .filter((addTime) => {
            const itemDate = new Date(addTime.addetTime)
              .toISOString()
              .substring(0, 10);
            return itemDate === todayData;
          })
          .map((i) => i?.meat)
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
            return itemDate === todayData;
          })
          .map((i) => i?.mincedMeat)
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
            return itemDate === todayData;
          })
          .map((i) => i?.meatKg)
      : [];

    return filteredData.length ? filteredData : ["Malumot yo`q"];
  };

  // totall prices todayData find function

  const addMeatPriceTodey = (data) => {
    const filteredData = data
      ? data
          .filter((addTime) => {
            const itemDate = new Date(addTime.addetTime)
              .toISOString()
              .substring(0, 10);
            return itemDate === todayData;
          })
          .map((i) => i?.money?.totalMoney)
      : [];

    return filteredData.length ? filteredData : [0];
  };

  const addMincedMeatPriceTodey = (data) => {
    const filteredData = data
      ? data
          .filter((addTime) => {
            const itemDate = new Date(addTime.addetTime)
              .toISOString()
              .substring(0, 10);
            return itemDate === todayData;
          })
          .map((i) => i?.money?.totalMoney)
      : [];

    return filteredData.length ? filteredData : [0];
  };

  const addMeatKgPriceTodey = (data) => {
    const filteredData = data
      ? data
          .filter((addTime) => {
            const itemDate = new Date(addTime.addetTime)
              .toISOString()
              .substring(0, 10);
            return itemDate === todayData;
          })
          .map((i) => i?.money?.totalMoney)
      : [];

    return filteredData.length ? filteredData : [0];
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("uz-UZ").format(number);
  };

  // Loader

  const getFormattedTime = (dateTimeString) => {
    if (!dateTimeString) return ""; // Agar berilgan vaqt bo'sh bo'lsa, bo'sh qaytariladi
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    const seconds = dateTime.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="owner_home_page">
      {allButcheryData?.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="owner_home_header">
            <h1>
              {todayData === today ? "Bugungi malumotlar" : "Qidirgan sana"}
            </h1>
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
                                {quantity === "Malumot yo`q" ? (
                                  "Malumot yo`q"
                                ) : (
                                  <div className="info_container">
                                    <div className="info_qtn">
                                      {quantity?.quantity + " dona"}
                                    </div>
                                    <div className="info_add_name_and_time">
                                      <div className="info_name_border">
                                        {quantity?.addWorkerName}
                                      </div>
                                      <div className="info_time">
                                        {getFormattedTime(quantity?.addetTime)}
                                      </div>
                                    </div>
                                  </div>
                                )}
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
                                  (a, b) => a + b?.quantity,
                                  0
                                )}
                            <div className="ammount_text">dona</div>
                          </div>
                        </div>
                        <div className="total_prices_data">
                          <span>Pull:</span>
                          <div className="price_list">
                            {formatNumber(
                              addMeatPriceTodey(item?.addMeat)?.reduce(
                                (a, b) => a + b,
                                0
                              )
                            )}
                            <div className="price_text">so'm</div>
                          </div>
                        </div>
                        <div className="total_time_data">
                          <span>
                            {todayData === today ? "Sana:" : "Qidirgan sana:"}
                          </span>
                          <div className="time_list">{todayData}</div>
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
                                {quantity === "Malumot yo`q" ? (
                                  "Malumot yo`q"
                                ) : (
                                  <div className="info_container">
                                    <div className="info_qtn">
                                      {quantity?.quantity + " dona"}
                                    </div>
                                    <div className="info_add_name_and_time">
                                      <div className="info_name_border">
                                        {quantity?.addWorkerName}
                                      </div>
                                      <div className="info_time">
                                        {getFormattedTime(quantity?.addetTime)}
                                      </div>
                                    </div>
                                  </div>
                                )}
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
                              : addMincedMeatDataTodey(
                                  item?.addMincedMeat
                                )?.reduce((a, b) => a + b?.quantity, 0)}
                            <div className="ammount_text">dona</div>
                          </div>
                        </div>
                        <div className="total_prices_data">
                          <span>Pull:</span>
                          <div className="price_list">
                            {formatNumber(
                              addMincedMeatPriceTodey(
                                item?.addMincedMeat
                              )?.reduce((a, b) => a + b, 0)
                            )}
                            <div className="price_text">so'm</div>
                          </div>
                        </div>
                        <div className="total_time_data">
                          <span>
                            {todayData === today ? "Sana:" : "Qidirgan sana:"}
                          </span>
                          <div className="time_list">{todayData}</div>
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
                                {quantity === "Malumot yo`q" ? (
                                  "Malumot yo`q"
                                ) : (
                                  <div className="info_container">
                                    <div className="info_qtn">
                                      {quantity?.quantity + " dona"}
                                    </div>
                                    <div className="info_add_name_and_time">
                                      <div className="info_name_border">
                                        Soat
                                      </div>
                                      <div className="info_time">
                                        {getFormattedTime(quantity?.addetTime)}
                                      </div>
                                    </div>
                                  </div>
                                )}
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
                              : addMincedMeatDataTodey(
                                  item?.addMincedMeat
                                )?.reduce((a, b) => a + b?.quantity, 0)}
                            <div className="ammount_text">kg</div>
                          </div>
                        </div>
                        <div className="total_prices_data">
                          <span>Pull:</span>
                          <div className="price_list">
                            {formatNumber(
                              addMeatKgPriceTodey(item?.addMeatKg)?.reduce(
                                (a, b) => a + b,
                                0
                              )
                            )}
                            <div className="price_text">so'm</div>
                          </div>
                        </div>
                        <div className="total_time_data">
                          <span>
                            {todayData === today ? "Sana:" : "Qidirgan sana:"}
                          </span>
                          <div className="time_list">{todayData}</div>
                        </div>
                      </div>
                    </li>
                    <li className="work_information">
                      <div className="total_money_info_container">
                        <span>Umumiy summa:</span>
                        <div className="price_list">
                          {formatNumber(
                            addMeatKgPriceTodey(item?.addMeatKg)?.reduce(
                              (a, b) => a + b,
                              0
                            ) +
                              addMincedMeatPriceTodey(
                                item?.addMincedMeat
                              )?.reduce((a, b) => a + b, 0) +
                              addMeatPriceTodey(item?.addMeat)?.reduce(
                                (a, b) => a + b,
                                0
                              )
                          )}
                          <div className="price_text">so'm</div>
                        </div>
                      </div>
                    </li>
                  </div>
                </ul>
              ))}
            </div>
          </div>
          <div className="owner_worcer_informatin_container">
            <div className="worker_information_header">
              <h2>Shashlikxona malumotlari</h2>
            </div>
            <div className="formation_container">
              {workerInformation?.map((item, index) => (
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
                                {quantity === "Malumot yo`q" ? (
                                  "Malumot yo`q"
                                ) : (
                                  <div className="info_container">
                                    <div className="info_qtn">
                                      {quantity?.quantity + " dona"}
                                    </div>
                                    <div className="info_add_name_and_time">
                                      <div className="info_name_border">
                                        {quantity?.addWorkerName}
                                      </div>
                                      <div className="info_time">
                                        {getFormattedTime(quantity?.addetTime)}
                                      </div>
                                    </div>
                                  </div>
                                )}
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
                                  (a, b) => a + b?.quantity,
                                  0
                                )}
                            <div className="ammount_text">dona</div>
                          </div>
                        </div>
                        <div className="total_prices_data">
                          <span>Pull:</span>
                          <div className="price_list">
                            {formatNumber(
                              addMeatPriceTodey(item?.addMeat)?.reduce(
                                (a, b) => a + b,
                                0
                              )
                            )}
                            <div className="price_text">so'm</div>
                          </div>
                        </div>
                        <div className="total_time_data">
                          <span>
                            {todayData === today ? "Sana:" : "Qidirgan sana:"}
                          </span>
                          <div className="time_list">{todayData}</div>
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
                                {quantity === "Malumot yo`q" ? (
                                  "Malumot yo`q"
                                ) : (
                                  <div className="info_container">
                                    <div className="info_qtn">
                                      {quantity?.quantity + " dona"}
                                    </div>
                                    <div className="info_add_name_and_time">
                                      <div className="info_name_border">
                                        {quantity?.addWorkerName}
                                      </div>
                                      <div className="info_time">
                                        {getFormattedTime(quantity?.addetTime)}
                                      </div>
                                    </div>
                                  </div>
                                )}
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
                              : addMincedMeatDataTodey(
                                  item?.addMincedMeat
                                )?.reduce((a, b) => a + b?.quantity, 0)}
                            <div className="ammount_text">dona</div>
                          </div>
                        </div>
                        <div className="total_prices_data">
                          <span>Pull:</span>
                          <div className="price_list">
                            {formatNumber(
                              addMincedMeatPriceTodey(
                                item?.addMincedMeat
                              )?.reduce((a, b) => a + b, 0)
                            )}
                            <div className="price_text">so'm</div>
                          </div>
                        </div>
                        <div className="total_time_data">
                          <span>
                            {todayData === today ? "Sana:" : "Qidirgan sana:"}
                          </span>
                          <div className="time_list">{todayData}</div>
                        </div>
                      </div>
                    </li>
                    <li className="work_information">
                      <div className="total_money_info_container">
                        <span>Umumiy summa:</span>
                        <div className="price_list">
                          {formatNumber(
                            addMincedMeatPriceTodey(
                              item?.addMincedMeat
                            )?.reduce((a, b) => a + b, 0) +
                              addMeatPriceTodey(item?.addMeat)?.reduce(
                                (a, b) => a + b,
                                0
                              )
                          )}
                          <div className="price_text">so'm</div>
                        </div>
                      </div>
                    </li>
                  </div>
                </ul>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OwnerHome;
