import React from "react";

const VideoCard = ({ video, currentPlaying }) => {
  return (
    <div className=" relative  w-full  sm:w-[358px] md:w-[380px] flex flex-col cursor-pointer border-b border-black  rounded-b-md group">
      <div className="flex justify-center items-center">
        <img
          src={video.thumb}
          alt="thumb"
          className="w-[358px] md:w-[380px] h-[220px] border-b  border-black  rounded-2xl "
        />
        {currentPlaying.id === video.id && (
          <div className="absolute top-0 bottom-0 left-0 right-0 sm:w-[358px] md:w-[380px] h-[220px] rounded-2xl bg-[#acabab68] text-white flex justify-center items-center text-2xl font-bold">
            Now Playing
          </div>
        )}
      </div>

      <div className="flex flex-col pr-1 pt-2 pb-3 pl-2 ">
        <div className="text-md font-bold">{video.title}</div>
        <span className="text-xs text-zinc-200">{video.subtitle.slice(3)}</span>
      </div>
    </div>
  );
};

export default VideoCard;
