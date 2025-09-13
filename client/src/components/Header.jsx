import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center mt-20 px-6 text-center text-gray-800">
      
      <div className="relative">
        <img
          src={assets.header_img}
          alt="Profile"
          className="w-40 h-40 rounded-full shadow-lg border-4 border-white object-cover"
        />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
      </div>

      
      <h1 className="flex items-center gap-2 text-2xl sm:text-4xl font-bold mt-6 mb-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Hey {userData ? userData.name : "Developer"}!
        <img
          className="w-8 aspect-square animate-bounce"
          src={assets.hand_wave}
          alt="wave"
        />
      </h1>

      
      <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4">
        Welcome to our App 🚀
      </h2>

      
      <p className="mb-8 max-w-lg text-gray-600 leading-relaxed">
        Let’s start with a quick product tour and we’ll have you up and running
        in no time.
      </p>

      
      <button className="px-10 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
        Get Started
      </button>
    </div>
  );
};

export default Header;
