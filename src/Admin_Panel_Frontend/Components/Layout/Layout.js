import { useNavigate } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { logout } from "../../Redux/Slice";
import { LogOut } from "lucide-react";
import { SidebarMobile, SidebarMobileButton } from "../Sidebar/SidebarMobile";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Layout({ PageName, isMemebership = false }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const role = parseInt(localStorage.getItem("role"));
  const menuRef = useRef(null);
  const email = useSelector((state) => state.app.email);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-50  flex">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Sidebar - Mobile */}

      <SidebarMobile
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      <div
        className={`fixed inset-0 z-40 transform ${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="h-full w-64 bg-white shadow-lg relative">
          {/* Close button */}
          <button
            onClick={() => setOpenSidebar(false)}
            className="absolute top-4 right-4 text-gray-700"
          >
            <XMarkIcon className="h-7 w-7" />
          </button>
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1  md:ml-64 ">
        {/* Top Navbar - Fixed */}
        <header className="flex justify-between items-center px-4 md:px-6 py-5 bg-white border-white shadow-sm sticky top-0 z-50">
          {/* Left Side */}
          <SidebarMobileButton
            setOpenSidebar={setOpenSidebar}
            PageName={PageName}
          />
          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Add Member */}
            {role === 1 && PageName === "Matrimonial" && (
              <button className="flex items-center gap-2 bg-gray-700 text-white font-semibold px-3 py-2 rounded-lg text-base hover:bg-gray-600">
                <NavLink to={"createMember"}>+ Add Member</NavLink>
              </button>
            )}

            {/* Add Member */}
            {role === 1 && PageName === "Membership" && (
              <button className="flex items-center gap-2 bg-gray-700 text-white font-semibold px-3 py-2 rounded-lg text-base hover:bg-gray-600">
                <NavLink to={"form"}>+ Add Membership</NavLink>
              </button>
            )}

            {/* Notification */}
            <button className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                className="size-10"
                viewBox="0 0 64 64"
              >
                <path d="M25.815 50h12.371c-1.068 2.355-3.436 4-6.185 4S26.883 52.355 25.815 50zM51.509 39.699C51.764 39.954 54 42.294 54 46c0 1.104-.896 2-2 2H12c-1.104 0-2-.896-2-2 0-3.706 2.236-6.046 2.491-6.301.165-.166.359-.301.571-.399 3.056-1.417 3.604-9.965 3.897-14.557.779-7.786 7.072-10.934 10.68-11.658C28.307 11.604 29.662 10 32 10s3.693 1.604 4.36 3.084c3.607.723 9.899 3.862 10.674 11.586.3 4.664.848 13.212 3.903 14.629C51.149 39.398 51.344 39.534 51.509 39.699z"></path>
              </svg>
              <span className="absolute top-1  right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
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
                        Navigate("/");
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
      </main>
    </div>
  );
}
