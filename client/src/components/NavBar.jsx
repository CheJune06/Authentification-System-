import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const NavBar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="w-full flex justify-between items-center px-6 sm:px-20 py-4
      bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 shadow-md fixed top-0 z-50"
    >
      
      <img
        src={assets.logo}
        alt="Logo"
        className="w-24 sm:w-32 cursor-pointer"
      />

      
      {userData ? (
        <div ref={dropdownRef} className="relative">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex justify-center items-center rounded-full 
            bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold 
            cursor-pointer shadow-md"
          >
            {userData.name[0].toUpperCase()}
          </div>

          {isOpen && (
            <div
              className="absolute right-0 top-12 z-20 
              bg-white rounded-lg shadow-lg border w-40 text-sm"
            >
              <ul className="list-none m-0 p-2 text-gray-700">
                {!userData.isAccountVerified && (
                  <li
                    onClick={sendVerificationOtp}
                    className="py-2 px-3 rounded-md hover:bg-indigo-100 cursor-pointer"
                  >
                    Verify Email
                  </li>
                )}
                <li
                  onClick={logout}
                  className="py-2 px-3 rounded-md hover:bg-red-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 
          text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform"
        >
          Login <img src={assets.arrow_icon} alt="Arrow Icon" className="w-4" />
        </button>
      )}
    </div>
  );
};

export default NavBar;
