import React, { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const ProfileMenu = () => {
  const { userData, logout } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu if clicked outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Initial */}
      <div
        className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white font-bold rounded-full cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {userData?.name?.charAt(0).toUpperCase() || "F"}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
          <button
            onClick={() => console.log("Verify Email")}
            className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 w-full text-left"
          >
            Verify Email
          </button>
          <button
            onClick={logout}
            className="block px-4 py-2 text-gray-700 hover:bg-red-100 w-full text-left"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
