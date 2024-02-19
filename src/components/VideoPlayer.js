import React, { useEffect, useRef, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import Crop32SharpIcon from "@mui/icons-material/Crop32Sharp";
import Crop169SharpIcon from "@mui/icons-material/Crop169Sharp";
import FullscreenSharpIcon from "@mui/icons-material/FullscreenSharp";
import FullscreenExitSharpIcon from "@mui/icons-material/FullscreenExitSharp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { formatDuration } from "../utils/helperFunctions";

const VideoPlayer = ({ currentVideo }) => {
  const [isPaused, setIsPaused] = useState(true);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  const [fullScreenMode, setFullScreenMode] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);
  const [miniPlayerMode, setMiniPlayerMode] = useState(false);

  const [volume, setVolume] = useState(0.5);
  const [prevVolume, setPrevVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("");

  // keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log("Key pressed:", e.key);
      if (!videoContainerRef.current) return; // Add a check for null

      const tagName = videoContainerRef.current.tagName.toLowerCase();

      if (tagName === "input") return;
      switch (e.key.toLowerCase()) {
        case " ":
          if (tagName === "button") return;
          togglePlay();
          break;
        case "k":
          togglePlay();
          break;
        case "f":
          toggleFullScreenMode();
          break;
        case "t":
          toggleTheaterMode();
          break;
        case "i":
          toggleMiniPlayerMode();
          break;
        case "m":
          toggleMute();
          break;
        case "arrowleft":
          skip(-5);
          break;
        case "l":
          skip(-5);
          break;
        case "arrowright":
          skip(5);
          break;
        default:
          return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line
  }, [volume, prevVolume, isMuted, theaterMode]);

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
    if (document.pictureInPictureElement == null) {
      videoRef.current.requestPictureInPicture();
      setMiniPlayerMode(true);
    } else {
      document.exitPictureInPicture();
      setMiniPlayerMode(false);
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);

    setVolume(newVolume);
    if (!isMuted) {
      videoRef.current.volume = newVolume;
    }
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
      videoRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    console.log("here");
    if (!isMuted) {
      setPrevVolume(volume);
      setVolume(0);
      videoRef.current.volume = 0;
    } else {
      setVolume(prevVolume);
      videoRef.current.volume = prevVolume;
    }
    setIsMuted(!isMuted);
  };

  const getSpeakerIcon = () => {
    if (isMuted || volume === 0) {
      return (
        <VolumeOffIcon
          className="volume-muted-icon"
          style={{
            fontSize: "28",
          }}
        />
      );
    } else if (volume < 0.5) {
      return (
        <VolumeDownIcon
          className="volume-low-icon"
          style={{
            fontSize: "28",
          }}
        />
      );
    } else {
      return (
        <VolumeUpIcon
          className="volume-high-icon"
          style={{
            fontSize: "28",
          }}
        />
      );
    }
  };

  function setTotalVideoDuration() {
    setTotalTime(formatDuration(videoRef.current.duration));
  }
  function setCurrentVideoDuration() {
    setCurrentTime(formatDuration(videoRef.current.currentTime));
  }

  function skip(duration) {
    videoRef.current.currentTime += duration;
  }

  return (
    <div
      ref={videoContainerRef}
      className={`video-container relative flex flex-col justify-center h-[70dvh] mx-auto group border border-red-800 ${
        theaterMode ? " h-[78dvh]" : "max-w-[1000px] w-[68%]"
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
          <div className="volume-container flex items-center">
            <button onClick={toggleMute} className="mute-btn">
              {getSpeakerIcon()}
            </button>
            <input
              className="volume-slider"
              type="range"
              min="0"
              max="1"
              step="any"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
          <div className="flex items-center gap-1 flex-grow">
            <div className="current-time">{currentTime}</div>/
            <div className="total-time">{totalTime}</div>
          </div>
          {!miniPlayerMode && (
            <button onClick={toggleMiniPlayerMode} className="mini-player-btn">
              <BrandingWatermarkOutlinedIcon style={{ fontSize: "28" }} />
            </button>
          )}
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
        onLoadedData={setTotalVideoDuration}
        onTimeUpdate={setCurrentVideoDuration}
        onClick={togglePlay}
        ref={videoRef}
        className={`flex justify-center p-1 w-full h-full`}
        src={currentVideo?.sources[0]}
        autoPlay
      ></video>

      <div className="video-title-container text-lg font-bold  absolute top-0 left-0 right-0 pt-2 text-white z-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
        <span className="pl-2">{currentVideo?.title} </span>
      </div>
    </div>
  );
};

export default VideoPlayer;
