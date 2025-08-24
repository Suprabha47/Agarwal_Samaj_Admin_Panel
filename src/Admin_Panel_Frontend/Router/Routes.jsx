import React from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import SignIn from '../Components/SignIn/SignIn'
import SignUp from '../Components/SignUp/SignUp'

export default function Routes() {
    const router=createBrowserRouter([
        {
            path:"/",
            element:<SignIn/>
        },
        {
            path:'/signup',
            element:<SignUp/>
        }
        
    ])
  return (
    <div>
        <RouterProvider router={router}/>   
    </div>
  )
}
