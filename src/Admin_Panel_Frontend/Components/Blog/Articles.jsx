import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import {XMarkIcon } from "@heroicons/react/24/outline";
import Header from '../Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setArticle } from '../../Redux/Slice';
import toast from 'react-hot-toast';

export default function Articles() {
     const [openSidebar, setOpenSidebar] = useState(false);
     const [search,setSearch]=useState('');
     const dispatch=useDispatch();
     const [loading,setLoading]=useState(false);
     const Articles=useSelector((state)=>state.app.Articles);
      const Category = useSelector((state) => state.app.Category);

     const [Cat,setCategory]=useState('All');

     const filterData=Cat==='All'?Articles:Articles.filter((item)=>item.Category.category_name===Cat);
     


    useEffect(()=>{
      setLoading(true);

      axios.get('http://localhost:4005/api/blogs').then((response)=>{
        setLoading(false)
        dispatch(setArticle(response.data));
      }).catch((e)=>{
        toast.error('Something Went Wrong')
      });

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

                  <div>
                    <h1>Blog Article</h1>
                    <p>Manage all your blog posts and news articles</p>
                  </div>

                  <div>
                     <div className="p-4 border-gray-200 lg:flex md:flex-wrap sm:flex-wrap">
              <div className="flex items-center gap-2 max-w-2xl w-full border-gray-300 border-2 rounded-xl px-2 py-1">
                <img
                  src="https://img.icons8.com/?size=100&id=lwZinoeNcL3F&format=png&color=000000"
                  alt="search"
                  className="w-5 h-5 text-gray-500"
                />
                <input
                  type="text"
                  placeholder="Search Article..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 border-none px-2 py-1 rounded-lg text-sm sm:text-base focus:outline-none"
                />
              </div>
              </div>

              <select value={Cat} onChange={(e)=>setCategory(e.target.value)}>
                <option value="All">--Select Category--</option>
                {
                  Category.map((item)=>(
                    <option key={item.category_id} value={item.category_name}>
                      {item.category_name}
                    </option>
                  ))

                }
                

              </select>

              <div>

              </div>

              <div>
              <h1>Article {Articles.length}</h1>

              {
                loading? <p></p>:
                filterData.map((item)=>(
                  <div key={item.post_id}>
                    <h1>{item.author_name}</h1>
                    <p>{item.excerpt}</p>
                    <p>{item.title}</p>
                    <p>{item.publish_date}</p>
                    <button>View </button>
                    <button>Delete</button>
                  </div>
                ))
              }
              </div>


                  </div>


                </main>
            
                          
        
      
    </div>
  )
}
