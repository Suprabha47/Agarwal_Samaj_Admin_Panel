import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import {XMarkIcon } from "@heroicons/react/24/outline";
import Header from '../Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setArticle, setCategory } from '../../Redux/Slice';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router';

export default function Articles() {
     const [openSidebar, setOpenSidebar] = useState(false);
     const [search,setSearch]=useState('');
     const dispatch=useDispatch();
     const [loading,setLoading]=useState(false);
     const Articles=useSelector((state)=>state.app.Articles);
      const Category = useSelector((state) => state.app.Category);

     const [Cat,setCat]=useState('All');

     const filterData=Cat==='All'?Articles:Articles.filter((item)=>item.Category.category_name===Cat);

     const filterSearch=filterData.filter((item)=>{
      return item.author_name.toLowerCase().replace(/\s+/g, "").includes(search.toLowerCase().replace(/\s+/g, ""))
     });
     
    useEffect(()=>{
      setLoading(true)
      const timer=setTimeout(() => {
        setLoading(false)
        axios.get('http://localhost:4005/api/blogs').then((response)=>{
        
        dispatch(setArticle(response.data));
      }).catch((e)=>{
        toast.error('Something Went Wrong');
      });
      }, 500);

      return ()=>clearTimeout(timer);

    },[dispatch]);

     useEffect(() => {
    axios
      .get("http://localhost:4005/api/blogs/categories")
      .then((response) => {
        dispatch(setCategory(response.data));
      })
      .catch(() => {
        toast.error("Something Went Wrong");
      });
  }, [dispatch]);


 
const handleDelete = (post_id) => {
  toast((t) => (
    <div className="p-2">
      <p className="text-lg font-medium text-gray-800">Are you sure you want to delete?</p>
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={async () => {
            try {
              const response = await axios.delete(`http://localhost:4005/api/blogs/${post_id}`);
              if (response?.data) {
                toast.success("Article Deleted Successfully");
                window.location.href = "/blog/articles";
              }
            } catch {
              toast.error("Something Went Wrong");
            } finally {
              toast.dismiss(t.id);
            }
          }}
          className="px-3 py-1 text-md bg-red-600 hover:bg-red-700 text-white rounded-md"
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-3 py-1 text-md bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          No
        </button>
      </div>
    </div>
  ));
};
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

                 <div className="mb-6 mt-5 ">
    <h1 className="text-3xl font-bold text-gray-800 ml-5">Blog Articles</h1>
    <p className="text-gray-600 text-lg ml-5">Manage all your blog posts and news articles</p>
  </div>

  {/* Filters */}
  <div className="bg-white p-4 rounded-lg shadow-md mb-6">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Search */}
      <div className="flex items-center gap-2 max-w-md w-full border border-gray-300 rounded-lg px-2 py-1">
        <img
          src="https://img.icons8.com/?size=100&id=lwZinoeNcL3F&format=png&color=000000"
          alt="search"
          className="w-5 h-5 text-gray-500"
        />
        <input
          type="text"
          placeholder="Search Author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border-none px-2 py-1 text-md focus:outline-none"
        />
      </div>

      {/* Category Select */}
      <select
        value={Cat}
        onChange={(e) => setCat(e.target.value)}
        className="border mr-4 border-gray-300 rounded-lg px-3 py-2 text-md font-medium bg-white focus:outline-none"
      >
        <option value="All">All Categories</option>
        {Category.map((item) => (
          <option key={item.category_id} value={item.category_name}>
            {item.category_name}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Articles Table */}
  <div className="w-[96%] ml-6 bg-white rounded-lg shadow-md overflow-x-auto mt-5">
    <table className="w-full text-sm text-left text-gray-600">
      <thead className="bg-gray-100 text-gray-700 text-lg uppercase">
        <tr>
          <th className="px-6 py-3">Title</th>
          <th className="px-6 py-3">Author</th>
          <th className="px-6 py-3">Category</th>
          <th className="px-6 py-3">Published</th>
          <th className="px-6 py-3">Excerpt</th>
          <th className="px-6 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="6" className="text-center py-6">
              <div className="w-6 h-6 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </td>
          </tr>
        ) : filterSearch.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center py-6 text-gray-500">
              No articles found
            </td>
          </tr>
        ) : (
          filterSearch.map((item) => (
            <tr
              key={item.post_id}
              className="border-gray-300 border-1 hover:bg-gray-50 transition"
            >
              <td className="px-6 py-3 font-medium text-lg text-gray-900">
                {item.title}
              </td>
              <td className="px-6 py-3 text-lg">{item.author_name}</td>
              <td className="px-6 py-3 text-lg">{item.Category?.category_name}</td>
              <td className="px-6 py-3 text-lg">{item.publish_date.split('T')[0]}</td>
              <td className="px-6 py-3 text-lg">{item.excerpt}</td>
              <td className="px-6 py-3 text-center space-x-2">
                <div className='inline-flex gap-3'>
                  <button className="px-3 py-1 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-lg">
               <NavLink to={`article/${item.post_id}`}>
                  View

               </NavLink>
                </button>
                <button
                  onClick={() => handleDelete(item.post_id)}
                  className="px-3 py-1 text-white bg-red-600 hover:bg-red-700 rounded-md text-lg"
                >
                  Delete
                </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>

  </main>
            
                          
        
  <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}
