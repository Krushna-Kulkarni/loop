import React from "react";
import Videos from "./Videos";

const Feed = () => {
  const selectedCategory = "All";
  return (
    <div className="flex flex-col flex-1 ml-12">
      <div className=" text-2xl sticky pb-2 top-20 bg-black h-10 z-20">
        <span className="text-red-600">{selectedCategory} </span>
        <span>Videos</span>
      </div>
      <div className="w-full my-0 mx-auto pb-4">
        <Videos />
      </div>
    </div>
  );
};

export default Feed;
