import React from "react";
import {
  FaBell,
  FaCalendar,
  FaCog,
  FaHome,
  FaQuestionCircle,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className="w-72 bg-white p-4 px-16 shadow-lg h-screen  font-poppins">
      <h2 className="text-5xl font-bold text-orange-500">MOVO</h2>
      <nav className="mt-8">
        <h3 className="text-gray-700 text-xl">Main Menu</h3>
        <ul className="mt-4 space-y-6 ml-5 font-bold ">
          <li className="flex items-center text-gray-700/90 ">
            <RiDashboardFill className="mr-2" /> Dashboard
          </li>
          <li className="flex items-center text-gray-700/90">
            <FaCalendar className="mr-2" /> Calendar
          </li>
          <li className="flex items-center text-gray-700/90">
            <FaBell className="mr-2" /> Notifications
          </li>
          <li className="flex items-center text-gray-700/90">
            <FaHome className="mr-2" /> Home
          </li>
        </ul>
        <h3 className="text-gray-700  mt-24 text-xl ">Other Menu</h3>
        <ul className="mt-4 space-y-6 font-bold ml-5 ">
          <li className="flex items-center text-gray-700">
            <FaUser className="mr-2" /> Profile
          </li>
          <li className="flex items-center text-gray-700">
            <FaCog className="mr-2" /> Settings
          </li>
          <li className="flex items-center text-gray-700">
            <FaSignOutAlt className="mr-2" /> Log Out
          </li>
          <li className="flex items-center text-gray-700">
            <FaQuestionCircle className="mr-2" /> Help and Center
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

// import React from 'react'
// import { FaHome, FaCalendar, FaBell, FaUser, FaCog, FaSignOutAlt, FaQuestionCircle } from 'react-icons/fa';

// const Sidebar = () => {
//   return (
//     <div className=' w-64 bg-slate-300 p-4'>
//         <h1>MOVO</h1>
//         <nav>
//             <h1>Main Menu</h1>
//             <ul></ul>
//         </nav>
//     </div>
//   )
// }

// export default Sidebar
