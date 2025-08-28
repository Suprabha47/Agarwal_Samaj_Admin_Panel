import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { logout } from "../../Redux/Slice";
import toast from "react-hot-toast";
import { Bars3Icon,  } from "@heroicons/react/24/outline";
import { Bell, LogOut } from "lucide-react";
import ExitIcon from '../../assests/Images/Exit.png';

export default function Header({ setOpenSidebar }) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.app.email);

  return (
    <header className="flex justify-between items-center px-4 md:px-6 py-5 bg-white border-white shadow-sm sticky top-0 z-50">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Button */}
        <button className="md:hidden" onClick={() => setOpenSidebar(true)}>
          <Bars3Icon className="h-8 w-8 text-gray-700" />
        </button>
       <NavLink to={'/members'}> <h1 className="text-3xl font-bold text-gray-800">
        <button>
          <img src={ExitIcon} alt=""
          className="size-10"
          />
        </button>
        </h1></NavLink>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative">
          <Bell className="h-6 w-6 text-gray-700" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg"
          >
            👤
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50">
              <div className="p-3 border-b">
                <p className="font-medium text-base">Admin User</p>
                <p className="text-sm text-gray-500">{email}</p>
              </div>
              <button
                onClick={() => {
                  toast.success("Logout Successfully");
                  setTimeout(() => {
                    localStorage.removeItem("token");
                    dispatch(logout());
                    navigate("/");
                  }, 1000);
                }}
                className="flex items-center gap-2 px-4 py-3 w-full text-base bg-gray-600 text-left text-white hover:bg-gray-700"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
