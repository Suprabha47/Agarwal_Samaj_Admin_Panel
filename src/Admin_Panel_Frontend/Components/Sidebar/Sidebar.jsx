import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const email = useSelector((state) => state.app.email);
    const role = parseInt(localStorage.getItem("role"));
    const [blogOpen, setBlogOpen] = useState(false);
  return (
    <div className="h-full w-64 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold flex items-center gap-2 text-white hover:scale-105 transition-transform duration-1000">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
          Admin Panel
        </h1>
      </div>

      {/* Nav Links */}
      <nav className="p-4 space-y-2 flex-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-base transition ${
              isActive
                ? "bg-gray-700 text-white shadow-md"
                : "text-gray-200 hover:bg-gray-500 hover:text-white"
            }`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
          </svg>
          Dashboard
        </NavLink>

        <NavLink
          to="/members"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-base transition ${
              isActive
                ? "bg-gray-700 text-white shadow-md"
                : "text-gray-200 hover:bg-gray-500 hover:text-white"
            }`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
          </svg>
          Matrimonial
        </NavLink>


        <NavLink
          to="/classified"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-base transition ${
              isActive
                ? "bg-gray-700 text-white shadow-md"
                : "text-gray-200 hover:bg-gray-500 hover:text-white"
            }`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
              clipRule="evenodd"
            />
            <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
          </svg>
          Classified
        </NavLink>
                   <NavLink
          to="/membership"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-base transition ${
              isActive
                ? "bg-gray-700 text-white shadow-md"
                : "text-gray-200 hover:bg-gray-500 hover:text-white"
            }`
          }
        >
         <img src="https://img.icons8.com/?size=100&id=47269&format=png&color=000000" alt="" className="size-6 bg-gray-200 border-0 rounded-md fit-content" />
          Membership
        </NavLink>

        <NavLink
          to="/donations"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-base transition ${
              isActive
                ? "bg-gray-700 text-white shadow-md"
                : "text-gray-200 hover:bg-gray-500 hover:text-white"
            }`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
          Donations
        </NavLink>

        <NavLink
          to="/attributes"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-base transition ${
              isActive
                ? "bg-gray-700 text-white shadow-md"
                : "text-gray-200 hover:bg-gray-500 hover:text-white"
            }`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
            <path
              fillRule="evenodd"
              d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
              clipRule="evenodd"
            />
          </svg>
          Attributes
        </NavLink>
        <NavLink
          to="/sliderImages"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-base transition ${
              isActive
                ? "bg-gray-700 text-white shadow-md"
                : "text-gray-200 hover:bg-gray-500 hover:text-white"
            }`
          }
        >
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
<path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
</svg>
          Slider Images
        </NavLink>

         <NavLink
          to="/gallery"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-base transition ${
              isActive
                ? "bg-gray-700 text-white shadow-md"
                : "text-gray-200 hover:bg-gray-500 hover:text-white"
            }`
          }
        >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fill="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip="evenodd" />
</svg>


          
        Gallery
        </NavLink>

     <div>
          <button
            onClick={() => setBlogOpen(!blogOpen)}
            className="flex items-center justify-between w-full px-4 py-3 text-base rounded-lg text-gray-200 hover:bg-gray-500 hover:text-white transition"
          >
            <span className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M5.246 3.744a.75.75 0 0 1 .75-.75h7.125a4.875 4.875 0 0 1 3.346 8.422 5.25 5.25 0 0 1-2.97 9.58h-7.5a.75.75 0 0 1-.75-.75V3.744Zm7.125 6.75a2.625 2.625 0 0 0 0-5.25H8.246v5.25h4.125Zm-4.125 2.251v6h4.5a3 3 0 0 0 0-6h-4.5Z" />
              </svg>
              Blog
            </span>
            <span className={`transition-transform ${blogOpen ? "rotate-180" : ""}`}>
              ▼
            </span>
          </button>

          {blogOpen && (
            <div className="ml-4 mt-2 flex flex-col space-y-1">
              <NavLink
                to="/blog/articles"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${
                    isActive
                      ? "bg-gray-700 text-white shadow-md"
                      : "text-gray-200 hover:bg-gray-500 hover:text-white"
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                All Articles
              </NavLink>

              <NavLink
                to="/blog/create"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${
                    isActive
                      ? "bg-gray-700 text-white shadow-md"
                      : "text-gray-200 hover:bg-gray-500 hover:text-white"
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path d="M12 4v16m8-8H4" />
                </svg>
                Create Article
              </NavLink>

              <NavLink
                to="/blog/category"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${
                    isActive
                      ? "bg-gray-700 text-white shadow-md"
                      : "text-gray-200 hover:bg-gray-500 hover:text-white"
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
                Category
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            {
              role===1?
              <p className="font-semibold text-white">Super Admin</p>:
              <p className="font-semibold text-white">Moderator</p>
            }
           
            <p className="text-sm text-gray-300">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
