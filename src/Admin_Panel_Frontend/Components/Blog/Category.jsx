import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import Header from "../Header/Header";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../Redux/Slice";

export default function Category() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [catDescription, setCatDescription] = useState("");
  const Category = useSelector((state) => state.app.Category);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/categories`)
      .then((response) => {
        dispatch(setCategory(response.data));
      })
      .catch(() => {
        toast.error("Something Went Wrong");
      });
  }, [dispatch]);

  const handleCreate = async () => {
    const items = {
      category_name: categoryName,
      category_description: catDescription,
    };

    if (!categoryName || !catDescription) {
      toast.error("Fill Valid Inputs");
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/blogs/category`,
          items
        );
        if (response?.data) {
          toast.success("Category Created Successfully");
          setCatDescription("");
          setCategoryName("");
          setIsOpen(false);
          const updatedCategories = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/blogs/categories`
          );
          dispatch(setCategory(updatedCategories.data));
        }
      } catch (error) {
        toast.error("Something Went Wrong");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/blogs/category/${id}`
      );
      toast.success("Category Deleted Successfully");
      // Refresh categories
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/blogs/categories`
      );
      dispatch(setCategory(response.data));
    } catch (error) {
      toast.error("Failed to Delete Category");
    }
  };

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
      <main className="flex-1 flex flex-col md:ml-64 bg-gray-50 min-h-screen">
        <Header setOpenSidebar={setOpenSidebar} />

        <div className="p-6">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 border-1 border-gray-200 rounded-md p-2 pb-4 shadow bg-white">
            <div className="mt-5">
              <h1 className="text-3xl text-gray-700 font-bold">
                Blog Categories
              </h1>
              <p className="text-gray-600 text-xl">
                Manage news and article categories for your matrimonial website
              </p>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="mt-4 sm:mt-0 bg-gray-800 hover:bg-gray-700 font-semibold text-white px-4 py-2 rounded-md shadow"
            >
              + Add Category
            </button>
          </div>

          {/* Category Table */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-20">
            <table className="w-full ">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-lg font-bold text-gray-700">
                    Id
                  </th>
                  <th className="px-6 py-3 text-left text-lg font-bold text-gray-700">
                    Category Name
                  </th>
                  <th className="px-6 py-3 text-left text-lg font-bold text-gray-700">
                    Description
                  </th>
                  <th className="px-6 py-3 text-center text-lg font-bold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {Category.length > 0 ? (
                  Category.map((item) => (
                    <tr
                      key={item.category_id}
                      className="border-1 border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-3 text-md text-gray-700">
                        {item.category_id}
                      </td>
                      <td className="px-6 py-3 text-md font-medium text-gray-900">
                        {item.category_name}
                      </td>
                      <td className="px-6 py-3 text-md text-gray-600">
                        {item.category_description}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <button
                          onClick={() => handleDelete(item.category_id)}
                          className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md shadow"
                        >
                          <TrashIcon className="h-4 w-4" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700  p-4">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute text-xl top-4 right-4 text-red-600 hover:text-red-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h2 className="text-xl font-bold mb-2">Add New Category</h2>
            <p className="text-md text-gray-500 mb-4">
              Create a new category for organizing your blog articles.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-md font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g., Business"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-md font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={catDescription}
                  onChange={(e) => setCatDescription(e.target.value)}
                  placeholder="Brief description of this category"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                />
              </div>

              {/* Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => handleCreate()}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
