import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBell, FaComments, FaUsers } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import Logo from '../../assets/images/logo.svg'
import profile from '../../assets/images/f2.png'

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="_header_nav _header_nav_shadow w-full bg-white fixed top-0 left-0 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-12 h-[70px]">

        {/* Left: Logo */}
        <div className="_logo_wrap flex items-center">
          <img
            src={Logo} // ← add logo later
            alt="Logo"
            className="h-7 w-auto"
          />
        </div>

        {/* Middle: Search Bar */}
        <div className="_header_form_grp flex-1 px-10">
          <div className="relative w-full">
            <svg
              className="_header_form_svg"
              width="20"
              height="20"
              fill="none"
              stroke="#999"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
                strokeWidth="2"
              />
            </svg>

            <input
              type="text"
              placeholder="input search text"
              className="w-2/3 bg-gray-100 rounded-full pl-12 pr-4 py-2 text-gray-700 ocus:border-blue-300 focus:ring-1 focus:ring-blue-300 outline-none transition"
            />
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-6">

          {/* Home */}
          <NavLink to="/" className="_header_nav_link relative">
            <IoHomeOutline size={22} className="text-gray-500 _home" />
          </NavLink>

          {/* Users */}
          <NavLink to="/users" className="_header_nav_link relative">
            <FaUsers size={20} className="text-gray-500" />
          </NavLink>

          {/* Notifications */}
          <div className="_header_nav_link relative cursor-pointer">
            <FaBell size={20} className="text-gray-500" />
            <span className="_counting">6</span>
          </div>

          {/* Messages */}
          <div className="_header_nav_link relative cursor-pointer">
            <FaComments size={20} className="text-gray-500" />
            <span className="_counting">2</span>
          </div>

          {/* Profile */}
          <div
            className="_header_nav_profile cursor-pointer flex items-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={profile} // ← profile image empty now
              alt="Profile"
              className="_header_nav_profile_image rounded-full h-8 w-8 object-cover"
            />

            <p className="_header_nav_para ml-2 font-medium">
              Dylan Field
            </p>

            <button className="_header_nav_dropdown_btn ml-1">
              <IoIosArrowDown size={18} className="text-gray-600" />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
