import React from "react";
import VideoCard from "./VideoCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DragHandleIcon from "@mui/icons-material/DragHandle";

const Playlist = ({
  playlist,
  playlistHandler,
  currentVideo,
  currentVideoHandler,
}) => {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedPlaylist = Array.from(playlist);
    const [reorderedVideoCard] = reorderedPlaylist.splice(
      result.source.index,
      1
    );
    reorderedPlaylist.splice(result.destination.index, 0, reorderedVideoCard);
    playlistHandler(reorderedPlaylist);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={"videoCards"}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col flex-grow items-center gap-1  lg:h-[82dvh] lg:overflow-y-scroll m-2"
          >
            {playlist.map((video, index) => (
              <Draggable key={video.id} draggableId={video.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    onClick={() => currentVideoHandler(index)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? "0.5" : "1",
                    }}
                    className="flex items-center justify-center"
                  >
                    <div {...provided.dragHandleProps} className="p-2">
                      <DragHandleIcon />
                    </div>

                    <div className="flex justify-center">
                      <VideoCard video={video} currentPlaying={currentVideo} />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Playlist;
