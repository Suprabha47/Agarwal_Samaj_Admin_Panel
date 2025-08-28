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
import CreateMember from "../Components/Members/CreateMember";
import MemberOutlet from "../Components/Members/MemberOutlet";
import ViewMember from "../Components/Members/ViewMember";
import UpdateMember from "../Components/Members/UpdateMember";

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
      path: "/members",
      element: (
        <ProtectedRoute>
          <MemberOutlet />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "createMember",
          element: <CreateMember />,
        },
        {
          index: true,
          element: <Member />,
        },
        {
          path: "member/:id",
          element: <ViewMember />,
        },
        {
          path: "updateMember/:id",
          element: <UpdateMember />,
        },
      ],
    },
    {
      path: "/classified",
      element: (
        <ProtectedRoute>
          <Classified />
        </ProtectedRoute>
      ),
    },
    {
      path: "/donations",
      element: (
        <ProtectedRoute>
          <Donation />
        </ProtectedRoute>
      ),
    },
    {
      path: "/membership",
      element: (
        <ProtectedRoute>
          <MemberShip />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
