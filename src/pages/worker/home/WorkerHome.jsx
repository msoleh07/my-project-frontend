import React, { memo, useState, useEffect } from "react";
import { useGetAllWorkerQuery } from "../../../app/worker";
import Loader from "../../../components/loader/Loader";
import "./WorkerHome.css";

const WorkerHome = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;
  const [todayData, setTodayData] = useState(today);
  const getAllWorker = useGetAllWorkerQuery();

  const getData = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    let value = Object.fromEntries(data);
    setTodayData(value?.data);
    e.target.reset();
  };

  const { username } = JSON.parse(sessionStorage.getItem("adminInfo"));
  const [data, setData] = useState({
    addMeat: [null],
    addMincedMeat: [null],
  });

  const [amoutTolatPrices, setAmoutTolatPrices] = useState({
    addMeat: [null],
    addMincedMeat: [null],
  });

  useEffect(() => {
    let findUser = getAllWorker?.data?.innerData.find(
      (f) => f.username === username
    );

    // const date = new Date();
    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, "0");
    // const day = String(date.getDate()).padStart(2, "0");
    // const today = `${year}-${month}-${day}`;

    const addMeat = findUser?.addMeat.filter((addTime) => {
      const itemDate = new Date(addTime.addetTime)
        .toISOString()
        .substring(0, 10);
      return itemDate === todayData;
    });

    const addMincedMeat = findUser?.addMincedMeat.filter((addTime) => {
      const itemDate = new Date(addTime.addetTime)
        .toISOString()
        .substring(0, 10);
      return itemDate === todayData;
    });

    setData({
      addMeat: addMeat,
      addMincedMeat: addMincedMeat,
    });

    setAmoutTolatPrices({
      addMeat: addMeat?.map((m) => m?.money?.totalMoney),
      addMincedMeat: addMincedMeat?.map((m) => m?.money?.totalMoney),
    });
  }, [getAllWorker?.data]);
  let meatSubtotal = amoutTolatPrices?.addMeat?.reduce((a, b) => a + b, 0);
  let mincedMeatSubtotal = amoutTolatPrices?.addMincedMeat?.reduce(
    (a, b) => a + b,
    0
  );

  // console.log(
  //   "meatSubtotal",
  //   meatSubtotal,
  //   "mincedMeatSubtotal",
  //   mincedMeatSubtotal
  // );

  const formatNumber = (number) => {
    return new Intl.NumberFormat("uz-UZ").format(number);
  };

  const getFormattedTime = (dateTimeString) => {
    if (!dateTimeString) return ""; // Agar berilgan vaqt bo'sh bo'lsa, bo'sh qaytariladi
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    const seconds = dateTime.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="worker_home_page">
      {getAllWorker.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="worker_header_home">
            <h1>
              {todayData === today ? "Bugungi shashliklar" : "Qidirgan sana"}
            </h1>
            <form onSubmit={getData}>
              <input type="date" name="data" required />
              <button>Qidirish</button>
            </form>
          </div>

          <div className="worker_data_container">
            <h2>Torganchi</h2>
            <ul className="worker_meat_data_ammount">
              <li className="text">Soni:</li>
              <li className="ammount">
                {data?.addMeat?.length > 0 ? (
                  data?.addMeat?.map((item, index) => (
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
                  <span>Bugun malumot qoshilmadi</span>
                )}
              </li>
            </ul>
            <div className="worker_meat_full_data">
              {amoutTolatPrices?.addMeat?.length > 0 ? (
                <>
                  <div className="prices_container">
                    <div className="text_price"> Jami :</div>
                    <div className="ammount_price">
                      {amoutTolatPrices?.addMeat?.length > 0 ? (
                        <h2>
                          {data?.addMeat?.reduce(
                            (a, b) => a + b?.meat?.quantity,
                            0
                          )}
                          <span>dona</span>
                        </h2>
                      ) : (
                        <span>Bugun malumot qoshilmadi</span>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="ammount_container">
                    <div className="text_price">Opshi summa:</div>
                    <div className="ammount_price">
                      {amoutTolatPrices?.addMeat?.length > 0 ? (
                        <h2>
                          {formatNumber(meatSubtotal)}
                          <span>so'm</span>
                        </h2>
                      ) : (
                        <span>Bugun malumot qoshilmadi</span>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <span>Bugun malumot qoshilmadi</span>
              )}
            </div>

            <h2>Qiyma</h2>
            <ul className="worker_meat_data_ammount">
              <li className="text">Soni:</li>
              <li className="ammount">
                {data?.addMincedMeat?.length > 0 ? (
                  data?.addMincedMeat?.map((item, index) => (
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
                  <span>Bugun malumot qoshilmadi</span>
                )}
              </li>
            </ul>
            <div className="worker_meat_full_data">
              {amoutTolatPrices?.addMincedMeat?.length > 0 ? (
                <>
                  <div className="prices_container">
                    <div className="text_price"> Jami :</div>
                    <div className="ammount_price">
                      {amoutTolatPrices?.addMincedMeat?.length > 0 ? (
                        <h2>
                          {data?.addMincedMeat?.reduce(
                            (a, b) => a + b?.mincedMeat?.quantity,
                            0
                          )}
                          <span>dona</span>
                        </h2>
                      ) : (
                        <span>Bugun malumot qoshilmadi</span>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="ammount_container">
                    <div className="text_price">Opshi summa:</div>
                    <div className="ammount_price">
                      {amoutTolatPrices?.addMincedMeat?.length > 0 ? (
                        <h2>
                          {formatNumber(mincedMeatSubtotal)}
                          <span>so'm</span>
                        </h2>
                      ) : (
                        <span>Bugun malumot qoshilmadi</span>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <span>Bugun malumot qoshilmadi</span>
              )}
            </div>
            <h2>Umumiy narx</h2>
            <div className="worker_meat_full_data">
              {mincedMeatSubtotal + meatSubtotal > 0 ? (
                <div className="prices_container">
                  <div className="text_price">Opshi summa:</div>
                  <div className="ammount_price">
                    {mincedMeatSubtotal + meatSubtotal > 0 ? (
                      <h2>
                        {formatNumber(mincedMeatSubtotal + meatSubtotal)}
                        <span>so'm</span>
                      </h2>
                    ) : (
                      <span>Bugun malumot qoshilmadi</span>
                    )}
                  </div>
                </div>
              ) : (
                <span>Bugun malumot qoshilmadi</span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(WorkerHome);
