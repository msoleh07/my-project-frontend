import React, { memo, useEffect } from "react";
import "./Home.css";
import { useGetButcheryAllDataQuery } from "../../../app/butchery";

const Home = () => {
  //   const allButcheryData = useGetButcheryAllDataQuery();

  //   useEffect(() => {
  //     console.log(allButcheryData.data);
  //   }, [allButcheryData.data]);
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
            <span>000</span>
            <span>000</span>
          </li>
        </ul>
        <div className="brutchery_meat_full_data">
          <h1>prices</h1>
        </div>

        <h2>Qiyma</h2>
        <ul className="brutchery_meat_data_ammount">
          <li className="text">Soni:</li>
          <li className="ammount">
            <span>000</span>
            <span>000</span>
          </li>
        </ul>
        <div className="brutchery_meat_full_data">
          <h1>prices</h1>
        </div>

        <h2>Son</h2>
        <ul className="brutchery_meat_data_ammount">
          <li className="text">Soni:</li>
          <li className="ammount">
            <span>000</span>
            <span>000</span>
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
