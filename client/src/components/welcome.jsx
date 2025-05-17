import React from "react";
import { NavLink } from "react-router-dom";

const welcome = () => {
  return (
    <div className=" mt-[60px] bg-[url(/cover3.png)] h-[91vh] http://localhost:5173/storebg-cover bg-center flex items-center">
      <div className="flex flex-col items-center justify-evenly h-[70vh] border-2 w-[400px] mx-auto rounded-2xl border-green-200 bg-white shadow-lg">
        <div className="flex flex-col items-center">
          <i className="fa-solid fa-lock bg-green-700 px-3 py-2 text-4xl rounded-[50%] text-white"></i>
          <h1 className="font-bold text-lg text-green-900">VeggieVibe</h1>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-lg font-bold">Welcome!</h1>
          <NavLink
            to="/login"
            className="px-6 py-1 bg-green-600 rounded-xl text-white font-semibold"
          >
            Login
          </NavLink>
          <NavLink
            to="/signin"
            className="px-5 py-1 text-green-600 rounded-xl border-green-600 border font-semibold"
          >
            Signup
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default welcome;
