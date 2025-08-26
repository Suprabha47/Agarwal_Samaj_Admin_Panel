import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import {
  setConfirmPassword,
  setEmail,
  setPassword,
  setUsername,
} from "../../Redux/Slice";
import { NavLink, useNavigate } from "react-router-dom";
 
export default function SignUp() {
  const username = useSelector((state) => state.app.username);
  const email = useSelector((state) => state.app.email);
  const password = useSelector((state) => state.app.password);
  const confirm_password = useSelector((state) => state.app.confirm_password);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
 
  const [toggle, setToggle] = useState(true);
  const [toggle2, setToggle2] = useState(true);
  const [errors, setErrors] = useState({});
 
  const handleCreate = async (e) => {
    e.preventDefault();
    let newErrors = {};
 
    // 🔎 Validation
    if (!username.trim()) newErrors.username = "Username is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) newErrors.email = "Invalid email format";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (!confirm_password.trim()) {
      newErrors.confirm_password = "Confirm Password is required";
    } else if (password !== confirm_password) {
      newErrors.confirm_password = "Password and Confirm Password do not match";
    }
 
    setErrors(newErrors);
 
    // 🚀 If no errors, call API
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:4005/api/auth/sign-up",
          {
            username,
            email,
            password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
 
        console.log("✅ User created:", response.data);
        toast.success("User created successfully!");
 
        setTimeout(() => {
          Navigate("/");
        }, 500);
      } catch (error) {
        if (error.response) {
          // Server responded with error status
          console.error("❌ API Error:", error.response.data);
          toast.error(error.response.data.error || "Failed to create user");
        } else {
          // Network or other error
          console.error("❌ Network Error:", error.message);
          toast.error("Something went wrong, please try again.");
        }
      }
    }
  };
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Aggarwal Samaj</h2>
          <p className="mb-6 text-base md:text-lg">
            Find your perfect life partner from our community
          </p>
          <h3 className="text-xl font-semibold mb-3">Why Join Us?</h3>
          <ul className="space-y-3 text-base md:text-lg">
            <li className="flex items-center">
              <span className="mr-2">✔</span> Verified profiles
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔</span> Community focused matches
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔</span> Privacy focused approach
            </li>
          </ul>
          <p className="mt-6 text-base md:text-lg">
            Already have an account?{" "}
            <NavLink to="/" className="underline font-semibold ml-3">
              Login here
            </NavLink>
          </p>
        </div>
 
        {/* Right Side */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
            Create Your Account
          </h2>
          <form onSubmit={handleCreate} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-base md:text-lg font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => dispatch(setUsername(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              {errors.username && (
                <p className="text-red-500 text-base mt-1">{errors.username}</p>
              )}
            </div>
 
            {/* Email */}
            <div>
              <label className="block text-base md:text-lg font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              {errors.email && (
                <p className="text-red-500 text-base mt-1">{errors.email}</p>
              )}
            </div>
 
            {/* Password */}
            <div className="relative">
              <label className="block text-base md:text-lg font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={toggle ? "password" : "text"}
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-gray-800 pr-12"
              />
              <button
                type="button"
                className="absolute right-3 top-11 text-gray-500"
                onClick={() => setToggle(!toggle)}
              >
                {!toggle ? (
                  <img
                    src="https://img.icons8.com/?size=100&id=30M9wv1iFkcH&format=png&color=000000"
                    alt="hide"
                    width={20}
                    height={20}
                  />
                ) : (
                  <img
                    src="https://img.icons8.com/?size=100&id=X9yZBEi0SUB7&format=png&color=000000"
                    alt="show"
                    width={20}
                    height={20}
                  />
                )}
              </button>
              <p className="text-sm md:text-base text-gray-500 mt-1">
                Password must be at least 8 characters long
              </p>
              {errors.password && (
                <p className="text-red-500 text-base mt-1">{errors.password}</p>
              )}
            </div>
 
            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-base md:text-lg font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type={toggle2 ? "password" : "text"}
                value={confirm_password}
                onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-gray-800 pr-12"
              />
              <button
                type="button"
                className="absolute right-3 top-11 text-gray-500"
                onClick={() => setToggle2(!toggle2)}
              >
                {!toggle2 ? (
                  <img
                    src="https://img.icons8.com/?size=100&id=30M9wv1iFkcH&format=png&color=000000"
                    alt="hide"
                    width={20}
                    height={20}
                  />
                ) : (
                  <img
                    src="https://img.icons8.com/?size=100&id=X9yZBEi0SUB7&format=png&color=000000"
                    alt="show"
                    width={20}
                    height={20}
                  />
                )}
              </button>
              {errors.confirm_password && (
                <p className="text-red-500 text-base mt-1">
                  {errors.confirm_password}
                </p>
              )}
            </div>
 
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-700 text-white py-3 rounded-full font-semibold shadow-md hover:scale-98 transition-transform duration-700 text-base md:text-lg"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}