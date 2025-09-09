import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import {XMarkIcon } from "@heroicons/react/24/outline";
import Header from '../Header/Header';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Category() {
     const [openSidebar, setOpenSidebar] = useState(false);
     const [isOpen,setIsOpen]=useState(false);
     const [categoryName,setCategoryName]=useState('');
     const [catDescription,setCatDescription]=useState('');


     const handleCreate=async()=>{
     
        const items={
            category_name:categoryName,
            category_description:catDescription
        }

        try {
            const response=await axios.post('http://localhost:4005/api/blogs/category',items);
            if(response?.data){
                toast.success("Category Created Successfully");
                setCatDescription('')
                setCategoryName('')
            }
            
        } catch (error) {
            toast.error("Something Went Wrong");
        }

     }
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

                                <div className='flex gap-20 mt-10 ml-5'>
                                    <div>
                                        <h1>Blog Categories</h1>
                                        <p>Manage news and article categories for your matrimonial website</p>
                                    </div>

                                    <div className=''>
                                        <button 
                                        onClick={()=>setIsOpen(true)}

                                        className='bg-gray-600 text-white p-1 rounded-sm'
                                        >+ Add Category</button>
                                    </div>

                                   <div >
                                     {
                                        isOpen?
                                        (
                                           <div>

                                            <div className='flex gap-2'>
                                                <h1>Add New Category</h1>
                                                <button onClick={()=>setIsOpen(false)}>X</button>
                                            </div>

                                             
                                           <form onSubmit={(e)=>e.preventDefault()}>
                                            <input type="text" value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} placeholder='Category Name' /> <br />
                                            <input type="text" value={catDescription} onChange={(e)=>setCatDescription(e.target.value)} placeholder='Category Description' /> <br />
                                            <button onClick={()=>handleCreate()}>Create Category</button>


                                           </form>

                                           </div>

                                        ):''
                                    }
                                   </div>

                                    

                                </div>
                </main>
            
                          
        
      
    </div>
  )
}
