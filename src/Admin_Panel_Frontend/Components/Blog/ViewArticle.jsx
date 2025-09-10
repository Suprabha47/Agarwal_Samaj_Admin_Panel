import React, { useState } from "react";
import { Outlet, useParams } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Header from "../Header/Header";
import { useSelector } from "react-redux";

export default function ViewArticle() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { Id } = useParams();
  const Articles = useSelector((state) => state.app.Articles);
  const Article = Articles.find((item) => item.post_id.toString() === Id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Desktop */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Sidebar Mobile */}
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

      {/* Main Section */}
      <main className="flex-1 flex flex-col md:ml-64">
        <Header setOpenSidebar={setOpenSidebar} />

        <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!Article ? (
            <p className="text-center text-gray-500 text-lg">No Article Found</p>
          ) : (
            <article className="bg-white shadow-xl rounded-lg overflow-hidden">
              {/* Thumbnail */}
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${Article.thumbnail_url.replace(
                  /\\/g,
                  "/"
                )}`}
                alt={Article.title}
                className="w-[96%] m-5 rounded-md h-64 object-cover sm:h-80"
              />

              <div className="p-6 sm:p-8">
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  {Article.title}
                </h1>
                <span className="border-1 p-1 rounded-md text-white bg-gray-600 sm:ml-120 md:ml-120 lg:ml-200">
                  Published
                </span>

                {/* Author + Date + Views */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="font-medium text-xl text-gray-700 flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>

                    {Article.author_name}
                  </span>
                  <span className="flex gap-1 font-medium text-md"> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
</svg>

                    <p className="font-medium text-xl">{Article.publish_date.split("T")[0]}</p></span>
                  
                </div>

                {/* Excerpt */}
                <h1 className="mb-3 font-semibold text-2xl">Excerpt</h1>
                <div className="bg-gray-600 p-6 rounded-md mb-6 text-white text-xl border-l-red-600 border-4 border-t-transparent border-b-transparent border-r-transparent">
                  {Article.excerpt}
                </div>

                {/* Content */}
                 <h1 className="text-2xl font-semibold mb-2">Content</h1>
                <div className="prose max-w-none text-gray-800 leading-loose text-lg  font-normal tracking-wide leading-">
                  {Article.content}

                </div>
              </div>
            </article>
          )}
        </div>
      </main>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
