import React from "react";
import Searchbar from "./Searchbar";

const Navbar = () => {
  return (
    <div className="flex items-center p-2 pl-8  bg-black sticky h-20 top-0 z-20">
      <div className="flex items-center text-xl gap-2">
        <img
          className="w-12"
          src={require("../assets/images/logo.png")}
          alt="brand-logo"
        />
        <span className="flex items-center text-3xl font-bold font-mono text-white">
          loop
        </span>
      </div>

      <Searchbar />
    </div>
  );
};

export default Navbar;
