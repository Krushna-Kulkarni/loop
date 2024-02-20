import React, { useEffect, useState } from "react";
import VideoPlayer from "./../components/VideoPlayer";
import { videos } from "../utils/data.js";
import Playlist from "../components/Playlist";

const VideoDetail = () => {
  const [myVideos, setMyVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState();

  useEffect(() => {
    setMyVideos(videos);
    if (videos.length > 0) {
      setCurrentVideo(videos[0]);
    }
  }, []);

  function currentVideoHandler(videoIndex) {
    setCurrentVideo(myVideos[videoIndex]);
  }

  function playlistHandler(updatedPlaylist) {
    setMyVideos(updatedPlaylist);
  }

  function playNext() {
    const nextVideoIndex =
      myVideos.findIndex((video) => video.id === currentVideo.id) + 1;
    if (nextVideoIndex === myVideos.length) {
      setCurrentVideo(myVideos[0]);
    } else {
      setCurrentVideo(myVideos[nextVideoIndex]);
    }
  }

  return (
    <div className="flex flex-wrap justify-center">
      <div className="flex flex-col items-center w-full lg:w-[68%]">
        <VideoPlayer currentVideo={currentVideo} playNext={playNext} />

        <div className="flex flex-col justify-start py-2  px-8 w-full">
          <span className="text-lg font-bold">{currentVideo?.title} </span>
          <span className="text-xs text-zinc-200">
            {currentVideo?.subtitle?.slice(3)}
          </span>
          <span className="text-sm text-white pt-2">
            {currentVideo?.description}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-bold text-center">Playlist</div>
        <Playlist
          playlist={myVideos}
          playlistHandler={playlistHandler}
          currentVideo={currentVideo}
          currentVideoHandler={currentVideoHandler}
        />
      </div>
    </div>
  );
};

export default VideoDetail;
