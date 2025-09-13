import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          await getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          await getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-gray-900 via-purple-900 to-black relative">
      
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      
      <div className="bg-gray-900/70 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full sm:w-96 text-gray-200 text-sm border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-3 text-white drop-shadow-md">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6 text-gray-400">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account"}
        </p>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          {state === "Sign Up" && (
            <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-800 border border-gray-700">
              <img src={assets.person_icon} alt="" className="w-5" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
              />
            </div>
          )}

          <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-800 border border-gray-700">
            <img src={assets.mail_icon} alt="" className="w-5" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email address"
              required
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
            />
          </div>

          <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-800 border border-gray-700">
            <img src={assets.lock_icon} alt="" className="w-5" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="text-indigo-400 hover:text-indigo-300 text-xs cursor-pointer"
          >
            Forgot Password?
          </p>

          <button className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-800 text-white font-semibold shadow-lg hover:scale-105 transition-transform">
            {state}
          </button>
        </form>

        
        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-indigo-400 font-semibold cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-indigo-400 font-semibold cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
