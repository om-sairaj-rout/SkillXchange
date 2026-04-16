import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { FaPlus, FaMinus, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { NavLink } from "react-router"; // Ensure this import is correct for your router version

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, onLogout }) => {

  return (
    // CHANGED: fixed position, right-0, z-50, and overflow-y-auto for scrolling
    <div
      className={`
                fixed top-0 right-0 h-screen w-[50%]
                bg-yellow-50/90  
                z-50 shadow-2xl 
                overflow-y-auto transition-transform duration-300 ease-in-out
                ${isSideBarOpen ? "translate-x-0" : "translate-x-full"} 
            `}
    >
      <IoMdCloseCircle
        onClick={() => setIsSideBarOpen(false)}
        className="absolute right-5 top-5 text-3xl text-orange-500 cursor-pointer hover:text-orange-700"
      />

      <ul className="mt-20 mb-5 text-lg">
        {" "}
        {/* Increased top margin for scroll clearance */}
        <li className="p-3 border-b border-white/10 hover:bg-white/10">
          <NavLink to="/profile" onClick={() => setIsSideBarOpen(false)}>
            Profile
          </NavLink>
        </li>
        <li className="p-3 border-b border-white/10 hover:bg-white/10">
          <NavLink to="/skillConnect" onClick={() => setIsSideBarOpen(false)}>
            Explore Skills
          </NavLink>
        </li>
        <li className="p-3 border-b border-white/10 hover:bg-white/10">
          <NavLink to="/connections" onClick={() => setIsSideBarOpen(false)}>
            Connections
          </NavLink>
        </li>
        <li className="p-3 border-b border-white/10 hover:bg-white/10">
          <NavLink to="/session" onClick={() => setIsSideBarOpen(false)}>
            Sessions
          </NavLink>
        </li>
        <li className="p-3 border-b border-white/10 hover:bg-white/10">
          <NavLink to="/edit" onClick={() => setIsSideBarOpen(false)}>
            Edit Profile
          </NavLink>
        </li>
        <li
          onClick={() => {
              onLogout();
              setIsSideBarOpen(false);
          }}
          className="p-3 border-b border-white/10 hover:bg-white/10 text-red-600 cursor-pointer"
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
