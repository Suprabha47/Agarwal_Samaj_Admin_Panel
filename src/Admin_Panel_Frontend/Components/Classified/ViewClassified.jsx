import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Header from "../Header/Header";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ViewClassified() {
  const { id } = useParams();
  const classified = useSelector((state) => state.app.classified);
  const ClassifiedMember = classified.find((item) => item.id.toString() === id);
  const photos = ClassifiedMember?.photos?.split(",");
  const token = localStorage.getItem("token");

  const [openSidebar, setOpenSidebar] = useState(false);

  if (!ClassifiedMember) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <h1 className="text-2xl font-bold text-red-600">
          Classified Not Found
        </h1>
      </div>
    );
  }

  const handleClick = async (status) => {
    try {
      let endpoint = "";

      if (status === "approve") {
        endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/classifieds/${id}/approve`;
      } else if (status === "disapprove") {
        endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/classifieds/${id}/disapprove`;
      } else {
        toast.error("Invalid action");
        return;
      }

      const res = await axios.put(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res?.data?.message); // ✅ Now you have the real response data
      window.location.href = "/classified";
    } catch (err) {
      console.error("Error: ", err);
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 bg-gray-800 text-white shadow-md">
        <Sidebar />
      </div>

      {/* Sidebar - Mobile */}
      <div
        className={`fixed inset-0 z-40 transform ${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="h-full w-64 bg-gray-800 shadow-lg relative">
          <button
            onClick={() => setOpenSidebar(false)}
            className="absolute top-4 right-4 text-white"
          >
            <XMarkIcon className="h-7 w-7" />
          </button>
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:ml-64">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 md:left-64 right-0 z-50 bg-white shadow-sm">
          <Header
            setOpenSidebar={setOpenSidebar}
            isView={true}
            isUpdateClassified={true}
            id={id}
          />
        </div>

        {/* Content below header */}
        <div className="pt-20 px-4 sm:px-6 lg:px-8 mt-5">
          {/* Title Section */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {ClassifiedMember.firm_name}
            </h1>
            <p className="text-gray-600 mt-2">
              Category: {ClassifiedMember.business_category}
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left - Image + Details */}
            <div className="lg:col-span-2 bg-gray-700 rounded-xl shadow-lg p-4">
              {/* Main Image */}
              <img
                src={
                  `${process.env.REACT_APP_BACKEND_URL}/uploads/${photos?.[0]}` ||
                  "https://via.placeholder.com/600"
                }
                alt={ClassifiedMember.firm_name}
                className="w-full h-80 object-cover rounded-lg"
              />

              {/* Thumbnails */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {ClassifiedMember?.photos?.length > 0
                  ? photos?.map((photo, index) => (
                      <img
                        key={`photo-${photo}-${index}`}
                        src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photo}`}
                        alt={`thumbnail-${index}`}
                        className={`w-full h-24 object-cover rounded-lg ${
                          index === 0 ? "border-2 border-blue-500" : ""
                        }`}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                    ))
                  : // Fallback thumbnails if no photos exist
                    Array.from({ length: 4 }).map((_, index) => (
                      <img
                        key={`placeholder-${index}`}
                        src="https://via.placeholder.com/150"
                        alt={`placeholder-${index}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
              </div>
            </div>

            {/* Right - Moderation + Seller Info */}
            <div className="space-y-6">
              {/* Moderation */}
              <div className="bg-gray-700 text-white p-5 rounded-xl shadow-lg">
                <h2 className="font-semibold text-lg mb-4">Moderation</h2>
                <div className="flex flex-col gap-3">
                  {ClassifiedMember.status === "approved" ? (
                    ""
                  ) : (
                    <button
                      className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition"
                      onClick={() => handleClick("approve")}
                    >
                      Approve
                    </button>
                  )}
                  {ClassifiedMember.status === "disapproved" ? (
                    ""
                  ) : (
                    <button
                      className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-500 transition"
                      onClick={() => handleClick("disapprove")}
                    >
                      Reject
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-300 mt-3">
                  Note: Review reports before approval.
                </p>
              </div>

              {/* Seller Info */}
              <div className="bg-gray-700 text-white p-5 rounded-xl shadow-lg">
                <h2 className="font-semibold text-lg mb-4">Seller</h2>
                <div className="space-y-2 text-gray-200">
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {ClassifiedMember.person_name}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {ClassifiedMember.email}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {ClassifiedMember.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {ClassifiedMember.firm_address}
                  </p>
                  <p>
                    <span className="font-semibold">Website:</span>{" "}
                    <a
                      href={ClassifiedMember.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 underline"
                    >
                      {ClassifiedMember.website}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
