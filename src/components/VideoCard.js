import React from "react";
// import getVideoDuration from "./helperFunctions.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  const Navigate = useNavigate();
  return (
    <div
      onClick={() => Navigate(`/video/${video.id}`)}
      className="w-full  sm:w-[358px] md:w-[380px] flex flex-col cursor-pointer border-b border-black  rounded-b-md group"
    >
      <div className="flex justify-center items-center">
        <img
          src={video.thumb}
          alt="thumb"
          className="w-full sm:w-[358px] md:w-[380px] h-[220px] border-b  border-black  rounded-b-2xl "
        />
      </div>

      <div className="flex flex-col pr-1 pt-2 pb-3 pl-2 ">
        <div className="flex justify-between ">
          <span className="text-md font-bold">{video.title}</span>
          <span className="hidden group-hover:block text-sm text-white">
            <MoreVertIcon />
          </span>
        </div>
        <span className="text-xs text-zinc-200">{video.subtitle.slice(3)}</span>
      </div>
    </div>
  );
};

export default VideoCard;
