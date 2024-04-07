import React, { memo, useEffect, useState } from "react";
import "./AddData.css";
import { useGetAllWorkerQuery, useAddDataMutation } from "../../../app/worker";
import Loader from "../../../components/loader/Loader";
import { Zoom, toast, ToastContainer } from "react-toastify";
import BtnLoader from "../../../components/btnLoader/BtnLoader";
import { useAddMeatDataMutation } from "../../../app/butchery";

const AddData = () => {
  const workerData = useGetAllWorkerQuery();
  const [addData] = useAddDataMutation();
  const [addMeatData] = useAddMeatDataMutation();
  const [addDataItem, setAddDataItem] = useState("");
  const [addName, setAddName] = useState("");
  const [openName, setOpenName] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [btnsData, setBtnsData] = useState(null);
  const [loader, setLoader] = useState(false);

  let { username } = JSON.parse(sessionStorage.getItem("adminInfo"));

  useEffect(() => {
    setBtnsData(workerData?.data?.innerData || null);
  }, [workerData?.data]);

  const btnsNameData = [
    { title: "To'rg'amchi", name: "addMeat" },
    { title: "Qiyma", name: "addMincedMeat" },
  ];

  const addTitle = ({ title }) => {
    setAddDataItem(title);
    setOpenName(true);

    if (addDataItem === "meatKG") {
      setOpenForm(false);
    }
  };

  const addNames = ({ title, name }) => {
    setAddName(title);
    setFormName(name);
    setOpenForm(true);
  };

  const addOpenMeat = ({ name }) => {
    setFormName(name);
    setOpenForm(true);
    setAddDataItem(name);

    if (name === "meatKG") {
      setAddName("");
      return setOpenName(false);
    }
  };

  const addFormData = async (e) => {
    e.preventDefault();
    let addNamber = new FormData(e.target);
    let value = Object.fromEntries(addNamber);

    // Qiymatlarni number formatga o'girib berish
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        value[key] = parseFloat(value[key]);
      }
    }

    setLoader(true);
    const { meatKG } = value;

    if (meatKG) {
      try {
        let res = await addMeatData({ value, username });
        if (res?.data?.status === "successfully") {
          toast.success(`Malumot muofaqqiyatli qo'shildi`, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            transition: Zoom,
          });
          e.target.reset();
          setOpenForm(false);
          setLoader(false);
          setAddDataItem("");
          return;
        } else if (res?.error?.data?.status === "Warning") {
          toast.warning(`Bunday malumot oldin yaratilgan`, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            transition: Zoom,
          });
          setLoader(false);
          e.target.reset();
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }

    try {
      let res = await addData({
        value,
        username: addDataItem,
        addMan: username,
      });
      if (res?.data?.status === "successfully") {
        toast.success(`Malumot muofaqqiyatli qo'shildi`, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          transition: Zoom,
        });
        e.target.reset();
        setOpenName(false);
        setOpenForm(false);
        setLoader(false);
        setAddDataItem("");
        setAddName("");
        return;
      } else if (res?.error?.data?.status === "Warning") {
        toast.warning(`Bunday malumot oldin yaratilgan`, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          transition: Zoom,
        });
        setLoader(false);
        e.target.reset();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add_data_page">
      <ToastContainer />
      {workerData.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="add_data_header">
            <div className="add_data_btns">
              {btnsData?.map((i, inx) => (
                <button
                  onClick={() => addTitle({ title: i?.username })}
                  className={addDataItem === i?.username ? "active" : ""}
                  key={inx}
                >
                  {i?.firstname}
                </button>
              ))}
              <button
                onClick={() => addOpenMeat({ name: "meatKG" })}
                className={addDataItem === "meatKG" ? "active" : ""}
              >
                Go'sht
              </button>
            </div>
            {openName && (
              <div className="add_data_name_btn">
                {btnsNameData?.map((i, inx) => (
                  <button
                    onClick={() => addNames({ title: i?.title, name: i?.name })}
                    className={addName === i?.title ? "active" : ""}
                    key={inx}
                  >
                    {i?.title}
                  </button>
                ))}
              </div>
            )}
          </div>
          {openForm && (
            <form onSubmit={addFormData} className="add_data_form">
              <div className="add_data_form_input">
                <label>Miqdori</label>
                <input required type="number" name={formName} />
              </div>
              <div className="form_button">
                <button disabled={loader}>
                  {loader ? <BtnLoader /> : "Qo'shish"}
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default memo(AddData);
