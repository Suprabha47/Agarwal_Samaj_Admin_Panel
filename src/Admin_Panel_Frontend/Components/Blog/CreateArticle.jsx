import React, { useEffect, useId, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import {XMarkIcon } from "@heroicons/react/24/outline";
import Header from '../Header/Header';
import { useFormik } from "formik";
import { initialValues } from './utils/Initial_Values';
import { ValidationSchema } from './utils/Yup_Validation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../Redux/Slice';


export default function CreateArticle() {
     const [openSidebar, setOpenSidebar] = useState(false);
     const Category=useSelector((state)=>state.app.Category);
     const dispatch=useDispatch()

     useEffect(()=>{
      axios.get('http://localhost:4005/api/blogs/categories').then((response)=>{
        dispatch(setCategory(response.data))

      }).catch((e)=>{
        toast.error('Something Went Wrong')
      })
      
     },[dispatch])



     const formik=useFormik({
        initialValues:initialValues,
        validationSchema:ValidationSchema ,
        onSubmit: async (values) => {
  try {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("author_name", values.author_name);
    formData.append("excerpt", values.excerpt);
    formData.append("content", values.content);
    formData.append("category", values.category);
    formData.append("thumbnail", values.thumbnail_url); // send as file under `thumbnail`

    const response = await axios.post("http://localhost:4005/api/blogs", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response?.data) {
      toast.success("Post Created Successfully");
    }
  } catch (error) {
    toast.error("Something Went Wrong");
  }
}
        
       
     })
    

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

                       <div>
                         <h1>Create New Article</h1>
                        <p>Add a new Blog Post or News Article</p>
                       </div>

                       <div>
                        <h1>Article Details</h1>
                        <p>Basic Info about your article</p>

                        <form onSubmit={formik.handleSubmit}>
                            <input type="text" name='title' value={formik.values.title} onChange={formik.handleChange} placeholder='title' />
                            {
                                formik.errors.title ?? (
                                    <span>{formik.errors.title}</span>
                                )
                            }
                             <br />
                           <input type="text" name='author_name' value={formik.values.author_name} onChange={formik.handleChange} placeholder='author name' />
                            {
                                formik.errors.author_name ?? (
                                    <span>{formik.errors.author_name}</span>
                                )
                            }
                             <br />
                           
                            <input type="text" name='excerpt' onChange={formik.handleChange} placeholder='excerpt' /> 
                             {
                                formik.errors.excerpt ?? (
                                    <span>{formik.errors.excerpt}</span>
                                )
                            }
                            <br />
                            <textarea name="content" value={formik.values.content} onChange={formik.handleChange} placeholder='content'>
                            </textarea>
<br />
                        <select name='category' value={formik.values.category} onChange={formik.handleChange}>
                            {
                              Category.map((item)=>(
                                <option key={item.category_id} value={item.category_id} >
                                  {item.category_name}

                                </option>
                              ))
                            }
                        </select><br />
                         <input
                         name='thumbnail_url'
                                        type="file"
                                        accept="image/*"
                                        onChange={formik.handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />

                       <button value={'submit'}>Publish</button>

                        </form>
                       </div>

                                            
                    </div>                      
                </main>
            
                          
        
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  )
}
