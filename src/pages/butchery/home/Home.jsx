import React, { memo, useEffect, useState } from "react";
import "./Home.css";
import { useGetButcheryAllDataQuery } from "../../../app/butchery";
import Loader from "../../../components/loader/Loader";

const Home = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;
  const [todayData, setTodayData] = useState(today);
  const allButcheryData = useGetButcheryAllDataQuery();

  const [findUsername, setFindUsername] = useState([]);

  const getData = (e) => {
    e.preventDefault();

    let data = new FormData(e.target);

    let value = Object.fromEntries(data);

    setTodayData(value?.data);

    e.target.reset();
  };

  const { username } = JSON.parse(sessionStorage.getItem("adminInfo"));

  useEffect(() => {
    let findUser = allButcheryData?.data?.innerData.find(
      (f) => f?.username === username
    );
    setFindUsername(findUser || []);
  }, [allButcheryData?.data]);

  const addMeat =
    findUsername?.addMeat?.filter((addTime) => {
      const itemDate = new Date(addTime?.addetTime)
        .toISOString()
        .substring(0, 10);
      return itemDate && itemDate === todayData;
    }) || [];

  const addMincedMeat =
    findUsername?.addMincedMeat?.filter((addTime) => {
      const itemDate = new Date(addTime?.addetTime)
        .toISOString()
        .substring(0, 10);
      return itemDate && itemDate === todayData;
    }) || [];

  const addMeatKg =
    findUsername?.addMeatKg?.filter((addTime) => {
      const itemDate = new Date(addTime?.addetTime)
        .toISOString()
        .substring(0, 10);
      return itemDate && itemDate === todayData;
    }) || [];

  let meatSubtotal = addMeat
    ?.map((m) => m?.money?.totalMoney ?? 0)
    .reduce((a, b) => a + b, 0);

  let mincedMeatSubtotal = addMincedMeat
    ?.map((m) => m?.money?.totalMoney ?? 0)
    .reduce((a, b) => a + b, 0);

  let meatKgSubtotal = addMeatKg
    ?.map((m) => m?.money?.totalMoney ?? 0)
    .reduce((a, b) => a + b, 0);

  const formatNumber = (number) => {
    return new Intl.NumberFormat("uz-UZ").format(number);
  };

  const getFormattedTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    const seconds = dateTime.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="home_brutchery">
      {allButcheryData.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="bruchery_header_home">
            <h1>{todayData === today ? "Bugungi ish" : "Qidirgan sana"}</h1>
            <form onSubmit={getData}>
              <input type="date" name="data" required />
              <button>Qidirish</button>
            </form>
          </div>

          <div className="brutchery_data_container">
            <h2>Torganchi</h2>
            <ul className="brutchery_meat_data_ammount">
              <li className="text">Soni:</li>
              <li className="ammount">
                {addMeat?.length > 0 ? (
                  addMeat?.map((item, index) => (
                    <span key={index}>
                      {item?.meat?.quantity + " dona"}
                      <div className="add_name_and_time">
                        <span className="name_border">
                          {item?.meat?.addWorkerName}
                        </span>
                        <div className="time">
                          {getFormattedTime(item?.meat?.addetTime)}
                        </div>
                      </div>
                    </span>
                  ))
                ) : (
                  <span>
                    {todayData === today
                      ? "Bugun malumot qoshilmadi"
                      : "Qidirgan malumot topilmadi"}
                  </span>
                )}
              </li>
            </ul>
            <div className="brutchery_meat_full_data">
              <div className="prices_container">
                <div className="text_price"> Jami :</div>
                <div className="ammount_price">
                  {addMeat?.length > 0 ? (
                    <h2>
                      {addMeat?.reduce((a, b) => a + b?.meat?.quantity, 0)}
                      <span>dona</span>
                    </h2>
                  ) : (
                    <span>
                      {todayData === today
                        ? "Bugun malumot qoshilmadi"
                        : "Qidirgan malumot topilmadi"}
                    </span>
                  )}
                </div>
              </div>
              <hr />
              <div className="ammount_container">
                <div className="text_price">Opshi summa:</div>
                <div className="ammount_price">
                  {addMeat?.length > 0 ? (
                    <h2>
                      {formatNumber(meatSubtotal)}
                      <span>so'm</span>
                    </h2>
                  ) : (
                    <span>
                      {todayData === today
                        ? "Bugun malumot qoshilmadi"
                        : "Qidirgan malumot topilmadi"}
                    </span>
                  )}
                </div>
              </div>
              <hr />
              <div className="ammount_container">
                <div className="text_price">
                  {todayData === today ? "Bugundi sana:" : "Qidirgan sana:"}
                </div>
                <div className="ammount_price">
                  <h2>{todayData}</h2>
                </div>
              </div>
            </div>

            <h2>Qiyma</h2>
            <ul className="brutchery_meat_data_ammount">
              <li className="text">Soni:</li>
              <li className="ammount">
                {addMincedMeat?.length > 0 ? (
                  addMincedMeat?.map((item, index) => (
                    <span key={index}>
                      {item?.mincedMeat?.quantity + " dona"}
                      <div className="add_name_and_time">
                        <span className="name_border">
                          {item?.mincedMeat?.addWorkerName}
                        </span>
                        <div className="time">
                          {getFormattedTime(item?.mincedMeat?.addetTime)}
                        </div>
                      </div>
                    </span>
                  ))
                ) : (
                  <span>
                    {todayData === today
                      ? "Bugun malumot qoshilmadi"
                      : "Qidirgan malumot topilmadi"}
                  </span>
                )}
              </li>
            </ul>
            <div className="brutchery_meat_full_data">
              <div className="prices_container">
                <div className="text_price"> Jami :</div>
                <div className="ammount_price">
                  {addMincedMeat?.length > 0 ? (
                    <h2>
                      {addMincedMeat?.reduce(
                        (a, b) => a + b?.mincedMeat?.quantity,
                        0
                      )}
                      <span>dona</span>
                    </h2>
                  ) : (
                    <span>
                      {todayData === today
                        ? "Bugun malumot qoshilmadi"
                        : "Qidirgan malumot topilmadi"}
                    </span>
                  )}
                </div>
              </div>
              <hr />
              <div className="ammount_container">
                <div className="text_price">Opshi summa:</div>
                <div className="ammount_price">
                  {addMincedMeat?.length > 0 ? (
                    <h2>
                      {formatNumber(mincedMeatSubtotal)}
                      <span>so'm</span>
                    </h2>
                  ) : (
                    <span>
                      {todayData === today
                        ? "Bugun malumot qoshilmadi"
                        : "Qidirgan malumot topilmadi"}
                    </span>
                  )}
                </div>
              </div>
              <hr />
              <div className="ammount_container">
                <div className="text_price">
                  {todayData === today ? "Bugundi sana:" : "Qidirgan sana:"}
                </div>
                <div className="ammount_price">
                  <h2>{todayData}</h2>
                </div>
              </div>
            </div>

            <h2>Son</h2>
            <ul className="brutchery_meat_data_ammount">
              <li className="text">Soni:</li>
              <li className="ammount">
                {addMeatKg?.length > 0 ? (
                  addMeatKg?.map((item, index) => (
                    <span key={index}>{item?.meatKg?.quantity + " kg"}</span>
                  ))
                ) : (
                  <span>
                    {todayData === today
                      ? "Bugun malumot qoshilmadi"
                      : "Qidirgan malumot topilmadi"}
                  </span>
                )}
              </li>
            </ul>
            <div className="brutchery_meat_full_data">
              <div className="prices_container">
                <div className="text_price"> Jami kg:</div>
                <div className="ammount_price">
                  {addMeatKg?.length > 0 ? (
                    <h2>
                      {addMeatKg?.reduce((a, b) => a + b?.meatKg?.quantity, 0)}
                      <span>kg</span>
                    </h2>
                  ) : (
                    <span>
                      {todayData === today
                        ? "Bugun malumot qoshilmadi"
                        : "Qidirgan malumot topilmadi"}
                    </span>
                  )}
                </div>
              </div>
              <hr />
              <div className="ammount_container">
                <div className="text_price">Opshi summa:</div>
                <div className="ammount_price">
                  {addMeatKg?.length > 0 ? (
                    <h2>
                      {formatNumber(meatKgSubtotal)}
                      <span>so'm</span>
                    </h2>
                  ) : (
                    <span>
                      {todayData === today
                        ? "Bugun malumot qoshilmadi"
                        : "Qidirgan malumot topilmadi"}
                    </span>
                  )}
                </div>
              </div>
              <hr />
              <div className="ammount_container">
                <div className="text_price">
                  {todayData === today ? "Bugundi sana:" : "Qidirgan sana:"}
                </div>
                <div className="ammount_price">
                  <h2>{todayData}</h2>
                </div>
              </div>
            </div>
            <h2>Umumiy narx</h2>
            <div className="brutchery_meat_full_data">
              <div className="prices_container_data">
                <div className="total_container">
                  <div className="text_price">Opshi summa:</div>
                  <div className="ammount_price">
                    {meatKgSubtotal + mincedMeatSubtotal + meatSubtotal > 0 ? (
                      <h2>
                        {formatNumber(
                          meatKgSubtotal + mincedMeatSubtotal + meatSubtotal
                        )}
                        <span>so'm</span>
                      </h2>
                    ) : (
                      <span>
                        {todayData === today
                          ? "Bugun malumot qoshilmadi"
                          : "Qidirgan malumot topilmadi"}
                      </span>
                    )}
                  </div>
                </div>
                <hr />
                <div className="data_container">
                  <div className="text_price">
                    {todayData === today ? "Bugundi sana:" : "Qidirgan sana:"}
                  </div>
                  <div className="ammount_price">{todayData}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Home);
