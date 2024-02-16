import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Searchbar = () => {
  return (
    <div className="flex border border-gray-600 rounded-md">
      <input
        className="flex items-center text-md w-96 outline-none px-2 py-1 h-10 text-white rounded-l-md border-none bg-zinc-800"
        type="text"
        placeholder="Search videos..."
      />
      <button className="bg-black px-2 py-1 rounded-r-md">
        <SearchIcon />
      </button>
    </div>
  );
};

export default Searchbar;
