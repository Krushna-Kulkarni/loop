import React from "react";
import { videos } from "../utils/constants";
import VideoCard from "./VideoCard";

const Videos = () => {
  return (
    <div className="flex gap-x-8 gap-y-2 flex-wrap">
      {videos.map((video) => (
        <VideoCard video={video} />
      ))}
    </div>
  );
};

export default Videos;
