import { useAuth } from "../app/AuthContext";
import { useState, useEffect, useRef } from "react";
import "remixicon/fonts/remixicon.css";

export default function Topbar() {
  const { user, logout } = useAuth();

  const [openNotif, setOpenNotif] = useState(false);

  // REFS
  const notifRef = useRef(null);
  const notifBtnRef = useRef(null);

  // CLICK OUTSIDE HANDLER
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        openNotif &&
        notifRef.current &&
        !notifRef.current.contains(e.target) &&
        notifBtnRef.current &&
        !notifBtnRef.current.contains(e.target)
      ) {
        setOpenNotif(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openNotif]);
  const searchRef = useRef(null);

  // CTRL + K → Focus Search
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header className="h-16 border-b border-slate-200 bg-white/70 backdrop-blur flex items-center justify-between px-4 md:px-6 relative z-[99]">
      <div className="flex items-center gap-3">

        {/* Mobile Title */}
        <span className="md:hidden font-semibold text-slate-800">
          Admin Panel
        </span>

        {/* Search Input */}
        <div className="hidden md:flex items-center">
          <div className="relative">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search..."
              className="w-96 rounded-lg border border-slate-300 px-3 py-2 pl-9 text-sm 
              bg-white focus:outline-none focus:ring-1 focus:ring-[#EA6B23]"
            />
            <i className="ri-search-line absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>

            {/* Ctrl + K hint */}
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px]
px-2 py-[3px] rounded-sm bg-gray-50 border border-gray-200  text-slate-600 font-medium pointer-events-none">
              Ctrl + K
            </span>

          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">

        {/* NOTIFICATION BUTTON */}
        <button
          ref={notifBtnRef}
          onClick={() => setOpenNotif(!openNotif)}
          className="relative text-xl hover:text-[#EA6B23] transition"
        >
          <i className="ri-notification-3-line text-2xl"></i>

          {/* Badge */}
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
            3
          </span>
        </button>

        {/* DROPDOWN */}
        {openNotif && (
          <div
            ref={notifRef}
            className="absolute right-60 top-14 w-80 bg-white shadow-lg border border-slate-200 rounded-xl p-4 `z-[9999]` animate-fadeIn"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-3">
              <h3 className="text-sm font-semibold text-slate-800">Notifications</h3>
              <span className="text-xs bg-red-300/20 text-red-600 font-semibold px-2 py-1 rounded-sm">
                3 New
              </span>
            </div>

            {/* LIST */}
            <div>

              {/* ITEM 1 */}
              <div className="flex items-start gap-3 pb-3.5 hover:bg-slate-50 transition cursor-pointer border-b border-slate-300">
                <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-lg ">
                  <i className="ri-file-list-3-line"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">New Invoice Created</p>
                  <p className="text-xs text-slate-500">2 minutes ago</p>
                </div>
              </div>

              {/* ITEM 2 */}
              <div className="flex items-start gap-3 py-3.5 hover:bg-slate-50 transition cursor-pointer border-b border-slate-300">
                <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-lg ">
                  <i className="ri-vip-crown-line"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">Subscription Renewed</p>
                  <p className="text-xs text-slate-500">1 hour ago</p>
                </div>
              </div>

              {/* ITEM 3 */}
              <div className="flex items-start gap-3 pt-3.5 hover:bg-slate-50 transition cursor-pointer">
                <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-lg ">
                  <i className="ri-user-add-line"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">New User Registered</p>
                  <p className="text-xs text-slate-500">Yesterday</p>
                </div>
              </div>

            </div>

            {/* FOOTER */}
            <button className="w-full text-sm bg-[#EA6B23]/10 py-3 text-[#EA6B23] font-medium mt-4 hover:underline">
              View all notifications
            </button>
          </div>
        )}



        {/* USER DETAILS */}
        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-800">
              {user?.name ?? "Admin"}
            </p>
            <p className="text-xs text-slate-400">
              {user?.email ?? "admin@gmail.com"}
            </p>
          </div>

          <div className="h-9 w-9 rounded-full bg-[#EA6B23] text-white flex items-center justify-center text-sm font-semibold">
            {user?.name?.[0] ?? "A"}
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="hidden sm:inline-flex text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
