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
import CreateMember from "../Components/Members/CreateMember";
import MemberOutlet from "../Components/Members/MemberOutlet";
import ViewMember from "../Components/Members/ViewMember";
import UpdateMember from "../Components/Members/UpdateMember";
import ClassifiedOutlet from "../Components/Classified/ClassifiedOutlet";
import CreateClassified from "../Components/Classified/CreateClassified";
import ViewClassified from "../Components/Classified/ViewClassified";
import PublicRoute from "../Components/ProtectedRoute/PublicRoute";
import UpdateClassified from "../Components/Classified/UpdateClassified";
import Attributes from "../Components/Attributes/Attributes";
import HomeSliderImage from "../Components/Home_Slider_Img/Home_Slider_Image";
import Gallery from "../Components/Gallery/Gallery";
import Articles from "../Components/Blog/Articles";
import CreateArticle from "../Components/Blog/CreateArticle";
import Category from "../Components/Blog/Category";
import BlogOutlet from "../Components/Blog/BlogOutlet";
import ViewArticle from "../Components/Blog/ViewArticle";
import UpdateArticle from "../Components/Blog/UpdateArticle";

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
      path: "/attributes",
      element: (
        <ProtectedRoute>
      <Attributes/>
        </ProtectedRoute>
      ),
    },
    {
      path:'/sliderImages',
      element:(
        <ProtectedRoute>
          <HomeSliderImage/>
        </ProtectedRoute>
      )
    },
    {
      path:"/gallery",
      element:(
        <ProtectedRoute>
          <Gallery/>
        </ProtectedRoute>
      )
    },
    {
      path:"/blog/articles",
      element:(
        <ProtectedRoute>
         <BlogOutlet/>
        </ProtectedRoute>
      ),
      children:[
        {
          index:true,
          element:<Articles/>

        },
        {
          path:'article/:Id',
          element:<ViewArticle/>
        },
        {
      path:"updateArticle/:Id",
      element:<UpdateArticle/>
    }
      ]
    },
     {
      path:"/blog/create",
      element:(
        <ProtectedRoute>
       <CreateArticle/>
        </ProtectedRoute>
      )
    },
     {
      path:"/blog/category",
      element:(
        <ProtectedRoute>
        <Category/>
        </ProtectedRoute>
      )
    },
  ]);

  return <RouterProvider router={router} />;
}
