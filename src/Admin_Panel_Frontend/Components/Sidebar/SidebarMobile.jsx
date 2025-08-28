import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";

export function SidebarMobile({ openSidebar, setOpenSidebar }) {
  return (
    <div
      className={`fixed inset-0 z-40 transform ${
        openSidebar ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:hidden`}
    >
      <div className="h-full w-64 bg-white shadow-lg relative">
        {/* Close button */}
        <button
          onClick={() => setOpenSidebar(false)}
          className="absolute top-4 right-4 text-gray-700"
        >
          <XMarkIcon className="h-7 w-7" />
        </button>
        <Sidebar />
      </div>
    </div>
  );
}

export function SidebarMobileButton({ setOpenSidebar }) {
  return (
    <div className="flex items-center gap-3">
      {/* Mobile Sidebar Button */}
      <button className="md:hidden" onClick={() => setOpenSidebar(true)}>
        <Bars3Icon className="h-8 w-8 text-gray-700" />
      </button>
      <h1 className="text-3xl font-bold text-gray-800">Members</h1>
    </div>
  );
}
