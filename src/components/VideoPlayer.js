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
  const timelineContainerRef = useRef(null);

  const [fullScreenMode, setFullScreenMode] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);
  const [miniPlayerMode, setMiniPlayerMode] = useState(false);

  const [volume, setVolume] = useState(0.5);
  const [prevVolume, setPrevVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("");

  const [speed, setSpeed] = useState(1);

  const [isScrubbing, setIsScrubbing] = useState(false);
  const [previewPosition, setPreviewPosition] = useState();
  const [progressPosition, setProgressPosition] = useState();

  // keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!videoContainerRef.current) return;

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
    const percent = videoRef.current.currentTime / videoRef.current.duration;
    setProgressPosition(percent);
  }

  function skip(duration) {
    videoRef.current.currentTime += duration;
  }

  function changePlaybackSpeed() {
    let newPlaybackRate = videoRef.current.playbackRate + 0.25;
    if (newPlaybackRate > 2) newPlaybackRate = 0.25;
    videoRef.current.playbackRate = newPlaybackRate;
    setSpeed(newPlaybackRate);
  }

  useEffect(() => {
    const handleMouseUp = (e) => {
      if (isScrubbing) toggleScrubbing(e);
    };

    const handleMouseMove = (e) => {
      if (isScrubbing) handleTimelineUpdate(e);
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
    // eslint-disable-next-line
  }, [isScrubbing, toggleScrubbing]);

  function toggleScrubbing(e) {
    e.preventDefault();
    setIsScrubbing(e.buttons === 1);
    const rect = timelineContainerRef.current.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width;

    if (!isScrubbing) {
      videoRef.current.currentTime = percent * videoRef.current.duration;
      if (!videoRef.current.paused) videoRef.current.play();
    }

    handleTimelineUpdate(e);
  }

  function handleTimelineUpdate(e) {
    const rect = timelineContainerRef.current.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width;
    setPreviewPosition(percent);

    if (isScrubbing) {
      e.preventDefault();
      const newTime = percent * videoRef.current.duration;
      setProgressPosition(percent);
      videoRef.current.currentTime = newTime;
    }
  }

  return (
    <div
      ref={videoContainerRef}
      className={`video-container relative flex flex-col justify-center h-[70dvh] mx-auto group border border-red-800 ${
        theaterMode ? " h-[78dvh]" : "max-w-[1000px] w-[68%]"
      }`}
    >
      <div className="video-controls-container absolute bottom-0 left-0 right-0 text-white z-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 ">
        <div
          ref={timelineContainerRef}
          onMouseMove={handleTimelineUpdate}
          onMouseDown={toggleScrubbing}
          className="timeline-container group/timelineContainer h-[7px] mx-2 cursor-pointer flex items-center"
        >
          <div
            className={`timeline relative h-[3px] w-full bg-[#64646480] group-hover/timelineContainer:h-full ${
              isScrubbing ?? "h-full"
            }`}
          >
            <div
              className={`absolute left-0 top-0 bottom-0 bg-gray-500 right-0
       hidden group-hover/timelineContainer:block ${isScrubbing ?? "block"}`}
              style={{ right: `calc(100% - ${previewPosition} * 100%)` }}
            ></div>
            <div
              className="absolute left-0 top-0 bottom-0 bg-red-500 right-0"
              style={{ right: `calc(100% - ${progressPosition} * 100%)` }}
            ></div>
            <div
              className={`thumb-indicator scale-100 group-hover/timelineContainer:scale-125 absolute h-[200%] bg-red-500 rounded-full duration-50 ease-in-out ${
                isScrubbing ?? "scale-150"
              }`}
              style={{
                aspectRatio: "1/1",
                top: "-50%",
                left: `calc(${progressPosition} * 100%)`,
              }}
            ></div>
          </div>
        </div>
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
          <button
            onClick={changePlaybackSpeed}
            className="speed-btn w-12"
          >{`${speed}x`}</button>
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
