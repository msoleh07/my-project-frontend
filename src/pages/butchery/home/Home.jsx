import React, { memo, useEffect, useState } from "react";
import "./Home.css";
import { useGetButcheryAllDataQuery } from "../../../app/butchery";

const Home = () => {
  const allButcheryData = useGetButcheryAllDataQuery();
  const { username } = JSON.parse(sessionStorage.getItem("adminInfo"));
  const [data, setData] = useState({
    addMeatKg: [null],
    addMeat: [null],
    addMincedMeat: [null],
  });
  useEffect(() => {
    let findUser = allButcheryData?.data?.innerData.find(
      (f) => f.username === username
    );

    const today = new Date().toISOString().substring(0, 10);

    // Bugungi sana bilan mos keladigan addMeatKg obyektlarini topish
    const addMeatKg = findUser?.addMeatKg.filter((addTime) => {
      const itemDate = new Date(addTime.addetTime)
        .toISOString()
        .substring(0, 10);
      return itemDate === today;
    });

    // Bugungi sana bilan mos keladigan addMeat obyektlarini topish
    const addMeat = findUser?.addMeat.filter((addTime) => {
      const itemDate = new Date(addTime.addetTime)
        .toISOString()
        .substring(0, 10);
      return itemDate === today;
    });

    // Bugungi sana bilan mos keladigan addMincedMeat obyektlarini topish
    const addMincedMeat = findUser?.addMincedMeat.filter((addTime) => {
      const itemDate = new Date(addTime.addetTime)
        .toISOString()
        .substring(0, 10);
      return itemDate === today;
    });

    // console.log(
    //   "addMeatKg:",
    //   addMeatKg?.map((q) => q?.meatKg?.quantity),
    //   "addMeat",
    //   addMeat?.map((q) => q?.meat?.quantity),
    //   "addMincedMeat:",
    //   addMincedMeat?.map((q) => q?.mincedMeat?.quantity)
    // );

    setData({
      addMeat: addMeat?.map((q) => q?.meat?.quantity),
      addMeatKg: addMeatKg?.map((q) => q?.meatKg?.quantity),
      addMincedMeat: addMincedMeat?.map((q) => q?.mincedMeat?.quantity),
    });
  }, [allButcheryData?.data]);

  console.log(data);

  return (
    <div className="home_brutchery">
      <div className="bruchery_header_home">
        <h1>Bugungi ish</h1>
      </div>

      <div className="brutchery_data_container">
        <h2>Torganchi</h2>
        <ul className="brutchery_meat_data_ammount">
          <li className="text">Soni:</li>
          <li className="ammount">
            {data?.addMeat?.length > 0 ? (
              data?.addMeat?.map((item, index) => (
                <span key={index}>{item + " dona"}</span>
              ))
            ) : (
              <span>Bugun malumot qoshilmadi</span>
            )}
          </li>
        </ul>
        <div className="brutchery_meat_full_data">
          <h1>prices</h1>
        </div>

        <h2>Qiyma</h2>
        <ul className="brutchery_meat_data_ammount">
          <li className="text">Soni:</li>
          <li className="ammount">
            {data?.addMincedMeat?.length > 0 ? (
              data?.addMincedMeat?.map((item, inx) => (
                <span key={inx}>{item + " dona"}</span>
              ))
            ) : (
              <span>Bugun malumot qoshilmadi</span>
            )}
          </li>
        </ul>
        <div className="brutchery_meat_full_data">
          <h1>prices</h1>
        </div>

        <h2>Son</h2>
        <ul className="brutchery_meat_data_ammount">
          <li className="text">Soni:</li>
          <li className="ammount">
            {data?.addMeatKg?.length > 0 ? (
              data?.addMeatKg?.map((item, inx) => (
                <span key={inx}>{item + " kg"}</span>
              ))
            ) : (
              <span>Bugun malumot qoshilmadi</span>
            )}
          </li>
        </ul>
        <div className="brutchery_meat_full_data">
          <h1>prices</h1>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
