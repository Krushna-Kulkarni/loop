import React from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "./../components/VideoPlayer";
import { videos } from "../utils/constants";

const VideoDetail = () => {
  const { id } = useParams();
  const currentVideoId = id;
  const currentVideo = videos.find((v) => v.id === currentVideoId);
  console.log(currentVideo?.sources[0]);
  return (
    <div>
      <VideoPlayer currentVideo={currentVideo} />
      <div className="flex flex-col justify-center w-[90%] max-w-[1000px] mx-auto p-2">
        <span className="text-lg font-bold">{currentVideo?.title} </span>
        <span className="text-xs text-zinc-200">
          {currentVideo?.subtitle.slice(3)}
        </span>
      </div>
    </div>
  );
};

export default VideoDetail;
