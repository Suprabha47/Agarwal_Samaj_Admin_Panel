import React, { useState } from 'react'
import Dashboard from '../Dashboard/Dashboard'
import {

  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Classified() {
   
    const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div>
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
      
    </div>
  )
}
