import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setEmail, setPassword } from "../../Redux/Slice";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function SignIn() {
  const email = useSelector((state) => state.app.email);
  const password = useSelector((state) => state.app.password);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [toggle, setToggle] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // 🔎 Validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        newErrors.email = "Invalid email format";
      }
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);

    // 🚀 If no errors, call API
    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);

        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/sign-in`,
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        );

        // Login success logged in development only
        if (process.env.NODE_ENV === 'development') {
          console.log("✅ Login success:", response.data);
        }

        // 🔑 Store token
        if (response.data.token) {
          toast.success("Login Successfully");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("name", response.data.name);
        }

        // Update redux login state
        dispatch(
          login({
            role: response?.data?.role,
            id: response?.data?.id,
            name: response?.data.name,
          })
        );

        // Navigate to dashboard
        Navigate("/dashboard");
      } catch (error) {
        if (error.response) {
          console.error("❌ API Error:", error.response.data);
          toast.error(error.response.data.error || "Invalid credentials");
        } else {
          console.error("❌ Network Error:", error.message);
          toast.error("Something went wrong, please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
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
            <NavLink to="/signup" className="underline font-semibold ml-2">
              Register Here
            </NavLink>
          </p>
        </div>

        <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
            Sign In to Your Account
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-base md:text-lg font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                autoComplete="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              {errors.email && (
                <p className="text-red-500 text-base mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-base md:text-lg font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={toggle ? "password" : "text"}
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
                autoComplete="current-password"
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
              {errors.password && (
                <p className="text-red-500 text-base mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-700 text-white py-3 rounded-full font-semibold shadow-md hover:scale-98 transition-transform duration-700 text-base md:text-lg"
            >
              {!loading ? (
                <h1> Sign In</h1>
              ) : (
                <p className="size-10 border-t-transparent border-5 rounded-full border-orange-500 animate-spin ml-45"></p>
              )}
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
