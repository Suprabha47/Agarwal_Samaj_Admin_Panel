import React, { useState } from 'react'
import { Outlet, useParams } from 'react-router'
import Sidebar from '../Sidebar/Sidebar';
import {XMarkIcon } from "@heroicons/react/24/outline";
import Header from '../Header/Header';
import { useSelector } from 'react-redux';

export default function ViewArticle() {
       const [openSidebar, setOpenSidebar] = useState(false);
       const {Id}=useParams();
       const Articles=useSelector((state)=>state.app.Articles);
       const Article=Articles.find((item)=>item.post_id.toString()===Id);


  return (
    <div>
      
              <div className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white shadow-md">
                                        <Sidebar />
                                      </div>
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

                                                <div>
                                                  {
                                                    !Article?
                                                    <p>No Article Found</p>:
                                                    <div>
                                                      <h1>{Article.author_name}</h1>
                                                    </div>
                                                  }
                                                </div>
                              </main>
      <div>
        <Outlet/>
      </div>
        
    </div>
  )
}
