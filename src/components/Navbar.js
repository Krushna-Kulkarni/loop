import React from "react";
import Searchbar from "./Searchbar";

const Navbar = () => {
  return (
    <div className="flex items-center h-18 p-2 border-b border-gray-600 bg-black">
      <div className="flex items-center text-xl gap-2">
        <img
          className="w-8 h-4"
          src={require("../assets/images/logo.png")}
          alt="brand-logo"
        />
        <span className="flex items-center text-2xl font-bold text-white">
          Loop
        </span>
      </div>
      <div className="flex w-[600px] justify-center ml-80">
        <Searchbar />
      </div>
    </div>
  );
};

export default Navbar;
