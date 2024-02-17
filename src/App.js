import { Route, Routes } from "react-router-dom";
import "./App.css";
import Feed from "./pages/Feed";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import VideoDetail from "./pages/VideoDetail";
import Playlists from "./pages/Playlists";
import Liked from "./pages/Liked";
import History from "./pages/History";
import WatchLater from "./pages/WatchLater";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="flex">
        <div className="w-60">
          <Sidebar />
        </div>
        <div className=" flex-1 ml-12">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/liked" element={<Liked />} />
            <Route path="/history" element={<History />} />
            <Route path="/watchLater" element={<WatchLater />} />
            <Route path="/search/:searchQuery" element={<SearchResults />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
