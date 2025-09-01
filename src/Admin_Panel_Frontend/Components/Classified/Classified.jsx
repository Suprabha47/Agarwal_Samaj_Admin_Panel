import React, {  useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import {XMarkIcon } from "@heroicons/react/24/outline";
import Card from "./content/Card";

import Header from "../Header/Header";

export default function Classified() {
   const [openSidebar, setOpenSidebar] = useState(false);
  
   
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

                <main className="flex-1 flex flex-col md:ml-64 ">
                              {/* Left Side */}
                             <Header setOpenSidebar={setOpenSidebar} />
                              {/* Right Side */}
                              
                   <div className="px-4 sm:px-6 lg:px-8 mt-6 mb-6 text-center sm:text-left">
                   <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Classified Ads Management
                    </h1>
                   <p className="text-base sm:text-lg text-gray-600 mt-2">
                   Moderate and manage classified advertisements
                  </p>
                  </div>

                      <div className="p-4 md:p-6 space-y-6">
                        <Card />
                      </div>



                    

                </main>
   
    </div>
  );
}
