import { Route, Routes } from "react-router-dom";
import "./App.css";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="flex ">
        <div className="w-60">
          <Sidebar />
        </div>
        <Routes>
          <Route path="/" element={<Feed />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
