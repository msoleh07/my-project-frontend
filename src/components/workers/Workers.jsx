import React, { useEffect, useState } from "react";
import "./Workers.css";
import { MdOutlineUpdate } from "react-icons/md";
import {
  useGetButcheryAllDataQuery,
  useButcheryUserDeleteOneMutation,
} from "../../app/butchery";
import {
  useGetAllWorkerQuery,
  useWorkerUserDeleteOneMutation,
} from "../../app/worker";
import { IoTrashOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import OwnLoader from "../ownLoader/OwnLoader";
import { toast, ToastContainer, Zoom } from "react-toastify";
const Workers = () => {
  const getButcheryAllData = useGetButcheryAllDataQuery();
  const getAllWorker = useGetAllWorkerQuery();
  const [workerUserDeleteOne] = useWorkerUserDeleteOneMutation();
  const [butcheryUserDeleteOne] = useButcheryUserDeleteOneMutation();
  const [workerData, setWorkerData] = useState([]);
  const [butcheryData, setButcheryData] = useState([]);

  useEffect(() => {
    setButcheryData(getButcheryAllData?.data?.innerData || []);
  }, [getButcheryAllData?.data]);

  useEffect(() => {
    setWorkerData(getAllWorker?.data?.innerData || []);
  }, [getAllWorker?.data]);

  async function workerUserDelete(id) {
    try {
      let clientConfirm = window.confirm("Malumotni o'chirishga rozimisiz");
      if (clientConfirm) {
        const res = await workerUserDeleteOne({ id });
        if (res?.data?.msg === "worker user is deleted") {
          setWorkerData((prevData) =>
            prevData.filter((item) => item._id !== id)
          ); // 4. Bazadan o'chirilgan elementni o'chirish
          toast.success("malumot o'chirildi", {
            transition: Zoom,
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: true,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function butcheryUserDelete(id) {
    try {
      let clientConfirm = window.confirm("Malumotni o'chirishga rozimisiz");
      if (clientConfirm) {
        const res = await butcheryUserDeleteOne({ id });
        if (res?.data?.msg === "butchery user is deleted") {
          setButcheryData((prevData) =>
            prevData.filter((item) => item._id !== id)
          ); // 4. Bazadan o'chirilgan elementni o'chirish
          toast.success("Malumot o'chirildi", {
            transition: Zoom,
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: true,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="worcers_page">
      <ToastContainer />
      {getButcheryAllData?.isLoading ? (
        <OwnLoader />
      ) : (
        <>
          <div className="worker_header">
            <h1>Go'shtxona ishilari</h1>
          </div>

          <ul className="worcers_container">
            {butcheryData?.length > 0 ? (
              butcheryData?.map((item, inx) => (
                <li key={inx}>
                  <div className="main_name_container">
                    <span>Ism</span>
                    <span>Familiya</span>
                    <span>F nomi</span>
                    <span>
                      <MdOutlineUpdate />
                    </span>
                  </div>
                  <div className="worcer_username_container">
                    <span>{item?.firstname}</span>
                    <span>{item?.lastname}</span>
                    <span>{item?.username}</span>
                    <span className="icons">
                      <IoTrashOutline
                        onClick={() => butcheryUserDelete(item?._id)}
                      />
                      <CiEdit />
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <span>Ishchilar hali qoshilmagan</span>
            )}
          </ul>

          <div className="worker_header">
            <h1>Shalikxona ishilari</h1>
          </div>

          <ul className="worcers_container">
            {workerData?.length > 0 ? (
              workerData?.map((item, inx) => (
                <li key={inx}>
                  <div className="main_name_container">
                    <span>Ism</span>
                    <span>Familiya</span>
                    <span>F nomi</span>
                    <span>
                      <MdOutlineUpdate />
                    </span>
                  </div>
                  <div className="worcer_username_container">
                    <span>{item?.firstname}</span>
                    <span>{item?.lastname}</span>
                    <span>{item?.username}</span>
                    <span className="icons">
                      <IoTrashOutline
                        onClick={() => workerUserDelete(item?._id)}
                      />
                      <CiEdit />
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <span>Ishchilar hali qoshilmagan</span>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Workers;
