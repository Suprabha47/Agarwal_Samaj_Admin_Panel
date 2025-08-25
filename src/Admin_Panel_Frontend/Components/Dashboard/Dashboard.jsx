import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out md:relative md:translate-x-0 md:w-64 w-64 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg z-50`}
      >
     
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold flex items-center gap-2 text-white">
            <span className="text-gray-100">▦</span> Admin Panel
          </h1>
          <button
            className="md:hidden text-gray-300 hover:text-gray-100"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
        </div>

        
        <nav className="p-4 space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-base transition ${
                isActive
                  ? "bg-gray-700 text-white shadow-md"
                  : "text-gray-200 hover:bg-gray-500 hover:text-white"
              }`
            }
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to="/members"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-base transition ${
                isActive
                  ? "bg-gray-700 text-white shadow-md"
                  : "text-gray-200 hover:bg-gray-500 hover:text-white"
              }`
            }
          >
            👥 Members
          </NavLink>

          <NavLink
            to="/classified"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-base transition ${
                isActive
                  ? "bg-gray-700 text-white shadow-md"
                  : "text-gray-200 hover:bg-gray-500 hover:text-white"
              }`
            }
          >
            📄 Classified
          </NavLink>

          <NavLink
            to="/donations"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-base transition ${
                isActive
                  ? "bg-gray-700 text-white shadow-md"
                  : "text-gray-200 hover:bg-gray-500 hover:text-white"
              }`
            }
          >
            ❤️ Donations
          </NavLink>

          <NavLink
            to="/membership"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-base transition ${
                isActive
                  ? "bg-gray-700 text-white shadow-md"
                  : "text-gray-200 hover:bg-gray-500 hover:text-white"
              }`
            }
          >
            💳 Membership
          </NavLink>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg text-white">
              👤
            </div>
            <div>
              <p className="font-semibold text-white">Admin User</p>
              <p className="text-sm text-gray-300">admin@user.com</p>
            </div>
          </div>
        </div>
      </div>

   
      <button
        className="absolute top-4 left-4 md:hidden bg-green-600 text-white p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
    </div>
  );
}
