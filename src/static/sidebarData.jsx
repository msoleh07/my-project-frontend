import { FaHome, FaDatabase, FaCashRegister } from "react-icons/fa";
import { IoMdSettings, IoMdAdd, IoIosLogOut } from "react-icons/io";

export const sidabarData = {
  owner: [
    {
      title: "Bosh sahiyfa",
      icon: <FaHome />,
      link: "/",
    },
    {
      title: "Malumotlar",
      icon: <FaDatabase />,
      link: "/own/database",
    },
    {
      title: "Ishchi qo'shish",
      icon: <FaCashRegister />,
      link: "/own/addAdmin",
    },
    {
      title: "Chiqish",
      icon: <IoIosLogOut />,
      link: "/logout",
    },
  ],
  worker: [
    {
      title: "Bosh sahiyfa",
      icon: <FaHome />,
      link: "/",
    },
    {
      title: "Malumotlar",
      icon: <FaDatabase />,
      link: "/worker/about",
    },
    {
      title: "Chiqish",
      icon: <IoIosLogOut />,
      link: "/logout",
    },
  ],
  butchery: [
    {
      title: "Bosh sahiyfa",
      icon: <FaHome />,
      link: "/",
    },
    {
      title: "Malumotlar",
      icon: <FaDatabase />,
      link: "/butchery/database",
    },
    {
      title: "Malumot qo'shish",
      icon: <IoMdAdd />,
      link: "/butchery/addData",
    },
    {
      title: "Chiqish",
      icon: <IoIosLogOut />,
      link: "/logout",
    },
  ],
};
