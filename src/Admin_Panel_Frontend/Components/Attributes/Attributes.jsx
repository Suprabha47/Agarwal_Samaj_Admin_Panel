import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import {XMarkIcon } from "@heroicons/react/24/outline";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAttributes } from "../../Redux/Slice";
import toast from "react-hot-toast";

export default function Attributes() {
   const [openSidebar, setOpenSidebar] = useState(false);
   const Attributes=useSelector((state)=>state.app.Attributes);
   
   const dispatch=useDispatch();

   useEffect(()=>{
     axios.get('/Attribute.json').then((response)=>{
      dispatch(setAttributes(response.data));
    }).catch((err)=>{
      toast.error(err);
    })
   },[dispatch]);
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
    
                    <main className="flex-1 flex flex-col md:ml-64">
                          <Header setOpenSidebar={setOpenSidebar} />

                          <div className="border-2 w-150 h-100 border-white shadow-xl mt-20 ml-82">
                            <h1 className="text-center text-xl font-semibold text-gray-700">Select Attribute</h1>

                           <form action="">
                             <select className="text-center ml-58 mt-4">
                              <option>---Select---</option>
                              {
                                Attributes.map((item)=>(
                                 
                                    
                                    <option key={item.id} value={item.business_category}>{item.business_category}</option>
                                 
                                ))
                              }
                            </select> <br />

                            <button className="border-2 rounded-md bg-gray-600 hover:bg-gray-500 text-white font-semibold p-1 mt-3 ml-58">Add Attribute</button>
                           </form>

                          </div>
                    </main>


    </div>
  );
}
