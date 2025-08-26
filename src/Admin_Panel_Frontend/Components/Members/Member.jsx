import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout, MemberApi } from "../../Redux/Slice";

import {
  Bell,
  Users,
  UserCheck,
  Hourglass,
  Star,
  LogOut,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Member() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openAction, setOpenAction] = useState(null);
  const menuRef = useRef(null);
  const actionRef = useRef(null);

  const email = useSelector((state) => state.app.email);
  const Members = useSelector((state) => state.app.Members);
  const [search, setSearch] = useState(""); // UI only, no filtering

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MemberApi());
  }, [dispatch]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
      if (actionRef.current && !actionRef.current.contains(e.target)) {
        setOpenAction(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Sidebar - Mobile */}
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
      <main className="flex-1 flex flex-col md:ml-64">
        {/* Top Navbar - Fixed */}
        <header className="flex justify-between items-center px-4 md:px-6 py-5 bg-white border-white shadow-sm sticky top-0 z-50">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Button */}
            <button className="md:hidden" onClick={() => setOpenSidebar(true)}>
              <Bars3Icon className="h-8 w-8 text-gray-700" />
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Members</h1>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Add Member */}
            <button className="flex items-center gap-2 bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg text-base hover:bg-gray-600">
              <NavLink to={"createMember"}>+ Add Member</NavLink>
            </button>

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

        {/* Content */}
        <div className="p-4 md:p-6 space-y-6">
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card
              title="Total Members"
              count={Members.length}
              icon={<Users className="w-7 h-7 text-gray-500" />}
            />
            <Card
              title="Active Members"
              count={Members.filter((m) => m.status === "active").length}
              icon={<UserCheck className="w-7 h-7 text-green-600" />}
            />
            <Card
              title="Classified"
              count={Members.filter((m) => m.status === "pending").length}
              icon={<Hourglass className="w-7 h-7 text-yellow-500" />}
            />
            <Card
              title="Premium Members"
              count={Members.filter((m) => m.membership === "premium").length}
              icon={<Star className="w-7 h-7 text-purple-600" />}
            />
          </div>

          {/* Member List */}
          <div className="bg-white rounded-xl shadow-xl border-white">
            <div className="p-5 border-gray-200 border-2 border-t-transparent border-l-transparent border-r-transparent flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-2xl text-gray-800">
                  Members List
                </h2>
                <p className="text-lg text-gray-500">
                  View and manage all organization members
                </p>
              </div>
              <div className="flex gap-2">
                <select className="border-gray-200 border-2 rounded-lg px-3 py-2 text-base font-semibold">
                  <option>All Types</option>
                  <option>Basic</option>
                  <option>Premium</option>
                </select>
              </div>
            </div>

            {/* Search (UI only, no filter) */}
            <div className="p-4 border-gray-200">
              <div className="flex items-center gap-1 max-w-2xl w-full border-gray-300 border-2 rounded-xl">
                {/* Search Icon */}
                <img
                  src="https://img.icons8.com/?size=100&id=lwZinoeNcL3F&format=png&color=000000"
                  alt="search"
                  className="w-6 h-6 text-gray-500 ml-2 "
                />

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search members..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 border-white  px-4 py-2 rounded-lg text-base 
                 focus:outline-none focus:border-gray-400
                 w-full sm:w-[80%] md:w-[60%] lg:w-[50%]"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <table className="min-w-[700px] w-full text-base text-left border-white border-t-white">
                <thead className="bg-gray-50 text-gray-700 border-white border-t-white text-lg">
                  <tr>
                    <th className="py-4 px-5">Member</th>
                    <th className="py-4 px-5">Contact</th>
                    <th className="py-4 px-5">Membership</th>
                    <th className="py-4 px-5">Details</th>
                    <th className="py-4 px-5">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  {Members.map((u) => (
                    <tr
                      key={u.id}
                      className="border-gray-200 border-2 hover:bg-gray-50 text-gray-700"
                    >
                      <td className="py-4 px-5 font-medium ">{u.name}</td>
                      <td className="py-4 px-5">
                        <p>{u.email}</p>
                        <p className="text-sm text-gray-500">{u.contact_no}</p>
                      </td>
                      <td className="py-4 px-5">
                        <MembershipPill membership={u.membership} />
                      </td>
                      <td className="py-4 px-5">
                        <NavLink
                          to={`/members/${u.id}`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-base hover:bg-blue-700"
                        >
                          View
                        </NavLink>
                      </td>
                      <td
                        className="py-4 px-5 relative flex items-center gap-3"
                        ref={actionRef}
                      >
                        {/* Action Dropdown */}
                        <button
                          onClick={() =>
                            setOpenAction(openAction === u.id ? null : u.id)
                          }
                        >
                          <MoreHorizontal className="w-6 h-6" />
                        </button>
                        {openAction === u.id && (
                          <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg z-50">
                            <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-50">
                              <Edit className="w-5 h-5" /> Edit
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 w-full text-red-600 hover:bg-gray-50">
                              <Trash2 className="w-5 h-5" /> Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {Members.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-500 text-lg"
                      >
                        No members found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Outlet />
    </div>
  );
}

/* Card Component */
const Card = ({ title, count, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow border-white flex justify-between items-center">
    <div>
      <h3 className="text-lg text-gray-500">{title}</h3>
      <p className="text-3xl font-bold mt-2">{count}</p>
    </div>
    {icon}
  </div>
);

/* Membership Pill */
const MembershipPill = ({ membership }) => {
  const styles = {
    premium: "bg-purple-100 text-purple-700",
    basic: "bg-blue-100 text-blue-700",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-base font-semibold ${
        styles[membership] || "bg-gray-100 text-gray-600"
      }`}
    >
      {membership}
    </span>
  );
};
