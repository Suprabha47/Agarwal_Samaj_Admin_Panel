import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Card from "./content/Card";
import { NavLink } from "react-router";
import { Trash2 } from "lucide-react";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setClassified } from "../../Redux/Slice";
import toast from "react-hot-toast";
import Layout from "../Layout/Layout";

export default function Classified() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterCat, setFilterCat] = useState("All");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const classified = useSelector((state) => state.app.classified);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(async () => {
      setLoading(false);
      try {
        // console.log(`${process.env.REACT_APP_BACKEND_URL}/api/classifieds`)
        const response = await axios.get(
          `http://localhost:4005/api/classifieds`
        );

        dispatch(setClassified(response.data));
      } catch (err) {
        setError(err);
        console.log("listing error: ", err);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const filterData =
    filterCat === "All"
      ? classified
      : classified.filter((item) => item.status === filterCat);

  const filterSearch = filterData.filter((item) =>
    item.firm_name
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(search.toLowerCase().replace(/\s+/g, ""))
  );

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4005/api/classifieds/${id}`
      );
      if (response.data) {
        toast.success("Deleted successfully");
        dispatch(setClassified(classified.filter((item) => item.id !== id)));
        setConfirmDelete(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.error);
      setConfirmDelete(null);
    }
  };

  return (
    <>
      <Layout PageName="Classified" />
      {/* Main content */}
      <main className="flex-1 flex flex-col md:ml-64 overflow-y-auto max-h-screen  ">
        <div className="px-4 sm:px-6 lg:px-8 mt-15 mb-6 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Classified Ads Management
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-2">
            Moderate and manage classified advertisements
          </p>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          <Card />
          <div className="bg-white rounded-xl shadow-xl border-white">
            <div className="p-5 border-gray-200 border-2 border-t-transparent border-l-transparent border-r-transparent flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="font-semibold text-xl sm:text-2xl text-gray-800">
                  Classified List
                </h2>
                <p className="text-sm sm:text-lg text-gray-500">
                  View and manage all classified members
                </p>
              </div>
              <div>
                <select
                  className="border-gray-200 border-2 rounded-lg px-3 py-2 text-sm sm:text-base font-semibold"
                  value={filterCat}
                  onChange={(e) => setFilterCat(e.target.value)}
                >
                  <option value={"All"}>All</option>
                  <option value={"approved"}>Approved</option>
                  <option value={"pending"}>Pending</option>
                  <option value={"disapproved"}>Rejected</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <div className="p-4 border-gray-200 lg:flex md:flex-wrap sm:flex-wrap">
              <div className="flex items-center gap-2 max-w-2xl w-full border-gray-300 border-2 rounded-xl px-2 py-1">
                <img
                  src="https://img.icons8.com/?size=100&id=lwZinoeNcL3F&format=png&color=000000"
                  alt="search"
                  className="w-5 h-5 text-gray-500"
                />
                <input
                  type="text"
                  placeholder="Search Classified..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 border-none px-2 py-1 rounded-lg text-sm sm:text-base focus:outline-none"
                />
              </div>

              <button className="flex items-center gap-2 bg-gray-700 text-white font-semibold px-3 py-2 rounded-lg text-base hover:bg-gray-600 lg: ml-130 md:ml-50 sm:ml-10">
                <NavLink to={"createClassified"} className="inline">
                  Add Classified
                </NavLink>
              </button>
            </div>

            {/* Table - Desktop */}
            <div className="overflow-x-auto hidden md:block">
              <table className="min-w-full text-sm sm:text-base text-left border-gray-200">
                <thead className="bg-gray-50 text-gray-700 text-base sm:text-lg">
                  <tr>
                    <th className="py-3 px-4 sm:px-5">Member</th>
                    <th className="py-3 px-4 sm:px-5">Contact</th>
                    <th className="py-3 px-4 sm:px-5">Status</th>
                    <th className="py-3 px-4 sm:px-5">Details</th>
                    <th className="py-3 px-4 sm:px-5">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  {error && (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-red-500">
                        Something went wrong
                      </td>
                    </tr>
                  )}
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-6">
                        <div className="w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      </td>
                    </tr>
                  ) : (
                    filterSearch.map((u) => (
                      <tr
                        key={u.id}
                        className="border-t border-gray-200 hover:bg-gray-50 text-gray-700"
                      >
                        <td className="py-4 px-5 font-medium">
                          {u.firm_name}
                          <p className="font-light text-gray-600">
                            {u.person_name}
                          </p>
                        </td>
                        <td className="py-4 px-5">
                          <p>{u.email}</p>
                          <p className="text-sm text-gray-500">{u.phone}</p>
                        </td>
                        <td className="py-4 px-5">
                          <MembershipPill membership={u.status} />
                        </td>
                        <td className="py-4 px-5">
                          <NavLink
                            to={`/classified/${u.id}`}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg text-sm sm:text-base hover:bg-blue-500"
                          >
                            View
                          </NavLink>
                        </td>
                        <td className="py-4 px-5">
                          <button
                            className="flex items-center gap-1 px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-red-600 text-white rounded-lg text-sm sm:text-base hover:bg-red-500"
                            onClick={() => setConfirmDelete(u.id)}
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                  {!loading && filterSearch.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-500 text-lg"
                      >
                        No members found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 p-4">
              {filterSearch.map((u) => (
                <div
                  key={u.id}
                  className="border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  <h3 className="font-semibold text-lg">{u.firm_name}</h3>
                  <p className="text-gray-600">{u.person_name}</p>
                  <div className="mt-2 text-sm text-gray-700">
                    <p>{u.email}</p>
                    <p className="text-gray-500">{u.phone}</p>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <MembershipPill membership={u.status} />
                    <div className="flex gap-2">
                      <NavLink
                        to={`${u.id}`}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500"
                      >
                        View
                      </NavLink>
                      <button
                        className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-500"
                        onClick={() => setConfirmDelete(u.id)}
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm sm:max-w-md md:max-w-lg shadow-xl">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Are you sure you want to delete this member?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
              <button
                onClick={() => setConfirmDelete(null)}
                className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* Membership Pill */
const MembershipPill = ({ membership }) => {
  return (
    <span>
      {membership === "pending" ? (
        <img
          src="https://img.icons8.com/?size=100&id=116513&format=png&color=000000"
          alt="pending"
          className="size-5"
        />
      ) : membership === "approved" ? (
        <img
          src="https://img.icons8.com/?size=100&id=3IIjwmyE1P5M&format=png&color=40C057"
          alt="approved"
          className="size-5"
        />
      ) : (
        <svg
          className="h-6 w-6 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      )}
    </span>
  );
};
