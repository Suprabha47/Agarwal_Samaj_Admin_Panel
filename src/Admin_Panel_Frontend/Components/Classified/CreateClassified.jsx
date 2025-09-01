import React, { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Header from "../Header/Header";
import { useFormik } from "formik";
import { Initial_Values } from "./utils/Initial_Values";
import { Create_Validation_Schema } from "./utils/Create_Validation_Schema";

export default function CreateClassified() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const formik = useFormik({
    initialValues: Initial_Values,
    validationSchema: Create_Validation_Schema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
      setPreviewImages([]);
    },
  });

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue("photos", files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  return (
    <div className="flex">
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

      <main className="flex-1 md:ml-64 min-h-screen bg-gray-100">
        {/* Header fixed */}
        <Header isCreate={true} setOpenSidebar={setOpenSidebar} />

        {/* Form Container */}
        <div className="max-w-5xl mx-auto mt-32 sm:mt-20 p-6 sm:p-10 bg-white rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Create Classified
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                )}
              </div>

              {/* Firm Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Firm Name</label>
                <input
                  type="text"
                  name="firm_name"
                  value={formik.values.firm_name}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                />
                {formik.touched.firm_name && formik.errors.firm_name && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.firm_name}</p>
                )}
              </div>

              {/* Firm Address */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">Firm Address</label>
                <textarea
                  name="firm_address"
                  value={formik.values.firm_address}
                  onChange={formik.handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                />
                {formik.touched.firm_address && formik.errors.firm_address && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.firm_address}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                )}
              </div>

              {/* Website */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Website</label>
                <input
                  type="text"
                  name="website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                />
              </div>

              {/* Business Category */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Business Category</label>
                <select
                  name="business_category"
                  value={formik.values.business_category}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                >
                  <option value="">Select Category</option>
                  <option value="IT">IT</option>
                  <option value="Retail">Retail</option>
                  <option value="Education">Education</option>
                  <option value="Healthcare">Healthcare</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Photos */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">Photos</label>
                <input
                  type="file"
                  name="photos"
                  multiple
                  onChange={handlePhotosChange}
                  className="w-full"
                />
                <div className="flex flex-wrap mt-3 gap-3">
                  {previewImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Preview ${index}`}
                      className="w-28 h-28 object-cover rounded-xl border border-gray-200 shadow-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Approval By */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Approval By</label>
                <input
                  type="text"
                  name="approval_by"
                  value={formik.values.approval_by}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                />
              </div>

              {/* Approval Date */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Approval Date</label>
                <input
                  type="date"
                  name="approval_date"
                  value={formik.values.approval_date}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-gray-600 text-white font-semibold px-6 py-2 rounded-xl hover:bg-gray-500  duration-300 shadow-lg hover:scale-98 transition-transform ease-in duration-1000"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>

      <Outlet />
    </div>
  );
}
