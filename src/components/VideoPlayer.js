import React, { useRef, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import Crop32SharpIcon from "@mui/icons-material/Crop32Sharp";
import Crop169SharpIcon from "@mui/icons-material/Crop169Sharp";
import FullscreenSharpIcon from "@mui/icons-material/FullscreenSharp";
import FullscreenExitSharpIcon from "@mui/icons-material/FullscreenExitSharp";

const VideoPlayer = ({ currentVideo }) => {
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  const [fullScreenMode, setFullScreenMode] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);
  const [miniPlayerMode, setMiniPlayerMode] = useState(false);

  function togglePlay() {
    setIsPaused((prevState) => !prevState);
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }

  function toggleFullScreenMode() {
    if (document.fullscreenElement == null) {
      videoContainerRef.current.requestFullscreen();
      setFullScreenMode(true);
    } else {
      document.exitFullscreen();
      setFullScreenMode(false);
    }
  }

  function toggleTheaterMode() {
    setTheaterMode(!theaterMode);
  }

  function toggleMiniPlayerMode() {
    if (miniPlayerMode) {
      document.exitPictureInPicture();
      setMiniPlayerMode(false);
    } else {
      videoRef.current.requestPictureInPicture();
      setMiniPlayerMode(true);
    }
  }

  return (
    <div
      ref={videoContainerRef}
      className={`video-container relative flex flex-col justify-center  min-h-[70dvh]  group border border-red-800 ${
        theaterMode ? "w-full mx-0" : " max-w-[1000px] w-[90%] mx-auto"
      }`}
    >
      <div className="video-controls-container absolute bottom-0 left-0 right-0 text-white z-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 ">
        <div className="timeline-container"></div>
        <div className="controls flex gap-2 p-1 items-center">
          <button
            onClick={togglePlay}
            className="play-pause-btn bg-none border-none text-inherit p-0 h-[30px] w-[30px] text-[1.1rem] cursor-pointer opacity-85 transition-opacity duration-150 ease-in-outhover:opacity-100"
          >
            {isPaused ? (
              <span>
                <PauseIcon style={{ fontSize: "30" }} />
              </span>
            ) : (
              <span>
                <PlayArrowIcon style={{ fontSize: "30" }} />
              </span>
            )}
          </button>
          <button onClick={toggleMiniPlayerMode} className="mini-player-btn">
            <BrandingWatermarkOutlinedIcon style={{ fontSize: "28" }} />
          </button>
          <button onClick={toggleTheaterMode} className="theater-btn">
            {theaterMode ? (
              <Crop169SharpIcon className="wide" style={{ fontSize: "28" }} />
            ) : (
              <Crop32SharpIcon className="tall" style={{ fontSize: "32" }} />
            )}
          </button>
          <button onClick={toggleFullScreenMode} className="full-screen-btn">
            {fullScreenMode ? (
              <FullscreenExitSharpIcon
                className="close"
                style={{ fontSize: "32" }}
              />
            ) : (
              <FullscreenSharpIcon
                className="open"
                style={{ fontSize: "32" }}
              />
            )}
          </button>
        </div>
      </div>
      <video
        onClick={togglePlay}
        ref={videoRef}
        className={`w-full p-1  ${
          theaterMode ?? "flex justify-center mx-auto"
        } ${fullScreenMode ? "h-full" : "h-[70dvh]"}`}
        src={currentVideo?.sources[0]}
      ></video>

      <div className="video-title-container text-lg font-bold  absolute top-0 left-0 right-0 pt-2 pl-2 text-white z-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
        {currentVideo?.title}
      </div>
    </div>
  );
};

export default VideoPlayer;
