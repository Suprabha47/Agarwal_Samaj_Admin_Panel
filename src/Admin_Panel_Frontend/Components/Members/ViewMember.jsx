import React, {  useState } from 'react'
import {  useSelector } from 'react-redux';
import { useParams } from 'react-router'

import Sidebar from '../Sidebar/Sidebar';

import {XMarkIcon } from "@heroicons/react/24/outline";

import Header from '../Header/Header';

export default function ViewMember() {

    const [openSidebar, setOpenSidebar] = useState(false);
  
    const [activeTab, setActiveTab] = useState("Personal Details");

    const tabs = ["Personal Details", "Family Background", "Partner Preferences", "Photos"];

    const {id}=useParams();
    const Members=useSelector((state)=>state.app.Members);
    const Member=Members.find((user)=>user.id.toString()===id);
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
              <main className="flex-1 flex flex-col md:ml-64">
                {/* Top Navbar - Fixed */}
               <Header setOpenSidebar={setOpenSidebar} />
                  <div className="min-h-screen bg-gray-200 py-6 px-4 md:px-12 text-white">
      <div className="max-w-5xl mx-auto rounded-lg">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-800 p-6 rounded-lg shadow">
          {/* Image */}
          <img
           src={`http://localhost:4005/${Member.image_path.replace(/\\/g, "/")}`}
            alt={Member.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-700 shadow-md"
          />
          {/* Info */}
          <div className="flex-1 mt-4 md:mt-0 md:ml-6">
            <h1 className="text-2xl font-bold">{Member.name}</h1>
            <p className="text-gray-300">{Member.district}, {Member.state}</p>
            <p className="text-gray-300">
              {Member.height} • {Member.education} • {Member.occupation}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
             
              <span className="px-3 py-1 text-sm bg-gray-700 rounded-full">Gotra : {Member.gotra}</span>
              <span className="px-3 py-1 text-sm bg-gray-700 rounded-full">Never Married</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Last active: 2 hours ago</p>
          </div>
          {/* Buttons */}
         <div className="w-full md:w-auto flex flex-col items-start md:items-end mt-6 md:mt-0 space-y-3">

 <h2 className="text-lg md:text-xl font-semibold text-white mt-9 md:mt-0 md:ml-auto md:text-right">
  Contact
</h2>


  {/* Contact Box */}
  <div className="w-full md:w-auto">
    <p className="border bg-gray-700 border-gray-600 px-4 py-2 rounded text-gray-50 font-medium text-sm md:text-base text-center md:text-right hover:bg-gray-600 transition">
      +91 {Member.contact_no}
    </p>
  </div>
</div>
        </div>

        {/* Tabs */}
        <div className="flex justify-around mt-6 border-white border-gray-700">
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
                <h2 className="font-semibold mb-2">👤 About Me</h2>
                <p className="text-gray-300">{Member.about_me}</p>
              </div>

              {/* Basic Info */}
              <div className="bg-gray-800 p-4 rounded-lg shadow">
                <h2 className="font-semibold mb-2">📌 Basic Information</h2>
                <ul className="space-y-1 text-gray-300">
                  <li><b>Age:</b> {new Date().getFullYear() - new Date(Member.dob).getFullYear()} years</li>
                  <li><b>Height:</b> {Member.height}</li>
                  <li><b>Religion:</b> Hindu</li>
                  <li><b>Caste:</b> {Member.gotra}</li>
                  <li><b>Manglik:</b> {Member.manglik}</li>
                  <li><b>Marital Status:</b> Never Married</li>
                </ul>
              </div>

              {/* Professional */}
              <div className="bg-gray-800 p-4 rounded-lg shadow">
                <h2 className="font-semibold mb-2">💼 Professional Details</h2>
                <p><b>Education:</b> {Member.education_detail}</p>
                <p><b>Profession:</b> {Member.occupation}</p>
                <p><b>Designation:</b> {Member.designation}</p>
                <p><b>Company:</b> {Member.company_name}, {Member.company_city}</p>
                <p><b>Annual Income:</b> ₹{Member.annual_income.toLocaleString()}</p>
              </div>

              {/* Hobbies */}
              <div className="bg-gray-800 p-4 rounded-lg shadow">
                <h2 className="font-semibold mb-2">⭐ Hobbies & Interests</h2>
                <p>{Member.hobby}</p>
              </div>
            </div>
          )}

          {activeTab === "Family Background" && (
            <div className="bg-gray-800 p-4 rounded-lg shadow">
              <h2 className="font-semibold mb-4">👪 Family Background</h2>
              <ul className="space-y-2 text-gray-300">
                <li><b>Father:</b> {Member.father_name} ({Member.father_occupation}, ₹{Member.father_annual_income.toLocaleString()})</li>
                <li><b>Mother:</b> {Member.mother_name} ({Member.mother_occupation})</li>
                <li><b>Grandfather:</b> {Member.grandfather}</li>
                <li><b>Native Place:</b> {Member.native_place}</li>
                <li><b>Status of Family:</b> {Member.status_of_family}</li>
                <li><b>Siblings:</b> {Member.no_unmarried_brother} unmarried brother, {Member.no_married_brother} married brother, {Member.no_unmarried_sister} unmarried sister, {Member.no_married_sister} married sister</li>
              </ul>
            </div>
          )}

          {activeTab === "Partner Preferences" && (
            <div className="bg-gray-800 p-4 rounded-lg shadow">
              <h2 className="font-semibold mb-2">💍 Partner Preferences</h2>
              <p className="text-gray-300">Kundali Milan: {Member.kundali_milana}</p>
            </div>
          )}

          {activeTab === "Photos" && (
            <div className="bg-gray-800 p-4 rounded-lg shadow">
              <h2 className="font-semibold mb-2">📸 Photos</h2>
              <img
                src={`http://localhost:4005/${Member.image_path.replace(/\\/g, "/")}`}
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
  )
}
