async function getVideoDuration(videoUrl) {
  try {
    const video = document.createElement("video");
    video.src = videoUrl;
    await video.load();

    const duration = video.duration;
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else if (minutes > 0) {
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    } else {
      return `00:${seconds.toString().padStart(2, "0")}`;
    }
  } catch (error) {
    console.error(error);
    return "00:00";
  }
}

export default getVideoDuration;
