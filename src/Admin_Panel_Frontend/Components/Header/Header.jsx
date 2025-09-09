import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router";
import { logout } from "../../Redux/Slice";
import toast from "react-hot-toast";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { LogOut } from "lucide-react";
import ExitIcon from "../../assests/Images/Exit.png";
import { useMatch } from "react-router";


export default function Header({
  setOpenSidebar,
  isUpdate = false,
  isCreate = false,
  isUpdateform = false,
  isUpdateClassified = false,
  id = null,
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.app.email);
  const location = useLocation();

  const HeaderHeading = () => {
    // Declare all matches at the top (hooks cannot be conditional)
    const matchCreateMember = useMatch("/members/createMember");
    const matchUpdateMember = useMatch("/members/updateMember/:id");

    const matchViewMember = useMatch("/members/member/:id");

    const matchCreateClassified = useMatch("/classified/createClassified");
    const matchViewClassified = useMatch("/classified/:id");
    const matchUpdateClassified = useMatch("/classified/updateClassified/:id");
    

    // Top-level routes
    if (location.pathname === "/dashboard") return "Dashboard";
    if (location.pathname === "/members") return "Matrimonial";
    if (location.pathname === "/donations") return "Donations";
    if (location.pathname === "/classified") return "Classified";
    if (location.pathname === "/attributes") return "Attributes";
    if (location.pathname === "/sliderImages") return "Slider Images";
    if(location.pathname==='/gallery') return "Gallery";
    if(location.pathname==='/blog/articles') return "All Articles";
    if(location.pathname==='/blog/create') return "Create Article";
    if(location.pathname==='/blog/category') return " Category";


    // Nested member routes
    if (matchCreateMember || matchUpdateMember || matchViewMember) {
      return (
        <NavLink to="/members">
          <div className="text-3xl flex gap-3 font-bold text-gray-800 items-center">
            <button>
              <img src={ExitIcon} alt="Exit" className="size-10" />
            </button>
            {isCreate && (
              <h1 className="text-lg sm:text-2xl md:text-2xl font-semibold md:font-bold text-gray-700">
                Candidate Form
              </h1>
            )}
            {isUpdateform && (
              <h1 className="text-lg sm:text-2xl md:text-2xl font-semibold md:font-bold text-gray-700">
                Update Form
              </h1>
            )}
          </div>
        </NavLink>
      );
    }
    if (matchCreateClassified) {
      return (
        <NavLink to="/classified">
          <div className="text-3xl flex gap-3 font-bold text-gray-800 items-center">
            <button>
              <img src={ExitIcon} alt="Exit" className="size-10" />
            </button>
            {isCreate && (
              <h1 className="text-lg sm:text-2xl md:text-2xl font-semibold md:font-bold text-gray-800">
                Classified Form
              </h1>
            )}
            {isUpdateform && (
              <h1 className="text-lg sm:text-2xl md:text-2xl font-semibold md:font-bold text-gray-800">
                Update Form
              </h1>
            )}
          </div>
        </NavLink>
      );
    }
    if (matchViewClassified) {
      return (
        <NavLink to="/classified">
          <div className="text-3xl flex gap-3 font-bold text-gray-800 items-center">
            <button>
              <img src={ExitIcon} alt="Exit" className="size-10" />
            </button>

            {isUpdateform && (
              <h1 className="text-lg sm:text-2xl md:text-2xl font-semibold md:font-bold text-gray-800">
                Update Form
              </h1>
            )}
          </div>
        </NavLink>
      );
    }
    if (matchUpdateClassified) {
      return (
        <NavLink to="/classified">
          <div className="text-3xl flex gap-3 font-bold text-gray-800 items-center">
            <h1 className="text-lg sm:text-2xl md:text-2xl font-semibold md:font-bold text-gray-800">
              Classified Update Form
            </h1>
          </div>
        </NavLink>
      );
    }

    // Fallback
    return "Page";
  };

  

  return (
    <header className="flex justify-between items-center px-4 md:px-6 py-5  bg-white border-white shadow-sm sticky top-0  z-50">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Button */}
        <button className="md:hidden" onClick={() => setOpenSidebar(true)}>
          <Bars3Icon className="h-8 w-8 text-gray-700" />
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3">
          {/* Heading */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
            {HeaderHeading()}
          </h1>

          {/* Button */}
         
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Update Member */}

        {isUpdate && id && (
          <button className="flex items-center gap-2 bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg text-base hover:bg-gray-600">
            <NavLink to={`/members/updateMember/${id}`}>Update Member</NavLink>
          </button>
        )}
        {isUpdateClassified && id && (
          <button className="flex items-center gap-2 bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg text-base hover:bg-gray-600">
            <NavLink to={`/classified/updateClassified/${id}`}>
              Update Classified
            </NavLink>
          </button>
        )}
        {/* Notification */}
        <button className="relative ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            className="size-10"
            viewBox="0 0 64 64"
          >
            <path d="M25.815 50h12.371c-1.068 2.355-3.436 4-6.185 4S26.883 52.355 25.815 50zM51.509 39.699C51.764 39.954 54 42.294 54 46c0 1.104-.896 2-2 2H12c-1.104 0-2-.896-2-2 0-3.706 2.236-6.046 2.491-6.301.165-.166.359-.301.571-.399 3.056-1.417 3.604-9.965 3.897-14.557.779-7.786 7.072-10.934 10.68-11.658C28.307 11.604 29.662 10 32 10s3.693 1.604 4.36 3.084c3.607.723 9.899 3.862 10.674 11.586.3 4.664.848 13.212 3.903 14.629C51.149 39.398 51.344 39.534 51.509 39.699z"></path>
          </svg>
          <span className="absolute top-1  right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        {/* User Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
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
                    localStorage.removeItem("role");
                    localStorage.removeItem("id");
                    dispatch(logout());
                    navigate("/");
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
  );
}
