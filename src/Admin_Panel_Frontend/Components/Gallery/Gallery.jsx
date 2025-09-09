import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Header from "../Header/Header";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Gallery() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const albumImageInputRef = useRef(null);

 
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [eventDate, setEventDate] = useState("");


  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // Album Images
  const [albumImages, setAlbumImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const [loading, setLoading] = useState(false);

  // Edit Mode
  const [editMode, setEditMode] = useState(false);
  const [editAlbumId, setEditAlbumId] = useState(null);

  // Fetch albums on mount
  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4005/api/albums");
      setAlbums(res.data || []);
    } catch (err) {
      toast.error("Failed to load albums.");
    } finally {
      setLoading(false);
    }
  };

  const handleCoverImageChange = (e) => setCoverImage(e.target.files[0]);
  const handleAlbumImageChange = (e) => setNewImages([...e.target.files]);

  const resetForm = () => {
    setAlbumTitle("");
    setAlbumDescription("");
    setCoverImage(null);
    setEventDate("");
    setEditMode(false);
    setEditAlbumId(null);
  };

  const handleCreateAlbum = async (e) => {
    e.preventDefault();

    if (!albumTitle || !albumDescription || !coverImage || !eventDate) {
      toast.error("Please fill all fields and choose a cover image.");
      return;
    }
     
    const formData = new FormData();
    formData.append("album_title", albumTitle);
    formData.append("album_description", albumDescription);
    formData.append("cover_image", coverImage);
    formData.append("event_date", eventDate);

    try {
      await axios.post("http://localhost:4005/api/albums", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Album created successfully!");
      resetForm();
      fetchAlbums();
    } catch (err) {
      toast.error("Failed to create album.");
    }
  };

  const handleUpdateAlbum = async (e) => {
    e.preventDefault();
    if (!editAlbumId) return;

    const formData = new FormData();
    formData.append("album_title", albumTitle);
    formData.append("album_description", albumDescription);
    formData.append("event_date", eventDate);
    if (coverImage) formData.append("cover_image", coverImage);

    try {
      await axios.put(
        `http://localhost:4005/api/albums/${editAlbumId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Album updated successfully!");
      resetForm();
      fetchAlbums();
    } catch (err) {
      toast.error("Failed to update album.");
    }
  };

  const handleDeleteAlbum = (albumId) => {
  confirmToast("Are you sure you want to delete this album?", async () => {
    try {
      await axios.delete(`http://localhost:4005/api/albums/${albumId}`);
      toast.success("Album deleted successfully!");
      fetchAlbums();
      if (selectedAlbum === albumId) setSelectedAlbum(null);
    } catch (err) {
      toast.error("Failed to delete album.");
    }
  });
};


  const handleSelectAlbum = async (albumId) => {
    setSelectedAlbum(albumId);
    try {
      const res = await axios.get(
        `http://localhost:4005/api/albums/${albumId}/images`
      );
      setAlbumImages(res.data || []);
    } catch (err) {
      toast.error("Failed to load album images.");
    }
  };

  const handleAddImages = async (e) => {
    e.preventDefault();
    if (!selectedAlbum) {
      toast.error("Please select an album first.");
      return;
    }
    if (newImages.length === 0) {
      toast.error("Please select at least one image.");
      return;
    }

    const formData = new FormData();
    newImages.forEach((file) => formData.append("images", file));

    try {
      await axios.post(
        `http://localhost:4005/api/albums/${selectedAlbum}/images`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Images added successfully!");
      setNewImages([]);
      if (albumImageInputRef.current) albumImageInputRef.current.value = "";
      handleSelectAlbum(selectedAlbum); // refresh images
    } catch (err) {
      toast.error("Failed to add images.");
    }
  };
  const handleDeleteImage = async (imageId) => {
    try {
      await axios.delete(`http://localhost:4005/api/images/${imageId}`);
      toast.success("Image deleted successfully!");
      handleSelectAlbum(selectedAlbum); // refresh images
    } catch (err) {
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
          <h1 className="text-2xl font-bold mb-6">Manage Albums</h1>

          {/* Create or Edit Album */}
          <div className="bg-white shadow-md rounded-xl p-6 mb-10 w-[50%]">
            <h2 className="text-lg font-semibold mb-4">
              {editMode ? "Edit Album" : "Create New Album"}
            </h2>
            <form onSubmit={editMode ? handleUpdateAlbum : handleCreateAlbum}>
              <div className="mb-4">
                <input
                  type="text"
                  value={albumTitle}
                  onChange={(e) => setAlbumTitle(e.target.value)}
                  placeholder="Album Title"
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  value={albumDescription}
                  onChange={(e) => setAlbumDescription(e.target.value)}
                  placeholder="Album Description"
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                  {...(!editMode ? { required: true } : {})}
                />
              </div>
              <button
                type="submit"
                className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800"
              >
                {editMode ? "Update Album" : "Create Album"}
              </button>
              {editMode && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="ml-4 text-gray-600 hover:underline"
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          {/* Albums List */}
          <div className="bg-white shadow-md rounded-xl p-6 mb-10">
            <h2 className="text-lg font-semibold mb-4">Albums</h2>
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="w-10 h-10 border-4 border-gray-700 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : albums.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {albums.map((album) => (
                  <div
                    key={album.album_id}
                    className={`bg-white rounded-lg shadow-md overflow-hidden ${
                      selectedAlbum === album.album_id
                        ? "border-2 border-blue-500"
                        : ""
                    }`}
                  >
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}${album.cover_image_url}`}
                      alt={album.album_title}
                      className="w-full h-60 object-cover cursor-pointer"
                      onClick={() => handleSelectAlbum(album.album_id)}
                    />
                    <div className="p-3">
                      <h3 className="font-semibold">{album.album_title}</h3>
                      <p className="text-gray-600">{album.album_description}</p>
                    </div>

                    {/* Edit / Delete Actions */}
                    <div className="flex justify-between px-3 pb-3">
                      <button
                        onClick={() => {
                          setEditMode(true);
                          setEditAlbumId(album.album_id);
                          setAlbumTitle(album.album_title);
                          setAlbumDescription(album.album_description);
                          setEventDate(album.event_date?.split("T")[0] || "");
                        }}
                        className="text-blue-600 "
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAlbum(album.album_id)}
                        className="text-red-600 "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No albums found.</p>
            )}
          </div>

          {/* Add Images to Album */}
          {selectedAlbum && (
            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">
                Add Images to Album
              </h2>
              <form onSubmit={handleAddImages}>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={albumImageInputRef}
                  onChange={handleAlbumImageChange}
                  className="mb-4 w-full border border-gray-300 px-4 py-2 rounded"
                />
                <button
                  type="submit"
                  className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800"
                >
                  Add Images
                </button>
              </form>

              {/* Display Album Images */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                {albumImages.length > 0 ? (
                  albumImages.map((img) => (
                    <div
                      key={img.image_id}
                      className="relative group rounded-lg overflow-hidden shadow-md"
                    >
                      {/* Delete Button with SVG */}
                      <button
                        onClick={() => handleDeleteImage(img.image_id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </button>

                      {/* Image */}
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/${img.image_url}`}
                        alt={img.alt_text || "Album Image"}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-full text-center">
                    No images in this album yet.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}


export const confirmToast = (message, onConfirm) => {
  toast.custom((t) => (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3 w-72  h-30">
      <p className="text-gray-800 font-medium">{message}</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            toast.dismiss(t.id);
            await onConfirm();
          }}
          className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 text-white text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  ));
};