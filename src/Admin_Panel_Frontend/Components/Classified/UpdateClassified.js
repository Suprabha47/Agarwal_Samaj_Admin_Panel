import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Header from "../Header/Header";
import { useFormik } from "formik";
import { Initial_Values } from "./utils/Initial_Values";
import { Create_Validation_Schema } from "./utils/Create_Validation_Schema";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function UpdateClassified() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // get id from route

  const formik = useFormik({
    initialValues: Initial_Values,
    validationSchema: Create_Validation_Schema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        // Append normal fields
        formData.append("person_name", values.person_name);
        formData.append("firm_name", values.firm_name);
        formData.append("firm_address", values.firm_address);
        formData.append("phone", values.phone);
        formData.append("email", values.email);
        formData.append("website", values.website);
        formData.append("business_category", values.business_category);

        // Append new photos
        if (values.photos && values.photos.length > 0) {
          values.photos.forEach((file) => {
            formData.append("photos", file);
          });
        }

        // Append deleted photos
        if (deletedImages.length > 0) {
          formData.append("deletedPhotos", JSON.stringify(deletedImages));
        }

        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/classifieds/${id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.data) {
          toast.success("Classified Updated Successfully");

          setTimeout(() => {
            setDeletedImages([]); // Reset deleted images
            window.location.href = "/classified";
          }, 500);
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "Update failed");
      }
    },
  });

  // Fetch existing classified data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/classifieds/${id}`
        );
        const data = response.data;

        formik.setValues({
          person_name: data.person_name || "",
          firm_name: data.firm_name || "",
          firm_address: data.firm_address || "",
          phone: data.phone || "",
          email: data.email || "",
          website: data.website || "",
          business_category: data.business_category || "",
          photos: [], // Will only hold new uploads
        });

        if (data?.photos) {
          const images = data?.photos?.split(",");
          setPreviewImages(images);
        }

        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch classified data");
      }
    };

    fetchData();
  }, [id]);

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedFiles = [...(formik.values.photos || []), ...files];

    if (updatedFiles.length + previewImages.length - deletedImages.length > 5) {
      toast.error("You can upload a maximum of 5 photos");
      return;
    }

    formik.setFieldValue("photos", updatedFiles);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const removePhoto = (index) => {
    const removedImage = previewImages[index];

    // If removed image is an existing one (not a new blob URL), track for deletion
    if (typeof removedImage === "string" && !removedImage.startsWith("blob:")) {
      setDeletedImages((prev) => [...prev, removedImage]);
    }

    // Remove from previewImages
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));

    // Remove from formik if it was a newly uploaded file
    const updatedFiles = formik.values.photos.filter((_, i) => i !== index);
    formik.setFieldValue("photos", updatedFiles);
  };
  if (loading) return <div>Loading...</div>;

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
        <Header isCreate={false} setOpenSidebar={setOpenSidebar} />

        <div className="max-w-5xl mx-auto mt-32 sm:mt-20 p-6 sm:p-10 bg-white rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Update Classified
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Form fields are same as CreateClassified */}
            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="person_name"
                  value={formik.values.person_name}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Firm Name
                </label>
                <input
                  type="text"
                  name="firm_name"
                  value={formik.values.firm_name}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                />
              </div>

              {/* Firm Address */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Firm Address
                </label>
                <textarea
                  name="firm_address"
                  value={formik.values.firm_address}
                  onChange={formik.handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                />
              </div>

              {/* Phone, Email, Website, Business Category */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Business Category
                </label>
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

              {/* Photos */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Photos (max 5)
                </label>
                <input
                  type="file"
                  name="photos"
                  multiple
                  onChange={handlePhotosChange}
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {previewImages.length}/5 uploaded
                </p>
                <div className="flex flex-wrap mt-3 gap-3">
                  {previewImages.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${img}`}
                        alt={`Preview ${index}`}
                        className="w-28 h-28 object-cover rounded-xl border border-gray-200 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-gray-600 text-white font-semibold px-6 py-2 rounded-xl hover:bg-gray-500 duration-300 shadow-lg hover:scale-98 transition-transform ease-in duration-1000"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </main>
      <Toaster />
      <Outlet />
    </div>
  );
}
