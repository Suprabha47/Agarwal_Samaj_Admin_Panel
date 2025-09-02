import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'
import Sidebar from '../Sidebar/Sidebar';
import { XMarkIcon } from "@heroicons/react/24/outline";
import Header from '../Header/Header';


export default function ViewClassified() {
    const {id}=useParams();
    const classified=useSelector((state)=>state.app.classified);
    const ClassifiedMember=classified.find((item)=>item.id.toString()===id);

      const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div>
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
        <Header setOpenSidebar={setOpenSidebar} isView={true}  />
      </main>



    </div>
  )
}
