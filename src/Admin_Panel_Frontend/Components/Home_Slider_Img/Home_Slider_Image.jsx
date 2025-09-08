import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Header from "../Header/Header";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setSliderImages } from "../../Redux/Slice";

export default function HomeSliderImage() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [image, setImage] = useState(null);
  const [altText, setAltText] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Provide fallback empty array
  const SliderImages = useSelector((state) => state.app.SliderImages || []);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const response = await axios.get("http://localhost:4005/api/sliders");
        if (response.data) {
          dispatch(setSliderImages(response.data));
        }
      } catch (err) {
        toast.error("Failed to fetch images.");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!altText || !image) {
      toast.error("Please provide both image and alt text.");
      return;
    }

    const formData = new FormData();
    formData.append("image_path", image);
    formData.append("alt_text", altText);

    try {
      const response = await axios.post(
        "http://localhost:4005/api/sliders",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data) {
        toast.success("Image uploaded successfully!");
        setImage(null);
        setAltText("");
        window.location.href = "/sliderImages";
      }
    } catch (err) {
      toast.error("Upload failed.");
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:4005/api/sliders/${id}`);
      toast.success("Deleted successfully!");
      window.location.href = "/sliderImages";
    } catch (error) {
      toast.error("Failed to delete image.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
      <main className="flex-1 flex flex-col md:ml-64">
        <Header setOpenSidebar={setOpenSidebar} />

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Home Slider Images</h1>

          {/* Upload Section */}
          <div className="bg-white shadow-md rounded-xl p-6 mb-10 w-[50%]">
            <h2 className="text-lg font-semibold mb-4">Upload New Images</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Image Title"
                  className="w-full sm:w-2/3 border border-gray-300 px-4 py-2 rounded"
                  required
                />
              </div>

              <div className="mb-4">
   <input
    id="file-upload"
    name="image_path"
    type="file"
    accept="image/png, image/jpeg, image/jpg"
    onChange={handleImageChange}
    className="hidden"
    required
  />

  <label
    htmlFor="file-upload"
    className="inline-flex items-center justify-between gap-2 bg-gray-200 border border-gray-300 text-gray-400 px-4 py-2 rounded cursor-pointer hover:bg-gray-200 transition w-full sm:w-2/3"
  >
    <span className="truncate text-gray-700">
      {image ? image.name : "No file chosen"}
    </span>
    <span className="text-md text-gray-500 font-semibold">Choose File</span>
  </label>
  
  <p className="mt-2 text-sm text-gray-500">
    Allowed formats: <span className="font-medium text-gray-700">.jpg, .jpeg, .png</span>
  </p>
</div>

              <button
                type="submit"
                className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800  hover:scale-98 transition-transform ease-in duration-500  "
              >
                Upload Image
              </button>
            </form>
          </div>

          {/* Image Gallery */}
          <div className="bg-white shadow-md rounded-xl p-6 pb-10 mb-10">
            <h2 className="text-lg font-semibold mb-4">Slider Images</h2>

            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="w-10 h-10 border-4 border-gray-700 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : SliderImages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {SliderImages.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <img
                      src={`${
                        process.env.REACT_APP_BACKEND_URL
                      }${item.image_path.replace(/\\/g, "/")}`}
                      alt={item.alt_text}
                      className="w-full h-70 object-cover"
                    />
                    <div className="p-3 flex gap-22">
                      <p className="font-medium text-gray-700 mb-2">
                        Title: {item.alt_text}
                      </p>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-md font-bold mb-2 text-red-600"
                      >
                        Remove
                      </button>
                      {item.created_at && (
                        <p className="font-semibold text-md">
                          {item.created_at.split("T")[0]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No images found.</p>
            )}
          </div>
        </div>
      </main>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
