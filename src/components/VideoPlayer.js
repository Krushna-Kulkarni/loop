import React, { useRef, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const VideoPlayer = ({ currentVideo }) => {
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    setIsPaused((prevState) => !prevState);
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };
  return (
    <div
      className={`video-container relative flex flex-col justify-center w-[90%] max-w-[1000px] min-h-[70dvh] mx-auto group border border-red-800`}
    >
      <div className="video-controls-container absolute bottom-0 left-0 right-0 text-white z-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
        <div className="timeline-container"></div>
        <div className="controls flex gap-2 p-1 items-center">
          <button
            onClick={togglePlay}
            className="play-pause-btn bg-none border-none text-inherit p-0 h-[30px] w-[30px] text-[1.1rem] cursor-pointer opacity-85 transition-opacity duration-150 ease-in-outhover:opacity-100"
          >
            {isPaused ? (
              <span>
                <PauseIcon />
              </span>
            ) : (
              <span>
                <PlayArrowIcon />
              </span>
            )}
          </button>
        </div>
      </div>
      <video
        onClick={togglePlay}
        ref={videoRef}
        className="w-full h-[70dvh] p-1"
        src={currentVideo?.sources[0]}
      ></video>

      <div className="text-lg font-bold  absolute top-2 left-3 right-0 text-white z-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
        {currentVideo?.title}{" "}
      </div>
    </div>
  );
};

export default VideoPlayer;
