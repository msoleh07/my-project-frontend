import React, { useEffect, useState } from "react";
import "./PriceData.css";
import { FaEdit } from "react-icons/fa";
import { MdDownloadDone } from "react-icons/md";
import {
  useGetGoshtXonaPricesQuery,
  useGetShashlikXonaPricesQuery,
  useUpdateGoshtXonaPricesMutation,
  useUpdateShashlikXonaPricesMutation,
} from "../../app/prices";
import OwnLoader from "../ownLoader/OwnLoader";
import BtnLoader from "../btnLoader/BtnLoader";
import { toast, ToastContainer, Zoom } from "react-toastify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PriceData = () => {
  const shashlikPrice = useGetShashlikXonaPricesQuery();
  const goshtPrice = useGetGoshtXonaPricesQuery();
  const [updateShashlikXonaPrices] = useUpdateShashlikXonaPricesMutation();
  const [updateGoshtXonaPrices] = useUpdateGoshtXonaPricesMutation();

  const [shashlikData, setShashlikData] = useState([]);
  const [goshtData, setGoshtData] = useState([]);
  const [openUpdataForm, setOpenUpdataForm] = useState(false);
  const [openUpdataFormTwo, setOpenUpdataFormTwo] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loaderTwo, setLoaderTwo] = useState(false);
  const [shashlikPrices, setShashlikPrices] = useState({
    mincedMeat: "",
    meat: "",
  });

  const [goshtxonaPrices, setGoshtxonaPrices] = useState({
    mincedMeat: "",
    meat: "",
    meatKG: "",
  });

  useEffect(() => {
    if (shashlikPrice?.data && goshtPrice?.data) {
      setShashlikData(shashlikPrice?.data?.innerData || []);
      setGoshtData(goshtPrice?.data?.innerData || []);
    }
  }, [shashlikPrice?.data, goshtPrice?.data]);

  const clickUpdateShashlikPrice = async (id) => {
    setLoader(true);
    try {
      const res = await updateShashlikXonaPrices({ id });
      if (res?.data?.status === "success") {
        setShashlikPrices({
          ...shashlikPrice,
          meat: res?.data?.innerData?.meat,
          mincedMeat: res?.data?.innerData?.mincedMeat,
        });
        setOpenUpdataForm(!openUpdataForm);
        setLoader(false);
        return;
      } else if (res?.error?.data?.error === "Internal server error") {
        toast.error(`Bunday malumot mavjud emas`, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          transition: Zoom,
        });

        setLoader(false);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clickUpdateAddShashlikPrices = async (id) => {
    setLoader(true);
    setShashlikPrices({
      ...shashlikPrices,
      meat: +shashlikPrices?.meat,
      mincedMeat: +shashlikPrices?.mincedMeat,
    });

    try {
      const res = await updateShashlikXonaPrices({ id, shashlikPrices });
      if (res?.data?.status === "success") {
        toast.success(`Malumot yangilandi`, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          transition: Zoom,
        });
        setOpenUpdataForm(!openUpdataForm);
        setLoader(false);
        return;
      } else {
        toast.warn(`Malumot yangilanmadi`, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          transition: Zoom,
        });

        setLoader(false);
        setOpenUpdataForm(!openUpdataForm);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clickUpdateGoshtxonaPrice = async (id) => {
    setLoaderTwo(true);
    try {
      const res = await updateGoshtXonaPrices({ id });
      if (res?.data?.status === "success") {
        setGoshtxonaPrices({
          ...goshtxonaPrices,
          meat: res?.data?.innerData?.meat,
          mincedMeat: res?.data?.innerData?.mincedMeat,
          meatKG: res?.data?.innerData?.meatKG,
        });
        setOpenUpdataFormTwo(!openUpdataFormTwo);
        setLoaderTwo(false);
        return;
      } else if (res?.error?.data?.error === "Internal server error") {
        toast.error(`Bunday malumot mavjud emas`, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          transition: Zoom,
        });

        setLoaderTwo(false);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clickUpdateAddGoshtxonaPrices = async (id) => {
    setLoaderTwo(true);
    let data = {
      mincedMeat: +goshtxonaPrices.mincedMeat,
      meat: +goshtxonaPrices.meat,
      meatKG: +goshtxonaPrices.meatKG,
    };

    try {
      const res = await updateGoshtXonaPrices({ id, data });
      if (res?.data?.status === "success") {
        toast.success(`Malumot yangilandi`, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          transition: Zoom,
        });
        setOpenUpdataFormTwo(!openUpdataFormTwo);
        setLoaderTwo(false);
        return;
      } else {
        toast.warn(`Malumot yangilanmadi`, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          transition: Zoom,
        });
        setOpenUpdataFormTwo(!openUpdataFormTwo);
        setLoaderTwo(false);
        return;
      }
    } catch (err) {
      console.log(err);
      toast.error(`Xatolik sodir bo'ldi. Iltimos, qaytadan urinib ko'ring.`, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        transition: Zoom,
      });
      setOpenUpdataFormTwo(false);
      setLoaderTwo(false);
    }
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("uz-UZ").format(number);
  };

  return (
    <div className="price_data_page">
      <ToastContainer />
      {shashlikPrice?.isLoading ? (
        <OwnLoader />
      ) : (
        <ul>
          <div className="ul_header">
            <h1>Shashlik shutuk narxi</h1>
          </div>

          <div className="price_container">
            <div className="li_price_cart">
              {openUpdataForm ? (
                <div className="input_preca_caontainer">
                  <div className="input_box">
                    <label>Yangi togmchi narx</label>
                    <input
                      type="number"
                      value={shashlikPrices?.meat}
                      onChange={
                        (e) =>
                          setShashlikPrices({
                            ...shashlikPrices,
                            meat: e.target.value,
                          }) // Değişiklik burada yapıldı
                      }
                    />
                  </div>
                  <div className="input_box">
                    <label>Yangi qiyma narx</label>
                    <input
                      type="number"
                      value={shashlikPrices?.mincedMeat}
                      onChange={
                        (e) =>
                          setShashlikPrices({
                            ...shashlikPrices,
                            mincedMeat: e.target.value,
                          }) // Değişiklik burada yapıldı
                      }
                    />
                  </div>
                </div>
              ) : (
                <>
                  <li>
                    <p>To'rgamchi narxi</p>
                    {shashlikData?.map((item, index) => (
                      <div key={index}>
                        {shashlikData?.length > 0 ? (
                          <b>{formatNumber(item?.meat)} so'm</b>
                        ) : (
                          <>
                            <Skeleton />
                            <Skeleton />
                          </>
                        )}
                      </div>
                    ))}
                  </li>
                  <li>
                    <p>Qiyma narxi</p>
                    {shashlikData?.map((item, index) => (
                      <div key={index}>
                        {shashlikData?.length > 0 ? (
                          <b>{formatNumber(item?.mincedMeat)} so'm</b>
                        ) : (
                          <>
                            <Skeleton />
                            <Skeleton />
                          </>
                        )}
                      </div>
                    ))}
                  </li>
                </>
              )}
            </div>
            <span>
              <label>{openUpdataForm ? "Qo'shish" : "Tahrirlash"}</label>
              <button
                disabled={loader}
                onClick={() =>
                  shashlikData?.map((id) =>
                    openUpdataForm
                      ? clickUpdateAddShashlikPrices(id?._id)
                      : clickUpdateShashlikPrice(id?._id)
                  )
                }
              >
                {loader ? (
                  <BtnLoader />
                ) : openUpdataForm ? (
                  <MdDownloadDone />
                ) : (
                  <FaEdit />
                )}
              </button>
            </span>
          </div>

          <div className="ul_header ul_header_two">
            <h1>Shashlik va gosht shutuk narxi</h1>
          </div>
          <div className="price_container">
            <div className="li_price_cart">
              {openUpdataFormTwo ? (
                <div className="input_preca_caontainer">
                  <div className="input_box">
                    <label>Yangi togmchi narx</label>
                    <input
                      type="number"
                      value={goshtxonaPrices?.meat}
                      onChange={(e) =>
                        setGoshtxonaPrices({
                          ...goshtxonaPrices,
                          meat: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="input_box">
                    <label>Yangi qiyma narx</label>
                    <input
                      type="number"
                      value={goshtxonaPrices?.mincedMeat}
                      onChange={(e) =>
                        setGoshtxonaPrices({
                          ...goshtxonaPrices,
                          mincedMeat: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="input_box">
                    <label>Yangi goshtKG narx</label>
                    <input
                      type="number"
                      value={goshtxonaPrices?.meatKG}
                      onChange={(e) =>
                        setGoshtxonaPrices({
                          ...goshtxonaPrices,
                          meatKG: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              ) : (
                <>
                  <li>
                    <p>To'rgamchi narxi</p>
                    {goshtData?.map((item, index) => (
                      <div key={index}>
                        {goshtData?.length > 0 ? (
                          <b>{formatNumber(item?.meat)} so'm</b>
                        ) : (
                          <>
                            <Skeleton />
                            <Skeleton />
                          </>
                        )}
                      </div>
                    ))}
                  </li>
                  <li>
                    <p>Qiyma narxi</p>
                    {goshtData?.map((item, index) => (
                      <div key={index}>
                        {goshtData?.length > 0 ? (
                          <b>{formatNumber(item?.mincedMeat)} so'm</b>
                        ) : (
                          <>
                            <Skeleton />
                            <Skeleton />
                          </>
                        )}
                      </div>
                    ))}
                  </li>
                  <li>
                    <p>Gosht Kg</p>
                    {goshtData?.map((item, index) => (
                      <div key={index}>
                        {goshtData?.length > 0 ? (
                          <b>{formatNumber(item?.meatKG)} so'm</b>
                        ) : (
                          <>
                            <Skeleton />
                            <Skeleton />
                          </>
                        )}
                      </div>
                    ))}
                  </li>
                </>
              )}
            </div>
            <span>
              <label>{openUpdataFormTwo ? "Qo'shish" : "Tahrirlash"}</label>
              <button
                disabled={loaderTwo}
                onClick={() =>
                  goshtData?.map((id) =>
                    openUpdataFormTwo
                      ? clickUpdateAddGoshtxonaPrices(id?._id)
                      : clickUpdateGoshtxonaPrice(id?._id)
                  )
                }
              >
                {loaderTwo ? (
                  <BtnLoader />
                ) : openUpdataFormTwo ? (
                  <MdDownloadDone />
                ) : (
                  <FaEdit />
                )}
              </button>
            </span>
          </div>
        </ul>
      )}
    </div>
  );
};

export default PriceData;
