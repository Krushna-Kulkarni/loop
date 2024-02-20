import "./App.css";
import Navbar from "./components/Navbar";
import VideoDetail from "./pages/VideoDetail";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <VideoDetail />
      </div>
    </div>
  );
}

export default App;
