import { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout, MemberApi } from "../../Redux/Slice";
import { Bell, LogOut, Trash2 } from "lucide-react";
import axios from "axios";
import { SidebarMobile, SidebarMobileButton } from "../Sidebar/SidebarMobile";
import Cards from "./content/Cards";

export default function Member() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const menuRef = useRef(null);
  const actionRef = useRef(null);

  const email = useSelector((state) => state.app.email);
  const Members = useSelector((state) => state.app.Members);
  const [search, setSearch] = useState("");
  const [filters, setFilter] = useState("All");

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

  // Close dropdowns on outside click
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
    console.log(id);
    try {
      await axios
        .delete(`http://localhost:4005/api/candidates/${id}`)
        .then((response) => {
          if (response.data) {
            toast.success("Member Delete Successfully");
            setTimeout(async () => {
              dispatch(MemberApi());
            }, 500);
          }
        })
        .catch((err) => toast.error("Something Went Wrong", err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Sidebar - Mobile */}
      <SidebarMobile
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:ml-64">
        {/* Top Navbar - Fixed */}
        <header className="flex justify-between items-center px-4 md:px-6 py-5 bg-white border-white shadow-sm sticky top-0 z-50">
          {/* Left Side */}
          <SidebarMobileButton setOpenSidebar={setOpenSidebar} />
          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Add Member */}
            <button className="flex items-center gap-2 bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg text-base hover:bg-gray-600">
              <NavLink to={"createMember"}>+ Add Member</NavLink>
            </button>

            {/* Notification */}
            <button className="relative">
              <Bell className="h-6 w-6 text-gray-700" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg"
              >
                👤
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b">
                    <p className="font-medium text-base">Admin User</p>
                    <p className="text-sm text-gray-500">{email}</p>
                  </div>
                  <button
                    onClick={() => {
                      toast.success("Logout Successfully");
                      setTimeout(() => {
                        localStorage.removeItem("token");
                        dispatch(logout());
                        Navigate("/");
                      }, 1000);
                    }}
                    className="flex items-center gap-2 px-4 py-3 w-full text-base bg-gray-600 text-left text-white hover:bg-gray-700"
                  >
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

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
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-base hover:bg-blue-700"
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
                            className="flex items-center gap-1 px-3.5 py-1.5 bg-red-600 text-white rounded-lg text-base hover:bg-blue-700"
                            onClick={() => handleDelete(u.id)}
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
      </main>
      <Outlet />
    </div>
  );
}

/* Membership Pill */
const MembershipPill = ({ membership }) => {
  return <span>{membership === true ? <h6>✅</h6> : <h6>❌</h6>}</span>;
};
