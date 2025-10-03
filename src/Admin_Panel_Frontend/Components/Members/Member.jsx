import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MemberApi } from "../../Redux/Slice";
import { Trash2 } from "lucide-react";
import axios from "axios";
import Cards from "./content/Cards";
import Layout from "../Layout/Layout";

export default function Member() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const actionRef = useRef(null);

  const Members = useSelector((state) => state.app.Members);
  const [search, setSearch] = useState("");
  const [filters, setFilter] = useState("All");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const role = parseInt(localStorage.getItem("role"));
  // console.log(typeof role);

  const filterData =
    filters === "All"
      ? Members
      : Members.filter(
          (user) =>
            user.subscription.toString() === filters || user.manglik === filters
        );
  const normalize = (str) =>
    String(str || "")
      .toLowerCase()
      .replace(/\s+/g, "");
  // search
  const filterSearch = filterData.filter((user) =>
    [
      user.name,
      user.gotra,
      new Date().getFullYear() - new Date(user.dob).getFullYear(),
      user.religion || "Hindu", // default fallback,
      user.contact_no,
      user.state,
      user.status_of_family,
      user.education,
      user.father_name,
      user.designation,
      user.occupation,
      user.body_type,
      user.company_name,
      user.address,
      user.designation,
      user.mother_name,
      user.pin_code,
      user.district,
      user.native_place,
      user.annual_income,
      user.email,
    ].some((field) => normalize(field).includes(normalize(search)))
  );
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MemberApi());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/api/candidates/${id}`)
        .then((response) => {
          if (response.data) {
            toast.success("Member Deleted Successfully");
            setTimeout(async () => {
              dispatch(MemberApi());
            }, 300);
          }
        })
        .catch((err) => toast.error("Something Went Wrong", err));
    } catch (error) {
      // Error logged in development only
      if (process.env.NODE_ENV === 'development') {
        console.log(error);
      }
    } finally {
      setConfirmDelete(null); // close modal
    }
  };
  return (
    <>
      <Layout PageName="Matrimonial" />
      {/* Main Content */}
      <div className=" flex flex-col md:ml-64">
        {/* Content */}
        <div className="p-4 md:p-6 space-y-6">
          {/* Cards */}
          <Cards />
          {/* Member List */}
          <div className="bg-white rounded-xl shadow-xl border-white">
            <div className="p-5 border-gray-200 border-2 border-t-transparent border-l-transparent border-r-transparent flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-2xl text-gray-800">
                  Members List
                </h2>
                <p className="text-lg text-gray-500">
                  View and manage all organization members
                </p>
              </div>
              <div className="flex gap-2">
                <select
                  className="border-gray-200 border-2 rounded-lg px-3 py-2 text-base font-semibold"
                  value={filters}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value={"All"}>All</option>
                  <option value={false}>Basic</option>
                  <option value={true}>Membership</option>
                  <option value={"Yes"}>Manglik</option>
                </select>
              </div>
            </div>

            {/* Search (UI only, no filter) */}
            <div className="p-4 border-gray-200">
              <div className="flex items-center gap-1 max-w-2xl w-full border-gray-300 border-2 rounded-xl">
                {/* Search Icon */}
                <img
                  src="https://img.icons8.com/?size=100&id=lwZinoeNcL3F&format=png&color=000000"
                  alt="search"
                  className="w-6 h-6 text-gray-500 ml-2 "
                />

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search members..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 border-white  px-4 py-2 rounded-lg text-base 
                 focus:outline-none focus:border-gray-400
                 w-full sm:w-[80%] md:w-[60%] lg:w-[50%]"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <table className="min-w-[700px] w-full text-base text-left border-white border-t-white">
                <thead className="bg-gray-50 text-gray-700 border-white border-t-white text-lg">
                  <tr>
                    <th className="py-4 px-5">Member</th>
                    <th className="py-4 px-5">Contact</th>
                    <th className="py-4 px-5">Membership</th>
                    <th className="py-4 px-5">Details</th>
                    <th className="py-4 px-5">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  {filterSearch.map((u) => (
                    <tr
                      key={u.id}
                      className="border-gray-200 border-2 hover:bg-gray-50 text-gray-700"
                    >
                      <td className="py-4 px-5 font-medium ">{u.name}</td>
                      <td className="py-4 px-5">
                        <p>{u.email}</p>
                        <p className="text-sm text-gray-500">{u.contact_no}</p>
                      </td>
                      <td className="py-4 px-5">
                        <MembershipPill membership={u.subscription} />
                      </td>
                      <td className="py-4 px-5">
                        <NavLink
                          to={`member/${u.id}`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-base hover:bg-blue-500 "
                        >
                          View
                        </NavLink>
                      </td>
                      <td
                        className="py-4 px-5 relative flex items-center gap-3"
                        ref={actionRef}
                      >
                        {/* Action Dropdown */}
                        <div className="flex flex-wrap gap-2">
                          <button
                            className="flex items-center gap-1 px-3.5 py-1.5 bg-red-600 text-white rounded-lg text-base hover:bg-red-500 hover:scale-98 transition-transform duration-1000 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => setConfirmDelete(u.id)}
                            disabled={role !== 1} // 👈 disable condition here
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filterSearch.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-500 text-lg"
                      >
                        No members found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm sm:max-w-md md:max-w-lg shadow-xl">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Are you sure you want to delete this member?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
              <button
                onClick={() => setConfirmDelete(null)}
                className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 hover:scale-98 transition-transform duration-1000"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-98 transition-transform duration-1000"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* Membership Pill */
const MembershipPill = ({ membership }) => {
  return (
    <span>
      {membership === true ? (
        <h6>
          <svg
            className="text-green-600 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
          </svg>
        </h6>
      ) : (
        <h6>
          <svg
            className=" h-6 w-6 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </h6>
      )}
    </span>
  );
};
