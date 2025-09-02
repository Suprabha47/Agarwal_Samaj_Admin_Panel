import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import Sidebar from "../Sidebar/Sidebar";

import { XMarkIcon } from "@heroicons/react/24/outline";

import Header from "../Header/Header";

export default function ViewMember() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const [activeTab, setActiveTab] = useState("Personal Details");

  const tabs = [
    "Personal Details",
    "Family Background",
    "Physical Attributes",
    "Partner Preferences",
    "Photos",
  ];

  const { id } = useParams();
  const Members = useSelector((state) => state.app.Members);
  const Member = Members.find((user) => user.id.toString() === id);
  return (
    <div>
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
      <main className="flex-1 flex flex-col md:ml-64 ">
        {/* Top Navbar - Fixed */}
        <Header setOpenSidebar={setOpenSidebar} isUpdate={true} id={id} />
        <div className="min-h-screen bg-gray-200 py-0 px-2  sm:px-4 md:px-12 text-white">
          <div className="max-w-5xl mx-auto rounded-lg ">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-800 p-6 rounded-lg shadow mt-20">
              {/* Image */}
              <img
                src={`http://localhost:4005/uploads/${Member.image_path.replace(
                  /\\/g,
                  "/"
                )}`}
                alt={Member.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-700 shadow-md hover:scale-110 transition-transform duration-500"
              />
              {/* Info */}
              <div className="flex-1 mt-4 md:mt-0 md:ml-6">
                <h1 className="text-2xl font-bold">{Member.name}</h1>
                <p className="text-gray-300">
                  {Member.district}, {Member.state}
                </p>
                <p className="text-gray-300">
                  {Member.height} • {Member.education} • {Member.occupation}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-3 py-1 text-sm bg-gray-700 rounded-full">
                    {Member.gotra}
                  </span>
                  <span className="px-3 py-1 text-sm bg-gray-700 rounded-full">
                    Never Married
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Last active: 2 hours ago
                </p>
              </div>
              {/* Buttons */}
              <div className="w-full md:w-auto flex flex-col items-start mt-6 md:mt-0 space-y-3">
                <h2 className="text-lg md:text-xl font-semibold text-white mt-9 md:mt-0 md:text-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 inline mr-1 mb-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  Contact
                </h2>

                {/* Contact Box */}
                <div className="w-full md:w-auto">
                  <p className="border bg-gray-700 border-gray-600 px-4 py-2 rounded text-gray-50 font-medium text-sm md:text-base text-left hover:bg-gray-600 transition">
                    +91 {Member.contact_no}
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-around mt-6 border-white border-gray-700 overflow-x-hidden flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 font-medium ${
                    activeTab === tab
                      ? "text-gray-900 text-xl border-b-2 border-gray-900"
                      : "text-gray-900 text-xl hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Section */}
            <div className="mt-6">
              {activeTab === "Personal Details" && (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* About Me */}
                  <div className="bg-gray-800 p-4 rounded-lg shadow">
                    <h2 className="font-semibold mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 inline mr-2 mb-1 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                        />
                      </svg>
                      About Me
                    </h2>
                    <p className="text-gray-300">{Member.about_me}</p>
                  </div>

                  {/* Basic Info */}
                  <div className="bg-gray-800 p-4 rounded-lg shadow">
                    <h2 className="font-semibold mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 inline mr-2 mb-1 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                        />
                      </svg>
                      Basic Information
                    </h2>
                    <ul className="space-y-1 text-gray-300">
                      <li>
                        <b>Age:</b>{" "}
                        {new Date().getFullYear() -
                          new Date(Member.dob).getFullYear()}{" "}
                        years
                      </li>
                      <li>
                        <b>Height:</b> {Member.height}
                      </li>
                      
                      <li>
                        <b>Caste:</b> {Member.gotra}
                      </li>
                      <li>
                        <b>Manglik:</b> {Member.manglik}
                      </li>
                      <li>
                        <b>Marital Status:</b> Never Married
                      </li>
                    </ul>
                  </div>

                  {/* Professional */}
                  <div className="bg-gray-800 p-4 rounded-lg shadow">
                    <h2 className="font-semibold mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 inline mr-2 mb-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                        />
                      </svg>
                      Professional Details
                    </h2>
                    <p>
                      <b>Education:</b> {Member.education_detail}
                    </p>
                    <p>
                      <b>Profession:</b> {Member.occupation}
                    </p>
                    <p>
                      <b>Designation:</b> {Member.designation}
                    </p>
                    <p>
                      <b>Company:</b> {Member.company_name},{" "}
                      {Member.company_city}
                    </p>
                    <p>
                      <b>Annual Income:</b> ₹
                      {Member.annual_income.toLocaleString()}
                    </p>
                  </div>

                  {/* Hobbies */}
                  <div className="bg-gray-800 p-4 rounded-lg shadow">
                    <h2 className="font-semibold mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 inline mr-2 mb-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                      Hobbies & Interests
                    </h2>
                    <p>{Member.hobby}</p>
                  </div>
                </div>
              )}

              {activeTab === "Family Background" && (
                <div className="bg-gray-800 p-4 rounded-lg shadow">
                  <h2 className="font-semibold mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 inline mr-2 mb-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                      />
                    </svg>
                    Family Background
                  </h2>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      <b>Father:</b> {Member.father_name} (
                      {Member.father_occupation}, ₹
                      {Member.father_annual_income.toLocaleString()})
                    </li>
                    <li>
                      <b>Mother:</b> {Member.mother_name} (
                      {Member.mother_occupation})
                    </li>
                    <li>
                      <b>Grandfather:</b> {Member.grandfather}
                    </li>
                    <li>
                      <b>Native Place:</b> {Member.native_place}
                    </li>
                    <li>
                      <b>Status of Family:</b> {Member.status_of_family}
                    </li>
                    <li>
                      <b>Siblings:</b> {Member.no_unmarried_brother} unmarried
                      brother, {Member.no_married_brother} married brother,{" "}
                      {Member.no_unmarried_sister} unmarried sister,{" "}
                      {Member.no_married_sister} married sister
                    </li>
                   
                  
                  </ul>

                  <div className="mt-5">
                    <h2 className="font-semibold text-white mb-4 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 inline mr-2 mb-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                      />
                    </svg>
                    Relative Information
                  </h2>
                  <ul className="space-y-2 text-gray-300">
                      <li>
                      <b>Relation:</b> {Member.relation} 
                   
                    </li>
                    <li>
                      <b>Relative Name:</b> {Member.relative_name} 
                      
                    </li>
                    <li>
                      <b>Relative Contact:</b> {Member.relative_mobile_no}
                    </li>
                    <li>
                      <b>Relative City:</b> {Member.relative_city}
                    </li>

                    
                  </ul>
                  </div>

                  
                </div>
              )}
              {activeTab === "Physical Attributes" && (
                <div className="bg-gray-800 p-4 rounded-lg shadow">
                  <h2 className="font-semibold mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 inline mr-2 mb-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Candidate Attributes
                  </h2>

                  <ul className="space-y-2 text-gray-300">
                    <li>
                      <b>Height:</b> {Member.height}
                    </li>
                    <li>
                      <b>Body Type:</b> {Member.body_type}
                    </li>
                    <li>
                      <b>Complexion:</b> {Member.complexion}
                    </li>
                    <li>
                      <b>Blood Group:</b> {Member.blood_group}
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "Partner Preferences" && (
                <div className="bg-gray-800 p-4 rounded-lg shadow">
                  <h2 className="font-semibold mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 inline mr-2 mb-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    Partner Preferences
                  </h2>
                  <p className="text-gray-300">
                    Kundali Milan: {Member.kundali_milana}
                  </p>
                </div>
              )}

              {activeTab === "Photos" && (
                <div className="bg-gray-800 p-4 rounded-lg shadow">
                  <h2 className="font-semibold mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 inline mr-2 mb-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                      />
                    </svg>
                    Photos
                  </h2>
                  <img
                    src={`http://localhost:4005/uploads/${Member.image_path.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt="Profile"
                    className="rounded-lg w-full md:w-1/2"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
