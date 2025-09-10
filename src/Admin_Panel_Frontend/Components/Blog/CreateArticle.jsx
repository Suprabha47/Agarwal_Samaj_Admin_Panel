import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Header from "../Header/Header";
import { useFormik } from "formik";
import { initialValues } from "./utils/Initial_Values";
import { ValidationSchema } from "./utils/Yup_Validation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../Redux/Slice";

export default function CreateArticle() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const Category = useSelector((state) => state.app.Category);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:4005/api/blogs/categories")
      .then((response) => {
        dispatch(setCategory(response.data));
      })
      .catch(() => {
        toast.error("Failed to load categories");
      });
  }, [dispatch]);

  const formik = useFormik({
    initialValues,
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("author_name", values.author_name);
        formData.append("excerpt", values.excerpt);
        formData.append("content", values.content);
        formData.append("category_id", Number(values.category_id));
        formData.append("thumbnail_url", values.thumbnail_url);

        const response = await axios.post(
          "http://localhost:4005/api/blogs",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response?.data) {
          toast.success(" Post Created Successfully");
          formik.resetForm();
        
        }
      } catch (error) {
        toast.error(" Something Went Wrong");
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
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
     <main className="flex-1 flex flex-col md:ml-64">
  <Header setOpenSidebar={setOpenSidebar} />

  <div className="flex flex-col flex-1 rounded-2xl p-4 sm:p-6 mt-6 w-full">
    <p className=" text-lg text-gray-600 font-semibold  sm:text-xl mb-6">
      Add a new Blog Post or News Article
    </p>

    <form
      onSubmit={formik.handleSubmit}
      className="grid grid-cols-1 bg-white lg:grid-cols-2 gap-6 border-2 border-gray-200 p-4 sm:p-6 rounded-md shadow "
    >
      {/* Title */}
      <div className="col-span-1 lg:col-span-2">
        <label className="block font-medium mb-1 text-xl">Title</label>
        <input
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          className="w-full sm:w-3/4 lg:w-2/3 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Enter article title"
        />
        {formik.errors.title && (
          <p className="text-red-500 text-md">{formik.errors.title}</p>
        )}
      </div>

      {/* Author */}
      <div>
        <label className="block font-medium mb-1 text-xl">Author Name</label>
        <input
          type="text"
          name="author_name"
          value={formik.values.author_name}
          onChange={formik.handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Enter author name"
        />
        {formik.errors.author_name && (
          <p className="text-red-500 text-md">{formik.errors.author_name}</p>
        )}
      </div>

      {/* Excerpt */}
      <div>
        <label className="block font-medium mb-1 text-xl">Excerpt</label>
        <input
          type="text"
          name="excerpt"
          value={formik.values.excerpt}
          onChange={formik.handleChange}
          className="w-full sm:w-3/4 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Short summary of the article"
        />
        {formik.errors.excerpt && (
          <p className="text-red-500 text-md">{formik.errors.excerpt}</p>
        )}
      </div>

      {/* Content */}
      <div className="col-span-1 lg:col-span-2">
        <label className="block font-medium mb-1 text-xl">Content</label>
        <textarea
          name="content"
          rows={8}
          value={formik.values.content}
          onChange={formik.handleChange}
          className="w-full sm:w-3/4 lg:w-2/3 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Write your full article here"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium mb-1 text-xl">Category</label>
        <select
          name="category_id"
          value={formik.values.category_id}
          onChange={formik.handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="">Select a category</option>
          {Category?.length > 0 ? (
            Category.map((item) => (
              <option key={item.category_id} value={item.category_id}>
                {item.category_name}
              </option>
            ))
          ) : (
            <option disabled>Loading categories...</option>
          )}
        </select>
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block font-medium mb-1 text-xl">Thumbnail Image</label>
        <input
          name="thumbnail_url"
          type="file"
          accept="image/*"
          onChange={(event) =>
            formik.setFieldValue("thumbnail_url", event.currentTarget.files[0])
          }
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {formik.errors.thumbnail_url && formik.touched.thumbnail_url && (
    <p className="text-red-500 text-md">{formik.errors.thumbnail_url}</p>
  )}
      </div>

      {/* Submit Button */}
      <div className="col-span-1 lg:col-span-2 flex justify-center">
        <button
          type="submit"
          className="w-full sm:w-1/2 lg:w-1/3 bg-gray-600 hover:bg-gray-700 text-white rounded px-4 py-3 font-semibold text-xl sm:text-xl transition"
        >
          Publish Article
        </button>
      </div>
    </form>
  </div>
</main>


      <Toaster position="top-center" />
    </div>
  );
}