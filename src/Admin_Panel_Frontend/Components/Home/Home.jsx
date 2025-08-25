import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import {
  BellIcon,
  ArrowRightOnRectangleIcon,
  UsersIcon,
  DocumentTextIcon,
  HeartIcon,
  CreditCardIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Slice";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const email=useSelector((state)=>state.app.email);
  const dispatch=useDispatch();
  const Navigate=useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar - Desktop */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <Dashboard />
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
            className="absolute top-4 right-4 text-white"
          >
            <XMarkIcon className="h-7 w-7" />
          </button>
          <Dashboard />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top Navbar */}
        <header className="flex justify-between items-center px-4 md:px-6 py-4 bg-gray-50 shadow-sm relative">
            <h1 className="text-3xl font-bold  hidden md:block ">Dashboard</h1>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setOpenSidebar(true)}>
              <Bars3Icon className="h-8 w-8 text-gray-700" />
            </button>
          </div>

          <div className="flex items-center ml-auto">
            {/* Notification */}
            <button className="mr-4 relative">
              <BellIcon className="h-7 w-7 text-gray-700" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="flex items-center space-x-2"
              >
             <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg">
            👤
          </div>
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg z-50">
                  <div className="p-3 border-b">
                    <p className="font-medium text-base">Admin User</p>
                    <p className="text-sm text-gray-500">{email}</p>
                  </div>

                  <div
                    to="/"
                    className="flex items-center px-4 py-3 bg-gray-800 text-white hover:bg-gray-700 text-base"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" /> 
                    <button onClick={()=>{
                        toast.success("Logout Successfully")
                     setTimeout(() => {
                        dispatch(logout())
                        Navigate('/')
                     }, 1000);
                        
                    }}>Logout</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Header Text */}
         
          <h1 className="text-3xl font-bold mt-1">Welcome back, Admin</h1>
          <p className="text-lg text-gray-600 mb-6">
            Here's what's happening with your organization today.
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition-transform duration-1000">
              <div className="flex justify-between">
                <p className="text-gray-600 text-lg">Total Members</p>
                <UsersIcon className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold mt-2">2,847</h3>
              <p className="text-base text-green-600">+12% from last month</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition-transform duration-1000">
              <div className="flex justify-between">
                <p className="text-gray-600 text-lg">Active Classifieds</p>
                <DocumentTextIcon className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold mt-2">156</h3>
              <p className="text-base text-green-600">+8% from last month</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition-transform duration-1000">
              <div className="flex justify-between">
                <p className="text-gray-600 text-lg">Total Donations</p>
                <HeartIcon className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-3xl font-bold mt-2">$24,580</h3>
              <p className="text-base text-green-600">+23% from last month</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition-transform duration-1000">
              <div className="flex justify-between">
                <p className="text-gray-600 text-lg">Memberships</p>
                <CreditCardIcon className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-3xl font-bold mt-2">1,234</h3>
              <p className="text-base text-red-600">-2% from last month</p>
            </div>
          </div>

          {/* Bottom Section: Recent Activity & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-green-700 mb-4">
                Recent Activity
              </h2>
              <p className="text-gray-600 mb-4">
                Latest updates from your organization
              </p>

              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <UsersIcon className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <p className="text-blue-600 font-medium">
                      New member John Doe registered
                    </p>
                    <span className="text-sm text-gray-500">2 minutes ago</span>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <DocumentTextIcon className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <p className="text-gray-800">
                      New classified ad posted:{" "}
                      <span className="font-medium">'Vintage Car for Sale'</span>
                    </p>
                    <span className="text-sm text-gray-500">15 minutes ago</span>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <HeartIcon className="h-6 w-6 text-pink-500 mt-1" />
                  <div>
                    <p className="text-gray-800">
                      Donation of <span className="font-medium">$500</span>{" "}
                      received from Sarah Wilson
                    </p>
                    <span className="text-sm text-gray-500">1 hour ago</span>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <CreditCardIcon className="h-6 w-6 text-purple-500 mt-1" />
                  <div>
                    <p className="text-gray-800">
                      Premium membership renewed by Mike Johnson
                    </p>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-green-700 mb-4">
                Quick Actions
              </h2>
              <p className="text-gray-600 mb-4">
                Common administrative tasks
              </p>

              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <UsersIcon className="h-6 w-6 text-blue-500" />
                  <button className="text-blue-600 font-medium hover:underline">
                    Add New Member
                  </button>
                </li>

                <li className="flex items-center space-x-3">
                  <DocumentTextIcon className="h-6 w-6 text-green-500" />
                  <button className="text-green-600 font-medium hover:underline">
                    Review Classifieds
                  </button>
                </li>

                <li className="flex items-center space-x-3">
                  <HeartIcon className="h-6 w-6 text-pink-500" />
                  <button className="text-red-600 font-medium hover:underline">
                    Process Donations
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </main>
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
      </div>
    </div>
  );
}
