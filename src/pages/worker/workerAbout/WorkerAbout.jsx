// import React, { memo, useEffect, useRef, useState } from "react";
// import "./WorkerAbout.css";
// import { useGetButcheryAllDataQuery } from "../../../app/butchery";
// import WorkerLoader from "../../../components/workerLoader/WorkerLoader";
// import { toast, ToastContainer, Zoom } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const WorkerAbout = () => {
//   const allButcheryData = useGetButcheryAllDataQuery();
//   const date = new Date();
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   const today = `${year}-${month}-${day}`;
//   const [todayData, setTodayData] = useState(today);
//   const [butcheryAllInfo, setButcheryAllInfo] = useState([]);
//   const [visibleInputs, setVisibleInputs] = useState([]);
//   const [newData, setNewData] = useState([]);
//   const [count, setCount] = useState(0);
//   const inputRefs = useRef([]);
//   const [result, setResult] = useState(null); // Natijani saqlash uchun state
//   const [isButtonEnabled, setIsButtonEnabled] = useState(false); // Button holati uchun state

//   useEffect(() => {
//     if (allButcheryData?.data?.innerData) {
//       setButcheryAllInfo(allButcheryData.data.innerData);
//       setVisibleInputs(
//         Array(allButcheryData.data.innerData.length).fill(false)
//       );
//     }
//   }, [allButcheryData?.data]);

//   const getData = (e) => {
//     e.preventDefault();
//     let data = new FormData(e.target);
//     let value = Object.fromEntries(data);
//     setTodayData(value?.data);
//     e.target.reset();
//   };

//   const handleClickMeat = (e) => {
//     e.preventDefault();
//     let data = new FormData(e.target);
//     let value = Object.fromEntries(data);
//     const meatDataArray = value?.addMeat?.split("\n")?.map(Number);
//     console.log(meatDataArray);
//   };

//   const handleClickMincedMeat = (e) => {
//     e.preventDefault();
//     let data = new FormData(e.target);
//     let value = Object.fromEntries(data);
//     const meatDataArray = value?.meatData?.split("\n").map(Number);
//     console.log(meatDataArray);
//   };

//   const handleInputChange = (index, value) => {
//     setNewData((prevNewData) => {
//       const updatedData = [...prevNewData];
//       updatedData[index] = Number(value);
//       console.log(updatedData);
//       return updatedData;
//     });
//   };

//   // console.log("newData:", newData);

//   const handleButtonClick = (index) => {
//     setVisibleInputs((prevVisibleInputs) =>
//       prevVisibleInputs.map((visible, i) => (i === index ? !visible : visible))
//     );
//     const updatedVisibleInputs = visibleInputs.map((visible, i) =>
//       i === index ? !visible : visible
//     );
//     setVisibleInputs(updatedVisibleInputs);
//     setIsButtonEnabled(
//       updatedVisibleInputs.some((visible) => visible) ||
//         inputRefs.current.length > 0
//     ); // Check all inputs
//   };

//   const handleInputClick = () => {
//     const visibleData = [];
//     let allInputsFilled = true; // Flag to check if all inputs are filled
//     butcheryAllInfo.forEach((item, index) => {
//       if (visibleInputs[index]) {
//         const inputElement = document.querySelector(
//           `.worker_info_add_btn:nth-child(${index + 1}) .input_container input`
//         );
//         if (inputElement && inputElement.value) {
//           visibleData.push({
//             username: item?.username,
//             data: Number(inputElement?.value),
//             id: item?._id,
//           });
//         } else {
//           allInputsFilled = false; // If any input is empty, set the flag to false
//         }
//       }
//     });

//     if (!allInputsFilled) {
//       toast.error("Iltimos, barcha inputlarni to'ldiring!", {
//         position: "top-center",
//         autoClose: 2500,
//         hideProgressBar: true,
//         transition: Zoom,
//       });
//       return null;
//     }

//     if (visibleData.length > 0) {
//       console.log(visibleData);
//       return visibleData; // Return data if there are input values
//     }
//     return null; // Return null if no input values
//   };

//   const addInput = () => {
//     setCount((prevCount) => prevCount + 1);
//     inputRefs.current.push({ name: "", price: "" });
//     setIsButtonEnabled(true); // Enable button when this function is called
//   };

//   const deleteDiv = (index) => {
//     inputRefs.current.splice(index, 1);
//     setCount((prevCount) => prevCount - 1);
//     setIsButtonEnabled(
//       visibleInputs.some((visible) => visible) || inputRefs.current.length > 0
//     ); // Check all inputs
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const values = inputRefs.current
//       .map((input, index) => ({
//         name: document.getElementById(`name_${index}`).value,
//         price: document.getElementById(`price_${index}`).value,
//       }))
//       .filter((input) => input.name && input.price); // Only include inputs with values

//     if (values.length !== inputRefs.current.length) {
//       toast.error("Iltimos, barcha inputlarni to'ldiring!", {
//         position: "top-center",
//         autoClose: 2500,
//         hideProgressBar: true,
//         transition: Zoom,
//       });
//       return null;
//     }

//     if (values.length > 0) {
//       return values; // Return values if there are input values
//     }
//     return null; // Return null if no input values
//   };

//   const handleCombinedClick = (e) => {
//     e.preventDefault();
//     const inputClickResult = handleInputClick();
//     const submitResult = handleSubmit(e);
//     let combinedResult = {};

//     if (inputClickResult !== null && inputClickResult.length > 0) {
//       combinedResult.visibleData = inputClickResult;
//     }

//     if (submitResult !== null && submitResult.length > 0) {
//       combinedResult.inputData = submitResult;
//     }

//     if (Object.keys(combinedResult).length > 0) {
//       setResult(combinedResult); // Set result state
//       console.log("Data was processed.", combinedResult);
//     } else {
//       setResult(null); // Clear result state if no data
//       console.log("No input values found.");
//     }
//     // setIsButtonEnabled(false); // Disable button after processing
//   };

//   return (
//     <div className="worker_about">
//       <ToastContainer />
//       {allButcheryData?.isLoading ? (
//         <WorkerLoader />
//       ) : (
//         <>
//           <header className="worker_about_header">
//             <h2>Bugungi hisob kitob</h2>
//             <hr />
//             <form onSubmit={getData}>
//               <input type="date" name="data" required />
//               <button>Qidirish</button>
//             </form>
//           </header>
//           <hr />
//           <div className="worker_info_container">
//             <div className="worker_info_header">
//               <h2>Bugungi malumotlar</h2>
//               <hr />
//               <span>
//                 <big>Sana:</big> <b>{todayData}</b>
//               </span>
//             </div>
//             <hr />
//             <div className="worker_data_ul_container">
//               <header className="worker_data_header">
//                 <h2>Torg'amchi</h2>
//               </header>
//               <ul className="worker_full_data_ul_container">
//                 <li>
//                   <big>Jami:</big>
//                   <span>
//                     0000 <div className="worker_text">dona</div>
//                   </span>
//                 </li>

//                 <li>
//                   <big>Opshi summa:</big>
//                   <span>
//                     0000 <div className="worker_text">so'm</div>
//                   </span>
//                 </li>

//                 <li>
//                   <big>Sana:</big>
//                   <span>{todayData}</span>
//                 </li>
//               </ul>
//             </div>
//             <hr />
//             <div className="worker_data_ul_container">
//               <header className="worker_data_header">
//                 <h2>Qiyma</h2>
//               </header>
//               <ul className="worker_full_data_ul_container">
//                 <li>
//                   <big>Jami:</big>
//                   <span>
//                     0000 <div className="worker_text">dona</div>
//                   </span>
//                 </li>

//                 <li>
//                   <big>Opshi summa:</big>
//                   <span>
//                     0000 <div className="worker_text">so'm</div>
//                   </span>
//                 </li>

//                 <li>
//                   <big>Sana:</big>
//                   <span>{todayData}</span>
//                 </li>
//               </ul>
//             </div>
//             <hr />
//             <div className="worker_data_ul_container">
//               <header className="worker_data_header">
//                 <h2>Torg'amchi ast</h2>
//               </header>
//               <ul className="worker_full_data_ul_container">
//                 <li>
//                   <big>Jami:</big>
//                   <span>
//                     0000 <div className="worker_text">dona</div>
//                   </span>
//                 </li>

//                 <li>
//                   <big>Opshi summa:</big>
//                   <span>
//                     0000 <div className="worker_text">so'm</div>
//                   </span>
//                 </li>

//                 <li>
//                   <big>Sana:</big>
//                   <span>{todayData}</span>
//                 </li>
//                 <form onSubmit={handleClickMeat}>
//                   <textarea
//                     name="addMeat"
//                     required
//                     placeholder="To'rgamchi ast"
//                   ></textarea>
//                   <button>Jo'natish</button>
//                 </form>
//               </ul>
//             </div>
//             <hr />
//             <div className="worker_data_ul_container">
//               <header className="worker_data_header">
//                 <h2>Qiyma ast</h2>
//               </header>
//               <ul className="worker_full_data_ul_container">
//                 <li>
//                   <big>Jami:</big>
//                   <span>
//                     0000 <div className="worker_text">dona</div>
//                   </span>
//                 </li>

//                 <li>
//                   <big>Opshi summa:</big>
//                   <span>
//                     0000 <div className="worker_text">so'm</div>
//                   </span>
//                 </li>

//                 <li>
//                   <big>Sana:</big>
//                   <span>{todayData}</span>
//                 </li>
//                 <form onSubmit={handleClickMincedMeat}>
//                   <textarea
//                     name="addMincedMeat"
//                     placeholder="Qiyma ast"
//                     required
//                   ></textarea>
//                   <button>Jo'natish</button>
//                 </form>
//               </ul>
//             </div>
//             <hr />
//             <div className="worker_data_ul_container">
//               <header className="worker_data_header">
//                 <h2>Rasxo'tlar</h2>
//               </header>
//               <div className="worker_info_data_container">
//                 {butcheryAllInfo?.map((item, index) => (
//                   <div key={index} className="worker_info_add_btn">
//                     <button onClick={() => handleButtonClick(index)}>
//                       {item.firstname}
//                     </button>
//                     {visibleInputs[index] && (
//                       <div className="input_container">
//                         <input
//                           type="number"
//                           name="data"
//                           placeholder="Summa"
//                           required
//                           onChange={(e) =>
//                             handleInputChange(index, e.target.value)
//                           }
//                           className="noscroll"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 ))}
//                 <button className="add_btn" onClick={() => addInput()}>
//                   Boshqa malumot qo'shish
//                 </button>
//                 <form id="inputForm" onSubmit={handleSubmit}>
//                   {inputRefs.current.map((_, index) => (
//                     <div className="form_input_container" key={index}>
//                       <input
//                         type="text"
//                         placeholder="Nomi"
//                         id={`name_${index}`}
//                         required
//                       />
//                       <input
//                         type="number"
//                         name="data"
//                         placeholder="Summa"
//                         id={`price_${index}`}
//                         required
//                       />
//                       <button type="button" onClick={() => deleteDiv(index)}>
//                         O'chirish
//                       </button>
//                     </div>
//                   ))}
//                 </form>
//               </div>
//               <button
//                 className="click_add_btn"
//                 onClick={handleCombinedClick}
//                 disabled={!isButtonEnabled} // Enable/disable based on state
//               >
//                 Jo'natish
//               </button>
//               {/* {result && (
//                 <div className="result_container">
//                   <h3>Natija:</h3>
//                   <pre>{JSON.stringify(result, null, 2)}</pre>
//                 </div>
//               )} */}
//             </div>
//             <hr />
//             <div className="total_data_container">
//               <header className="total_data_header">
//                 <h2>Malumotlar</h2>
//               </header>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default memo(WorkerAbout);

// //

import React, { memo, useEffect, useRef, useState } from "react";
import "./WorkerAbout.css";
import { useGetButcheryAllDataQuery } from "../../../app/butchery";
import WorkerLoader from "../../../components/workerLoader/WorkerLoader";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkerAbout = () => {
  const allButcheryData = useGetButcheryAllDataQuery();
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;
  const [todayData, setTodayData] = useState(today);
  const [butcheryAllInfo, setButcheryAllInfo] = useState([]);
  const [visibleInputs, setVisibleInputs] = useState([]);
  const [newData, setNewData] = useState([]);
  const [count, setCount] = useState(0);
  const inputRefs = useRef([]);
  const [result, setResult] = useState(null); // Natijani saqlash uchun state
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // Button holati uchun state

  useEffect(() => {
    if (allButcheryData?.data?.innerData) {
      setButcheryAllInfo(allButcheryData.data.innerData);
      setVisibleInputs(
        Array(allButcheryData.data.innerData.length).fill(false)
      );
    }
  }, [allButcheryData?.data]);

  const getData = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    let value = Object.fromEntries(data);
    setTodayData(value?.data);
    e.target.reset();
  };

  const handleInputChange = (index, value) => {
    setNewData((prevNewData) => {
      const updatedData = [...prevNewData];
      updatedData[index] = Number(value);
      return updatedData;
    });
    checkButtonState();
  };

  const handleButtonClick = (index) => {
    setVisibleInputs((prevVisibleInputs) =>
      prevVisibleInputs.map((visible, i) => (i === index ? !visible : visible))
    );
    const updatedVisibleInputs = visibleInputs.map((visible, i) =>
      i === index ? !visible : visible
    );
    setVisibleInputs(updatedVisibleInputs);
    setIsButtonEnabled(
      updatedVisibleInputs.some((visible) => visible) ||
        inputRefs.current.length > 0
    ); // Check all inputs
  };

  const handleInputClick = () => {
    const visibleData = [];
    let allInputsFilled = true; // Flag to check if all inputs are filled
    butcheryAllInfo.forEach((item, index) => {
      if (visibleInputs[index]) {
        const inputElement = document.querySelector(
          `.worker_info_add_btn:nth-child(${index + 1}) .input_container input`
        );
        if (inputElement && inputElement.value) {
          visibleData.push({
            username: item?.username,
            data: Number(inputElement?.value),
            id: item?._id,
          });
        } else {
          allInputsFilled = false; // If any input is empty, set the flag to false
        }
      }
    });

    if (!allInputsFilled) {
      toast.error("Iltimos, barcha inputlarni to'ldiring!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        transition: Zoom,
      });
      return null;
    }

    if (visibleData.length > 0) {
      return visibleData; // Return data if there are input values
    }
    return null; // Return null if no input values
  };

  const addInput = () => {
    setCount((prevCount) => prevCount + 1);
    inputRefs.current.push({ name: "", price: "" });
    setIsButtonEnabled(true); // Enable button when this function is called
  };

  const deleteDiv = (index) => {
    inputRefs.current.splice(index, 1);
    setCount((prevCount) => prevCount - 1);
    setIsButtonEnabled(
      visibleInputs.some((visible) => visible) || inputRefs.current.length > 0
    ); // Check all inputs
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = inputRefs.current
      .map((input, index) => ({
        name: document.getElementById(`name_${index}`).value,
        price: document.getElementById(`price_${index}`).value,
      }))
      .filter((input) => input.name && input.price); // Only include inputs with values

    if (values.length !== inputRefs.current.length) {
      toast.error("Iltimos, barcha inputlarni to'ldiring!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        transition: Zoom,
      });
      return null;
    }

    if (values.length > 0) {
      return values; // Return values if there are input values
    }
    return null; // Return null if no input values
  };

  const checkButtonState = () => {
    const meatTextArea = document.querySelector('textarea[name="addMeat"]');
    const mincedMeatTextArea = document.querySelector(
      'textarea[name="addMincedMeat"]'
    );

    setIsButtonEnabled(
      meatTextArea.value.trim() !== "" || mincedMeatTextArea.value.trim() !== ""
    );

    setIsButtonEnabled(
      meatTextArea.value.trim() === "" || mincedMeatTextArea.value.trim() === ""
    );
  };

  const handleCombinedClick = (e) => {
    e.preventDefault();

    const meatTextArea = document.querySelector('textarea[name="addMeat"]');
    const mincedMeatTextArea = document.querySelector(
      'textarea[name="addMincedMeat"]'
    );

    const meatData = meatTextArea.value
      .split("\n")
      .map(Number)
      .filter((val) => !isNaN(val) && val !== 0); // Add condition to exclude empty or zero values
    const mincedMeatData = mincedMeatTextArea.value
      .split("\n")
      .map(Number)
      .filter((val) => !isNaN(val) && val !== 0); // Add condition to exclude empty or zero values

    const inputClickResult = handleInputClick();
    const submitResult = handleSubmit(e);

    let combinedResult = {};

    if (inputClickResult !== null && inputClickResult.length > 0) {
      combinedResult.visibleData = inputClickResult;
    }

    if (submitResult !== null && submitResult.length > 0) {
      combinedResult.inputData = submitResult;
    }

    if (meatData.length > 0) {
      combinedResult.meatData = meatData;
    }

    if (mincedMeatData.length > 0) {
      combinedResult.mincedMeatData = mincedMeatData;
    }

    if (Object.keys(combinedResult).length > 0) {
      setResult(combinedResult); // Set result state
      console.log("Data was processed.", combinedResult);
    } else {
      setResult(null); // Clear result state if no data
      console.log("No input values found.");
    }
  };

  return (
    <div className="worker_about">
      <ToastContainer />
      {allButcheryData?.isLoading ? (
        <WorkerLoader />
      ) : (
        <>
          <header className="worker_about_header">
            <h2>Bugungi hisob kitob</h2>
            <hr />
            <form onSubmit={getData}>
              <input type="date" name="data" required />
              <button>Qidirish</button>
            </form>
          </header>
          <hr />
          <div className="worker_info_container">
            <div className="worker_info_header">
              <h2>Bugungi malumotlar</h2>
              <hr />
              <span>
                <big>Sana:</big> <b>{todayData}</b>
              </span>
            </div>
            <hr />
            <div className="worker_data_ul_container">
              <header className="worker_data_header">
                <h2>Torg'amchi</h2>
              </header>
              <ul className="worker_full_data_ul_container">
                <li>
                  <big>Jami:</big>
                  <span>
                    0000 <div className="worker_text">dona</div>
                  </span>
                </li>

                <li>
                  <big>Opshi summa:</big>
                  <span>
                    0000 <div className="worker_text">so'm</div>
                  </span>
                </li>

                <li>
                  <big>Sana:</big>
                  <span>{todayData}</span>
                </li>
              </ul>
            </div>
            <hr />
            <div className="worker_data_ul_container">
              <header className="worker_data_header">
                <h2>Qiyma</h2>
              </header>
              <ul className="worker_full_data_ul_container">
                <li>
                  <big>Jami:</big>
                  <span>
                    0000 <div className="worker_text">dona</div>
                  </span>
                </li>

                <li>
                  <big>Opshi summa:</big>
                  <span>
                    0000 <div className="worker_text">so'm</div>
                  </span>
                </li>

                <li>
                  <big>Sana:</big>
                  <span>{todayData}</span>
                </li>
              </ul>
            </div>
            <hr />
            <div className="worker_data_ul_container">
              <header className="worker_data_header">
                <h2>Torg'amchi ast</h2>
              </header>
              <ul className="worker_full_data_ul_container">
                <li>
                  <big>Jami:</big>
                  <span>
                    0000 <div className="worker_text">dona</div>
                  </span>
                </li>

                <li>
                  <big>Opshi summa:</big>
                  <span>
                    0000 <div className="worker_text">so'm</div>
                  </span>
                </li>

                <li>
                  <big>Sana:</big>
                  <span>{todayData}</span>
                </li>
                <textarea
                  name="addMeat"
                  required
                  placeholder="To'rgamchi ast"
                  onChange={checkButtonState}
                ></textarea>
              </ul>
            </div>
            <hr />
            <div className="worker_data_ul_container">
              <header className="worker_data_header">
                <h2>Qiyma ast</h2>
              </header>
              <ul className="worker_full_data_ul_container">
                <li>
                  <big>Jami:</big>
                  <span>
                    0000 <div className="worker_text">dona</div>
                  </span>
                </li>

                <li>
                  <big>Opshi summa:</big>
                  <span>
                    0000 <div className="worker_text">so'm</div>
                  </span>
                </li>

                <li>
                  <big>Sana:</big>
                  <span>{todayData}</span>
                </li>
                <textarea
                  name="addMincedMeat"
                  placeholder="Qiyma ast"
                  required
                  onChange={checkButtonState}
                ></textarea>
              </ul>
            </div>
            <hr />
            <div className="worker_data_ul_container">
              <header className="worker_data_header">
                <h2>Rasxo'tlar</h2>
              </header>
              <div className="worker_info_data_container">
                {butcheryAllInfo?.map((item, index) => (
                  <div key={index} className="worker_info_add_btn">
                    <button onClick={() => handleButtonClick(index)}>
                      {item.firstname}
                    </button>
                    {visibleInputs[index] && (
                      <div className="input_container">
                        <input
                          type="number"
                          name="data"
                          placeholder="Summa"
                          required
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          className="noscroll"
                        />
                      </div>
                    )}
                  </div>
                ))}
                <button className="add_btn" onClick={addInput}>
                  Boshqa malumot qo'shish
                </button>
                <form id="inputForm">
                  {inputRefs.current.map((_, index) => (
                    <div className="form_input_container" key={index}>
                      <input
                        type="text"
                        placeholder="Nomi"
                        id={`name_${index}`}
                        required
                        onChange={checkButtonState}
                      />
                      <input
                        type="number"
                        name="data"
                        placeholder="Summa"
                        id={`price_${index}`}
                        required
                        onChange={checkButtonState}
                      />
                      <button type="button" onClick={() => deleteDiv(index)}>
                        O'chirish
                      </button>
                    </div>
                  ))}
                </form>
              </div>
              <button
                className="click_add_btn"
                onClick={handleCombinedClick}
                disabled={!isButtonEnabled} // Enable/disable based on state
              >
                Jo'natish
              </button>
              {/* {result && (
                <div className="result_container">
                  <h3>Natija:</h3>
                  <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
              )} */}
            </div>
            <hr />
            <div className="total_data_container">
              <header className="total_data_header">
                <h2>Malumotlar</h2>
              </header>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(WorkerAbout);
