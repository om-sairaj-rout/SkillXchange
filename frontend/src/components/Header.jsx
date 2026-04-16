import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../API/authAPI";
import { logout } from "../store/slice/checkAuth";
import { BsThreeDotsVertical } from "react-icons/bs";
import DropDownBox from "./DropDownBox";
import SideBar from "./SideBar";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.checkAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const lightBgColor = "bg-yellow-50/90";
  const primaryOrangeBg = "bg-orange-500 hover:bg-orange-600";

  const logoutHandler = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(logout());
      navigate("/");
    }
  };

  const loginClickHandler = () => {
    navigate("/login");
  };

  const signUpClickHandler = () => {
    navigate("/register");
  };

  // 🔥 initials function (same)
  const getInitials = (name = "") =>
    name
      ?.split(" ")
      ?.filter(Boolean)
      ?.map((n) => n[0])
      ?.join("")
      ?.toUpperCase()
      ?.slice(0, 2) || "U";

  // 🔥 ONLY NEW: avatar colors
  const AVATAR_COLORS = [
    { bg: "bg-blue-100", text: "text-blue-800" },
    { bg: "bg-green-100", text: "text-green-800" },
    { bg: "bg-pink-100", text: "text-pink-800" },
    { bg: "bg-purple-100", text: "text-purple-800" },
    { bg: "bg-yellow-100", text: "text-yellow-800" },
  ];

  const getAvatarColor = (name = "") => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
  };

  const color = getAvatarColor(user?.username);

  return (
    <header
      className={`flex justify-between items-center sticky top-0 px-8 py-4 border-b border-gray-200 ${lightBgColor} shadow-sm z-10`}
    >
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          skill<span className="text-orange-500">X</span>change
        </Link>
      </div>

      {!isAuthenticated ? (
        <div className="flex space-x-3">
          <button
            onClick={loginClickHandler}
            className="px-8 py-2 text-sm font-semibold rounded-2xl bg-white shadow-xl transition duration-150"
          >
            Login
          </button>

          <button
            onClick={signUpClickHandler}
            className={`px-8 py-2 text-sm font-semibold text-white rounded-2xl shadow-xl transition duration-150 ${primaryOrangeBg}`}
          >
            Sign Up
          </button>
        </div>
      ) : (
        <>
          <nav className="hidden md:flex items-center space-x-4 text-gray-700 font-medium text-sm">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `transition-colors hover:text-orange-500 ${
                  isActive ? "text-orange-500" : "text-gray-700"
                }`
              }
            >
              Profile
            </NavLink>

            <NavLink
              to="/skillConnect"
              className={({ isActive }) =>
                `transition-colors hover:text-orange-500 ${
                  isActive ? "text-orange-500" : "text-gray-700"
                }`
              }
            >
              Explore Skills
            </NavLink>

            <NavLink
              to="/connections"
              className={({ isActive }) =>
                `transition-colors hover:text-orange-500 ${
                  isActive ? "text-orange-500" : "text-gray-700"
                }`
              }
            >
              Connections
            </NavLink>

            <NavLink
              to="/session"
              className={({ isActive }) =>
                `transition-colors hover:text-orange-500 ${
                  isActive ? "text-orange-500" : "text-gray-700"
                }`
              }
            >
              Sessions
            </NavLink>

            <div className="flex items-center space-x-1 text-gray-700 font-medium ml-4">
              <span className="text-yellow-500 text-2xl">💰</span>
              <span className="text-xl">{user?.credits}</span>
            </div>

            {/* 🔥 ONLY CHANGE HERE */}
            <Link
              to="/edit"
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium overflow-hidden border border-gray-300 ml-3 ${color.bg} ${color.text}`}
            >
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user?.username}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}

              <div
                className={`w-full h-full items-center justify-center ${
                  user?.profilePic ? "hidden" : "flex"
                }`}
              >
                {getInitials(user?.username)}
              </div>
            </Link>

            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="hover:cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <BsThreeDotsVertical className="w-5 h-5 text-gray-600" />
            </button>
          </nav>

          <button
            onClick={() => setIsSideBarOpen(true)}
            className="text-2xl md:hidden cursor-pointer"
          >
            <RxHamburgerMenu />
          </button>
        </>
      )}

      {showDropdown && (
        <DropDownBox
          onEditProfile={() => {
            setShowDropdown(false);
            navigate("/edit");
          }}
          onLogout={() => {
            setShowDropdown(false);
            logoutHandler();
          }}
        />
      )}

      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        onLogout={logoutHandler}
      />
    </header>
  );
};

export default Header;