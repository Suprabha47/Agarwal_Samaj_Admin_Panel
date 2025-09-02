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
import ClassifiedOutlet from "../Components/Classified/ClassifiedOutlet";
import CreateClassified from "../Components/Classified/CreateClassified";
import ViewClassified from "../Components/Classified/ViewClassified";
import PublicRoute from "../Components/ProtectedRoute/PublicRoute";
import UpdateClassified from "../Components/Classified/UpdateClassified";

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoute>
          <SignIn />
        </PublicRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <PublicRoute>
          <SignUp />
        </PublicRoute>
      ),
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
          <ClassifiedOutlet />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Classified />,
        },
        {
          path: "createClassified",
          element: <CreateClassified />,
        },
        {
          path: ":id",
          element: <ViewClassified />,
        },
        {
          path: "updateClassified/:id",
          element: <UpdateClassified />,
        },
      ],
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
