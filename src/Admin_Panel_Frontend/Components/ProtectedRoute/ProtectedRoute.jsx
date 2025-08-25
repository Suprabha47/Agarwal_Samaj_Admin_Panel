import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
