import { NavLink, useNavigate } from "react-router-dom";
import { useState , useEffect} from "react";
// import { logout } from "../../redux/authSlice";
import { FaUsers, FaUserTie, FaUserCheck, FaComments } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { useUser } from "../../Provider/UserProvider";

const Navbar = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);



  const navLinks = [
    { to: "/", label: "Home" },
    // { to: "blog", label: "Blog" },
    ...(user
      ? [
          { to: "/dashboard", label: "Dashboard" },
          {
            to: "/",
            label: "Sign Out",
            onClick: () => {
              dispatch(logout());
              navigate("/signin");
            },
          },
        ]
      : [{ to: "/signin", label: "Admin" }]),
  ];

  return (
    <div className="w-full">
      {/* Top Nav */}
      <div className="bg-sky-700 text-white text-sm px-4 py-1 flex justify-end gap-4">
        {navLinks.map((link) =>
          link.onClick ? (
            <button
              key={link.label}
              onClick={link.onClick}
              className="hover:underline"
            >
              {link.label}
            </button>
          ) : (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `hover:underline ${
                  isActive ? "font-bold underline text-yellow-300" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          )
        )}
      </div>
  </div>
  );
};

export default Navbar;
