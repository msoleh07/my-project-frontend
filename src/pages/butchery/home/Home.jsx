import React, { memo, useEffect, useState } from "react";
import "./Home.css";
import { useGetButcheryAllDataQuery } from "../../../app/butchery";
import Loader from "../../../components/loader/Loader";

const Home = () => {
  const allButcheryData = useGetButcheryAllDataQuery();
  const { username } = JSON.parse(sessionStorage.getItem("adminInfo"));
  const [data, setData] = useState({
    addMeatKg: [null],
    addMeat: [null],
    addMincedMeat: [null],
  });

  const [amoutTolatPrices, setAmoutTolatPrices] = useState({
    addMeatKg: [null],
    addMeat: [null],
    addMincedMeat: [null],
  });
  useEffect(() => {
    let findUser = allButcheryData?.data?.innerData.find(
      (f) => f.username === username
    );

    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const today = `${year}-${month}-${day}`;

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
    //   addMeatKg,
    //   "addMeat",
    //   addMeat,
    //   "addMincedMeat:",
    //   addMincedMeat
    // );

    setData({
      addMeat: addMeat?.map((q) => q?.meat?.quantity),
      addMeatKg: addMeatKg?.map((q) => q?.meatKg?.quantity),
      addMincedMeat: addMincedMeat?.map((q) => q?.mincedMeat?.quantity),
    });

    setAmoutTolatPrices({
      addMeat: addMeat?.map((m) => m?.money?.totalMoney),
      addMincedMeat: addMincedMeat?.map((m) => m?.money?.totalMoney),
      addMeatKg: addMeatKg?.map((m) => m?.money?.totalMoney),
    });
  }, [allButcheryData?.data]);

  let meatSubtotal = amoutTolatPrices?.addMeat?.reduce((a, b) => a + b, 0);
  let mincedMeatSubtotal = amoutTolatPrices?.addMincedMeat?.reduce(
    (a, b) => a + b,
    0
  );
  let meatKgSubtotal = amoutTolatPrices?.addMeatKg?.reduce((a, b) => a + b, 0);

  // console.log(
  //   "meatSubtotal",
  //   meatSubtotal,
  //   "mincedMeatSubtotal",
  //   mincedMeatSubtotal,
  //   "meatKgSubtotal",
  //   meatKgSubtotal
  // );

  const formatNumber = (number) => {
    return new Intl.NumberFormat("uz-UZ").format(number);
  };

  return (
    <div className="home_brutchery">
      {allButcheryData.isLoading ? (
        <Loader />
      ) : (
        <>
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
              {amoutTolatPrices?.addMeat?.length > 0 ? (
                <>
                  <div className="prices_container">
                    <div className="text_price"> Jami :</div>
                    <div className="ammount_price">
                      {amoutTolatPrices?.addMeat?.length > 0 ? (
                        <h2>
                          {data?.addMeat?.reduce((a, b) => a + b, 0)}
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
              {amoutTolatPrices?.addMincedMeat?.length > 0 ? (
                <>
                  <div className="prices_container">
                    <div className="text_price"> Jami :</div>
                    <div className="ammount_price">
                      {amoutTolatPrices?.addMincedMeat?.length > 0 ? (
                        <h2>
                          {data?.addMincedMeat?.reduce((a, b) => a + b, 0)}
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
              {amoutTolatPrices?.addMeatKg?.length > 0 ? (
                <>
                  <div className="prices_container">
                    <div className="text_price"> Jami kg:</div>
                    <div className="ammount_price">
                      {amoutTolatPrices?.addMeatKg?.length > 0 ? (
                        <h2>
                          {data?.addMeatKg?.reduce((a, b) => a + b, 0)}
                          <span>kg</span>
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
                      {amoutTolatPrices?.addMeatKg?.length > 0 ? (
                        <h2>
                          {formatNumber(meatKgSubtotal)}
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
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Home);
