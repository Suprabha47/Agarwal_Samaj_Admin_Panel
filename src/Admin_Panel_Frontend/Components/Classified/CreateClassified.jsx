import React, { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../Sidebar/Sidebar'
import { XMarkIcon } from "@heroicons/react/24/outline";
import Header from "../Header/Header";
import { useFormik } from 'formik';
import { Initial_Values } from './utils/Initial_Values';
import { Create_Validation_Schema } from './utils/Create_Validation_Schema';
export default function CreateClassified() {
      const [openSidebar, setOpenSidebar] = useState(false);

      const formik=useFormik({
        initialValues:Initial_Values,
        validationSchema:Create_Validation_Schema,                                                                                                               
        onSubmit:async(values,{resetForm})=>{
            console.log(values);
            resetForm();
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
                    <Header isCreate={true}/>

                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name='name' value={formik.values.name} onChange={formik.handleChange} className='border-gray-700 w-[20%]' />

                    </form>


                    </main>
    
<Outlet/>
    </div>
  )
}
