import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import SignIn from "../Components/SignIn/SignIn";
import SignUp from "../Components/SignUp/SignUp";
import Home from "../Components/Home/Home";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";
import Member from "../Components/Members/Member";
import Classified from "../Components/Classified/Classified";
import Donation from "../Components/Donations/Donation";
import MemberShip from "../Components/Membership/MemberShip";


export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
        path:"/members",
        element:(
            <ProtectedRoute>
                <Member/>
            </ProtectedRoute>
        )
    },
    {
        path:"/classified",
        element:(
            <ProtectedRoute>
                <Classified/>
            </ProtectedRoute>
        )
    },
     {
        path:"/donations",
        element:(
            <ProtectedRoute>
              <Donation/>
            </ProtectedRoute>
        )
    },
     {
        path:"/membership",
        element:(
            <ProtectedRoute>
              <MemberShip/>
            </ProtectedRoute>
        )
    },

  ]);

  return <RouterProvider router={router} />;
}
